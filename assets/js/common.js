/* ==========================================================================
   HOMAGE INFRATECH - GLOBAL JAVASCRIPT
   Est. 2005 | Faridabad, Haryana
   ========================================================================== */

/**
 * Centralized function to resolve relative path prefix depending on current page depth.
 */
function getPathPrefix() {
  const pathname = window.location.pathname;
  // If we are inside any subdirectory under /faridabad/ (e.g. /faridabad/sector-88/ or /faridabad/navraj-the-marq-e/)
  if (pathname.match(/\/faridabad\/[^\/]+\//)) {
    return '../../';
  } else if (
    pathname.includes('/about-us/') ||
    pathname.includes('/contact-us/') ||
    pathname.includes('/gallery/') ||
    pathname.includes('/projects/') ||
    pathname.includes('/testimonials/') ||
    pathname.includes('/faridabad/')
  ) {
    return '../';
  }
  return '';
}
window.getPathPrefix = getPathPrefix;

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initStickyHeader();
  initActiveLink();
  initContactQueryPrefill();
  initPriceLinks();
  initScrollAnimations();
  initOnloadPopup();
  initNavSearch();
  initCardCarousels();
});

/**
 * Mobile Navbar Toggle and Dropdown / Submenu Handlers
 */
function initNavbar() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isActive = hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      
      // Prevent scrolling when mobile menu is open
      if (isActive) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
        // Close all mobile dropdowns when mobile menu closes
        document.querySelectorAll('.nav-dropdown-wrap.active, .nav-submenu-wrap.active').forEach(wrap => {
          wrap.classList.remove('active');
        });
      }
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        document.querySelectorAll('.nav-dropdown-wrap.active, .nav-submenu-wrap.active').forEach(wrap => {
          wrap.classList.remove('active');
        });
      }
    });

    // Close menu when clicking a normal nav link (excluding dropdown triggers)
    const normalLinks = document.querySelectorAll('.nav-menu a:not(.nav-link-dropdown):not(.nav-submenu-title)');
    normalLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        // Close all mobile dropdowns
        document.querySelectorAll('.nav-dropdown-wrap.active, .nav-submenu-wrap.active').forEach(wrap => {
          wrap.classList.remove('active');
        });
      });
    });

    // Mobile click/tap toggle for Dropdown menus and Submenus
    const dropdownToggles = document.querySelectorAll('.nav-dropdown-wrap > .nav-link-dropdown, .nav-submenu-wrap > .nav-submenu-title');
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();
          
          const parent = toggle.parentElement;
          
          // Close sibling menus
          const siblings = parent.parentElement.children;
          for (let sibling of siblings) {
            if (sibling !== parent) {
              sibling.classList.remove('active');
              sibling.querySelectorAll('.nav-submenu-wrap.active').forEach(subWrap => {
                subWrap.classList.remove('active');
              });
            }
          }
          
          // Toggle current parent
          parent.classList.toggle('active');
        }
      });
    });
  }
}

/**
 * Sticky Header Transition
 */
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    
    // Initial check
    handleScroll();
    window.addEventListener('scroll', handleScroll);
  }
}

/**
 * Highlight active link in Navbar and Footer
 */
function initActiveLink() {
  const bodyPage = document.body.getAttribute('data-page');
  if (bodyPage) {
    const navLinks = document.querySelectorAll(`.nav-link[data-link="${bodyPage}"]`);
    navLinks.forEach(link => {
      link.classList.add('active');
    });
  }
}

/**
 * Pre-fill contact form fields from URL query parameters (e.g. ?project=matrabhumi)
 */
function initContactQueryPrefill() {
  const messageInput = document.getElementById('contact-message');
  const interestInput = document.getElementById('contact-interest');
  
  if (!messageInput && !interestInput) return; // Not on contact page
  
  const urlParams = new URLSearchParams(window.location.search);
  const project = urlParams.get('project');
  const interest = urlParams.get('interest');
  
  if (project) {
    // Format project name: convert hyphens to spaces, title case, uppercase abbreviations
    const formattedProject = project
      .split('-')
      .map(word => {
        const lower = word.toLowerCase();
        if (['bptp', 'klj', 'ncr', 'rera', 'sco', 'roi', 'pa', 'pb', 'pc', 'pd', 'pe'].includes(lower)) {
          return word.toUpperCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');

    if (messageInput) {
      messageInput.value = `I am interested in acquiring a plot at the "${formattedProject}" project. Please share pricing, availability, and layout details.`;
    }
  }
  
  if (interest && interestInput) {
    interestInput.value = interest;
  }
}

/**
 * Scroll and Counter Animations
 */
function initScrollAnimations() {
  // 1. Counter Stat Numbers (e.g. on About page)
  const stats = document.querySelectorAll('.stat-number');
  
  if (stats.length > 0) {
    const animateCounter = (el) => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      let count = 0;
      const speed = 2000 / target; // Target animation time ~2 seconds
      
      const updateCount = () => {
        // Increment step based on target size
        const increment = Math.ceil(target / 100);
        if (count < target) {
          count += increment;
          if (count > target) count = target;
          el.innerText = count + suffix;
          setTimeout(updateCount, Math.max(speed, 15));
        } else {
          el.innerText = target + suffix;
        }
      };
      updateCount();
    };
    
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target); // Animate once
        }
      });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => statsObserver.observe(stat));
  }
  
  // 2. Generic Reveal-on-Scroll animations
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    
    revealElements.forEach(el => revealObserver.observe(el));
  }
}

/**
 * Show a success notification toast
 */
