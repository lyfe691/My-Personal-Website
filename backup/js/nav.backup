class NavBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.theme = 'dark'; // Default theme
    this.hasAnimated = false; 
  }

  connectedCallback() {
    // Set initial theme based on the body class
    const isDarkMode = document.body.classList.contains('dark-mode');
    this.theme = isDarkMode ? 'dark' : 'light';
    this.render();
    this.setupScrollListener();
    this.setupThemeObserver();
  }

  setupThemeObserver() {
    const body = document.body;

    // observe changes
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const isDarkMode = body.classList.contains('dark-mode');
          const newTheme = isDarkMode ? 'dark' : 'light';
          if (newTheme !== this.theme) {
            this.theme = newTheme;
            this.render(); // re-render
          }
        }
      }
    });
    observer.observe(body, { attributes: true });

    // Set initial theme
    const isDarkMode = body.classList.contains('dark-mode');
    this.theme = isDarkMode ? 'dark' : 'light';
  }

  render() {
    const theme = this.theme;
    const logoUrl = this.getAttribute('logo-url') || '#';

    const styles = `
      <style>
        /* Variables */
        :host {
          --nav-primary: ${theme === 'dark' ? '#61dafb' : '#3498db'};
          --nav-text: ${theme === 'dark' ? '#ffffff' : '#333333'};
          --nav-bg: ${theme === 'dark' ? 'rgba(28, 30, 34, 0.6)' : 'rgba(255, 255, 255, 0.6)'};
          --nav-hover-text: ${theme === 'dark' ? '#ffffff' : '#000000'};
          --nav-shadow: 0 4px 20px ${theme === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)'};
          --nav-hover-bg: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
          --nav-transition: all 0.4s ease-in-out;

          display: block;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          font-family: 'Poppins', sans-serif;
        }

        /* Keyframes for dropNav animation */
        @keyframes dropNav {
          0% {
            opacity: 0;
            transform: translateY(-50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Container */
        .nav-container {
          background: var(--nav-bg);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          box-shadow: var(--nav-shadow);
          transition: var(--nav-transition);
          opacity: 1; /* Ensure opacity is set */
        }

        /* Apply the animation only when .animate class is present */
        .nav-container.animate {
          animation: dropNav 0.8s ease-out forwards;
        }

        /* Content */
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 2rem;
        }

        /* Logo */
        .nav-logo {
          display: flex;
          align-items: center;
          transition: var(--nav-transition);
        }

        .nav-logo img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        /* Links */
        .nav-links {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 2rem;
          flex-direction: row;
        }

        .nav-link {
          color: var(--nav-text);
          text-decoration: none;
          padding: 0.5rem 1.5rem;
          transition: var(--nav-transition);
          border-radius: 8px;
          text-align: center;
        }

        .nav-link:hover,
        .nav-link:focus {
          background: var(--nav-hover-bg);
          color: var(--nav-primary);
        }

        /* Dark Mode Toggle */
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
        }

        .dark-mode-toggle:hover {
          color: var(--nav-primary);
        }

        /* Feather icons styling */
        .feather {
          width: 24px;
          height: 24px;
        }

        /* Toggle Button */
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
          background: #63648f;
          margin: 5px 0;
          transition: var(--nav-transition);
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .nav-container {
            background: transparent;
            box-shadow: none;
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
            transform: none !important;
            animation: none; /* Disable animation on mobile */
            opacity: 1; /* Ensure opacity is set */
          }

          .nav-content {
            opacity: 1;
            pointer-events: auto;
          }

          /* Hide the dark mode toggle on mobile */
          .dark-mode-toggle {
            display: none;
          }

          /* Hide the logo on mobile */
          .nav-logo {
            display: none;
          }

          /* Show the hamburger menu */
          .nav-toggle {
            display: block;
            position: fixed;
            top: 1rem;
            right: 1.5rem;
            z-index: 1002;
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

    // Save a reference to the current scroll position
    const scrollPosition = window.scrollY;

    // Re-render the shadow DOM
    this.shadowRoot.innerHTML = template;

    // Restore the scroll position after re-rendering
    window.scrollTo(0, scrollPosition);

    // Replace feather icons in the shadow DOM
    this.replaceFeatherIcons();

    // Setup event listeners after rendering
    this.setupEventListeners();

    // Add the 'animate' class on initial load if at top of page
    const navContainer = this.shadowRoot.querySelector('.nav-container');
    const screenWidth = window.innerWidth;

    if (!this.hasAnimated && screenWidth > 768 && window.scrollY === 0) {
      navContainer.classList.add('animate');
      this.hasAnimated = true; // Set the flag to true after animation

      // Remove the 'animate' class after the animation ends
      navContainer.addEventListener('animationend', () => {
        navContainer.classList.remove('animate');
      });
    }
  }

  replaceFeatherIcons() {
    // Clone the feather icons into the shadow DOM
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

    // Toggle navigation on button click
    navToggle.addEventListener('click', () => {
      const isActive = navToggle.classList.contains('active');
      navToggle.setAttribute('aria-expanded', !isActive);
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Smooth scroll and close menu on link click
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

    // Close navigation when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close navigation on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });

    // Dark mode toggle
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
    localStorage.setItem('theme', theme); // Update localStorage
    // Update the icon
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
