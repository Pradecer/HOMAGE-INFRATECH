/* ==========================================================================
   HOMAGE INFRATECH - GLOBAL JAVASCRIPT
   Est. 2005 | Faridabad, Haryana
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initStickyHeader();
  initActiveLink();
  initContactQueryPrefill();
  initPriceLinks();
  initScrollAnimations();
  initOnloadPopup();
  initNavSearch();
});

/**
 * Mobile Navbar Toggle and Dropdown / Submenu Handlers
 */
function initNavbar() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Prevent scrolling when mobile menu is open
      if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
        // Close all mobile dropdowns when mobile menu closes
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
  // If the user has already submitted an enquiry, don't show the popup
  if (localStorage.getItem('homage_enquiry_submitted') === 'true') {
    return;
  }

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
    let pathPrefix = '';
    const pathname = window.location.pathname;
    if (pathname.includes('/about-us/') || pathname.includes('/projects/') || pathname.includes('/gallery/')) {
      pathPrefix = '../';
    }
    
    // Construct HTML
    const popupHTML = `
      <div id="onload-popup" class="modal">
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
            <h3 style="color: var(--primary-dark); font-weight: 700; font-size: 1.4rem;">Exclusive Plot Deals</h3>
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
            interest: 'onload_popup',
            message: 'Inquiry submitted from automatically loaded homepage popup',
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
            
            closePopup();
            showToast("Inquiry submitted! Our advisor will call you shortly.");
          }, 1000);
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
    if (url.includes('gurugram')) return 'Dwarka Expressway, Gurugram';
    if (url.includes('sohna')) return 'Sohna, Gurugram';
    if (url.includes('prithla')) return 'Prithla, Faridabad';
    if (url.includes('palwal')) return 'Palwal';
    if (url.includes('vrindavan') || url.includes('matrabhumi')) return 'Vrindavan';
    if (url.includes('ajeetgarh')) return 'Ajeetgarh, Rajasthan';
    if (url.includes('khatu-shyam')) return 'Khatu Shyam, Rajasthan';
    if (url.includes('garhmukteshwar')) return 'Garhmukteshwar';
    if (url.includes('dholera')) return 'Dholera (Gujarat)';
    if (url.includes('sector-82')) return 'Sector 82, Faridabad';
    return '';
  }

  function getPagePrefix() {
    let prefix = '';
    if (window.location.pathname.includes('/sector-75/') || window.location.pathname.includes('/sector-76/') || window.location.pathname.includes('/sector-77/')) {
      prefix = '../../';
    } else if (window.location.pathname.includes('/about-us/') ||
               window.location.pathname.includes('/contact-us/') ||
               window.location.pathname.includes('/gallery/') ||
               window.location.pathname.includes('/projects/') ||
               window.location.pathname.includes('/testimonials/') ||
               window.location.pathname.includes('/faridabad/')) {
      prefix = '../';
    }
    return prefix;
  }

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
            const prefix = getPagePrefix();
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
          const prefix = getPagePrefix();
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
          const prefix = getPagePrefix();
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
  let pathPrefix = '';
  const pathname = window.location.pathname;
  if (pathname.includes('/sector-75/') || pathname.includes('/sector-76/') || pathname.includes('/sector-77/')) {
    pathPrefix = '../../';
  } else if (pathname.includes('/about-us/') || pathname.includes('/projects/') || pathname.includes('/gallery/') || pathname.includes('/testimonials/') || pathname.includes('/contact-us/') || pathname.includes('/faridabad/')) {
    pathPrefix = '../';
  }

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
        let pathPrefix = '';
        const pathname = window.location.pathname;
        if (pathname.includes('/sector-75/') || pathname.includes('/sector-76/') || pathname.includes('/sector-77/')) {
          pathPrefix = '../../';
        } else if (pathname.includes('/about-us/') || pathname.includes('/projects/') || pathname.includes('/gallery/') || pathname.includes('/testimonials/') || pathname.includes('/contact-us/') || pathname.includes('/faridabad/')) {
          pathPrefix = '../';
        }

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

