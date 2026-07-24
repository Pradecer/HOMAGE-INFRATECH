/* ==========================================================================
   HOMAGE INFRATECH - PROJECTS PAGE BEHAVIOR
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initProjectDropdowns();
  initProjectModals();
  initProjectSearch();
});

/**
 * Project Kebab Dropdown menus
 */
function initProjectDropdowns() {
  const triggers = document.querySelectorAll('.project-action-trigger');
  
  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const dropdown = trigger.nextElementSibling;
      
      // Close other dropdowns
      document.querySelectorAll('.project-action-dropdown').forEach(d => {
        if (d !== dropdown) d.classList.remove('active');
      });
      document.querySelectorAll('.project-action-trigger').forEach(t => {
        if (t !== trigger) t.classList.remove('active');
      });
      
      trigger.classList.toggle('active');
      dropdown.classList.toggle('active');
    });
  });

  // Close dropdowns on outside click
  document.addEventListener('click', () => {
    document.querySelectorAll('.project-action-dropdown').forEach(d => {
      d.classList.remove('active');
    });
    document.querySelectorAll('.project-action-trigger').forEach(t => {
      t.classList.remove('active');
    });
  });
}

/**
 * Modal control and simulated operations
 */
function initProjectModals() {
  const modal = document.getElementById('project-detail-modal');
  const openButtons = document.querySelectorAll('.btn-view-details');
  const closeButton = document.querySelector('.modal-close');
  
  // Open modal
  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });
  
  // Close modal
  if (closeButton && modal) {
    closeButton.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
  
  // Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/**
 * Brochure catalog – maps project / developer keys to actual PDF files
 * in the /brochure/ folder. Each project can have multiple brochures.
 * The path is relative from the /projects/ subfolder.
 */
const BROCHURE_CATALOG = {
  /* ---- Faridabad – BPTP ---- */
  'bptp-floors':       { label: 'BPTP Floors (Vol 1)',       file: '../brochure/bptp floors 1.pdf' },
  'bptp-park-floor':   { label: 'BPTP Park Floor (Vol 2)',   file: '../brochure/bptp park floor 2.pdf' },
  'bptp-park-81':      { label: 'BPTP Park 81',              file: '../brochure/BPTP Park 81.pdf' },
  'bptp-eden':         { label: 'BPTP Eden Estate Plot',     file: '../brochure/BPTP Eden estate plot.pdf' },
  'bptp-resort':       { label: 'BPTP Resort',               file: '../brochure/bptp resort.pdf' },

  /* ---- Faridabad – KLJ ---- */
  'klj-platinum':      { label: 'KLJ Platinum',              file: '../brochure/Klj Platinum.pdf' },
  'klj-platinum-height':{ label: 'KLJ Platinum Height',     file: '../brochure/klj platinum height.pdf' },
  'klj-greens':        { label: 'KLJ Greens',                file: '../brochure/klj greens.pdf' },

  /* ---- Faridabad – Puri ---- */
  'puri-anand-vilas':  { label: 'Puri Anand Vilas',          file: '../brochure/Puri anand vilas.pdf' },
  'puri-pranayam':     { label: 'Puri Pranayam',             file: '../brochure/puri pranayam.pdf' },
  'puri-vip-floor':    { label: 'Puri VIP Floor',            file: '../brochure/puri vip floor.pdf' },

  /* ---- Faridabad – Others ---- */
  'park-land-pride':   { label: 'Park Land Pride',           file: '../brochure/park land pride.pdf' },
  'palm-residency':    { label: 'Palm Residency',            file: '../brochure/palm residency.pdf' },

  /* ---- Gurugram / Sohna ---- */
  'adore-happy-homes': { label: 'Adore Happy Homes Pride',   file: '../brochure/Adore Happy Homes Pride Brochure.pdf' },
  'spr-imperial':      { label: 'SPR Imperial Estate',       file: '../brochure/spr-inperial estate.pdf' },

  /* ---- Palwal / NCR ---- */
  'terra-lavinium':    { label: 'Terra Lavinium',            file: '../brochure/Terra Lavinium Brochure.pdf' },

  /* ---- Newly Added Brochures ---- */
  'adore-arpnaam':             { label: 'Adore Arpnaam',             file: '../brochure/Adore Arpnaam sector 83.pdf' },
  'adore-broadway':            { label: 'Adore Broadway',            file: '../brochure/Adore Broadway sector 78.pdf' },
  'amolik-plaza-81':           { label: 'Amolik Plaza 81',           file: '../brochure/Amolik Plaza 81 sector 81.pdf' },
  'ansal-crown':               { label: 'Ansal Crown',               file: '../brochure/Ansal Crown sector 80.pdf' },
  'bptp-discovery-park-phase-1': { label: 'BPTP Discovery Park Phase 1', file: '../brochure/BPTP Discovery Park Phase 1 (2&3 BHK) sector 80.pdf' },
  'bptp-elite-premium':        { label: 'BPTP Elite Premium',        file: '../brochure/BPTP Elite Premium sector 84.pdf' },
  'bptp-sky-nest':             { label: 'BPTP Sky Nest (3&4 BHK)',   file: '../brochure/BPTP Sky Nest (3&4 BHK) sector 80.pdf' },
  'capital-sco':               { label: 'Capital SCO',               file: '../brochure/Capital SCO sector 79.pdf' },
  'godrej-retreat':            { label: 'Godrej Retreat',            file: '../brochure/Godrej Retreat sector 83.pdf' },
  'habitat-78':                { label: 'Habitat 2/3 BHK',           file: '../brochure/Habitat 2 3 BHK sector 78.pdf' },
  'habitat-residences':        { label: 'Habitat Residences',        file: '../brochure/Habitat Residences sector 78.pdf' },
  'habitat-sector-78':         { label: 'Habitat Sector 78',         file: '../brochure/Habitat Sector 78.pdf' },
  'hi-fun-mall':               { label: 'Hi Fun Mall',               file: '../brochure/Hi Fun Mall sector 79.pdf' },
  'omaxe-royal-residency':     { label: 'OMAXE Royal Residency',     file: '../brochure/OMAXE Royal Residency sector 79.pdf' },
  'omaxe-spa-village':         { label: 'OMAXE Spa Village',         file: '../brochure/OMAXE Spa Village sector 78.pdf' },
  'omaxe-sun':                 { label: 'OMAXE Sun',                 file: '../brochure/OMAXE Sun sector 79.pdf' },
  'puri-81-business-hub':      { label: 'Puri 81 Business Hub',      file: '../brochure/Puri 81 Business Hub sector 81.pdf' },
  'puri-81-high-street-mall':  { label: 'Puri 81 High Street Mall',  file: '../brochure/Puri 81 High Street Mall sector 81.pdf' },
  'puri-pratham':              { label: 'Puri Pratham',              file: '../brochure/Puri Pratham sector 84.pdf' },
  'universal-sco-auric':       { label: 'Universal SCO (Auric)',     file: '../brochure/Universal SCO (Auric) sector 79.pdf' },
  'vipul-plaza':               { label: 'Vipul Plaza',               file: '../brochure/Vipul Plaza sector 81.pdf' },
  'navraj-the-marq-e':         { label: 'Navraj The Marq E',          file: '../brochure/navraj_the_marq_e_brochure.pdf' },
  'the-wisterias-rps':          { label: 'The Wisteria\'s (RPS)',      file: '../brochure/The_Wisterias_rps.pdf' },
  'bhumika-the-icon':          { label: 'Bhumika The Icon',          file: '../brochure/bhumika_brochure.pdf' },
  'bhumika-nh2':               { label: 'Bhumika Residential Enclave', file: '../brochure/bhumika_brochure.pdf' },
  'bhumika':                   { label: 'Bhumika Group Projects',    file: '../brochure/bhumika_brochure.pdf' },
  'rps-palm-drive':            { label: 'RPS Palm Drive',            file: '../brochure/rps_palm_drive_sector_88.pdf' },
  'rps-palm':                  { label: 'RPS Palm',                  file: '../brochure/rps_palm_sector_88.pdf' },
  'tdi-soha-sco':              { label: 'TDI Soha SCO',              file: '../brochure/tdi_soha_sco_sector_88.pdf' },

  /* ---- Location-level fallback groups ---- */
  'faridabad': [
    { label: 'BPTP Floors',         file: '../brochure/bptp floors 1.pdf' },
    { label: 'BPTP Park Floor 2',   file: '../brochure/bptp park floor 2.pdf' },
    { label: 'BPTP Park 81',        file: '../brochure/BPTP Park 81.pdf' },
    { label: 'BPTP Eden Estate',    file: '../brochure/BPTP Eden estate plot.pdf' },
    { label: 'BPTP Resort',         file: '../brochure/bptp resort.pdf' },
    { label: 'KLJ Platinum',        file: '../brochure/Klj Platinum.pdf' },
    { label: 'KLJ Platinum Height', file: '../brochure/klj platinum height.pdf' },
    { label: 'KLJ Greens',          file: '../brochure/klj greens.pdf' },
    { label: 'Puri Anand Vilas',    file: '../brochure/Puri anand vilas.pdf' },
    { label: 'Puri Pranayam',       file: '../brochure/puri pranayam.pdf' },
    { label: 'Puri VIP Floor',      file: '../brochure/puri vip floor.pdf' },
    { label: 'Park Land Pride',     file: '../brochure/park land pride.pdf' },
    { label: 'Palm Residency',      file: '../brochure/palm residency.pdf' },
  ],
  'gurugram': [
    { label: 'Adore Happy Homes Pride', file: '../brochure/Adore Happy Homes Pride Brochure.pdf' },
    { label: 'SPR Imperial Estate',     file: '../brochure/spr-inperial estate.pdf' },
  ],
  'sohna': [
    { label: 'Adore Happy Homes Pride', file: '../brochure/Adore Happy Homes Pride Brochure.pdf' },
    { label: 'SPR Imperial Estate',     file: '../brochure/spr-inperial estate.pdf' },
  ],
  'palwal': [
    { label: 'Terra Lavinium',          file: '../brochure/Terra Lavinium Brochure.pdf' },
    { label: 'Palm Residency',          file: '../brochure/palm residency.pdf' },
  ],
  'matrabhumi': [
    { label: 'Matrabhumi Brochure',     file: '../brochure/BPTP Park 81.pdf' }, // closest match
  ],
};

/**
 * Download a real brochure PDF for the given project/developer key.
 * If the key maps to a single brochure, download it directly.
 * If the key maps to multiple brochures (array), show a picker modal.
 */
function downloadBrochure(projectKey) {
  // Normalise key: lowercase, spaces → hyphens
  const key = (projectKey || '').toLowerCase().replace(/\s+/g, '-');
  const entry = BROCHURE_CATALOG[key];

  if (!entry) {
    if (window.showToast) window.showToast('Brochure not available for this project yet.');
    return;
  }

  if (Array.isArray(entry)) {
    // Multiple brochures – show a picker
    showBrochurePicker(entry, key);
  } else {
    // Single brochure – download directly
    triggerBrochureDownload(entry.file, entry.label);
  }
}
window.downloadBrochure = downloadBrochure;

/**
 * Directly trigger a PDF download via a hidden <a> tag.
 * @param {string} filePath  - Relative path to the PDF
 * @param {string} label     - Display label / filename hint
 */
function triggerBrochureDownload(filePath, label) {
  if (window.showToast) window.showToast(`Downloading: ${label}…`);

  const link = document.createElement('a');
  link.href = filePath;
  link.download = label.replace(/[^a-z0-9\s\-]/gi, '') + '.pdf';
  link.target  = '_blank';       // open in new tab as fallback
  link.rel     = 'noopener';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Show a lightweight modal listing multiple brochures so the user
 * can pick which one to download.
 */
function showBrochurePicker(brochures, groupLabel) {
  // Remove any previous picker
  const existing = document.getElementById('brochure-picker-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'brochure-picker-modal';
  modal.style.cssText = `
    position:fixed;inset:0;z-index:9999;
    background:rgba(0,0,0,.65);backdrop-filter:blur(4px);
    display:flex;align-items:center;justify-content:center;padding:20px;
  `;

  const rows = brochures.map((b, i) => `
    <button class="brochure-picker-row" data-index="${i}"
      style="display:flex;align-items:center;gap:12px;width:100%;
             padding:12px 16px;margin-bottom:8px;border:1px solid rgba(255,255,255,.12);
             border-radius:8px;background:rgba(255,255,255,.05);color:inherit;
             cursor:pointer;text-align:left;transition:background .2s;">
      <svg style="width:20px;height:20px;flex-shrink:0;fill:var(--accent-color,#d4a843)" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 7V3.5L18.5 9H13zm-3 7l-3-3 1.4-1.4L10 14.2l4.6-4.6L16 11l-6 6z"/>
      </svg>
      <span style="font-size:.95rem;">${b.label}</span>
    </button>
  `).join('');

  modal.innerHTML = `
    <div style="background:var(--card-bg,#1a2535);border:1px solid rgba(255,255,255,.12);
                border-radius:16px;padding:30px;max-width:460px;width:100%;
                box-shadow:0 24px 64px rgba(0,0,0,.5);">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
        <h3 style="margin:0;font-size:1.1rem;">Select a Brochure</h3>
        <button id="brochure-picker-close"
          style="background:none;border:none;cursor:pointer;color:inherit;padding:4px;">
          <svg style="width:22px;height:22px;fill:currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>
      <div id="brochure-picker-list">${rows}</div>
    </div>
  `;

  document.body.appendChild(modal);

  // Close handlers
  document.getElementById('brochure-picker-close').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });

  // Download on row click
  modal.querySelectorAll('.brochure-picker-row').forEach(btn => {
    btn.addEventListener('mouseenter', () => btn.style.background = 'rgba(255,255,255,.1)');
    btn.addEventListener('mouseleave', () => btn.style.background = 'rgba(255,255,255,.05)');
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index, 10);
      const b = brochures[idx];
      modal.remove();
      triggerBrochureDownload(b.file, b.label);
    });
  });
}

