import re
from pathlib import Path

root = Path(r"c:\Users\HP\Documents\GitHub\HOMAGE-INFRATECH")
html_files = [
    root / "faridabad/sector-82-commercial/index.html",
    root / "faridabad/commercial.html",
    root / "faridabad/imt/index.html",
    root / "faridabad/fit/index.html",
    root / "faridabad/sector-72-73/index.html",
    root / "faridabad/sector-127/index.html"
]

for html_path in html_files:
    if not html_path.exists():
        print(f"Skipping (not found): {html_path}")
        continue
        
    content = html_path.read_text(encoding="utf-8", errors="ignore")
    original = content
    
    # 1. Remove brochure modal markup
    # Pattern: <!-- --- BROCHURE MODAL --- --> ... <div id="brochureModal" ...> ... </div>
    # We can match from the comment (or div start) to the closing div
    content = re.sub(
        r'(<!--\s*---\s*BROCHURE MODAL\s*---\s*-->\s*)?<div\s+id=["\']brochureModal["\'][\s\S]*?</div>\s*</div>',
        '',
        content
    )
    
    # Just in case, try without the outer wrapper or alternate indentation
    content = re.sub(
        r'<div\s+id=["\']brochureModal["\'][\s\S]*?</div>\s*</div>',
        '',
        content
    )

    # 2. Remove script tag overriding openBrochureModal
    content = re.sub(
        r'<script>\s*let\s+activePdf[\s\S]*?</script>',
        '',
        content
    )
    
    if content != original:
        html_path.write_text(content, encoding="utf-8")
        print(f"Cleaned up local modal/script in: {html_path.relative_to(root)}")
    else:
        print(f"No changes made to: {html_path.relative_to(root)} (regex might not have matched)")
