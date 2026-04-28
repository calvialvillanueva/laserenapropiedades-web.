import sys
from PIL import Image

def remove_white_bg(image_path):
    try:
        img = Image.open(image_path)
        img = img.convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # If the pixel is white or very close to white, make it transparent
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(image_path, "PNG")
        print(f"Fondo blanco removido con éxito: {image_path}")
    except Exception as e:
        print(f"Error procesando {image_path}: {e}")

if __name__ == "__main__":
    remove_white_bg("public/images/logo-horizontal.png")
    remove_white_bg("public/images/logo-vertical.png")