function showToast(message) {
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  const toastHTML = `
    <div class="toast">
      <div class="toast-success-icon">✓</div>
      <div class="toast-message">${message}</div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', toastHTML);
  const toast = document.querySelector('.toast');
  
  // Trigger animation
  setTimeout(() => {
    toast.classList.add('active');
  }, 100);
  
  // Auto-hide after 4 seconds
  setTimeout(() => {
    toast.classList.remove('active');
    setTimeout(() => {
      toast.remove();
    }, 500);
  }, 4000);
}
window.showToast = showToast; // Make globally accessible

/**
 * Initialize 5-second delayed onload enquiry popup modal
 */
function initOnloadPopup() {
  // If we are on the contact-us page, don't show the popup
  if (window.location.pathname.includes('/contact-us/')) {
    return;
  }
  
  setTimeout(() => {
    // Check if shown in this session
    if (sessionStorage.getItem('onload_popup_shown')) {
      return;
    }
    
    // Check path prefix to resolve logo.png path
    const pathPrefix = getPathPrefix();
    
    // Construct HTML with ARIA role and dialog attributes
    const popupHTML = `
      <div id="onload-popup" class="modal" role="dialog" aria-modal="true" aria-labelledby="onload-popup-title">
        <div class="modal-content" style="max-width: 420px; overflow: hidden; border-radius: var(--border-radius-lg);">
          <button class="modal-close" id="close-onload-popup" aria-label="Close popup">
            <svg viewBox="0 0 24 24" style="width: 14px; height: 14px; fill: currentColor;"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          </button>
          <div class="modal-header" style="text-align: center; border-bottom: none; padding: 35px 30px 10px 30px;">
            <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin: 0 auto 15px auto; width: max-content;">
              <img src="${pathPrefix}assets/images/logo.png" alt="Homage Infratech Logo" style="height: 52px; width: 52px; border-radius: 50%; border: 2px solid var(--accent-color); object-fit: cover;">
              <div style="text-align: left; font-weight: 800; font-size: 1.3rem; letter-spacing: -0.02em; color: var(--primary-dark); display: flex; flex-direction: column; line-height: 1.1;">
                HOMAGE
                <span style="font-size: 0.65rem; font-weight: 600; color: var(--accent-color); text-transform: uppercase; letter-spacing: 0.1em; margin-top: 2px;">INFRATECH</span>
              </div>
            </div>
            <h3 id="onload-popup-title" style="color: var(--primary-dark); font-weight: 700; font-size: 1.4rem;">Exclusive Plot Deals</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 5px;">Enquire today to receive pricing layout brochures.</p>
          </div>
          <div class="modal-body" style="padding: 10px 30px 35px 30px;">
            <form id="onload-popup-form" novalidate>
              <div class="form-group" style="margin-bottom: 20px;">
                <label class="form-label" style="font-size: 0.75rem; font-weight: 600; color: var(--primary-dark); display: block; margin-bottom: 5px; text-transform: uppercase;">Name *</label>
                <input type="text" id="popup-name" class="form-control" placeholder="Enter your full name" style="padding: 11px 14px; font-size: 0.9rem;" required>
                <span class="error-message" style="font-size: 0.7rem; margin-top: 4px;"></span>
              </div>
              <div class="form-group" style="margin-bottom: 20px;">
                <label class="form-label" style="font-size: 0.75rem; font-weight: 600; color: var(--primary-dark); display: block; margin-bottom: 5px; text-transform: uppercase;">Phone No. *</label>
                <input type="tel" id="popup-phone" class="form-control" placeholder="10-digit mobile number" style="padding: 11px 14px; font-size: 0.9rem;" required>
                <span class="error-message" style="font-size: 0.7rem; margin-top: 4px;"></span>
              </div>
              <div class="form-group" style="margin-bottom: 20px;">
                <label class="form-label" style="font-size: 0.75rem; font-weight: 600; color: var(--primary-dark); display: block; margin-bottom: 5px; text-transform: uppercase;">Email Address *</label>
                <input type="email" id="popup-email" class="form-control" placeholder="name@domain.com" style="padding: 11px 14px; font-size: 0.9rem;" required>
                <span class="error-message" style="font-size: 0.7rem; margin-top: 4px;"></span>
              </div>
              <div class="form-submit-wrap" style="margin-top: 25px;">
                <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px; font-size: 0.95rem;">Send Inquiry</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', popupHTML);
    const popup = document.getElementById('onload-popup');
    const closeBtn = document.getElementById('close-onload-popup');
    const form = document.getElementById('onload-popup-form');
    
    if (popup) {
      popup.classList.add('active');
      document.body.style.overflow = 'hidden';
      sessionStorage.setItem('onload_popup_shown', 'true');
    }
    
    // Close functions
    const closePopup = () => {
      popup.classList.remove('active');
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handlePopupEsc);
      setTimeout(() => popup.remove(), 400);
    };

    const handlePopupEsc = (e) => {
      if (e.key === 'Escape') {
        closePopup();
      }
    };
    document.addEventListener('keydown', handlePopupEsc);
    
    if (closeBtn) {
      closeBtn.addEventListener('click', closePopup);
    }
    
    if (popup) {
      popup.addEventListener('click', (e) => {
        if (e.target === popup) closePopup();
      });
    }
    
    // Form field validators
    const nameInput = document.getElementById('popup-name');
    const phoneInput = document.getElementById('popup-phone');
    const emailInput = document.getElementById('popup-email');
    
    const validateField = (input, validationFn, errorMsg) => {
      const val = input.value;
      const isValid = validationFn(val);
      const errSpan = input.nextElementSibling;
      if (!isValid) {
        input.classList.add('error');
        if (errSpan) errSpan.innerText = errorMsg;
      } else {
        input.classList.remove('error');
        if (errSpan) errSpan.innerText = '';
      }
      return isValid;
    };
    
    if (nameInput) nameInput.addEventListener('input', () => validateField(nameInput, val => val.trim().length > 1, "Name required (min 2 chars)"));
    if (phoneInput) phoneInput.addEventListener('input', () => validateField(phoneInput, val => /^[6-9]\d{9}$/.test(val.replace(/\D/g, '')), "Valid 10-digit number required"));
    if (emailInput) emailInput.addEventListener('input', () => validateField(emailInput, val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), "Valid email required"));
    
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const isNameValid = validateField(nameInput, val => val.trim().length > 1, "Name required (min 2 chars)");
        const isPhoneValid = validateField(phoneInput, val => /^[6-9]\d{9}$/.test(val.replace(/\D/g, '')), "Valid 10-digit number required");
        const isEmailValid = validateField(emailInput, val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), "Valid email required");
        
        if (isNameValid && isPhoneValid && isEmailValid) {
          const submitBtn = form.querySelector('button[type="submit"]');
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerText = "Sending Inquiry...";
          }
          
          const leadData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.replace(/\D/g, ''),
            interest: 'Homepage Popup',
            message: 'Inquiry submitted from homepage popup modal',
            timestamp: new Date().toISOString()
          };
          
          const formData = new FormData();
          formData.append('full_name', leadData.name);
          formData.append('phone_number', leadData.phone);
          formData.append('email', leadData.email);
          formData.append('plot_interest', leadData.interest);
          formData.append('message', leadData.message);
          formData.append('ajax', '1');

          // Send to database (send_inquiry.php)
          fetch(getSendInquiryUrl(), {
            method: 'POST',
            body: formData
          })
          .then(res => res.json())
          .then(data => console.log('Popup inquiry saved:', data))
          .catch(err => console.error('Error submitting popup to DB:', err))
          .finally(() => {
            // Log lead to localStorage
            let leads = [];
            try {
              leads = JSON.parse(localStorage.getItem('homage_leads') || '[]');
            } catch (err) {
              leads = [];
            }
            leads.push(leadData);
            localStorage.setItem('homage_leads', JSON.stringify(leads));
            localStorage.setItem('homage_user_name', leadData.name);
            localStorage.setItem('homage_user_email', leadData.email);
            localStorage.setItem('homage_user_phone', leadData.phone);
            
            closePopup();
            showToast("Inquiry submitted! Our advisor will call you shortly.");
          });
        }
      });
    }
  }, 5000);
}

/**
 * Global Navigation Search Bar Logic
 */
