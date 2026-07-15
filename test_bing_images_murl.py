import re

with open("bing_images.html", "r", encoding="utf-8") as f:
    html = f.read()

# Find URLs following &quot;murl&quot;:&quot;
urls = re.findall(r'&quot;murl&quot;:&quot;([^&"]+?)&quot;', html)
print(f"Found {len(urls)} image URLs via murl regex:")
for i, u in enumerate(urls[:15], 1):
    print(f"  {i}. {u}")
