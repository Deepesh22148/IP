import sys
from PIL import Image

def process_image(input_path, output_path):
    try:
        img = Image.open(input_path).convert("L")  # Convert to grayscale
        img.save(output_path)
        print("Image processing complete")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    input_image = sys.argv[1]  # First argument (uploaded image)
    output_image = sys.argv[2]  # Second argument (processed image)
    process_image(input_image, output_image)
