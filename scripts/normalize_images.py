import os
import shutil

def normalize_folder(src_dir, target_count=30):
    if not os.path.exists(src_dir):
        print(f"Directory {src_dir} does not exist.")
        return
        
    # Get all existing image files in directory
    files = sorted([f for f in os.listdir(src_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png'))])
    if not files:
        print(f"No image files found in {src_dir}")
        return
        
    print(f"Found {len(files)} files in {src_dir}. Normalizing to {target_count} files...")
    
    # Create a temporary directory to store normalized files
    temp_dir = src_dir + "_temp"
    os.makedirs(temp_dir, exist_ok=True)
    
    for i in range(target_count):
        # Loop through existing files if we have fewer than target_count
        src_file = files[i % len(files)]
        src_path = os.path.join(src_dir, src_file)
        dest_name = f"{i + 1}.jpg"
        dest_path = os.path.join(temp_dir, dest_name)
        shutil.copy2(src_path, dest_path)
        
    # Remove original source directory and rename temp directory
    shutil.rmtree(src_dir)
    os.rename(temp_dir, src_dir)
    print(f"Normalized {src_dir} successfully. Files are now 1.jpg to {target_count}.jpg")

if __name__ == "__main__":
    normalize_folder("/home/bhautik/Documents/GitHub/mira-cards/public/collections/premium-money-envelop")
    normalize_folder("/home/bhautik/Documents/GitHub/mira-cards/public/collections/engagement-invitation")
    normalize_folder("/home/bhautik/Documents/GitHub/mira-cards/public/collections/vastupujan-invitation")
    print("Normalizations complete!")
