with open("ddg_inspect.html", "r", encoding="utf-8") as f:
    html = f.read()

print("HTML length:", len(html))
print("Occurrences of href:")
import re
for m in re.finditer(r'href', html):
    start = max(0, m.start() - 20)
    end = min(len(html), m.end() + 100)
    print("---")
    print(html[start:end])
