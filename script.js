/**
 * MS LABS - SINAN WEB DEVELOPER PORTFOLIO
 * High Performance Interactivity & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initHeaderScroll();
  initNavDrawer();
  initContactModal();
  initProjectModals();
  initCopyEmail();
  initSmoothScroll();
  initPhoneSanitizer();
  initGoogleForm();
});

/* ==========================================================================
   1. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
   ========================================================================== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-up');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   2. HEADER STICKY EFFECTS
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   3. NAVIGATION DRAWER OVERLAY
   ========================================================================== */
function initNavDrawer() {
  const toggleBtn = document.getElementById('menuToggleBtn');
  const closeBtn = document.getElementById('navCloseBtn');
  const navDrawer = document.getElementById('navDrawer');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!navDrawer) return;

  function openDrawer() {
    navDrawer.classList.add('active');
    navDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    navDrawer.classList.remove('active');
    navDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  navDrawer.addEventListener('click', (e) => {
    if (e.target === navDrawer) closeDrawer();
  });
}

/* ==========================================================================
   4. CONTACT MODAL OVERLAY
   ========================================================================== */
function initContactModal() {
  const openBtns = document.querySelectorAll('.open-contact-btn');
  const closeBtn = document.getElementById('closeContactModal');
  const contactModal = document.getElementById('contactModal');

  if (!contactModal) return;

  function openModal() {
    contactModal.classList.add('active');
    contactModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    contactModal.classList.remove('active');
    contactModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => btn.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) closeModal();
  });

  // Global helper function so Google Form response can close the modal
  window.closeContactModal = closeModal;
}

/* ==========================================================================
   5. PHONE NUMBER INPUT SANITIZER
   ========================================================================== */
function initPhoneSanitizer() {
  const phoneInput = document.getElementById('contactNo') || document.getElementById('clientPhone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      // Removes any character that isn't a digit (0-9) or '+'
      e.target.value = e.target.value.replace(/[^0-9+]/g, '');
    });
  }
}

/* ==========================================================================
   6. PORTFOLIO PROJECT CASE STUDY MODALS
   ========================================================================== */
const projectData = {
  cofpi: {
    title: 'COFPI',
    tag: 'Coffee Shop Landing Page',
    img: 'assets/cofpi2.png',
    desc: 'COFPI is a high-converting, luxury landing page built for an artisanal coffee roastery. Engineered with dark aesthetic themes, responsive grid showcases, and smooth micro-interactions to drive customer orders.',
    tech: ['HTML5', 'Vanilla CSS3', 'JavaScript ES6', 'Responsive Grid', 'SEO & Performance']
  },
  cloudvault: {
    title: 'CLOUDVAULT AI',
    tag: 'SaaS Platform Website',
    img: 'assets/cloudvault2.png',
    desc: 'CLOUDVAULT AI provides an intuitive interface for an enterprise cloud storage and generative AI service. Designed with vibrant glassmorphism accents, live analytics preview cards, and ultra-fast page load metrics.',
    tech: ['HTML5', 'CSS Grid & Flexbox', 'Vanilla JS', 'SVG Graphics', 'Accessibility']
  },
  arkon: {
    title: 'ARKON ARCHITECTS',
    tag: 'Architecture Studio Website',
    img: 'assets/arkon_architects.png',
    desc: 'ARKON ARCHITECTS showcases architectural blueprints and finished luxury residences. Features clean editorial typography, immersive project galleries, and custom layout structures.',
    tech: ['HTML5', 'Custom CSS Architecture', 'Intersection Observer', 'Mobile First']
  }
};

