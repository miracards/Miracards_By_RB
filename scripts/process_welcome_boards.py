import os
import subprocess
import json
import time
import shutil

FOLDERS = {
    "haldi": "https://drive.google.com/drive/folders/1BMMTgzf0QWBMgKoJuFTldff-9By0FeF3",
    "mehendi": "https://drive.google.com/drive/folders/1bt2urxpsibyQZZDYw82w6a_xzYre91As",
    "sangeet": "https://drive.google.com/drive/folders/1L7Hqln8v_dhdPSL58Vq_xvwZ8YM0hdbO",
    "wedding": "https://drive.google.com/drive/folders/1UoB7Nq1lpQWWW1vmg58TI-EN8w8Id-sO",
    "engagement": "https://drive.google.com/drive/folders/1iovAvYy_4inzufPE-Px5w1AnfVXAdoN_",
    "kankupagla": "https://drive.google.com/drive/folders/1T9pI3RuIKAZ1yYgV05JS6Q2FXyCYb0-t",
    "mandap": "https://drive.google.com/drive/folders/1LefauuUWpgdy1pTl6ucSH8v4xkbum13J",
    "kankotri-lekhan": "https://drive.google.com/drive/folders/1JeHloaPAirPt8sVZM7GuBFfdt1slBQ4w"
}

BASE_DIR = "/home/bhautik/Documents/GitHub/mira-cards/public/collections/welcome-board"

def download_folder(folder_url, local_dir, limit=30):
    print(f"\nListing folder: {folder_url}...")
    cmd = ["gdown", "--json", "--folder", folder_url]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"Error listing folder: {res.stderr}")
        return False
    
    try:
        files = json.loads(res.stdout)
    except Exception as e:
        print(f"Failed to parse JSON output: {e}")
        print(res.stdout[:500])
        return False

    os.makedirs(local_dir, exist_ok=True)
    
    # Filter only image files
    image_items = []
    for item in files:
        path = item.get("path", "")
        ext = os.path.splitext(path.lower())[1]
        if ext in [".jpg", ".jpeg", ".png", ".webp"]:
            image_items.append(item)
            
    print(f"Found {len(image_items)} image files (out of {len(files)} total files) in Drive folder.")
    if not image_items:
        print("No images found to download!")
        return False

    # Download up to limit
    count = 0
    for item in image_items:
        if count >= limit:
            break
            
        file_url = item["url"]
        file_path = item["path"]
        target_name = os.path.basename(file_path)
        dest_path = os.path.join(local_dir, target_name)
        
        # Check if already exists and is non-empty
        if os.path.exists(dest_path) and os.path.getsize(dest_path) > 1000:
            print(f"File {target_name} already exists and is valid. Skipping.")
            count += 1
            continue
            
        print(f"Downloading [{count + 1}/{len(image_items)}] {target_name} via curl...")
        dl_cmd = [
            "curl",
            "-A", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "-L", file_url,
            "-o", dest_path
        ]
        dl_res = subprocess.run(dl_cmd)
        
        if dl_res.returncode == 0:
            count += 1
            time.sleep(0.5)  # Politeness delay
        else:
            print(f"Failed to download {target_name}")
            time.sleep(1)
            
    return True

def normalize_folder(src_dir, target_count=30):
    if not os.path.exists(src_dir):
        print(f"Directory {src_dir} does not exist.")
        return
        
    files = sorted([f for f in os.listdir(src_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')) and os.path.getsize(os.path.join(src_dir, f)) > 1000])
    if not files:
        print(f"No valid image files found in {src_dir}")
        return
        
    print(f"Normalizing {len(files)} files in {src_dir} to {target_count} files...")
    temp_dir = src_dir + "_temp"
    os.makedirs(temp_dir, exist_ok=True)
    
    for i in range(target_count):
        src_file = files[i % len(files)]
        src_path = os.path.join(src_dir, src_file)
        
        ext = os.path.splitext(src_file.lower())[1]
        dest_name = f"{i + 1}{ext}"
        dest_path = os.path.join(temp_dir, dest_name)
        shutil.copy2(src_path, dest_path)
        
    shutil.rmtree(src_dir)
    os.rename(temp_dir, src_dir)
    print(f"Normalized {src_dir} successfully.")

def main():
    for name, url in FOLDERS.items():
        local_dir = os.path.join(BASE_DIR, name)
        print(f"\n========================================\nProcessing {name.upper()}\n========================================")
        success = download_folder(url, local_dir, limit=30)
        if success:
            normalize_folder(local_dir, target_count=30)
    print("\nAll downloads and normalizations complete!")

if __name__ == "__main__":
    main()
