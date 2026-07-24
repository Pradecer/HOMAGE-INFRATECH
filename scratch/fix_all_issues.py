import os
import re
from pathlib import Path

root = Path(r"c:\Users\HP\Documents\GitHub\HOMAGE-INFRATECH")
html_files = [f for f in root.rglob("*.html") if ".git" not in f.parts and "scratch" not in f.parts and "inspect" not in f.name and "test" not in f.name]

hamburger_code = """
      <button class="hamburger" aria-label="Toggle Navigation Menu" aria-expanded="false" aria-controls="primary-nav-menu">
        <span></span>
        <span></span>
        <span></span>
      </button>"""

modified_count = 0

for html_path in html_files:
    content = html_path.read_text(encoding="utf-8", errors="ignore")
    original = content
    
    # 1. Add missing hamburger button
    if "class=\"hamburger\"" not in content and "class='hamburger'" not in content:
        # Find closing tag of logo link
        # Pattern: <a ... class="logo"...>...</a>
        logo_match = re.search(r'(<a\s+[^>]*class=["\']logo["\'][^>]*>[\s\S]*?</a>)', content)
        if logo_match:
            logo_str = logo_match.group(1)
            content = content.replace(logo_str, logo_str + hamburger_code, 1)
            
    # Ensure nav-menu has id="primary-nav-menu" if missing
    if 'class="nav-menu"' in content and 'id="primary-nav-menu"' not in content:
        content = content.replace('class="nav-menu"', 'class="nav-menu" id="primary-nav-menu"', 1)
        
    # 2. Fix specific brochure calls
    if 'faridabad/sector-72-73' in str(html_path).replace('\\', '/'):
        content = content.replace('Adore Business City Sector 72-73.pdf', 'Adore Prima Se 72 & 73.pdf')
    if 'faridabad/sector-88' in str(html_path).replace('\\', '/'):
        content = content.replace('rps_palm_drive_sector_88.pdf', 'RPS Savana sector 88.pdf')
        content = content.replace('rps_palm_sector_88.pdf', 'RPS Savana sector 88.pdf')
        
    if content != original:
        html_path.write_text(content, encoding="utf-8")
        modified_count += 1
        print(f"Updated: {html_path.relative_to(root)}")

print(f"\nTotal files updated: {modified_count}")
