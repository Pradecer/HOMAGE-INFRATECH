import urllib.parse
import requests
import re

query = "RPS Savana Faridabad Haryana real photos"
url = f"https://www.google.com/search?q={urllib.parse.quote(query)}"
headers = {
    "User-Agent": "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)"
}

try:
    response = requests.get(url, headers=headers, timeout=10)
    print(f"Google Classic Status: {response.status_code}")
    print(f"Google Classic Content length: {len(response.text)}")
    
    # Save output to inspect
    with open("google_classic_inspect.html", "w", encoding="utf-8") as f:
        f.write(response.text)
        
    title = re.findall(r'<title>(.*?)</title>', response.text, re.IGNORECASE)
    print("Title:", title)
    
    # Classic Google search links are in: <a href="/url?q=HTTPS_URL..."
    links = re.findall(r'href="/url\?q=([^"&]+)', response.text)
    decoded_links = []
    for l in links:
        decoded = urllib.parse.unquote(l)
        if decoded.startswith("http") and "google.com" not in decoded:
            decoded_links.append(decoded)
            
    print(f"Found {len(decoded_links)} candidate links:")
    for i, u in enumerate(decoded_links[:10], 1):
        print(f"  {i}. {u}")
except Exception as e:
    print(f"Google Classic search error: {e}")
