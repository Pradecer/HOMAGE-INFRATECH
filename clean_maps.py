import numpy as np
from PIL import Image
import os, glob

# Create backup directory
os.makedirs('map_backup', exist_ok=True)

# Load templates
photo_temp = Image.open('photo_template.jpg').convert('L')
logo_temp = Image.open('logo_template.jpg').convert('L')

photo_arr = np.array(photo_temp, dtype=np.float32) / 255.0
logo_arr = np.array(logo_temp, dtype=np.float32) / 255.0

def get_matches(img_path, template_arr, threshold_percentage=0.08):
    img = Image.open(img_path).convert('L')
    img_arr = np.array(img, dtype=np.float32) / 255.0
    th, tw = template_arr.shape
    h, w = img_arr.shape
    
    from numpy.lib.stride_tricks import sliding_window_view
    
    # Pre-allocate SAD array
    sad = np.zeros((h - th + 1, w - tw + 1), dtype=np.float32)
    
    # Process row-by-row to avoid memory overhead (ArrayMemoryError)
    for y in range(h - th + 1):
        row_slice = img_arr[y : y + th, :]
        row_windows = sliding_window_view(row_slice, (th, tw))  # shape: (1, w - tw + 1, th, tw)
        row_windows = np.squeeze(row_windows, axis=0)           # shape: (w - tw + 1, th, tw)
        # Compute mean absolute difference for the row
        sad[y, :] = np.mean(np.abs(row_windows - template_arr), axis=(1, 2))
    
    # Find matches
    y_indices, x_indices = np.where(sad < threshold_percentage)
    
    matches = []
    if len(y_indices) > 0:
        scores = sad[y_indices, x_indices]
        sorted_idx = np.argsort(scores)
        
        used = np.zeros(len(sorted_idx), dtype=bool)
        for i in sorted_idx:
            if used[i]:
                continue
            cy, cx = y_indices[i], x_indices[i]
            matches.append((cx, cy))
            dists = np.sqrt((y_indices - cy)**2 + (x_indices - cx)**2)
            used[dists < 50] = True
            
    return matches

for p in sorted(glob.glob('map/*.jpg')):
    print(f'Processing {p}...')
    # Backup original
    backup_path = os.path.join('map_backup', os.path.basename(p))
    if not os.path.exists(backup_path):
        Image.open(p).save(backup_path)
        print(f'  Saved backup to {backup_path}')
        
    img = Image.open(p).convert('RGB')
    width, height = img.size
    
    # Find matches
    photo_matches = get_matches(p, photo_arr)
    logo_matches = get_matches(p, logo_arr)
    
    # Paint white over photo areas
    # Relative bounding box for photo: x in [mx - 25, mx + 87], y in [my - 10, my + 105]
    for mx, my in photo_matches:
        x_min = max(0, mx - 25)
        x_max = min(width, mx + 88)
        y_min = max(0, my - 10)
        y_max = min(height, my + 106)
        print(f'  Painting photo white at x:[{x_min}..{x_max}], y:[{y_min}..{y_max}]')
        
        # Fill rectangle with white
        for y in range(y_min, y_max):
            for x in range(x_min, x_max):
                img.putpixel((x, y), (255, 255, 255))
                
    # Paint white over logo areas
    # Relative bounding box for logo: x in [mx - 70, mx + 205], y in [my - 10, my + 88]
    for mx, my in logo_matches:
        x_min = max(0, mx - 70)
        x_max = min(width, mx + 206)
        y_min = max(0, my - 10)
        y_max = min(height, my + 89)
        print(f'  Painting logo white at x:[{x_min}..{x_max}], y:[{y_min}..{y_max}]')
        
        # Fill rectangle with white
        for y in range(y_min, y_max):
            for x in range(x_min, x_max):
                img.putpixel((x, y), (255, 255, 255))
                
    # Save the cleaned image back
    img.save(p, quality=95)
    print(f'  Saved cleaned image to {p}')

print("Completed cleaning all maps!")
