class Modal {
  constructor(modalId) {
    this.modal = document.getElementById(modalId);
    this.overlay = this.modal.querySelector('.modal__overlay');
    this.container = this.modal.querySelector('.modal__container');
    this.closeButtons = this.modal.querySelectorAll('[data-modal-close]');
    this.openButtons = document.querySelectorAll(`[data-modal-open="${modalId}"]`);
    
    this.init();
  }

  init() {
    // Add event listeners
    this.closeButtons.forEach(button => {
      button.addEventListener('click', () => this.close());
    });

    this.openButtons.forEach(button => {
      button.addEventListener('click', () => this.open());
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('is-open')) {
        this.close();
      }
    });

    // Close on overlay click, but not on container click
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });

    // Prevent click propagation on container
    this.container.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  open() {
    this.modal.classList.add('is-open');
    // Focus on the first focusable element
    const focusableElements = this.modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  }

  close() {
    this.modal.classList.remove('is-open');
  }
}

// Initialize modal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const waitlistModal = new Modal('waitlist-modal');
}); 