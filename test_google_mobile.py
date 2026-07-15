import urllib.parse
import requests
import re

query = "RPS Savana Faridabad Haryana real photos"
url = f"https://www.google.com/search?q={urllib.parse.quote(query)}"
headers = {
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1"
}

try:
    response = requests.get(url, headers=headers, timeout=10)
    print(f"Google Mobile Status: {response.status_code}")
    print(f"Google Mobile Content length: {len(response.text)}")
    
    title = re.findall(r'<title>(.*?)</title>', response.text, re.IGNORECASE)
    print("Title:", title)
    
    # Google mobile search results have links in <a href="/url?q=HTTPS_URL..."
    links = re.findall(r'href="([^"]+)"', response.text)
    filtered = []
    for l in links:
        if l.startswith("http") and "google.com" not in l:
            filtered.append(l)
        elif "/url?q=" in l:
            clean_url = urllib.parse.unquote(l.split("/url?q=")[1].split("&")[0])
            if clean_url.startswith("http") and "google.com" not in clean_url:
                filtered.append(clean_url)
                
    print(f"Found {len(filtered)} candidate links:")
    for i, u in enumerate(filtered[:10], 1):
        print(f"  {i}. {u}")
except Exception as e:
    print(f"Google Mobile search error: {e}")
