import requests
from bs4 import BeautifulSoup
import os
import re

url = "https://laserenapropiedades.cl/propiedad/arriendo-diario-4/"
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

output_dir = r"c:\Users\Crist\.gemini\antigravity\scratch\laserenapropiedades-web\public\assets\propiedades"
os.makedirs(output_dir, exist_ok=True)

# Find all images that could be property images
images = soup.find_all("img")
img_urls = []
for img in images:
    src = img.get("src")
    if src and "wp-content/uploads" in src and not src.endswith("svg") and not "logo" in src.lower():
        img_urls.append(src)

# Let's deduplicate and download the first 4 main images
img_urls = list(dict.fromkeys(img_urls))
# Let's filter to those that look like property photos
prop_imgs = [u for u in img_urls if re.search(r'\d{4}/\d{2}/', u)]

print(f"Found {len(prop_imgs)} property images.")

for i, img_url in enumerate(prop_imgs[:4]): # just take up to 4
    if i == 0:
        filename = "arriendo-diario-4.jpg"
    else:
        filename = f"arriendo-diario-4-{i+1}.jpg"
        
    path = os.path.join(output_dir, filename)
    print(f"Downloading {img_url} to {path}")
    img_data = requests.get(img_url).content
    with open(path, 'wb') as f:
        f.write(img_data)

print("Done.")
