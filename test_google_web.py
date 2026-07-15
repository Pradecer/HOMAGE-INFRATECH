import urllib.parse
import requests
import re

query = "RPS Savana Faridabad Haryana real photos"
url = f"https://www.google.com/search?q={urllib.parse.quote(query)}"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
}

try:
    response = requests.get(url, headers=headers, timeout=10)
    print(f"Google Web Status: {response.status_code}")
    print(f"Google Web Content length: {len(response.text)}")
    
    # Save output to inspect
    with open("google_web_inspect.html", "w", encoding="utf-8") as f:
        f.write(response.text)
        
    title = re.findall(r'<title>(.*?)</title>', response.text, re.IGNORECASE)
    print("Title:", title)
    
    # Look for search results links
    # Google links are typically in: <a href="/url?q=HTTPS_URL..." or directly in <a jsname="..." href="HTTPS_URL"
    links = re.findall(r'href="([^"]+)"', response.text)
    filtered = []
    for l in links:
        if l.startswith("http") and "google.com" not in l:
            filtered.append(l)
        elif "/url?q=" in l:
            # Extract query URL
            clean_url = urllib.parse.unquote(l.split("/url?q=")[1].split("&")[0])
            if clean_url.startswith("http") and "google.com" not in clean_url:
                filtered.append(clean_url)
                
    print(f"Found {len(filtered)} candidate links:")
    for i, u in enumerate(filtered[:10], 1):
        print(f"  {i}. {u}")
except Exception as e:
    print(f"Google Web search error: {e}")
