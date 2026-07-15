import urllib.parse
import requests
import re

query = "RPS Savana Faridabad Haryana real photos"
url = f"https://gibiru.com/results.html?q={urllib.parse.quote(query)}"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
}

try:
    response = requests.get(url, headers=headers, timeout=10)
    print(f"Gibiru Status: {response.status_code}")
    print(f"Gibiru Content length: {len(response.text)}")
    
    # Save output to inspect
    with open("gibiru_inspect.html", "w", encoding="utf-8") as f:
        f.write(response.text)
        
    links = re.findall(r'href="([^"]+)"', response.text)
    filtered = []
    for l in links:
        if l.startswith("http") and "gibiru" not in l:
            filtered.append(l)
            
    print(f"Found {len(filtered)} candidate links:")
    for i, u in enumerate(filtered[:10], 1):
        print(f"  {i}. {u}")
except Exception as e:
    print(f"Gibiru search error: {e}")
