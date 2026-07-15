import urllib.parse
import requests

query = "RPS Savana Faridabad Haryana real photos"
url = f"http://html.duckduckgo.com/html/?q={urllib.parse.quote(query)}"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
}

try:
    response = requests.get(url, headers=headers, timeout=5, allow_redirects=False)
    print(f"HTTP Status: {response.status_code}")
    print(f"Headers: {response.headers}")
except Exception as e:
    print(f"HTTP error: {e}")