function initNavSearch() {
  const searchInputs = document.querySelectorAll('.nav-search-input');
  
  const allProjects = [
    // Sector 72-73 Residential Projects
    { name: "Adore Prime 1", url: "faridabad/sector-72-73-residential/index.html#adore-prime-1", keywords: ["adore", "prime", "prime 1", "adore prime 1", "sector 72", "sector 73", "sector 72-73"] },
    { name: "Adore Prime 2", url: "faridabad/sector-72-73-residential/index.html#adore-prime-2", keywords: ["adore", "prime", "prime 2", "adore prime 2", "sector 72", "sector 73", "sector 72-73"] },

    { name: "BPTP Resort", url: "faridabad/sector-75/index.html#bptp-resort", keywords: ["resort", "bptp resort", "sector 75", "luxury"] },
    { name: "Adore Pride", url: "faridabad/sector-75/index.html#adore-pride", keywords: ["adore", "adore pride", "pride", "sector 75"] },
    { name: "Terra Lavinium", url: "faridabad/sector-75/index.html#terra-lavinium", keywords: ["terra", "lavinium", "terra lavinium", "sector 75"] },
    { name: "P Blocks BPTP", url: "faridabad/sector-75/index.html#bptp-block-p", keywords: ["block p", "p block", "bptp p", "sector 75"] },
    { name: "Q Blocks BPTP", url: "faridabad/sector-75/index.html#bptp-block-q", keywords: ["block q", "q block", "bptp q", "sector 75"] },
    { name: "R Blocks BPTP", url: "faridabad/sector-75/index.html#bptp-block-r", keywords: ["block r", "r block", "bptp r", "sector 75"] },
    { name: "S Blocks BPTP", url: "faridabad/sector-75/index.html#bptp-block-s", keywords: ["block s", "s block", "bptp s", "sector 75"] },
    { name: "T Blocks BPTP", url: "faridabad/sector-75/index.html#bptp-block-t", keywords: ["block t", "t block", "bptp t", "sector 75"] },
    { name: "Palm Residency", url: "faridabad/sector-76/index.html#palm-residency", keywords: ["palm", "residency", "palm residency", "sector 76"] },
    { name: "Park Floors 2", url: "faridabad/sector-76/index.html#park-floors-2", keywords: ["park floors", "floors 2", "park floors 2", "sector 76"] },
    { name: "U Blocks BPTP", url: "faridabad/sector-76/index.html#bptp-block-u", keywords: ["block u", "u block", "bptp u", "sector 76"] },
    { name: "V Blocks BPTP", url: "faridabad/sector-76/index.html#bptp-block-v", keywords: ["block v", "v block", "bptp v", "sector 76"] },
    { name: "W Blocks BPTP", url: "faridabad/sector-76/index.html#bptp-block-w", keywords: ["block w", "w block", "bptp w", "sector 76"] },
    { name: "X Blocks BPTP", url: "faridabad/sector-76/index.html#bptp-block-x", keywords: ["block x", "x block", "bptp x", "sector 76"] },
    { name: "Y Blocks BPTP", url: "faridabad/sector-76/index.html#bptp-block-y", keywords: ["block y", "y block", "bptp y", "sector 76"] },
    { name: "BPTP Park Land Pride", url: "faridabad/sector-77/index.html#bptp-park-land-pride", keywords: ["park land", "park land pride", "bptp park land", "sector 77"] },
    { name: "Pride Floors", url: "faridabad/sector-77/index.html#pride-floors", keywords: ["pride floors", "floors", "pride", "sector 77"] },
    { name: "PA Blocks BPTP", url: "faridabad/sector-77/index.html#bptp-block-pa", keywords: ["block pa", "pa block", "bptp pa", "sector 77"] },
    { name: "PB Blocks BPTP", url: "faridabad/sector-77/index.html#bptp-block-pb", keywords: ["block pb", "pb block", "bptp pb", "sector 77"] },
    { name: "PC Blocks BPTP", url: "faridabad/sector-77/index.html#bptp-block-pc", keywords: ["block pc", "pc block", "bptp pc", "sector 77"] },
    { name: "PD Blocks BPTP", url: "faridabad/sector-77/index.html#bptp-block-pd", keywords: ["block pd", "pd block", "bptp pd", "sector 77"] },
    { name: "PE Blocks BPTP", url: "faridabad/sector-77/index.html#bptp-block-pe", keywords: ["block pe", "pe block", "bptp pe", "sector 77"] },
    { name: "KLJ Platinum Height", url: "faridabad/sector-77/index.html#klj-platinum-height", keywords: ["klj", "platinum", "height", "klj platinum", "sector 77"] },
    { name: "KLJ Green", url: "faridabad/sector-77/index.html#klj-green", keywords: ["klj green", "green", "klj", "sector 77"] },
    { name: "KLJ Platinum Floors", url: "faridabad/sector-77/index.html#klj-platinum-floors", keywords: ["klj floors", "platinum floors", "klj platinum floors", "sector 77"] },
    { name: "KLJ JALWAYU Vihar", url: "faridabad/sector-77/index.html#klj-jalwayu-vihar", keywords: ["jalwayu", "jalwayu vihar", "klj jalwayu", "sector 77"] },
    
    // Sector 78 Projects
    { name: "Habitat 2/3 BHK", url: "faridabad/sector-78/index.html#habitat-2-3-bhk", keywords: ["habitat", "habitat 2/3", "sector 78", "residences"] },
    { name: "Habitat Residences", url: "faridabad/sector-78/index.html#habitat-residences", keywords: ["habitat residences", "residences", "sector 78"] },
    { name: "Habitat Sector 78", url: "faridabad/sector-78/index.html#habitat-sector-78", keywords: ["habitat sector 78", "habitat 78", "sector 78"] },
    { name: "Adore Broadway", url: "faridabad/sector-78/index.html#adore-broadway", keywords: ["adore", "broadway", "adore broadway", "sector 78"] },
    
    // Sector 79 Projects
    { name: "World Street SCO", url: "faridabad/sector-79-commercial/index.html#world-street-sco", keywords: ["world street", "sco", "world street sco", "sector 79"] },
    { name: "OMAXE Sun", url: "faridabad/sector-79-commercial/index.html#omaxe-sun", keywords: ["omaxe", "sun", "omaxe sun", "sector 79"] },
    { name: "Hi Fun Mall", url: "faridabad/sector-79-commercial/index.html#hi-fun-mall", keywords: ["hi fun", "mall", "hi fun mall", "sector 79"] },
    { name: "Universal SCO (Auric)", url: "faridabad/sector-79-commercial/index.html#universal-sco-auric", keywords: ["universal", "sco", "auric", "sector 79"] },
    { name: "Capital SCO", url: "faridabad/sector-79-commercial/index.html#capital-sco", keywords: ["capital", "sco", "capital sco", "sector 79"] },

    // Sector 80 Projects
    { name: "BPTP Sky Nest (3&4 BHK)", url: "faridabad/sector-80/index.html#bptp-sky-nest", keywords: ["bptp", "sky nest", "sky", "nest", "sector 80"] },
    { name: "BPTP Discovery Park Phase 1 (2&3 BHK)", url: "faridabad/sector-80/index.html#bptp-discovery-park-phase-1", keywords: ["discovery", "park", "discovery park", "phase 1", "sector 80"] },
    { name: "BPTP Discovery Park Phase 2 (Duplex)", url: "faridabad/sector-80/index.html#bptp-discovery-park-phase-2", keywords: ["discovery", "park", "discovery park", "phase 2", "duplex", "sector 80"] },
    { name: "Z Block BPTP", url: "faridabad/sector-80/index.html#bptp-block-z", keywords: ["block z", "z block", "bptp z", "sector 80"] },
    { name: "Ansal Crown", url: "faridabad/sector-80/index.html#ansal-crown", keywords: ["ansal", "crown", "ansal crown", "sector 80"] },

    // Sector 81 Projects
    { name: "Puri Anand Villa", url: "faridabad/sector-81/index.html#puri-anand-villa", keywords: ["puri", "anand", "villa", "anand villa", "sector 81"] },
    { name: "Puri 81 High Street Mall", url: "faridabad/sector-81-commercial/index.html#puri-81-high-street-mall", keywords: ["puri", "high street", "mall", "puri 81", "sector 81"] },
    { name: "Puri 81 Business Hub", url: "faridabad/sector-81-commercial/index.html#puri-81-business-hub", keywords: ["puri", "business", "hub", "business hub", "sector 81"] },
    { name: "BPTP Eden-Estate Plot", url: "faridabad/sector-81/index.html#bptp-eden-estate-plot", keywords: ["bptp", "eden", "estate", "eden estate", "sector 81"] },
    { name: "Puri VIP Floor", url: "faridabad/sector-81/index.html#puri-vip-floor", keywords: ["puri", "vip", "floor", "vip floor", "sector 81"] },
    { name: "BPTP Park 81", url: "faridabad/sector-81/index.html#bptp-park-81", keywords: ["bptp", "park", "park 81", "sector 81"] },
    { name: "BPTP District 81 (Block B)", url: "faridabad/sector-81/index.html#bptp-district-81-block-b", keywords: ["bptp", "district", "district 81", "block b", "sector 81"] },
    { name: "BPTP District 81 (Block C)", url: "faridabad/sector-81/index.html#bptp-district-81-block-c", keywords: ["bptp", "district", "district 81", "block c", "sector 81"] },
    { name: "Vipul Plaza", url: "faridabad/sector-81-commercial/index.html#vipul-plaza", keywords: ["vipul", "plaza", "vipul plaza", "sector 81"] },
    { name: "Amolik Plaza 81", url: "faridabad/sector-81-commercial/index.html#amolik-plaza-81", keywords: ["amolik", "plaza", "amolik plaza 81", "sector 81"] },

    // Sector 82 Projects
    { name: "Amolik Plaza 82", url: "faridabad/sector-82-commercial/index.html#amolik-plaza-82", keywords: ["amolik", "plaza", "amolik plaza 82", "sector 82"] },
    { name: "Mansha Vega Street", url: "faridabad/sector-82-commercial/index.html#mansha-vega-street", keywords: ["mansha", "vega", "street", "vega street", "sector 82"] },
    { name: "Florida-Auric", url: "faridabad/sector-82/index.html#florida-auric", keywords: ["florida", "auric", "florida auric", "sector 82"] },
    { name: "Puri Pranayam", url: "faridabad/sector-82/index.html#puri-pranayam", keywords: ["puri", "pranayam", "puri pranayam", "sector 82"] },
    { name: "SPR - Imperial Estate", url: "faridabad/sector-82/index.html#spr-imperial-estate", keywords: ["spr", "imperial", "estate", "imperial estate", "sector 82"] },
    { name: "BPTP N Block Plot & SCO", url: "faridabad/sector-82/index.html#bptp-n-block-plot-sco", keywords: ["bptp", "n block", "block n", "sco", "sector 82"] },

    // Sector 83 Projects
    { name: "Godrej Retreat", url: "faridabad/sector-83/index.html#godrej-retreat", keywords: ["godrej", "retreat", "godrej retreat", "sector 83", "plots"] },
    { name: "BPTP LM Block Plot", url: "faridabad/sector-83/index.html#bptp-lm-block", keywords: ["bptp", "lm block", "lm block plot", "sector 83"] },
    { name: "BPTP M Block Plot (Sector 83)", url: "faridabad/sector-83/index.html#bptp-m-block-83", keywords: ["bptp", "m block", "m block plot", "sector 83"] },
    { name: "Adore Arpnaam", url: "faridabad/sector-83/index.html#adore-arpnaam", keywords: ["adore", "arpnaam", "adore arpnaam", "sector 83"] },

    // Sector 84 Projects
    { name: "BPTP J Block Plot", url: "faridabad/sector-84/index.html#bptp-j-block", keywords: ["bptp", "j block", "j block plot", "sector 84"] },
    { name: "BPTP K Block Plot", url: "faridabad/sector-84/index.html#bptp-k-block", keywords: ["bptp", "k block", "k block plot", "sector 84"] },
    { name: "BPTP L Block Plot", url: "faridabad/sector-84/index.html#bptp-l-block", keywords: ["bptp", "l block", "l block plot", "sector 84"] },
    { name: "BPTP M Block Plot (Sector 84)", url: "faridabad/sector-84/index.html#bptp-m-block-84", keywords: ["bptp", "m block", "m block plot", "sector 84"] },
    { name: "BPTP District 84 (B Block)", url: "faridabad/sector-84/index.html#bptp-district-84-b", keywords: ["bptp", "district 84", "b block", "sector 84"] },
    { name: "Puri Pratham", url: "faridabad/sector-84/index.html#puri-pratham", keywords: ["puri", "pratham", "puri pratham", "sector 84"] },
    { name: "BPTP Elite Premium", url: "faridabad/sector-84/index.html#bptp-elite-premium", keywords: ["bptp", "elite", "premium", "elite premium", "sector 84"] },
    { name: "Adore Legend 1", url: "faridabad/sector-84/index.html#adore-legend-1", keywords: ["adore", "legend", "adore legend 1", "sector 84"] },
    { name: "Maulshree Heights (Arttech)", url: "faridabad/sector-84/index.html#maulshree-heights", keywords: ["maulshree", "heights", "maulshree heights", "arttech", "sector 84"] },

    // Sector 84A Projects
    { name: "Coral Park (New Stone)", url: "faridabad/sector-84a/index.html#coral-park", keywords: ["coral", "park", "coral park", "new stone", "sector 84a", "plots"] },

    // Sector 85 Projects
    { name: "BPTP A Block Plots", url: "faridabad/sector-85/index.html#bptp-a-block", keywords: ["bptp", "a block", "a block plots", "sector 85"] },
    { name: "BPTP B Block Plots", url: "faridabad/sector-85/index.html#bptp-b-block", keywords: ["bptp", "b block", "b block plots", "sector 85"] },
    { name: "BPTP C Block Plots", url: "faridabad/sector-85/index.html#bptp-c-block", keywords: ["bptp", "c block", "c block plots", "sector 85"] },
    { name: "BPTP D Block Plots", url: "faridabad/sector-85/index.html#bptp-d-block", keywords: ["bptp", "d block", "d block plots", "sector 85"] },
    { name: "BPTP E Block Plots", url: "faridabad/sector-85/index.html#bptp-e-block", keywords: ["bptp", "e block", "e block plots", "sector 85"] },
    { name: "Adore Happy Home Grand", url: "faridabad/sector-85/index.html#adore-happy-home-grand", keywords: ["adore", "happy home", "happy home grand", "sector 85"] },
    { name: "S3 Green Avenue", url: "faridabad/sector-85/index.html#s3-green-avenue", keywords: ["s3", "green avenue", "green", "avenue", "sector 85"] },
    { name: "Amolik Sankalp", url: "faridabad/sector-85/index.html#amolik-sankalp", keywords: ["amolik", "sankalp", "amolik sankalp", "sector 85"] },

    // Sector 86 Projects
    { name: "Adore 1 Happy Home", url: "faridabad/sector-86/index.html#adore-1-happy-home", keywords: ["adore", "happy home", "adore 1 happy home", "sector 86"] },
    { name: "Amolik Residency", url: "faridabad/sector-86/index.html#amolik-residency", keywords: ["amolik", "residency", "amolik residency", "sector 86"] },
    { name: "Umang Summer Palms", url: "faridabad/sector-86/index.html#umang-summer-palms", keywords: ["umang", "summer palms", "palms", "sector 86"] },
    { name: "Shiv Sai Ozones", url: "faridabad/sector-86/index.html#shiv-sai-ozones", keywords: ["shiv sai", "ozones", "shiv sai ozones", "sector 86"] },
    { name: "Omaxe Heights", url: "faridabad/sector-86/index.html#omaxe-heights", keywords: ["omaxe", "heights", "omaxe heights", "sector 86"] },
    { name: "Block A (Sector 86)", url: "faridabad/sector-86/index.html#block-a", keywords: ["block a", "bptp block a", "sector 86"] },
    { name: "Vashisth Heights", url: "faridabad/sector-86/index.html#vashisth-heights", keywords: ["vashisth", "heights", "vashisth heights", "sector 86"] },

    // Sector 87 Projects
    { name: "SRS Royal Hills", url: "faridabad/sector-87/index.html#srs-royal-hills", keywords: ["srs", "royal hills", "srs royal hills", "sector 87"] },
    { name: "SRS Pearl Floors", url: "faridabad/sector-87/index.html#srs-pearl-floors", keywords: ["srs", "pearl floors", "srs pearl floors", "sector 87"] },

    // Sector 88 Projects
    { name: "SRS Residency", url: "faridabad/sector-88/index.html#srs-residency", keywords: ["srs", "residency", "srs residency", "sector 88"] },
    { name: "RPS Groups", url: "faridabad/sector-88/index.html#rps-groups", keywords: ["rps", "groups", "rps groups", "sector 88"] },
    { name: "RPS Savana", url: "faridabad/sector-88/index.html#rps-savana", keywords: ["rps", "savana", "rps savana", "sector 88"] },
    { name: "KST Whispering Heights", url: "faridabad/sector-88/index.html#kst-whispering-heights", keywords: ["kst", "whispering", "heights", "kst whispering heights", "sector 88"] },
    { name: "B Block BPTP (Sector 88)", url: "faridabad/sector-88/index.html#bptp-block-b-sec-88", keywords: ["b block", "bptp b block", "bptp", "sector 88"] },
    { name: "F Block BPTP (Sector 88)", url: "faridabad/sector-88/index.html#bptp-block-f-sec-88", keywords: ["f block", "bptp f block", "bptp", "sector 88"] },
    { name: "TDI Soha SCO", url: "faridabad/sector-88/index.html#tdi-soha-sco", keywords: ["tdi", "soha", "sco", "tdi soha sco", "sector 88"] },
    { name: "TDI Sainik Vihar", url: "faridabad/sector-88/index.html#tdi-sainik-vihar", keywords: ["tdi", "sainik vihar", "sainik vihar", "sector 88"] },
    { name: "Emerald Heights", url: "faridabad/sector-88/index.html#emerald-heights", keywords: ["emerald", "heights", "emerald heights", "sector 88"] },
    { name: "RPS Auria", url: "faridabad/sector-88/index.html#rps-auria", keywords: ["rps", "auria", "rps auria", "sector 88"] },
    { name: "Amrit Homes", url: "faridabad/sector-88/index.html#amrit-homes", keywords: ["amrit", "homes", "amrit homes", "sector 88"] },

    // Sector 89 Projects
    { name: "TDI Plots", url: "faridabad/sector-89/index.html#tdi-plots", keywords: ["tdi", "plots", "tdi plots", "sector 89"] },
    { name: "Puri AmanVilas", url: "faridabad/sector-89/index.html#puri-amanvilas", keywords: ["puri", "amanvilas", "puri amanvilas", "sector 89"] },
    { name: "Luxuria", url: "faridabad/sector-89/index.html#luxuria", keywords: ["luxuria", "sector 89"] },
    { name: "Honour Homes", url: "faridabad/sector-89/index.html#honour-homes", keywords: ["honour", "homes", "honour homes", "sector 89"] },
    { name: "Piyush Heights", url: "faridabad/sector-89/index.html#piyush-heights", keywords: ["piyush", "heights", "piyush heights", "sector 89"] },
    { name: "Adore Samridhi", url: "faridabad/sector-89/index.html#adore-samridhi", keywords: ["adore", "samridhi", "adore samridhi", "sector 89"] },
    { name: "G Block BPTP (Sector 89)", url: "faridabad/sector-89/index.html#bptp-block-g-sec-89", keywords: ["g block", "bptp g block", "bptp", "sector 89"] },

    // Sector 97-98 Projects
    { name: "Amolik Blossom Wood", url: "faridabad/sector-97-98/index.html#amolik-blossom-wood", keywords: ["amolik", "blossom", "wood", "blossom wood", "sector 97", "sector 97-98"] },
    { name: "Adore Smart City 1 & 2", url: "faridabad/sector-97-98/index.html#adore-smart-city", keywords: ["adore", "smart city", "smart city 1", "smart city 2", "sector 97", "sector 97-98"] },
    { name: "Emerald Maple Floors", url: "faridabad/sector-97-98/index.html#emerald-maple-floors", keywords: ["emerald", "maple", "floors", "maple floors", "sector 97", "sector 97-98"] },
    { name: "Anushree Green", url: "faridabad/sector-97-98/index.html#anushree-green", keywords: ["anushree", "green", "anushree green", "sector 97", "sector 97-98"] },
    { name: "OMAXE City (Sector 97)", url: "faridabad/sector-97-98/index.html#omaxe-city", keywords: ["omaxe", "city", "omaxe city", "sector 97", "sector 97-98"] },
    { name: "Amolik Concordia", url: "faridabad/sector-97-98/index.html#amolik-concordia", keywords: ["amolik", "concordia", "amolik concordia", "sector 97", "sector 97-98"] },
    { name: "Ladimora", url: "faridabad/sector-97-98/index.html#ladimora", keywords: ["ladimora", "sector 97", "sector 97-98"] },
    { name: "Soha Olive Town", url: "faridabad/sector-97-98/index.html#soha-olive-town", keywords: ["soha", "olive", "town", "olive town", "sector 98", "sector 97-98"] },
    { name: "Neal City", url: "faridabad/sector-97-98/index.html#neal-city", keywords: ["neal", "city", "neal city", "sector 98", "sector 97-98"] },
    { name: "Amolik Asterwood", url: "faridabad/sector-97-98/index.html#amolik-asterwood", keywords: ["amolik", "asterwood", "amolik asterwood", "sector 98", "sector 97-98"] },
    { name: "Mansha Oaks", url: "faridabad/sector-97-98/index.html#mansha-oaks", keywords: ["mansha", "oaks", "mansha oaks", "sector 98", "sector 97-98"] },
    { name: "Olive Homes", url: "faridabad/sector-97-98/index.html#olive-homes", keywords: ["olive", "homes", "olive homes", "sector 98", "sector 97-98"] },

    // Sector 104 Projects
    { name: "Adore Legend 3", url: "faridabad/sector-104/index.html#adore-legend-3", keywords: ["adore", "legend", "adore legend 3", "sector 104"] },

    // Sector 106 Projects
    { name: "Bhumika Small Plots & Floors", url: "faridabad/sector-106/index.html#bhumika-small-plots-floors", keywords: ["bhumika", "small plots", "bhumika plots", "floors", "sector 106"] },

    // Sector 107 Projects
    { name: "Anushree Plots", url: "faridabad/sector-107/index.html#anushree-plots", keywords: ["anushree", "plots", "anushree plots", "sector 107"] },

    // Sector 110 Projects
    { name: "Navraj Sector 110", url: "faridabad/sector-110/index.html#navraj-sec110", keywords: ["navraj", "navraj 110", "sector 110"] },
    { name: "Mansha Orchid", url: "faridabad/sector-110/index.html#mansha-orchid", keywords: ["mansha", "orchid", "mansha orchid", "sector 110"] },

    // Sector 113-114 Projects
    { name: "Bhumika Plots (General Township)", url: "faridabad/sector-113-114/index.html#bhumika-plots-general", keywords: ["bhumika", "township", "general township", "bhumika plots", "sector 113", "sector 114"] },
    { name: "Bhumika NILP Plots", url: "faridabad/sector-113-114/index.html#bhumika-nilp-plots", keywords: ["bhumika", "nilp", "nilp plots", "bhumika nilp", "sector 113", "sector 114"] },

    // Sector 119 Projects
    { name: "Adore Affordable (Sector 119)", url: "faridabad/sector-119/index.html#adore-affordable-sec119", keywords: ["adore", "affordable", "adore affordable", "sector 119"] },
    { name: "LRG Affordable", url: "faridabad/sector-119/index.html#lrg-affordable", keywords: ["lrg", "affordable", "lrg affordable", "sector 119"] },

    // Sector 121-123 Projects
    { name: "Dameera Residences", url: "faridabad/sector-121-123/index.html#dameera-residences", keywords: ["dameera", "residences", "dameera residences", "sector 121", "sector 123", "sector 121-123"] },
    { name: "Mansha OASIS", url: "faridabad/sector-121-123/index.html#mansha-oasis", keywords: ["mansha", "oasis", "mansha oasis", "sector 121", "sector 123", "sector 121-123"] },

    // Sector 127 Residential Projects
    { name: "Navraj Builder Floors", url: "faridabad/sector-127-residential/index.html#navraj-builder-floors", keywords: ["navraj", "builder floors", "floors", "navraj floors", "sector 127"] },

    { name: "Gurugram Plots", url: "projects/gurugram.html", keywords: ["gurugram", "dwarka expressway", "dwarka", "gurgaon", "dwarka plots"] },
    { name: "Sohna Plots", url: "projects/sohna.html", keywords: ["sohna", "sohna plots", "sohna road"] },
    { name: "Prithla Plots", url: "projects/prithla.html", keywords: ["prithla", "prithla plots", "industrial plots"] },
    { name: "Palwal Plots", url: "projects/palwal.html", keywords: ["palwal", "palwal plots"] },
    { name: "Vrindavan Plots", url: "projects/vrindavan.html", keywords: ["vrindavan", "vrindavan plots", "mathura"] },
    { name: "MATRABHUMI Vrindavan", url: "projects/matrabhumi.html", keywords: ["matrabhumi", "matrabhumi vrindavan", "flagship"] },
    { name: "Ajeetgarh Plots", url: "projects/ajeetgarh.html", keywords: ["ajeetgarh", "ajeetgarh plots", "rajasthan"] },
    { name: "Khatu Shyam Plots", url: "projects/khatu-shyam.html", keywords: ["khatu shyam", "khatu shyam plots", "rajasthan"] },
    { name: "Garhmukteshwar Plots", url: "projects/garhmukteshwar.html", keywords: ["garhmukteshwar", "garhmukteshwar plots", "ganga"] },
    { name: "Dholera Plots", url: "projects/dholera.html", keywords: ["dholera", "dholera plots", "gujarat"] },
    { name: "Sector 82 Plots (Faridabad)", url: "projects/sector-82.html", keywords: ["sector 82", "sector 82 plots", "faridabad"] }
  ];
 
  function getLocText(url) {
    if (url.includes('sector-75')) return 'Sector 75, Faridabad';
    if (url.includes('sector-76')) return 'Sector 76, Faridabad';
    if (url.includes('sector-77')) return 'Sector 77, Faridabad';
    if (url.includes('sector-78')) return 'Sector 78, Faridabad';
    if (url.includes('sector-79')) return 'Sector 79, Faridabad';
    if (url.includes('sector-80')) return 'Sector 80, Faridabad';
    if (url.includes('sector-81')) return 'Sector 81, Faridabad';
    if (url.includes('sector-82')) return 'Sector 82, Faridabad';
    if (url.includes('sector-83')) return 'Sector 83, Faridabad';
    if (url.includes('sector-84')) return 'Sector 84, Faridabad';
    if (url.includes('sector-85')) return 'Sector 85, Faridabad';
    if (url.includes('sector-86')) return 'Sector 86, Faridabad';
    if (url.includes('sector-87')) return 'Sector 87, Faridabad';
    if (url.includes('sector-88')) return 'Sector 88, Faridabad';
    if (url.includes('sector-89')) return 'Sector 89, Faridabad';
    if (url.includes('gurugram')) return 'Dwarka Expressway, Gurugram';
    if (url.includes('sohna')) return 'Sohna, Gurugram';
    if (url.includes('prithla')) return 'Prithla, Faridabad';
    if (url.includes('palwal')) return 'Palwal';
    if (url.includes('vrindavan') || url.includes('matrabhumi')) return 'Vrindavan';
    if (url.includes('ajeetgarh')) return 'Ajeetgarh, Rajasthan';
    if (url.includes('khatu-shyam')) return 'Khatu Shyam, Rajasthan';
    if (url.includes('garhmukteshwar')) return 'Garhmukteshwar';
    if (url.includes('dholera')) return 'Dholera (Gujarat)';
    return '';
  }
 
  // uses getPathPrefix()

  searchInputs.forEach(input => {
    const wrap = input.closest('.nav-search-wrap');
    if (!wrap) return;

    // Create dropdown container
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'nav-search-results-list';
    wrap.appendChild(resultsContainer);

    let activeIndex = -1;
    let currentMatches = [];

    // Search logic on input
    input.addEventListener('input', () => {
      const query = input.value.toLowerCase().trim();
      resultsContainer.innerHTML = '';
      activeIndex = -1;

      if (!query) {
        resultsContainer.style.display = 'none';
        currentMatches = [];
        return;
      }

      currentMatches = allProjects.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.keywords.some(k => k.includes(query))
      );

      if (currentMatches.length > 0) {
        currentMatches.forEach((match, idx) => {
          const item = document.createElement('div');
          item.className = 'nav-search-result-item';
          item.innerHTML = `
            <div class="result-title">${match.name}</div>
            <div class="result-loc">${getLocText(match.url)}</div>
          `;
          item.addEventListener('click', () => {
            const prefix = getPathPrefix();
            window.location.href = prefix + match.url;
          });
          resultsContainer.appendChild(item);
        });
        resultsContainer.style.display = 'block';
      } else {
        const noResults = document.createElement('div');
        noResults.className = 'nav-search-no-results';
        noResults.textContent = 'No matching projects found';
        resultsContainer.appendChild(noResults);
        resultsContainer.style.display = 'block';
      }
    });

    // Handle focus out and in
    input.addEventListener('focus', () => {
      if (input.value.trim() && currentMatches.length > 0) {
        resultsContainer.style.display = 'block';
      }
    });

    document.addEventListener('click', (e) => {
      if (!wrap.contains(e.target)) {
        resultsContainer.style.display = 'none';
      }
    });

    // Handle key navigation and Enter redirection
    input.addEventListener('keydown', (e) => {
      const items = resultsContainer.querySelectorAll('.nav-search-result-item');
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (items.length === 0) return;
        if (activeIndex >= 0) items[activeIndex].classList.remove('active');
        activeIndex = (activeIndex + 1) % items.length;
        items[activeIndex].classList.add('active');
        input.value = currentMatches[activeIndex].name;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (items.length === 0) return;
        if (activeIndex >= 0) items[activeIndex].classList.remove('active');
        activeIndex = (activeIndex - 1 + items.length) % items.length;
        items[activeIndex].classList.add('active');
        input.value = currentMatches[activeIndex].name;
      } else if (e.key === 'Escape') {
        resultsContainer.style.display = 'none';
      } else if (e.key === 'Enter') {
        const query = input.value.trim();
        if (query) {
          const prefix = getPathPrefix();
          if (activeIndex >= 0 && activeIndex < currentMatches.length) {
            window.location.href = prefix + currentMatches[activeIndex].url;
          } else if (currentMatches.length > 0) {
            // Default to first match
            window.location.href = prefix + currentMatches[0].url;
          } else {
            // Fall back to projects list search parameter
            window.location.href = `${prefix}projects/index.html?search=${encodeURIComponent(query)}`;
          }
        }
      }
    });

    // Handle search button click
    const btn = input.nextElementSibling;
    if (btn) {
      btn.addEventListener('click', () => {
        const query = input.value.trim();
        if (query) {
          const prefix = getPathPrefix();
          if (currentMatches.length > 0) {
            window.location.href = prefix + currentMatches[0].url;
          } else {
            window.location.href = `${prefix}projects/index.html?search=${encodeURIComponent(query)}`;
          }
        } else {
          input.focus();
        }
      });
    }
  });
}

