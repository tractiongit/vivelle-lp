/* Review build: no remote analytics scripts or automatic messaging. */
(() => {
  'use strict';
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('#main-nav');
  const setMenu = open => {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('is-open', open);
  };
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuButton.focus();
    }
  });
  const mobileCta = document.querySelector('.mobile-cta');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => mobileCta.classList.toggle('hero-visible', entry.isIntersecting))
      .observe(document.querySelector('.hero'));
  }
  const phone = '5547997020270'; // Confirmed on clinicavivelle.com.br, 14/10/2026.
  const message = 'Olá, vim pela Black November Vivelle. Gostaria de mais informações.';
  document.querySelectorAll('[data-whatsapp]').forEach(link => {
    link.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    link.addEventListener('click', () => {
      // Local hook only. Never include treatment, message, phone, URL, or health data.
      // A click is not a Lead, Schedule, Purchase or confirmed conversation.
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'whatsapp_click', campaign: 'black_november_2026' });
    });
  });
})();
