import urllib.parse
import requests
import re

query = "RPS Savana Faridabad Haryana real photos"
url = f"https://html.duckduckgo.com/html/?q={urllib.parse.quote(query)}"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
}

response = requests.get(url, headers=headers, timeout=10)
print(f"Status Code: {response.status_code}")
print(f"Content Length: {len(response.text)}")
with open("ddg_inspect.html", "w", encoding="utf-8") as f:
    f.write(response.text[:2000])

print("First 1000 characters of DDG response:")
print(response.text[:1000])