/**
 * Expose openBrochureModal globally to show the enquiry popup prior to downloading a brochure.
 */
function openBrochureModal(projectName, brochureFilename) {
  // Check path prefix to resolve logo.png and brochure download path
  const pathPrefix = getPathPrefix();

  // If the user has already submitted an enquiry, bypass the modal and download directly
  if (localStorage.getItem('homage_enquiry_submitted') === 'true') {
    const downloadLink = document.createElement('a');
    downloadLink.href = `${pathPrefix}brochure/${encodeURIComponent(brochureFilename)}`;
    downloadLink.download = brochureFilename;
    downloadLink.target = '_blank';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    showToast(`Downloading "${projectName}" brochure.`);
    return;
  }

  // Check if a modal is already open
  const existingModal = document.getElementById('brochure-popup');
  if (existingModal) {
    existingModal.remove();
  }

  // Construct HTML
  const popupHTML = `
    <div id="brochure-popup" class="modal">
      <div class="modal-content" style="max-width: 420px; overflow: hidden; border-radius: var(--border-radius-lg);">
        <button class="modal-close" id="close-brochure-popup" aria-label="Close popup">
          <svg viewBox="0 0 24 24" style="width: 14px; height: 14px; fill: currentColor;"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        </button>
        <div class="modal-header" style="text-align: center; border-bottom: none; padding: 35px 30px 10px 30px;">
          <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin: 0 auto 15px auto; width: max-content;">
            <img src="${pathPrefix}assets/images/logo.png" alt="Homage Infratech Logo" style="height: 52px; width: 52px; border-radius: 50%; border: 2px solid var(--accent-color); object-fit: cover;">
            <div style="text-align: left; font-weight: 800; font-size: 1.3rem; letter-spacing: -0.02em; color: var(--primary-dark); display: flex; flex-direction: column; line-height: 1.1;">
              HOMAGE
              <span style="font-size: 0.65rem; font-weight: 600; color: var(--accent-color); text-transform: uppercase; letter-spacing: 0.1em; margin-top: 2px;">INFRATECH</span>
            </div>
          </div>
          <h3 style="color: var(--primary-dark); font-weight: 700; font-size: 1.4rem;">Exclusive Plot Deals</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 5px;">Enquire today to download the ${projectName} brochure.</p>
        </div>
        <div class="modal-body" style="padding: 10px 30px 35px 30px;">
          <form id="brochure-popup-form" novalidate>
            <div class="form-group" style="margin-bottom: 20px;">
              <label class="form-label" style="font-size: 0.75rem; font-weight: 600; color: var(--primary-dark); display: block; margin-bottom: 5px; text-transform: uppercase;">Name *</label>
              <input type="text" id="brochure-name" class="form-control" placeholder="Enter your full name" style="padding: 11px 14px; font-size: 0.9rem;" required>
              <span class="error-message" style="font-size: 0.7rem; margin-top: 4px;"></span>
            </div>
            <div class="form-group" style="margin-bottom: 20px;">
              <label class="form-label" style="font-size: 0.75rem; font-weight: 600; color: var(--primary-dark); display: block; margin-bottom: 5px; text-transform: uppercase;">Phone No. *</label>
              <input type="tel" id="brochure-phone" class="form-control" placeholder="10-digit mobile number" style="padding: 11px 14px; font-size: 0.9rem;" required>
              <span class="error-message" style="font-size: 0.7rem; margin-top: 4px;"></span>
            </div>
            <div class="form-group" style="margin-bottom: 20px;">
              <label class="form-label" style="font-size: 0.75rem; font-weight: 600; color: var(--primary-dark); display: block; margin-bottom: 5px; text-transform: uppercase;">Email Address *</label>
              <input type="email" id="brochure-email" class="form-control" placeholder="name@domain.com" style="padding: 11px 14px; font-size: 0.9rem;" required>
              <span class="error-message" style="font-size: 0.7rem; margin-top: 4px;"></span>
            </div>
            <div class="form-submit-wrap" style="margin-top: 25px;">
              <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px; font-size: 0.95rem;">Send Inquiry & Download</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', popupHTML);
  const popup = document.getElementById('brochure-popup');
  const closeBtn = document.getElementById('close-brochure-popup');
  const form = document.getElementById('brochure-popup-form');

  if (popup) {
    // Force CSS reflow
    popup.offsetHeight;
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Close functions
  const closePopup = () => {
    popup.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => popup.remove(), 400);
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', closePopup);
  }

  if (popup) {
    popup.addEventListener('click', (e) => {
      if (e.target === popup) closePopup();
    });
  }

  // Form field validators
  const nameInput = document.getElementById('brochure-name');
  const phoneInput = document.getElementById('brochure-phone');
  const emailInput = document.getElementById('brochure-email');

  const validateField = (input, validationFn, errorMsg) => {
    const val = input.value;
    const isValid = validationFn(val);
    const errSpan = input.nextElementSibling;
    if (!isValid) {
      input.classList.add('error');
      if (errSpan) errSpan.innerText = errorMsg;
    } else {
      input.classList.remove('error');
      if (errSpan) errSpan.innerText = '';
    }
    return isValid;
  };

  if (nameInput) nameInput.addEventListener('input', () => validateField(nameInput, val => val.trim().length > 1, "Name required (min 2 chars)"));
  if (phoneInput) phoneInput.addEventListener('input', () => validateField(phoneInput, val => /^[6-9]\d{9}$/.test(val.replace(/\D/g, '')), "Valid 10-digit number required"));
  if (emailInput) emailInput.addEventListener('input', () => validateField(emailInput, val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), "Valid email required"));

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateField(nameInput, val => val.trim().length > 1, "Name required (min 2 chars)");
      const isPhoneValid = validateField(phoneInput, val => /^[6-9]\d{9}$/.test(val.replace(/\D/g, '')), "Valid 10-digit number required");
      const isEmailValid = validateField(emailInput, val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), "Valid email required");

      if (isNameValid && isPhoneValid && isEmailValid) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerText = "Submitting...";
        }

        const leadData = {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          phone: phoneInput.value.replace(/\D/g, ''),
          interest: 'brochure_download',
          message: `Inquiry submitted for downloading "${projectName}" brochure.`,
          timestamp: new Date().toISOString()
        };

        // Log lead to localStorage
        setTimeout(() => {
          let leads = [];
          try {
            leads = JSON.parse(localStorage.getItem('homage_leads') || '[]');
          } catch (err) {
            leads = [];
          }
          leads.push(leadData);
          localStorage.setItem('homage_leads', JSON.stringify(leads));
          localStorage.setItem('homage_enquiry_submitted', 'true');
          localStorage.setItem('homage_user_name', leadData.name);
          localStorage.setItem('homage_user_email', leadData.email);
          localStorage.setItem('homage_user_phone', leadData.phone);

          // Trigger file download
          const downloadLink = document.createElement('a');
          downloadLink.href = `${pathPrefix}brochure/${encodeURIComponent(brochureFilename)}`;
          downloadLink.download = brochureFilename;
          downloadLink.target = '_blank';
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);

          closePopup();
          showToast(`Inquiry submitted! Downloading "${projectName}" brochure.`);
        }, 1000);
      }
    });
  }
}
window.openBrochureModal = openBrochureModal;

/**
 * Turn all "Ask for Price" elements into clickable links prefilled for the contact form
 */
function initPriceLinks() {
  const priceElements = document.querySelectorAll('.price');
  priceElements.forEach(priceEl => {
    if (priceEl.tagName.toLowerCase() === 'span' && priceEl.innerText.trim() === 'Ask for Price') {
      const card = priceEl.closest('.f-project-card, .project-card');
      const titleEl = card ? card.querySelector('h3') : null;
      if (titleEl) {
        const projectName = titleEl.innerText.trim();
        // Generate slug: e.g., "BPTP Resort" -> "bptp-resort"
        const projectSlug = projectName.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        // Determine interest (residential or commercial)
        let interest = 'residential';
        const cardText = card.innerText.toLowerCase();
        if (cardText.includes('commercial') || cardText.includes('retail') || cardText.includes('sco') || cardText.includes('shop') || cardText.includes('office')) {
          interest = 'commercial';
        }

        // Get path prefix
        const pathPrefix = getPathPrefix();

        const contactUrl = `${pathPrefix}contact-us/index.html?project=${encodeURIComponent(projectSlug)}&interest=${interest}`;

        // Create link
        const link = document.createElement('a');
        link.href = contactUrl;
        link.className = priceEl.className + ' price-link';
        link.innerText = 'Ask for Price';
        
        priceEl.parentNode.replaceChild(link, priceEl);
      }
    }
  });
}

/**
 * Initialize image carousels inside .f-card-carousel elements
 */
function initCardCarousels() {
  const carousels = document.querySelectorAll('.f-card-carousel');
  carousels.forEach(carousel => {
    const imgData = carousel.getAttribute('data-images');
    if (!imgData) return;
    
    const images = imgData.split(',').map(s => s.trim()).filter(Boolean);
    if (images.length <= 1) return;
    
    let currentIndex = 0;
    const imgEl = carousel.querySelector('img');
    if (!imgEl) return;
    
    // Add prev/next buttons
    const prevBtn = document.createElement('button');
    prevBtn.className = 'f-carousel-btn f-prev-btn';
    prevBtn.setAttribute('aria-label', 'Previous image');
    prevBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>`;
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'f-carousel-btn f-next-btn';
    nextBtn.setAttribute('aria-label', 'Next image');
    nextBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>`;
    
    carousel.appendChild(prevBtn);
    carousel.appendChild(nextBtn);
    
    // Add dots
    const dotsWrap = document.createElement('div');
    dotsWrap.className = 'f-carousel-dots';
    images.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = i === 0 ? 'f-dot active' : 'f-dot';
      dotsWrap.appendChild(dot);
    });
    carousel.appendChild(dotsWrap);
    
    function updateCarousel() {
      imgEl.src = images[currentIndex];
      const dots = dotsWrap.querySelectorAll('.f-dot');
      dots.forEach((dot, index) => {
        if (index === currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
    
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateCarousel();
    });
    
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      currentIndex = (currentIndex + 1) % images.length;
      updateCarousel();
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const threshold = 40; // minimum pixels to swipe
      if (touchEndX < touchStartX - threshold) {
        // Swipe Left -> Next
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
      } else if (touchEndX > touchStartX + threshold) {
        // Swipe Right -> Prev
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel();
      }
    }
  });
}

// --- GLOBAL DYNAMIC BROCHURE MODAL SYSTEM ---
let activePdf = '';

function openBrochureModal(projectName, pdfName) {
  let modal = document.getElementById('brochureModal');
  if (!modal) {
    const modalHTML = `
      <div id="brochureModal" class="modal">
        <div class="modal-content" style="max-width: 420px; overflow: hidden; border-radius: var(--border-radius-lg);">
          <button class="modal-close" onclick="closeBrochureModal()" aria-label="Close modal" style="position: absolute; top: 20px; right: 20px; background: none; border: none; cursor: pointer; color: var(--text-dark);">
            <svg viewBox="0 0 24 24" style="width: 14px; height: 14px; fill: currentColor;"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          </button>
          <div class="modal-header" style="text-align: center; border-bottom: none; padding: 35px 30px 10px 30px;">
            <h3 style="color: var(--primary-dark); font-weight: 700; font-size: 1.4rem;">Download Brochure</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 5px;">Please provide your contact details to download the official brochure for <strong id="modalProjectName"></strong>.</p>
          </div>
          <div class="modal-body" style="padding: 10px 30px 35px 30px;">
            <form id="brochureForm" onsubmit="handleBrochureSubmit(event)">
              <div class="form-group" style="margin-bottom: 20px;">
                <label class="form-label" style="font-size: 0.75rem; font-weight: 600; color: var(--primary-dark); display: block; margin-bottom: 5px; text-transform: uppercase;">Name *</label>
                <input type="text" id="brochureName" class="form-control" placeholder="Enter your full name" style="padding: 11px 14px; font-size: 0.9rem;" required>
              </div>
              <div class="form-group" style="margin-bottom: 20px;">
                <label class="form-label" style="font-size: 0.75rem; font-weight: 600; color: var(--primary-dark); display: block; margin-bottom: 5px; text-transform: uppercase;">Phone No. *</label>
                <input type="tel" id="brochurePhone" class="form-control" placeholder="10-digit mobile number" style="padding: 11px 14px; font-size: 0.9rem;" required>
              </div>
              <div class="form-group" style="margin-bottom: 20px;">
                <label class="form-label" style="font-size: 0.75rem; font-weight: 600; color: var(--primary-dark); display: block; margin-bottom: 5px; text-transform: uppercase;">Email Address *</label>
                <input type="email" id="brochureEmail" class="form-control" placeholder="name@domain.com" style="padding: 11px 14px; font-size: 0.9rem;" required>
              </div>
              <div class="form-submit-wrap" style="margin-top: 25px;">
                <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px; font-size: 0.95rem;">Download Now</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    modal = document.getElementById('brochureModal');
  }

  const savedName = localStorage.getItem('lead_name');
  const savedPhone = localStorage.getItem('lead_phone');
  const savedEmail = localStorage.getItem('lead_email');
  if (savedName) document.getElementById('brochureName').value = savedName;
  if (savedPhone) document.getElementById('brochurePhone').value = savedPhone;
  if (savedEmail) document.getElementById('brochureEmail').value = savedEmail;

  document.getElementById('modalProjectName').innerText = projectName;
  activePdf = pdfName;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeBrochureModal() {
  const modal = document.getElementById('brochureModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    const form = document.getElementById('brochureForm');
    if (form) form.reset();
  }
}

