from PIL import Image, ImageFilter
import sys

def pad_image(input_path, output_path):
    try:
        img = Image.open(input_path)
        w, h = img.size
        
        # Shrink the main image to 75% of its size to add margins
        scale = 0.75
        target_w = int(w * scale)
        target_h = int(h * scale)
        main_img = img.resize((target_w, target_h), Image.Resampling.LANCZOS)
        
        # Create a blurred version of the original image to act as the margin background
        bg_img = img.copy().filter(ImageFilter.GaussianBlur(80))
        
        # Paste the shrunken image in the center
        offset_x = (w - target_w) // 2
        offset_y = (h - target_h) // 2
        bg_img.paste(main_img, (offset_x, offset_y))
        
        bg_img.save(output_path)
        print("Success")
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    pad_image('assets/all_elements_paradise_v6.png', 'assets/all_elements_paradise_v7.png')
