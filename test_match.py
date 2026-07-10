import numpy as np
from PIL import Image
import os

photo_temp = Image.open('photo_template.jpg').convert('L')
logo_temp = Image.open('logo_template.jpg').convert('L')

photo_arr = np.array(photo_temp, dtype=np.float32) / 255.0
logo_arr = np.array(logo_temp, dtype=np.float32) / 255.0

def get_matches(img_path, template_arr, threshold_percentage=0.08):
    img = Image.open(img_path).convert('L')
    img_arr = np.array(img, dtype=np.float32) / 255.0
    th, tw = template_arr.shape
    
    from numpy.lib.stride_tricks import sliding_window_view
    windows = sliding_window_view(img_arr, (th, tw))
    
    # Mean Absolute Difference
    sad = np.mean(np.abs(windows - template_arr), axis=(2, 3))
    
    # Find matches
    y_indices, x_indices = np.where(sad < threshold_percentage)
    
    # Cluster matches (non-maximum suppression / local minima)
    matches = []
    if len(y_indices) > 0:
        # Sort by SAD score
        scores = sad[y_indices, x_indices]
        sorted_idx = np.argsort(scores)
        
        # Suppress close coordinates
        used = np.zeros(len(sorted_idx), dtype=bool)
        for i in sorted_idx:
            if used[i]:
                continue
            cy, cx = y_indices[i], x_indices[i]
            matches.append((cx, cy, scores[i]))
            # Mark all within radius as used
            dists = np.sqrt((y_indices - cy)**2 + (x_indices - cx)**2)
            used[dists < 50] = True
            
    return matches

print("Photo matches in p-block:", get_matches('map/p-block_orig.jpg', photo_arr))
print("Logo matches in p-block:", get_matches('map/p-block_orig.jpg', logo_arr))