function getSendInquiryUrl() {
  return getPathPrefix() + 'send_inquiry.php';
}

function handleBrochureSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('brochureName').value;
  const phone = document.getElementById('brochurePhone').value;
  const email = document.getElementById('brochureEmail').value;
  const projNameElem = document.getElementById('modalProjectName');
  const projName = projNameElem ? projNameElem.innerText : '';
  
  localStorage.setItem('lead_name', name);
  localStorage.setItem('lead_phone', phone);
  localStorage.setItem('lead_email', email);

  // Compute target brochure URL before async fetch
  let brochureUrl = '';
  const prefix = getPathPrefix();

  if (activePdf) {
    if (activePdf.startsWith('http://') || activePdf.startsWith('https://')) {
      brochureUrl = activePdf;
    } else if (activePdf.startsWith('../../') || activePdf.startsWith('../')) {
      brochureUrl = activePdf;
    } else if (activePdf.startsWith('brochure/')) {
      brochureUrl = prefix + activePdf;
    } else {
      brochureUrl = prefix + 'brochure/' + activePdf;
    }
  }

  // Pre-open blank tab synchronously on click gesture to bypass Chrome/Safari popup blocker
  let popupWin = null;
  if (brochureUrl) {
    try {
      popupWin = window.open('about:blank', '_blank');
    } catch(err) {
      console.warn('Popup window blocked initially:', err);
    }
  }

  const formData = new FormData();
  formData.append('full_name', name);
  formData.append('phone_number', phone);
  formData.append('email', email);
  formData.append('plot_interest', 'Brochure Download Popup');
  formData.append('message', 'Brochure requested' + (projName ? ' for ' + projName : ''));
  formData.append('ajax', '1');

  // Send brochure popup lead to database (send_inquiry.php & Broucher table)
  const submitBtn = document.querySelector('#brochureForm button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = "Submitting...";
  }

  fetch(getSendInquiryUrl(), {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => console.log('Brochure inquiry saved to database:', data))
  .catch(err => console.error('Error submitting brochure popup to DB:', err))
  .finally(() => {
    if (brochureUrl) {
      const finalUrl = encodeURI(brochureUrl);
      if (popupWin && !popupWin.closed) {
        popupWin.location.href = finalUrl;
      } else {
        // Fallback if popup blocker closed the window
        window.location.href = finalUrl;
      }
    }
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = "Download Now";
    }
    closeBrochureModal();
  });
}

window.openBrochureModal = openBrochureModal;
window.closeBrochureModal = closeBrochureModal;
window.handleBrochureSubmit = handleBrochureSubmit;