/**
 * Handle custom project URL sharing on WhatsApp
 */
function shareProject(projectName) {
  const shareText = `Check out this premium plotted development opportunity "${projectName.toUpperCase()}" by Homage Infratech (Est. 2005). Clear title deeds and secure investment. Details: `;
  const shareUrl = encodeURIComponent(window.location.href);
  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}${shareUrl}`;
  window.open(waUrl, '_blank');
}
window.shareProject = shareProject;

/**
 * Dynamic Project Search Filtering
 */
function initProjectSearch() {
  const searchInput = document.getElementById('project-search-input');
  if (!searchInput) return;

  const projectCards = document.querySelectorAll('.projects-grid .project-card');
  const gridContainer = document.querySelector('.projects-grid');

  // Create a No Results message element
  const noResultsMsg = document.createElement('div');
  noResultsMsg.className = 'no-results-msg hidden';
  noResultsMsg.innerHTML = `
    <svg style="width: 48px; height: 48px; margin: 0 auto 15px auto; display: block; fill: var(--text-white-muted);" viewBox="0 0 24 24">
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
    <h4>No Projects Found</h4>
    <p>We couldn't find any projects matching "<strong><span id="search-term-display"></span></strong>". Try searching for another location or type.</p>
  `;
  gridContainer.appendChild(noResultsMsg);

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    projectCards.forEach(card => {
      // Extract details
      const title = card.querySelector('h3') ? card.querySelector('h3').textContent.toLowerCase() : '';
      const loc = card.querySelector('.project-card-loc') ? card.querySelector('.project-card-loc').textContent.toLowerCase() : '';
      const desc = card.querySelector('.project-card-desc') ? card.querySelector('.project-card-desc').textContent.toLowerCase() : '';
      const badge = card.querySelector('.project-type-badge') ? card.querySelector('.project-type-badge').textContent.toLowerCase() : '';

      if (title.includes(query) || loc.includes(query) || desc.includes(query) || badge.includes(query)) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (visibleCount === 0) {
      const termDisplay = document.getElementById('search-term-display');
      if (termDisplay) termDisplay.textContent = searchInput.value;
      noResultsMsg.classList.remove('hidden');
    } else {
      noResultsMsg.classList.add('hidden');
    }
  });

  // Handle URL query parameter ?search=QUERY
  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get('search');
  if (searchParam) {
    searchInput.value = searchParam;
    searchInput.dispatchEvent(new Event('input'));
  }
}
