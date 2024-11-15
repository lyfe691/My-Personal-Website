class NavBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.theme = 'dark';
    this.hasAnimated = false;
  }

  connectedCallback() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    this.theme = isDarkMode ? 'dark' : 'light';
    this.render();
    this.setupScrollListener();
    this.setupThemeObserver();
  }

  setupThemeObserver() {
    const body = document.body;
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const isDarkMode = body.classList.contains('dark-mode');
          const newTheme = isDarkMode ? 'dark' : 'light';
          if (newTheme !== this.theme) {
            this.theme = newTheme;
            this.render();
          }
        }
      }
    });
    observer.observe(body, { attributes: true });
    const isDarkMode = body.classList.contains('dark-mode');
    this.theme = isDarkMode ? 'dark' : 'light';
  }

  render() {
    const theme = this.theme;
    const logoUrl = this.getAttribute('logo-url') || '#';

    const styles = `
      <style>
        /* Import Montserrat Font */
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap');

        /* Enhanced Variables */
        :host {
          --nav-primary: ${theme === 'dark' ? '#7C3AED' : '#6D28D9'};
          --nav-primary-hover: ${theme === 'dark' ? '#8B5CF6' : '#7C3AED'};
          --nav-text: ${theme === 'dark' ? '#E5E7EB' : '#58487a'};
          --nav-bg: ${theme === 'dark' ? 'rgba(17, 24, 39, 0.85)' : 'rgba(255, 255, 255, 0.85)'};
          --nav-hover-text: ${theme === 'dark' ? '#FFFFFF' : '#000000'};
          --nav-hover-bg: ${theme === 'dark' ? 'rgba(124, 58, 237, 0.1)' : 'rgba(109, 40, 217, 0.1)'};
          --nav-shadow: ${theme === 'dark' 
            ? '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)' 
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.05)'};
          --nav-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          font-family: 'Montserrat', sans-serif; /* Updated font-family */
        }

        @keyframes dropNav {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .nav-container {
          background: var(--nav-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: var(--nav-shadow);
          transition: var(--nav-transition);
          border-bottom: 1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
        }

        .nav-container.animate {
          animation: dropNav 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0.75rem 2rem;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          transition: var(--nav-transition);
        }

        .nav-logo img {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          object-fit: cover;
          transition: var(--nav-transition);
        }

        .nav-logo:hover img {
          transform: scale(1.05);
        }

        .nav-links {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 1.5rem;
          flex-direction: row;
        }

        .nav-link {
          color: var(--nav-text);
          text-decoration: none;
          padding: 0.5rem 1rem;
          transition: var(--nav-transition);
          border-radius: 8px;
          text-align: center;
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: var(--nav-primary);
          transition: var(--nav-transition);
          transform: translateX(-50%);
        }

        .nav-link:hover {
          color: var(--nav-primary);
          background: var(--nav-hover-bg);
        }

        .nav-link:hover::after {
          width: 30px;
        }

        .dark-mode-toggle {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          color: var(--nav-text);
          font-size: 1.5rem;
          transition: var(--nav-transition);
          border-radius: 8px;
        }

        .dark-mode-toggle:hover {
          color: var(--nav-primary);
          background: var(--nav-hover-bg);
          transform: rotate(10deg);
        }

        .feather {
          width: 22px;
          height: 22px;
          stroke-width: 2;
          transition: var(--nav-transition);
        }

        /* Nav Toggle - Hidden by default for desktop */
        .nav-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          transition: var(--nav-transition);
          z-index: 1001;
          position: relative;
        }

        .nav-toggle span {
          display: block;
          width: 25px;
          height: 3px;
          background: var(--nav-text);
          margin: 5px 0;
          transition: var(--nav-transition);
          opacity: 0;
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .nav-container {
            background: transparent;
            box-shadow: none;
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
            transform: none !important;
            animation: none;
            opacity: 1;
            border-bottom: none;
          }

          .nav-content {
            opacity: 1;
            pointer-events: auto;
          }

          .dark-mode-toggle {
            display: none;
          }

          .nav-logo {
            display: none;
          }

          .nav-toggle {
            display: block;
            position: fixed;
            top: 1rem;
            right: 1.5rem;
            z-index: 1002;
          }

          .nav-toggle span {
            opacity: 1;
          }

          .nav-links {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: 100vw;
            flex-direction: column;
            background: var(--nav-bg);
            align-items: center;
            justify-content: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.4s ease-in-out;
            z-index: 999;
          }

          .nav-links.active {
            display: flex;
            opacity: 1;
            pointer-events: auto;
          }

          .nav-link {
            font-size: 1.5rem;
            margin: 1rem 0;
            padding: 1rem 2rem;
            width: 100%;
          }

          .nav-link::after {
            display: none;
          }

          .nav-toggle.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
          }

          .nav-toggle.active span:nth-child(2) {
            opacity: 0;
          }

          .nav-toggle.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
          }
        }
      </style>
    `;

    const template = `
      ${styles}
      <div class="nav-container">
        <div class="nav-content">
          <a href="${logoUrl}" class="nav-logo">
            <img src="assets/favicon.png" alt="Logo">
          </a>
          <nav>
            <ul class="nav-links" id="nav-links">
              <li><a href="#about" class="nav-link">About</a></li>
              <li><a href="#experience" class="nav-link">Experience</a></li>
              <li><a href="#projects" class="nav-link">Projects</a></li>
              <li><a href="#skills" class="nav-link">Skills</a></li>
              <li><a href="#contact" class="nav-link">Contact</a></li>
            </ul>
          </nav>
          <button class="dark-mode-toggle" aria-label="Toggle dark mode">
            <i data-feather="${theme === 'dark' ? 'sun' : 'moon'}"></i>
          </button>
          <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="nav-links">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    `;

    const scrollPosition = window.scrollY;
    this.shadowRoot.innerHTML = template;
    window.scrollTo(0, scrollPosition);
    this.replaceFeatherIcons();
    this.setupEventListeners();

    const navContainer = this.shadowRoot.querySelector('.nav-container');
    const screenWidth = window.innerWidth;

    if (!this.hasAnimated && screenWidth > 768 && window.scrollY === 0) {
      navContainer.classList.add('animate');
      this.hasAnimated = true;

      navContainer.addEventListener('animationend', () => {
        navContainer.classList.remove('animate');
      });
    }
  }

  replaceFeatherIcons() {
    const icons = this.shadowRoot.querySelectorAll('i[data-feather]');
    icons.forEach((icon) => {
      const featherIcon = feather.icons[icon.getAttribute('data-feather')];
      if (featherIcon) {
        icon.outerHTML = featherIcon.toSvg();
      }
    });
  }

  setupEventListeners() {
    const navToggle = this.shadowRoot.querySelector('.nav-toggle');
    const navLinks = this.shadowRoot.querySelector('.nav-links');
    const darkModeToggle = this.shadowRoot.querySelector('.dark-mode-toggle');

    navToggle.addEventListener('click', () => {
      const isActive = navToggle.classList.contains('active');
      navToggle.setAttribute('aria-expanded', !isActive);
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    this.shadowRoot.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!this.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });

    darkModeToggle.addEventListener('click', () => {
      const isDarkMode = document.body.classList.contains('dark-mode');
      const newTheme = isDarkMode ? 'light' : 'dark';
      this.setTheme(newTheme);
    });
  }

  setTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('theme', theme);
    this.render();
  }

  setupScrollListener() {
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    window.addEventListener(
      'scroll',
      () => {
        const navContainer = this.shadowRoot.querySelector('.nav-container');
        if (!navContainer) return;

        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const isScrollingDown = scrollTop > lastScrollTop;
        const screenWidth = window.innerWidth;

        if (screenWidth > 768) {
          if (isScrollingDown) {
            navContainer.style.transform = 'translateY(-100%)';
          } else {
            navContainer.style.transform = 'translateY(0)';
          }
        } else {
          navContainer.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
      },
      false
    );
  }
}

customElements.define('nav-bar', NavBar);
