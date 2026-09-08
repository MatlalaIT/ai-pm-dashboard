(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const toast = document.querySelector('.toast');
  let toastTimer;

  const showToast = (message) => {
    toast.textContent = message;
    toast.setAttribute('aria-hidden', 'false');
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.classList.remove('is-visible');
      toast.setAttribute('aria-hidden', 'true');
    }, 3200);
  };

  menuToggle?.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  document.querySelectorAll('.nav-item').forEach((link) => {
    link.addEventListener('click', () => {
      sidebar.classList.remove('is-open');
      menuToggle?.setAttribute('aria-expanded', 'false');
      menuToggle?.setAttribute('aria-label', 'Open navigation');
    });
  });

  document.querySelector('#new-project-button')?.addEventListener('click', () => {
    showToast('Project creation is available in the full workspace.');
  });

  document.querySelector('#view-all-button')?.addEventListener('click', () => {
    showToast('Showing the latest five sample projects.');
  });

  document.querySelector('#activity-button')?.addEventListener('click', () => {
    showToast('Activity log is available in the full workspace.');
  });
})();