function initProjectModals() {
  const projectCards = document.querySelectorAll('.project-card');
  const projectModal = document.getElementById('projectModal');
  const closeBtn = document.getElementById('closeProjectModal');
  const modalContent = document.getElementById('projectModalContent');
  const showMoreBtn = document.getElementById('showMoreProjectsBtn');

  if (!projectModal || !modalContent) return;

  function openProject(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    modalContent.innerHTML = `
      <img src="${data.img}" alt="${data.title}" class="modal-project-img">
      <span class="modal-project-tag">${data.tag}</span>
      <h2 class="modal-project-title font-display">${data.title}</h2>
      <p class="modal-project-desc">${data.desc}</p>
      
      <h4 style="font-family: var(--font-display); margin-bottom: 0.5rem; text-transform: uppercase;">Technologies Used</h4>
      <div class="tech-stack-list">
        ${data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
      </div>

      <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
        <button class="btn btn-black open-contact-btn-modal">INQUIRE ABOUT SIMILAR PROJECT</button>
      </div>
    `;

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Connect trigger inside modal
    const modalInquireBtn = modalContent.querySelector('.open-contact-btn-modal');
    if (modalInquireBtn) {
      modalInquireBtn.addEventListener('click', () => {
        closeProject();
        const contactModal = document.getElementById('contactModal');
        if (contactModal) contactModal.classList.add('active');
      });
    }
  }

  function closeProject() {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const pid = card.getAttribute('data-project');
      openProject(pid);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeProject);
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) closeProject();
  });

  // Show More Button handler
  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
      const grid = document.querySelector('.portfolio-grid');
      if (grid && !document.getElementById('extraProjectCard')) {
        const newCard = document.createElement('article');
        newCard.className = 'project-card fade-up visible';
        newCard.id = 'extraProjectCard';
        newCard.setAttribute('data-project', 'cofpi');
        grid.appendChild(newCard);
        newCard.addEventListener('click', () => openProject('cofpi'));
        showMoreBtn.innerHTML = 'ALL PROJECTS DISPLAYED ✓';
        showMoreBtn.disabled = true;
      }
    });
  }
}

/* ==========================================================================
   7. COPY EMAIL FEATURE
   ========================================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const emailText = document.getElementById('emailText');

  if (copyBtn && emailText) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailText.textContent).then(() => {
        const origText = copyBtn.textContent;
        copyBtn.textContent = 'Copied! ✓';
        copyBtn.style.backgroundColor = '#2d6a4f';
        setTimeout(() => {
          copyBtn.textContent = origText;
          copyBtn.style.backgroundColor = '';
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  }
}

/* ==========================================================================
   8. SMOOTH SCROLL FOR NAV LINKS
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || !href) return;
      const targetEl = document.querySelector(href);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* ==========================================================================
   9. GOOGLE FORM SUBMISSION (SILENT BACKGROUND SUBMIT)
   ========================================================================== */
function initGoogleForm() {
  const formElement = document.getElementById('contactForm') || document.getElementById('ContactForm') || document.getElementById('calicutBulkEnquiryForm');
  const iframe = document.getElementById('hidden_iframe');
  let isSubmitting = false;

  if (!formElement) return;

  formElement.addEventListener('submit', function(e) {
    let formIsValid = true;
    const requiredFields = formElement.querySelectorAll('[required]');

    // Local validation check
    requiredFields.forEach(input => {
      input.parentElement.classList.remove('invalid-field');
      if (!input.value.trim()) {
        input.parentElement.classList.add('invalid-field');
        formIsValid = false;
      }
    });

    // If validation fails, stop submission
    if (!formIsValid) {
      e.preventDefault();
      return;
    }

    // Flag that we are submitting so iframe listener triggers
    isSubmitting = true;

    // UI Feedback on button
    const submitBtn = formElement.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.textContent = 'TRANSMITTING...';
      submitBtn.disabled = true;
    }

    // DO NOT call e.preventDefault() here! 
    // Letting it submit to hidden_iframe keeps the user on your site.
  });

  // Fires when Google Forms responds inside the hidden iframe
  if (iframe) {
    iframe.addEventListener('load', () => {
      if (!isSubmitting) return; // Prevent triggering on initial page load

      const submitBtn = formElement.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.textContent = 'SENT SUCCESSFULLY ✓';
        submitBtn.style.backgroundColor = '#2d6a4f';
      }

      formElement.reset();
      isSubmitting = false;

      // Show your site's custom alert/modal
      if (typeof showSuccessAlert === 'function') {
        showSuccessAlert();
      }

      setTimeout(() => {
        if (window.closeContactModal) window.closeContactModal();
        if (submitBtn) {
          submitBtn.textContent = 'TRANSMIT BULK REQUEST';
          submitBtn.style.backgroundColor = '';
          submitBtn.disabled = false;
        }
      }, 2000);
    });
  }

  // Clear red box on typing
  formElement.querySelectorAll('[required]').forEach(input => {
    input.addEventListener('input', () => {
      if (input.value.trim()) {
        input.parentElement.classList.remove('invalid-field');
      }
    });
  });
}