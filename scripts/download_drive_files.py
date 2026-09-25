import os
import subprocess
import json
import time

def download_folder(folder_url, local_dir, limit=30):
    print(f"\nListing folder: {folder_url}...")
    cmd = ["gdown", "--json", "--folder", folder_url]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"Error listing folder: {res.stderr}")
        return
    
    try:
        files = json.loads(res.stdout)
    except Exception as e:
        print(f"Failed to parse JSON output: {e}")
        print(res.stdout[:500])
        return

    os.makedirs(local_dir, exist_ok=True)
    
    # Check what we already have
    existing_files = os.listdir(local_dir)
    downloaded_count = len([f for f in existing_files if os.path.isfile(os.path.join(local_dir, f))])
    print(f"Already have {downloaded_count} files in {local_dir}")
    
    count = downloaded_count
    for item in files:
        if count >= limit:
            print(f"Limit of {limit} reached for {local_dir}. Stopping.")
            break
            
        file_url = item["url"]
        file_path = item["path"]
        
        # Clean target filename
        target_name = os.path.basename(file_path)
        dest_path = os.path.join(local_dir, target_name)
        
        if os.path.exists(dest_path) and os.path.getsize(dest_path) > 0:
            print(f"File {target_name} already exists. Skipping.")
            continue
            
        print(f"Downloading [{count + 1}/{limit}] {target_name} from {file_url}...")
        
        # Call gdown to download this single file
        dl_cmd = ["gdown", file_url, "-O", dest_path]
        dl_res = subprocess.run(dl_cmd)
        
        if dl_res.returncode == 0:
            count += 1
            print(f"Successfully downloaded {target_name}. Sleeping 3s...")
            time.sleep(3)  # Delay to avoid Google Drive rate limit
        else:
            print(f"Failed to download {target_name}. Sleeping 6s...")
            time.sleep(6)

if __name__ == "__main__":
    # 1. Engagement Invitation
    download_folder(
        "https://drive.google.com/drive/folders/1Y4mpTw_eAjSVjAdzkhjNOn8XZTkPOLAg",
        "/home/bhautik/Documents/GitHub/mira-cards/public/collections/engagement-invitation",
        limit=30
    )
    # 2. Vastu Pujan Invitation
    download_folder(
        "https://drive.google.com/drive/folders/1n-JccMKQN4mjMt_ilQSppBCcbGyz2kgk",
        "/home/bhautik/Documents/GitHub/mira-cards/public/collections/vastupujan-invitation",
        limit=30
    )
    print("\nAll downloads finished successfully!")
