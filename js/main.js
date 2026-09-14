document.addEventListener('DOMContentLoaded', function() {
  var yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var header = document.querySelector('.site-header');
  var lastScroll = 0;
  window.addEventListener('scroll', function() {
    var scroll = window.pageYOffset || document.documentElement.scrollTop;
    if (scroll > 10) { header.classList.add('scrolled'); }
    else { header.classList.remove('scrolled'); }
    lastScroll = scroll;
  }, { passive: true });

  // Link da Diocese no header
  var headerInner = document.querySelector('.header-inner');
  var ctaBtn = document.querySelector('.header-cta');
  if (headerInner && ctaBtn) {
    var dioceseLink = document.createElement('a');
    dioceseLink.href = 'https://diocesedacampanha.org.br/';
    dioceseLink.target = '_blank';
    dioceseLink.rel = 'noopener noreferrer';
    dioceseLink.className = 'header-diocese-link';
    dioceseLink.innerHTML = 'Diocese ↗';
    dioceseLink.setAttribute('aria-label', 'Site da Diocese de Campanha');
    ctaBtn.parentNode.insertBefore(dioceseLink, ctaBtn);
  }

  // Link da Diocese no footer bottom
  var footerBottom = document.querySelector('.footer-bottom p');
  if (footerBottom) {
    footerBottom.innerHTML = footerBottom.innerHTML.replace(
      /Diocese de Campanha(<\/a>)?/i,
      '<a href="https://diocesedacampanha.org.br/" target="_blank" rel="noopener noreferrer" style="color:var(--color-gold-light);text-decoration:none;border-bottom:1px solid rgba(224,190,90,0.4);transition:all 0.3s ease;">Diocese de Campanha</a>'
    );
  }

  // Link da Diocese na descricao do footer
  var footerColP = document.querySelector('.footer-col:first-child p');
  if (footerColP) {
    footerColP.innerHTML = footerColP.innerHTML.replace(
      /Diocese de Campanha/i,
      '<a href="https://diocesedacampanha.org.br/" target="_blank" rel="noopener noreferrer" style="color:rgba(255,255,255,0.7);text-decoration:none;border-bottom:1px solid rgba(255,255,255,0.2);transition:all 0.3s ease;">Diocese de Campanha</a>'
    );
  }

  // Intersection Observer para animacoes
  var observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); }
    });
  }, observerOptions);
  document.querySelectorAll('.announce-card, .schedule-card, .welcome-text, .welcome-image, .bible-quote blockquote').forEach(function(el) {
    observer.observe(el);
  });

  // Formulario de contato
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var feedback = document.getElementById('form-feedback');
      var nome = document.getElementById('nome').value.trim();
      var email = document.getElementById('email').value.trim();
      var mensagem = document.getElementById('mensagem').value.trim();
      if (!nome || !email || !mensagem) {
        if (feedback) {
          feedback.style.display = 'block';
          feedback.style.background = '#fde8e8';
          feedback.style.color = '#c0392b';
          feedback.textContent = 'Por favor, preencha os campos obrigatórios.';
        }
        return;
      }
      if (feedback) {
        feedback.style.display = 'block';
        feedback.style.background = '#e8f5e9';
        feedback.style.color = '#27ae60';
        feedback.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
      }
      form.reset();
    });
  }
});