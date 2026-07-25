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
    { name: "Bhumika The Icon", url: "faridabad/bhumika-the-icon/index.html#bhumika-the-icon", keywords: ["bhumika", "faridabad", "icon", "the"] },
    { name: "FIT Plotted Enclave", url: "faridabad/fit/index.html#fit-plotted-enclave", keywords: ["enclave", "faridabad", "fit", "plotted"] },
    { name: "IMT Industrial Plots", url: "faridabad/imt/index.html#imt-industrial-plots", keywords: ["faridabad", "imt", "industrial", "plots"] },
    { name: "Navraj The Marq", url: "faridabad/navraj-the-marq/index.html#navraj-the-marq", keywords: ["armani", "armauis", "faridabad", "marq", "navraj", "the", "the marq"] },
    { name: "Armani (Navraj The Marq)", url: "faridabad/nh2-mathura-road/index.html#armauis-navraj", keywords: ["armani", "armauis", "faridabad", "marq", "mathura", "navraj", "nh2", "road", "the", "the marq"] },
    { name: "Lambhorghini Flats", url: "faridabad/nh2-mathura-road/index.html#lambhorghini-flats", keywords: ["faridabad", "flats", "lambhorghini", "mathura", "nh2", "road"] },
    { name: "Mahindra Flats", url: "faridabad/nh2-mathura-road/index.html#mahindra-flats", keywords: ["faridabad", "flats", "mahindra", "mathura", "nh2", "road"] },
    { name: "The Wisteria's (RPS)", url: "faridabad/nh2-mathura-road/index.html#the-wisterias-rps", keywords: ["faridabad", "mathura", "nh2", "road", "rps", "rps group", "the", "wisteria"] },
    { name: "RPS 12th Avenue", url: "faridabad/rps-12th-avenue/index.html#rps-12th-avenue", keywords: ["12th", "avenue", "faridabad", "rps", "rps group"] },
    { name: "Adore Legend 3", url: "faridabad/sector-104/index.html#adore-legend-3", keywords: ["104", "adore", "adore realtech", "faridabad", "legend", "sector"] },
    { name: "Bhumika Small Plots & Floors", url: "faridabad/sector-106/index.html#bhumika-small-plots-floors", keywords: ["106", "bhumika", "faridabad", "floors", "plots", "sector", "small"] },
    { name: "Anushree Plots", url: "faridabad/sector-107/index.html#anushree-plots", keywords: ["107", "anushree", "faridabad", "plots", "sector"] },
    { name: "Mansha Orchid", url: "faridabad/sector-110/index.html#mansha-orchid", keywords: ["110", "faridabad", "mansha", "orchid", "sector"] },
    { name: "Navraj Sector 110", url: "faridabad/sector-110/index.html#navraj-sec110", keywords: ["110", "faridabad", "navraj", "sector"] },
    { name: "Bhumika NILP Plots", url: "faridabad/sector-113-114/index.html#bhumika-nilp-plots", keywords: ["113", "114", "bhumika", "faridabad", "nilp", "plots", "sector"] },
    { name: "Bhumika Plots (General Township)", url: "faridabad/sector-113-114/index.html#bhumika-plots-general", keywords: ["113", "114", "bhumika", "faridabad", "general", "plots", "sector", "township"] },
    { name: "Adore Affordable", url: "faridabad/sector-119/index.html#adore-affordable-sec119", keywords: ["119", "adore", "adore realtech", "affordable", "faridabad", "sector"] },
    { name: "LRG Affordable", url: "faridabad/sector-119/index.html#lrg-affordable", keywords: ["119", "affordable", "faridabad", "lrg", "sector"] },
    { name: "Dameera Residences", url: "faridabad/sector-121-123/index.html#dameera-residences", keywords: ["121", "123", "dameera", "faridabad", "residences", "sector"] },
    { name: "Mansha OASIS", url: "faridabad/sector-121-123/index.html#mansha-oasis", keywords: ["121", "123", "faridabad", "mansha", "oasis", "sector"] },
    { name: "Navraj Builder Floors", url: "faridabad/sector-127-residential/index.html#navraj-builder-floors", keywords: ["127", "builder", "faridabad", "floors", "navraj", "residential", "sector"] },
    { name: "Navraj Industrial Plot", url: "faridabad/sector-127/index.html#navraj-industrial-plot", keywords: ["127", "faridabad", "industrial", "navraj", "plot", "sector"] },
    { name: "Adore Prima 1", url: "faridabad/sector-72-73-residential/index.html#adore-prime-1", keywords: ["72", "73", "adore", "adore realtech", "faridabad", "prima", "residential", "sector"] },
    { name: "Adore Prima 2", url: "faridabad/sector-72-73-residential/index.html#adore-prime-2", keywords: ["72", "73", "adore", "adore realtech", "faridabad", "prima", "residential", "sector"] },
    { name: "Adore Business City", url: "faridabad/sector-72-73/index.html#adore-business-city", keywords: ["72", "73", "adore", "adore realtech", "business", "city", "faridabad", "sector"] },
    { name: "Adore Pride", url: "faridabad/sector-75/index.html#adore-pride", keywords: ["75", "adore", "adore realtech", "faridabad", "pride", "sector"] },
    { name: "P Blocks BPTP", url: "faridabad/sector-75/index.html#bptp-block-p", keywords: ["75", "blocks", "bptp", "bptp plots", "faridabad", "sector"] },
    { name: "Q Blocks BPTP", url: "faridabad/sector-75/index.html#bptp-block-q", keywords: ["75", "blocks", "bptp", "bptp plots", "faridabad", "sector"] },
    { name: "R Blocks BPTP", url: "faridabad/sector-75/index.html#bptp-block-r", keywords: ["75", "blocks", "bptp", "bptp plots", "faridabad", "sector"] },
    { name: "S Blocks BPTP", url: "faridabad/sector-75/index.html#bptp-block-s", keywords: ["75", "blocks", "bptp", "bptp plots", "faridabad", "sector"] },
    { name: "T Blocks BPTP", url: "faridabad/sector-75/index.html#bptp-block-t", keywords: ["75", "blocks", "bptp", "bptp plots", "faridabad", "sector"] },
    { name: "BPTP Resort", url: "faridabad/sector-75/index.html#bptp-resort", keywords: ["75", "bptp", "bptp plots", "faridabad", "resort", "sector"] },
    { name: "Terra Lavinium", url: "faridabad/sector-75/index.html#terra-lavinium", keywords: ["75", "faridabad", "lavinium", "sector", "terra"] },
    { name: "U Block BPTP", url: "faridabad/sector-76/index.html#bptp-block-u", keywords: ["76", "block", "bptp", "bptp plots", "faridabad", "sector"] },
    { name: "V Block BPTP", url: "faridabad/sector-76/index.html#bptp-block-v", keywords: ["76", "block", "bptp", "bptp plots", "faridabad", "sector"] },
    { name: "W Block BPTP", url: "faridabad/sector-76/index.html#bptp-block-w", keywords: ["76", "block", "bptp", "bptp plots", "faridabad", "sector"] },
    { name: "X Block BPTP", url: "faridabad/sector-76/index.html#bptp-block-x", keywords: ["76", "block", "bptp", "bptp plots", "faridabad", "sector"] },
    { name: "Y Block BPTP", url: "faridabad/sector-76/index.html#bptp-block-y", keywords: ["76", "block", "bptp", "bptp plots", "faridabad", "sector"] },
    { name: "Palm Residency", url: "faridabad/sector-76/index.html#palm-residency", keywords: ["76", "faridabad", "palm", "residency", "sector"] },
    { name: "Park Floors 2", url: "faridabad/sector-76/index.html#park-floors-2", keywords: ["76", "faridabad", "floors", "park", "sector"] },
    { name: "PA Block BPTP", url: "faridabad/sector-77/index.html#bptp-block-pa", keywords: ["77", "block", "bptp", "bptp plots", "faridabad", "pa", "sector"] },
    { name: "PB Block BPTP", url: "faridabad/sector-77/index.html#bptp-block-pb", keywords: ["77", "block", "bptp", "bptp plots", "faridabad", "pb", "sector"] },
    { name: "PC Block BPTP", url: "faridabad/sector-77/index.html#bptp-block-pc", keywords: ["77", "block", "bptp", "bptp plots", "faridabad", "pc", "sector"] },
    { name: "PD Block BPTP", url: "faridabad/sector-77/index.html#bptp-block-pd", keywords: ["77", "block", "bptp", "bptp plots", "faridabad", "pd", "sector"] },
    { name: "PE Block BPTP", url: "faridabad/sector-77/index.html#bptp-block-pe", keywords: ["77", "block", "bptp", "bptp plots", "faridabad", "pe", "sector"] },
    { name: "BPTP Park Land Pride", url: "faridabad/sector-77/index.html#bptp-park-land-pride", keywords: ["77", "bptp", "bptp plots", "faridabad", "land", "park", "pride", "sector"] },
    { name: "KLJ Green's", url: "faridabad/sector-77/index.html#klj-green", keywords: ["77", "faridabad", "green", "klj", "sector"] },
    { name: "KLJ JALWAYU Vihar", url: "faridabad/sector-77/index.html#klj-jalwayu-vihar", keywords: ["77", "faridabad", "jalwayu", "klj", "sector", "vihar"] },
    { name: "KLJ Platinum Floors", url: "faridabad/sector-77/index.html#klj-platinum-floors", keywords: ["77", "faridabad", "floors", "klj", "platinum", "sector"] },
    { name: "KLJ Platinum Height", url: "faridabad/sector-77/index.html#klj-platinum-height", keywords: ["77", "faridabad", "height", "klj", "platinum", "sector"] },
    { name: "Pride Floors", url: "faridabad/sector-77/index.html#pride-floors", keywords: ["77", "faridabad", "floors", "pride", "sector"] },
    { name: "Adore Broadway", url: "faridabad/sector-78/index.html#adore-broadway", keywords: ["78", "adore", "adore realtech", "broadway", "faridabad", "sector"] },
    { name: "Habitat Residences", url: "faridabad/sector-78/index.html#habitat-residences", keywords: ["78", "faridabad", "habitat", "residences", "sector"] },
    { name: "Habitat Sector 78", url: "faridabad/sector-78/index.html#habitat-sector-78", keywords: ["78", "faridabad", "habitat", "sector"] },
    { name: "OMAXE Spa Village", url: "faridabad/sector-78/index.html#omaxe-spa-village", keywords: ["78", "faridabad", "omaxe", "sector", "spa", "village"] },
    { name: "Capital SCO", url: "faridabad/sector-79-commercial/index.html#capital-sco", keywords: ["79", "capital", "commercial", "faridabad", "sco", "sector"] },
    { name: "Hi Fun Mall", url: "faridabad/sector-79-commercial/index.html#hi-fun-mall", keywords: ["79", "commercial", "faridabad", "fun", "hi", "mall", "sector"] },
    { name: "OMAXE Royal Residency", url: "faridabad/sector-79-commercial/index.html#omaxe-royal-residency", keywords: ["79", "commercial", "faridabad", "omaxe", "residency", "royal", "sector"] },
    { name: "OMAXE Sun", url: "faridabad/sector-79-commercial/index.html#omaxe-sun", keywords: ["79", "commercial", "faridabad", "omaxe", "sector", "sun"] },
    { name: "Universal SCO (Auric)", url: "faridabad/sector-79-commercial/index.html#universal-sco-auric", keywords: ["79", "auric", "commercial", "faridabad", "sco", "sector", "universal"] },
    { name: "World Street SCO", url: "faridabad/sector-79-commercial/index.html#world-street-sco", keywords: ["79", "commercial", "faridabad", "sco", "sector", "street", "world"] },
    { name: "Ansal Crown", url: "faridabad/sector-80/index.html#ansal-crown", keywords: ["80", "ansal", "crown", "faridabad", "sector"] },
    { name: "BPTP Discovery Park Phase 1 (2&3 BHK)", url: "faridabad/sector-80/index.html#bptp-discovery-park-phase-1", keywords: ["80", "bhk", "bptp", "bptp plots", "discovery", "faridabad", "park", "phase", "sector"] },
    { name: "BPTP Discovery Park Phase 2 (Duplex)", url: "faridabad/sector-80/index.html#bptp-discovery-park-phase-2", keywords: ["80", "bptp", "bptp plots", "discovery", "duplex", "faridabad", "park", "phase", "sector"] },
    { name: "BPTP Sky Nest (3&4 BHK)", url: "faridabad/sector-80/index.html#bptp-sky-nest", keywords: ["80", "bhk", "bptp", "bptp plots", "faridabad", "nest", "sector", "sky"] },
    { name: "Z Block BPTP", url: "faridabad/sector-80/index.html#z-block", keywords: ["80", "block", "bptp", "bptp plots", "faridabad", "sector"] },
    { name: "Amolik Plaza 81", url: "faridabad/sector-81-commercial/index.html#amolik-plaza-81", keywords: ["81", "amolik", "amolik plots", "commercial", "faridabad", "plaza", "sector"] },
    { name: "Puri 81 Business Hub", url: "faridabad/sector-81-commercial/index.html#puri-81-business-hub", keywords: ["81", "business", "commercial", "faridabad", "hub", "puri", "puri constructions", "sector"] },
    { name: "Puri 81 High Street Mall", url: "faridabad/sector-81-commercial/index.html#puri-81-high-street-mall", keywords: ["81", "commercial", "faridabad", "high", "mall", "puri", "puri constructions", "sector", "street"] },
    { name: "Vipul Plaza", url: "faridabad/sector-81-commercial/index.html#vipul-plaza", keywords: ["81", "commercial", "faridabad", "plaza", "sector", "vipul"] },
    { name: "BPTP District 81 (Block B)", url: "faridabad/sector-81/index.html#bptp-district-81-block-b", keywords: ["81", "block", "bptp", "bptp plots", "district", "faridabad", "sector"] },
    { name: "BPTP District 81 (Block C)", url: "faridabad/sector-81/index.html#bptp-district-81-block-c", keywords: ["81", "block", "bptp", "bptp plots", "district", "faridabad", "sector"] },
    { name: "BPTP Eden-Estate Plot", url: "faridabad/sector-81/index.html#bptp-eden-estate-plot", keywords: ["81", "bptp", "bptp plots", "eden", "estate", "faridabad", "plot", "sector"] },
    { name: "BPTP Park 81", url: "faridabad/sector-81/index.html#bptp-park-81", keywords: ["81", "bptp", "bptp plots", "faridabad", "park", "sector"] },
    { name: "Puri Anand Villa", url: "faridabad/sector-81/index.html#puri-anand-villa", keywords: ["81", "anand", "faridabad", "puri", "puri constructions", "sector", "villa"] },
    { name: "Puri VIP Floor", url: "faridabad/sector-81/index.html#puri-vip-floor", keywords: ["81", "faridabad", "floor", "puri", "puri constructions", "sector", "vip"] },
    { name: "Amolik Plaza 82", url: "faridabad/sector-82-commercial/index.html#amolik-plaza-82", keywords: ["82", "amolik", "amolik plots", "commercial", "faridabad", "plaza", "sector"] },
    { name: "Mansha Vega Street", url: "faridabad/sector-82-commercial/index.html#mansha-vega-street", keywords: ["82", "commercial", "faridabad", "mansha", "sector", "street", "vega"] },
    { name: "BPTP N Block Plot & SCO", url: "faridabad/sector-82/index.html#bptp-n-block-plot-sco", keywords: ["82", "block", "bptp", "bptp plots", "faridabad", "plot", "sco", "sector"] },
    { name: "Florida-Auric", url: "faridabad/sector-82/index.html#florida-auric", keywords: ["82", "auric", "faridabad", "florida", "sector"] },
    { name: "Puri Pranayam", url: "faridabad/sector-82/index.html#puri-pranayam", keywords: ["82", "faridabad", "pranayam", "puri", "puri constructions", "sector"] },
    { name: "SPR - Imperial Estate", url: "faridabad/sector-82/index.html#spr-imperial-estate", keywords: ["82", "estate", "faridabad", "imperial", "sector", "spr"] },
    { name: "Adore Arpnaam", url: "faridabad/sector-83/index.html#adore-arpnaam", keywords: ["83", "adore", "adore realtech", "arpnaam", "faridabad", "sector"] },
    { name: "BPTP LM Block Plot", url: "faridabad/sector-83/index.html#bptp-lm-block", keywords: ["83", "block", "bptp", "bptp plots", "faridabad", "lm", "plot", "sector"] },
    { name: "BPTP M Block Plot", url: "faridabad/sector-83/index.html#bptp-m-block-83", keywords: ["83", "block", "bptp", "bptp plots", "faridabad", "plot", "sector"] },
    { name: "Godrej Retreat", url: "faridabad/sector-83/index.html#godrej-retreat", keywords: ["83", "faridabad", "godrej", "retreat", "sector"] },
    { name: "Adore Legend 1", url: "faridabad/sector-84/index.html#adore-legend-1", keywords: ["84", "adore", "adore realtech", "faridabad", "legend", "sector"] },
    { name: "BPTP District 84 (B Block)", url: "faridabad/sector-84/index.html#bptp-district-84-b", keywords: ["84", "block", "bptp", "bptp plots", "district", "faridabad", "sector"] },
    { name: "BPTP Elite Premium", url: "faridabad/sector-84/index.html#bptp-elite-premium", keywords: ["84", "bptp", "bptp plots", "elite", "faridabad", "premium", "sector"] },
    { name: "BPTP J Block Plot", url: "faridabad/sector-84/index.html#bptp-j-block", keywords: ["84", "block", "bptp", "bptp plots", "faridabad", "plot", "sector"] },
    { name: "BPTP K Block Plot", url: "faridabad/sector-84/index.html#bptp-k-block", keywords: ["84", "block", "bptp", "bptp plots", "faridabad", "plot", "sector"] },
    { name: "BPTP L Block Plot", url: "faridabad/sector-84/index.html#bptp-l-block", keywords: ["84", "block", "bptp", "bptp plots", "faridabad", "plot", "sector"] },
    { name: "BPTP M Block Plot", url: "faridabad/sector-84/index.html#bptp-m-block-84", keywords: ["84", "block", "bptp", "bptp plots", "faridabad", "plot", "sector"] },
    { name: "Maulshree Heights (Arttech)", url: "faridabad/sector-84/index.html#maulshree-heights", keywords: ["84", "arttech", "faridabad", "heights", "maulshree", "sector"] },
    { name: "Puri Pratham", url: "faridabad/sector-84/index.html#puri-pratham", keywords: ["84", "faridabad", "pratham", "puri", "puri constructions", "sector"] },
    { name: "Coral Park (New Stone)", url: "faridabad/sector-84a/index.html#coral-park", keywords: ["84a", "coral", "faridabad", "new", "park", "sector", "stone"] },
    { name: "Adore Happy Home Grand", url: "faridabad/sector-85/index.html#adore-happy-home-grand", keywords: ["85", "adore", "adore realtech", "faridabad", "grand", "happy", "home", "sector"] },
    { name: "Amolik Sankalp", url: "faridabad/sector-85/index.html#amolik-sankalp", keywords: ["85", "amolik", "amolik plots", "faridabad", "sankalp", "sector"] },
    { name: "BPTP A Block Plots", url: "faridabad/sector-85/index.html#bptp-a-block", keywords: ["85", "block", "bptp", "bptp plots", "faridabad", "plots", "sector"] },
    { name: "BPTP B Block Plots", url: "faridabad/sector-85/index.html#bptp-b-block", keywords: ["85", "block", "bptp", "bptp plots", "faridabad", "plots", "sector"] },
    { name: "BPTP C Block Plots", url: "faridabad/sector-85/index.html#bptp-c-block", keywords: ["85", "block", "bptp", "bptp plots", "faridabad", "plots", "sector"] },
    { name: "BPTP D Block Plots", url: "faridabad/sector-85/index.html#bptp-d-block", keywords: ["85", "block", "bptp", "bptp plots", "faridabad", "plots", "sector"] },
    { name: "BPTP E Block Plots", url: "faridabad/sector-85/index.html#bptp-e-block", keywords: ["85", "block", "bptp", "bptp plots", "faridabad", "plots", "sector"] },
    { name: "S3 Green Avenue", url: "faridabad/sector-85/index.html#s3-green-avenue", keywords: ["85", "avenue", "faridabad", "green", "s3", "sector"] },
    { name: "Adore 1 Happy Home", url: "faridabad/sector-86/index.html#adore-1-happy-home", keywords: ["86", "adore", "adore realtech", "faridabad", "happy", "home", "sector"] },
    { name: "Amolik Residency", url: "faridabad/sector-86/index.html#amolik-residency", keywords: ["86", "amolik", "amolik plots", "faridabad", "residency", "sector"] },
    { name: "Block A (Sector 86)", url: "faridabad/sector-86/index.html#block-a", keywords: ["86", "block", "faridabad", "sector"] },
    { name: "Omaxe Heights", url: "faridabad/sector-86/index.html#omaxe-heights", keywords: ["86", "faridabad", "heights", "omaxe", "sector"] },
    { name: "Shiv Sai Ozones", url: "faridabad/sector-86/index.html#shiv-sai-ozones", keywords: ["86", "faridabad", "ozones", "sai", "sector", "shiv"] },
    { name: "Umang Summer Palms", url: "faridabad/sector-86/index.html#umang-summer-palms", keywords: ["86", "faridabad", "palms", "sector", "summer", "umang"] },
    { name: "Vashisth Heights", url: "faridabad/sector-86/index.html#vashisth-heights", keywords: ["86", "faridabad", "heights", "sector", "vashisth"] },
    { name: "SRS Pearl Floors", url: "faridabad/sector-87/index.html#srs-pearl-floors", keywords: ["87", "faridabad", "floors", "pearl", "sector", "srs"] },
    { name: "SRS Royal Hills", url: "faridabad/sector-87/index.html#srs-royal-hills", keywords: ["87", "faridabad", "hills", "royal", "sector", "srs"] },
    { name: "Amrit Homes", url: "faridabad/sector-88/index.html#amrit-homes", keywords: ["88", "amrit", "faridabad", "homes", "sector"] },
    { name: "B Block BPTP", url: "faridabad/sector-88/index.html#bptp-block-b-sec-88", keywords: ["88", "block", "bptp", "bptp plots", "faridabad", "sector"] },
    { name: "F Block BPTP", url: "faridabad/sector-88/index.html#bptp-block-f-sec-88", keywords: ["88", "block", "bptp", "bptp plots", "faridabad", "sector"] },
    { name: "Emerald Heights", url: "faridabad/sector-88/index.html#emerald-heights", keywords: ["88", "emerald", "faridabad", "heights", "sector"] },
    { name: "KST Whispering Heights", url: "faridabad/sector-88/index.html#kst-whispering-heights", keywords: ["88", "faridabad", "heights", "kst", "sector", "whispering"] },
    { name: "RPS Auria", url: "faridabad/sector-88/index.html#rps-auria", keywords: ["88", "auria", "faridabad", "rps", "rps group", "sector"] },
    { name: "RPS Palm", url: "faridabad/sector-88/index.html#rps-palm", keywords: ["88", "faridabad", "palm", "rps", "rps group", "sector"] },
    { name: "RPS Palm Drive", url: "faridabad/sector-88/index.html#rps-palm-drive", keywords: ["88", "drive", "faridabad", "palm", "rps", "rps group", "sector"] },
    { name: "RPS Savana", url: "faridabad/sector-88/index.html#rps-savana", keywords: ["88", "faridabad", "rps", "rps group", "savana", "sector"] },
    { name: "SRS Residency", url: "faridabad/sector-88/index.html#srs-residency", keywords: ["88", "faridabad", "residency", "sector", "srs"] },
    { name: "TDI Sainik Vihar", url: "faridabad/sector-88/index.html#tdi-sainik-vihar", keywords: ["88", "faridabad", "sainik", "sector", "tdi", "vihar"] },
    { name: "TDI Soha SCO", url: "faridabad/sector-88/index.html#tdi-soha-sco", keywords: ["88", "faridabad", "sco", "sector", "soha", "tdi"] },
    { name: "Adore Samridhi", url: "faridabad/sector-89/index.html#adore-samridhi", keywords: ["89", "adore", "adore realtech", "faridabad", "samridhi", "sector"] },
    { name: "G Block BPTP", url: "faridabad/sector-89/index.html#bptp-block-g-sec-89", keywords: ["89", "block", "bptp", "bptp plots", "faridabad", "sector"] },
    { name: "Honour Homes", url: "faridabad/sector-89/index.html#honour-homes", keywords: ["89", "faridabad", "homes", "honour", "sector"] },
    { name: "Luxuria", url: "faridabad/sector-89/index.html#luxuria", keywords: ["89", "faridabad", "luxuria", "sector"] },
    { name: "Piyush Heights", url: "faridabad/sector-89/index.html#piyush-heights", keywords: ["89", "faridabad", "heights", "piyush", "sector"] },
    { name: "Puri AmanVilas", url: "faridabad/sector-89/index.html#puri-amanvilas", keywords: ["89", "amanvilas", "faridabad", "puri", "puri constructions", "sector"] },
    { name: "TDI Plots", url: "faridabad/sector-89/index.html#tdi-plots", keywords: ["89", "faridabad", "plots", "sector", "tdi"] },
    { name: "Adore Smart City 1 & 2", url: "faridabad/sector-97-98/index.html#adore-smart-city", keywords: ["97", "98", "adore", "adore realtech", "city", "faridabad", "sector", "smart"] },
    { name: "Amolik Asterwood", url: "faridabad/sector-97-98/index.html#amolik-asterwood", keywords: ["97", "98", "amolik", "amolik plots", "asterwood", "faridabad", "sector"] },
    { name: "Amolik Blossom Wood", url: "faridabad/sector-97-98/index.html#amolik-blossom-wood", keywords: ["97", "98", "amolik", "amolik plots", "blossom", "faridabad", "sector", "wood"] },
    { name: "Amolik Concordia", url: "faridabad/sector-97-98/index.html#amolik-concordia", keywords: ["97", "98", "amolik", "amolik plots", "concordia", "faridabad", "sector"] },
    { name: "Anushree Green", url: "faridabad/sector-97-98/index.html#anushree-green", keywords: ["97", "98", "anushree", "faridabad", "green", "sector"] },
    { name: "Emerald Maple Floors", url: "faridabad/sector-97-98/index.html#emerald-maple-floors", keywords: ["97", "98", "emerald", "faridabad", "floors", "maple", "sector"] },
    { name: "Ladimora", url: "faridabad/sector-97-98/index.html#ladimora", keywords: ["97", "98", "faridabad", "ladimora", "sector"] },
    { name: "Mansha Oaks", url: "faridabad/sector-97-98/index.html#mansha-oaks", keywords: ["97", "98", "faridabad", "mansha", "oaks", "sector"] },
    { name: "Neal City", url: "faridabad/sector-97-98/index.html#neal-city", keywords: ["97", "98", "city", "faridabad", "neal", "sector"] },
    { name: "Olive Homes", url: "faridabad/sector-97-98/index.html#olive-homes", keywords: ["97", "98", "faridabad", "homes", "olive", "sector"] },
    { name: "OMAXE City", url: "faridabad/sector-97-98/index.html#omaxe-city", keywords: ["97", "98", "city", "faridabad", "omaxe", "sector"] },
    { name: "Soha Olive Town", url: "faridabad/sector-97-98/index.html#soha-olive-town", keywords: ["97", "98", "faridabad", "olive", "sector", "soha", "town"] },
    { name: "Ajeetgarh Residential Plots", url: "projects/ajeetgarh.html#ajeetgarh", keywords: ["ajeetgarh", "plots", "projects", "residential"] },
    { name: "Dholera Smart City Plots", url: "projects/dholera.html#dholera", keywords: ["city", "dholera", "plots", "projects", "smart"] },
    { name: "Garhmukteshwar Plots", url: "projects/garhmukteshwar.html#garhmukteshwar", keywords: ["garhmukteshwar", "plots", "projects"] },
    { name: "Gurugram Plots", url: "projects/gurugram.html#gurugram", keywords: ["gurugram", "plots", "projects"] },
    { name: "Khatu Shyam Plots", url: "projects/khatu-shyam.html#khatu-shyam", keywords: ["khatu", "plots", "projects", "shyam"] },
    { name: "Palwal Residential Plots", url: "projects/palwal.html#palwal", keywords: ["palwal", "plots", "projects", "residential"] },
    { name: "Prithla Residential Plots", url: "projects/prithla.html#prithla", keywords: ["plots", "prithla", "projects", "residential"] },
    { name: "Upcoming Plots Sector 82", url: "projects/sector-82.html#faridabad", keywords: ["82", "plots", "projects", "sector", "upcoming"] },
    { name: "Sohna Plots", url: "projects/sohna.html#sohna", keywords: ["plots", "projects", "sohna"] },
    { name: "Vrindavan Residential Plots", url: "projects/vrindavan.html#vrindavan", keywords: ["plots", "projects", "residential", "vrindavan"] },
  ];
 
  function getLocText(url) {
    if (url.includes('sector-72-73')) return 'Sector 72-73, Faridabad';
    if (url.includes('sector-104')) return 'Sector 104, Faridabad';
    if (url.includes('sector-106')) return 'Sector 106, Faridabad';
    if (url.includes('sector-107')) return 'Sector 107, Faridabad';
    if (url.includes('sector-110')) return 'Sector 110, Faridabad';
    if (url.includes('sector-113-114') || url.includes('bhumika-the-icon') || url.includes('navraj-the-marq')) return 'Sector 113-114, Faridabad';
    if (url.includes('sector-119')) return 'Sector 119, Faridabad';
    if (url.includes('sector-121-123')) return 'Sector 121-123, Faridabad';
    if (url.includes('sector-127')) return 'Sector 127, Faridabad';
    if (url.includes('nh2-mathura-road')) return 'NH2 Mathura Road, Faridabad';
    if (url.includes('rps-12th-avenue')) return 'Sector 88, Faridabad';
    if (url.includes('imt')) return 'IMT Faridabad';
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

// openBrochureModal is declared globally at the end of the file.

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

  // Clean web-safe filename resolution for Linux/Hostinger server compatibility
  let resolvedPdf = pdfName;
  const lower = (pdfName || '').toLowerCase();
  
  if (lower.includes('wisteria')) resolvedPdf = 'The_Wisterias_rps.pdf';
  else if (lower.includes('bhumika') && (lower.includes('the icon') || lower.includes('the_icon') || lower.includes('icon'))) resolvedPdf = 'bhumika the icon.pdf';
  else if (lower.includes('bhumika')) resolvedPdf = 'bhumika_brochure.pdf';
  else if (lower.includes('navraj') && (lower.includes('floor') || lower.includes('127'))) resolvedPdf = 'navraj builder floor sec 127.pdf';
  else if (lower.includes('navraj')) resolvedPdf = 'navraj_the_marq_brochure.pdf';
  else if (lower.includes('dameera')) resolvedPdf = 'Dameera City Brochure sec 121.pdf';
  else if (lower.includes('legend 1') || (lower.includes('legend') && lower.includes('84'))) resolvedPdf = 'adore legend 1 sec 84.pdf';
  else if (lower.includes('concordia')) resolvedPdf = 'amolik concordia sec 97-98.pdf';
  else if (lower.includes('preals') || lower.includes('pearl floor') || (lower.includes('srs') && lower.includes('87'))) resolvedPdf = 'srs preals floors sec 87.pdf';
  else if (lower.includes('florida') || lower.includes('auric')) resolvedPdf = 'Florida Auric sec 82.pdf';
  else if (lower.includes('sainik vihar') || lower.includes('sanik vihar')) resolvedPdf = 'TDI Sanik Vihar sec 88.pdf';
  else if (lower.includes('rps palm drive')) resolvedPdf = 'rps_palm_drive_sector_88.pdf';
  else if (lower.includes('rps palm')) resolvedPdf = 'rps_palm_sector_88.pdf';
  else if (lower.includes('tdi soha')) resolvedPdf = 'tdi_soha_sco_sector_88.pdf';

  activePdf = resolvedPdf;
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

  const formData = new FormData();
  formData.append('full_name', name);
  formData.append('phone_number', phone);
  formData.append('email', email);
  formData.append('plot_interest', 'Brochure Download Popup');
  formData.append('message', 'Brochure requested' + (projName ? ' for ' + projName : ''));
  formData.append('ajax', '1');

  const submitBtn = document.querySelector('#brochureForm button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = "Downloading...";
  }

  const triggerDirectDownload = () => {
    if (brochureUrl) {
      const finalUrl = encodeURI(brochureUrl);
      const filename = brochureUrl.substring(brochureUrl.lastIndexOf('/') + 1) || 'brochure.pdf';
      
      const link = document.createElement('a');
      link.href = finalUrl;
      link.setAttribute('download', filename);
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        if (link.parentNode) link.parentNode.removeChild(link);
      }, 200);
    }
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = "Download Now";
    }
    closeBrochureModal();
  };

  fetch(getSendInquiryUrl(), {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => console.log('Brochure inquiry saved to database:', data))
  .catch(err => console.error('Error submitting brochure popup to DB:', err))
  .finally(() => {
    triggerDirectDownload();
  });
}

window.openBrochureModal = openBrochureModal;
window.closeBrochureModal = closeBrochureModal;
window.handleBrochureSubmit = handleBrochureSubmit;

