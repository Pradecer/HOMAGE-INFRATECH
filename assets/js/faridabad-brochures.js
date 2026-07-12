/**
 * HOMAGE INFRATECH – FARIDABAD SECTOR PAGE BROCHURES
 * 
 * Brochure catalog specific to the faridabad/sector-XX sub-pages.
 * Paths are relative from ../../brochure/ (two levels up from sector pages).
 */
const FARIDABAD_BROCHURE_CATALOG = {
  /* ---- BPTP ---- */
  'bptp-floors':        { label: 'BPTP Floors (Vol 1)',      file: '../../brochure/bptp floors 1.pdf' },
  'bptp-park-floor':    { label: 'BPTP Park Floor (Vol 2)',  file: '../../brochure/bptp park floor 2.pdf' },
  'bptp-park-81':       { label: 'BPTP Park 81',             file: '../../brochure/BPTP Park 81.pdf' },
  'bptp-eden-estate-plot':{ label: 'BPTP Eden Estate Plot',  file: '../../brochure/BPTP Eden estate plot.pdf' },
  'bptp-resort':        { label: 'BPTP Resort',              file: '../../brochure/bptp resort.pdf' },

  /* ---- KLJ ---- */
  'klj-platinum':       { label: 'KLJ Platinum',             file: '../../brochure/Klj Platinum.pdf' },
  'klj-platinum-height':{ label: 'KLJ Platinum Height',      file: '../../brochure/klj platinum height.pdf' },
  'klj-greens':         { label: 'KLJ Greens',               file: '../../brochure/klj greens.pdf' },
  'klj-jalwayu-vihar':  { label: 'KLJ Greens',               file: '../../brochure/klj greens.pdf' },

  /* ---- Puri ---- */
  'puri-anand-villa':   { label: 'Puri Anand Vilas',         file: '../../brochure/Puri anand vilas.pdf' },
  'puri-anand-vilas':   { label: 'Puri Anand Vilas',         file: '../../brochure/Puri anand vilas.pdf' },
  'puri-pranayam':      { label: 'Puri Pranayam',            file: '../../brochure/puri pranayam.pdf' },
  'puri-vip-floor':     { label: 'Puri VIP Floor',           file: '../../brochure/puri vip floor.pdf' },

  /* ---- Others ---- */
  'park-land-pride':    { label: 'Park Land Pride',          file: '../../brochure/park land pride.pdf' },
  'palm-residency':     { label: 'Palm Residency',           file: '../../brochure/palm residency.pdf' },
  'spr-imperial-estate':{ label: 'SPR Imperial Estate',      file: '../../brochure/spr-inperial estate.pdf' },

  /* ---- Group fallback ---- */
  'faridabad': [
    { label: 'BPTP Floors',          file: '../../brochure/bptp floors 1.pdf' },
    { label: 'BPTP Park Floor 2',    file: '../../brochure/bptp park floor 2.pdf' },
    { label: 'BPTP Park 81',         file: '../../brochure/BPTP Park 81.pdf' },
    { label: 'BPTP Eden Estate',     file: '../../brochure/BPTP Eden estate plot.pdf' },
    { label: 'BPTP Resort',          file: '../../brochure/bptp resort.pdf' },
    { label: 'KLJ Platinum',         file: '../../brochure/Klj Platinum.pdf' },
    { label: 'KLJ Platinum Height',  file: '../../brochure/klj platinum height.pdf' },
    { label: 'KLJ Greens',           file: '../../brochure/klj greens.pdf' },
    { label: 'Puri Anand Vilas',     file: '../../brochure/Puri anand vilas.pdf' },
    { label: 'Puri Pranayam',        file: '../../brochure/puri pranayam.pdf' },
    { label: 'Puri VIP Floor',       file: '../../brochure/puri vip floor.pdf' },
    { label: 'Park Land Pride',      file: '../../brochure/park land pride.pdf' },
    { label: 'Palm Residency',       file: '../../brochure/palm residency.pdf' },
  ],
};

/**
 * Override downloadBrochure for faridabad sector pages.
 * Uses FARIDABAD_BROCHURE_CATALOG with ../../brochure/ paths.
 */
(function overrideFaridabadDownload() {
  // Only override if we are inside a faridabad/sector-XX page
  if (!window.location.pathname.includes('/faridabad/')) return;

  window.downloadBrochure = function(projectKey) {
    const key = (projectKey || '').toLowerCase().replace(/\s+/g, '-');
    const entry = FARIDABAD_BROCHURE_CATALOG[key];

    if (!entry) {
      if (window.showToast) window.showToast('Brochure not available for this project yet.');
      return;
    }

    if (Array.isArray(entry)) {
      showFaridabadBrochurePicker(entry);
    } else {
      triggerFaridabadBrochureDownload(entry.file, entry.label);
    }
  };
})();

function triggerFaridabadBrochureDownload(filePath, label) {
  if (window.showToast) window.showToast('Downloading: ' + label + '\u2026');
  const link = document.createElement('a');
  link.href = filePath;
  link.download = label.replace(/[^a-z0-9\s\-]/gi, '') + '.pdf';
  link.target = '_blank';
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function showFaridabadBrochurePicker(brochures) {
  const existing = document.getElementById('brochure-picker-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'brochure-picker-modal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.65);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:20px;';

  const rows = brochures.map(function(b, i) {
    return '<button class="brochure-picker-row" data-index="' + i + '" style="display:flex;align-items:center;gap:12px;width:100%;padding:12px 16px;margin-bottom:8px;border:1px solid rgba(255,255,255,.12);border-radius:8px;background:rgba(255,255,255,.05);color:inherit;cursor:pointer;text-align:left;transition:background .2s;"><svg style="width:20px;height:20px;flex-shrink:0;fill:var(--accent-color,#d4a843)" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 7V3.5L18.5 9H13zm-3 7l-3-3 1.4-1.4L10 14.2l4.6-4.6L16 11l-6 6z"/></svg><span style="font-size:.95rem;">' + b.label + '</span></button>';
  }).join('');

  modal.innerHTML = '<div style="background:var(--card-bg,#1a2535);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:30px;max-width:460px;width:100%;box-shadow:0 24px 64px rgba(0,0,0,.5);"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;"><h3 style="margin:0;font-size:1.1rem;">Select a Brochure</h3><button id="brochure-picker-close" style="background:none;border:none;cursor:pointer;color:inherit;padding:4px;"><svg style="width:22px;height:22px;fill:currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button></div><div id="brochure-picker-list">' + rows + '</div></div>';

  document.body.appendChild(modal);

  document.getElementById('brochure-picker-close').addEventListener('click', function() { modal.remove(); });
  modal.addEventListener('click', function(e) { if (e.target === modal) modal.remove(); });

  modal.querySelectorAll('.brochure-picker-row').forEach(function(btn) {
    btn.addEventListener('mouseenter', function() { btn.style.background = 'rgba(255,255,255,.1)'; });
    btn.addEventListener('mouseleave', function() { btn.style.background = 'rgba(255,255,255,.05)'; });
    btn.addEventListener('click', function() {
      var idx = parseInt(btn.dataset.index, 10);
      modal.remove();
      triggerFaridabadBrochureDownload(brochures[idx].file, brochures[idx].label);
    });
  });
}
