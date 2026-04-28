import os
import json
import asyncio
import urllib.request
from urllib.parse import urljoin
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright

BASE_URL = "https://laserenapropiedades.cl/"
CATALOG_URL = "https://laserenapropiedades.cl/resultados-busqueda/" # Ajusta esta URL si el catálogo base es otro
OUTPUT_DIR = "public/assets/propiedades"
JSON_FILE = "src/data/propiedades_reales.json"

async def download_image(url, folder, filename):
    """Descarga una imagen de forma asíncrona (usando wrapper sincrónico por simplicidad aquí)."""
    if not os.path.exists(folder):
        os.makedirs(folder)
    
    filepath = os.path.join(folder, filename)
    try:
        urllib.request.urlretrieve(url, filepath)
        return filepath
    except Exception as e:
        print(f"Error descargando imagen {url}: {e}")
        return None

async def scrape_property_links(page):
    """Obtiene todos los links de las propiedades desde la página principal/catálogo."""
    print(f"Navegando al catálogo: {CATALOG_URL}")
    await page.goto(CATALOG_URL, timeout=60000)
    
    # Extraer el HTML de la página
    html = await page.content()
    soup = BeautifulSoup(html, 'html.parser')
    
    property_links = set()
    # Generalmente los links de propiedades contienen "/propiedad/" en este sitio
    for a_tag in soup.find_all('a', href=True):
        href = a_tag['href']
        if "/propiedad/" in href:
            property_links.add(href)
            
    print(f"Se encontraron {len(property_links)} enlaces a propiedades en la primera página.")
    return list(property_links)

async def scrape_property_details(page, url):
    """Extrae la información detallada de una propiedad específica."""
    print(f"Scrapeando: {url}")
    try:
        await page.goto(url, timeout=60000)
        # Esperar a que cargue el contenido principal
        await page.wait_for_load_state('networkidle')
        
        html = await page.content()
        soup = BeautifulSoup(html, 'html.parser')
        
        # 1. Título
        title_elem = soup.find('h1')
        title = title_elem.text.strip() if title_elem else "Sin Título"
        
        # 2. Precio (Ajustar selectores según la estructura del theme de WP)
        # Intentaremos buscar por clases comunes o expresiones regulares si es necesario.
        # Por ahora extraemos todo el texto y buscamos patrones comunes o clases 'price'
        price_elem = soup.select_one('.price, .property-price, [class*="price"]')
        price = price_elem.text.strip() if price_elem else ""
        
        # Si falla el selector CSS, buscaremos con BS4
        if not price:
            for el in soup.find_all(['span', 'div', 'p']):
                if '$' in el.text or 'UF' in el.text:
                    if len(el.text) < 20: # Probablemente es el precio
                        price = el.text.strip()
                        break
        
        # 3. Detalles (Habitaciones, Baños, Metros)
        # Generalmente están en listas o divs de características
        bedrooms = ""
        bathrooms = ""
        area = ""
        
        features_text = " ".join([el.text for el in soup.find_all(['li', 'div', 'span'])])
        
        # Extraer descripción completa
        desc_elem = soup.select_one('.description, .property-description, #property-description, .content')
        if not desc_elem:
            # Buscar el div con más párrafos si no hay clase clara
            paragraphs = soup.find_all('p')
            description = "\n".join([p.text.strip() for p in paragraphs if len(p.text.strip()) > 30])
        else:
            description = desc_elem.text.strip()

        # 4. Operación y Ubicación
        # Inferir de los breadcrumbs o categorías
        operation = "Arriendo" if "arriendo" in url.lower() or "arriendo" in title.lower() else "Venta"
        location = "La Serena" # Valor por defecto, requeriría selector específico
        
        # 5. Imágenes
        images = []
        img_tags = soup.find_all('img')
        property_id = url.strip('/').split('/')[-1]
        
        for idx, img in enumerate(img_tags):
            img_url = img.get('src', '')
            if img_url and ('uploads' in img_url) and not img_url.endswith('.svg'):
                images.append(img_url)
                
        # Descargar la imagen principal (la primera grande)
        local_image_path = ""
        if images:
            main_img_url = images[0] # Tomar la primera imagen relevante
            filename = f"{property_id}.jpg"
            await download_image(main_img_url, OUTPUT_DIR, filename)
            local_image_path = f"/assets/propiedades/{filename}"

        return {
            "id": property_id,
            "title": title,
            "price": price,
            "operation": operation,
            "location": location,
            "bedrooms": bedrooms,
            "bathrooms": bathrooms,
            "area": area,
            "description": description[:500] + "..." if len(description) > 500 else description,
            "image": local_image_path,
            "original_url": url
        }
        
    except Exception as e:
        print(f"Error procesando {url}: {e}")
        return None

async def main():
    print("Iniciando el proceso de Web Scraping...")
    
    # Crear carpeta de assets si no existe
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        
    # Crear carpeta para el JSON si no existe
    os.makedirs(os.path.dirname(JSON_FILE), exist_ok=True)
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        )
        page = await context.new_page()
        
        # 1. Obtener links
        links = await scrape_property_links(page)
        
        properties_data = []
        
        # 2. Iterar sobre cada propiedad
        for url in list(links):
            data = await scrape_property_details(page, url)
            if data:
                properties_data.append(data)
                
            # Pausa para no saturar el servidor
            await asyncio.sleep(2)
            
        # 3. Guardar JSON
        with open(JSON_FILE, 'w', encoding='utf-8') as f:
            json.dump(properties_data, f, ensure_ascii=False, indent=2)
            
        print(f"\n¡Scraping finalizado! Se guardaron {len(properties_data)} propiedades en {JSON_FILE}")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
