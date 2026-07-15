import urllib.parse
import requests
import re

query = "RPS Savana Faridabad Haryana real photos"
url = f"https://duckduckgo.com/html/?q={urllib.parse.quote(query)}"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
}

try:
    response = requests.get(url, headers=headers, timeout=10)
    print(f"Main DDG Status: {response.status_code}")
    print(f"Main DDG Content length: {len(response.text)}")
    
    links = re.findall(r'href="[^"]*?uddg=([^"&]+)', response.text)
    print(f"Found {len(links)} candidate links on main domain!")
except Exception as e:
    print(f"Main DDG error: {e}")
