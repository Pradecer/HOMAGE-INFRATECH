import requests
import re
import urllib.parse

url = "https://shikharrealty.in/real-estate/rps-savana/"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
}

try:
    response = requests.get(url, headers=headers, timeout=15)
    print(f"Status Code: {response.status_code}")
    print(f"Content Length: {len(response.text)}")
    
    # Extract img sources
    imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', response.text, re.IGNORECASE)
    print(f"Found {len(imgs)} images:")
    for i, img in enumerate(imgs[:15], 1):
        abs_img = urllib.parse.urljoin(url, img)
        print(f"  {i}. {abs_img}")
except Exception as e:
    print(f"Error fetching page: {e}")
