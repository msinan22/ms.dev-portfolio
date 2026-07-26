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
   4. CONTACT MODAL & FORM
   ========================================================================== */
function initContactModal() {
  const openBtns = document.querySelectorAll('.open-contact-btn');
  const closeBtn = document.getElementById('closeContactModal');
  const contactModal = document.getElementById('contactModal');
  const contactForm = document.getElementById('contactForm');

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

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = 'SENDING...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = 'MESSAGE SENT ✓';
        submitBtn.style.backgroundColor = '#2d6a4f';
        contactForm.reset();

        setTimeout(() => {
          closeModal();
          submitBtn.textContent = originalText;
          submitBtn.style.backgroundColor = '';
          submitBtn.disabled = false;
        }, 1800);
      }, 1000);
    });
  }
}

const phoneInput = document.getElementById('contactNo');

phoneInput.addEventListener('input', (e) => {
  // Removes any character that isn't a digit (0-9)
  e.target.value = e.target.value.replace(/[^0-9+]/g, '');
});

/* ==========================================================================
   5. PORTFOLIO PROJECT CASE STUDY MODALS
   ========================================================================== */
const projectData = {
  cofpi: {
    title: 'COFPI',
    tag: 'Coffee Shop Landing Page',
    img: 'assets/cofpi.png',
    desc: 'COFPI is a high-converting, luxury landing page built for an artisanal coffee roastery. Engineered with dark aesthetic themes, responsive grid showcases, and smooth micro-interactions to drive customer orders.',
    tech: ['HTML5', 'Vanilla CSS3', 'JavaScript ES6', 'Responsive Grid', 'SEO & Performance']
  },
  cloudvault: {
    title: 'CLOUDVAULT AI',
    tag: 'SaaS Platform Website',
    img: 'assets/cloudvault.png',
    desc: 'CLOUDVAULT AI provides an intuitive interface for a enterprise cloud storage and generative AI service. Designed with vibrant glassmorphism accents, live analytics preview cards, and ultra-fast page load metrics.',
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
        document.getElementById('contactModal').classList.add('active');
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
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProject();
    });
  }

  // Show More Button handler
  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
      const grid = document.querySelector('.portfolio-grid');
      // Append an extra demo card if not already added
      if (!document.getElementById('extraProjectCard')) {
        const newCard = document.createElement('article');
        newCard.className = 'project-card fade-up visible';
        newCard.id = 'extraProjectCard';
        newCard.setAttribute('data-project', 'cofpi');
        /*
        newCard.innerHTML = `
          <div class="project-media">
            <img src="assets/cofpi.png" alt="Featured Portfolio Work" loading="lazy">
            <div class="project-overlay">
              <span class="view-btn">View Details</span>
            </div>
          </div>
          <div class="project-info">
            <h3 class="project-title">METRO DIGITAL</h3>
            <p class="project-desc">Modern Agency Portfolio & Creative Studio</p>
          </div> 
        `;
        */
        grid.appendChild(newCard);
        newCard.addEventListener('click', () => openProject('cofpi'));
        showMoreBtn.innerHTML = 'ALL PROJECTS DISPLAYED ✓';
        showMoreBtn.disabled = true;
      }
    });
  }
}

/* ==========================================================================
   6. COPY EMAIL FEATURE
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
   7. SMOOTH SCROLL FOR NAV LINKS
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
