// Smooth scroll for internal nav links (Bootstrap 5 supports data-bs-smooth-scroll, but ensure older browsers)
document.querySelectorAll('a.nav-link, a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function (e) {
    var targetId = this.getAttribute('href');
    if (targetId && targetId.startsWith('#') && targetId.length > 1) {
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var yOffset = -70; // account for fixed navbar
        var y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  });
});

// Update active state on nav links during scroll
var sections = document.querySelectorAll('section');
var navLinks = document.querySelectorAll('#mainNav .nav-link');
var sectionIdToNavLink = {};
navLinks.forEach(function(link) { sectionIdToNavLink[link.getAttribute('href')] = link; });
var makeActive = function() {
  var scrollPos = window.scrollY + 80;
  sections.forEach(function(sec) {
    if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
      var id = '#' + sec.id;
      navLinks.forEach(function(l){ l.classList.remove('active'); });
      if (sectionIdToNavLink[id]) sectionIdToNavLink[id].classList.add('active');
    }
  });
};
window.addEventListener('scroll', makeActive);
window.addEventListener('load', makeActive);

// Gallery filter
(function(){
  var filterButtons = document.querySelectorAll('#portfolio [data-filter]');
  var items = document.querySelectorAll('#gallery .gallery-item');
  filterButtons.forEach(function(btn){
    btn.addEventListener('click', function(){
      filterButtons.forEach(function(b){ b.classList.remove('active'); });
      this.classList.add('active');
      var filter = this.getAttribute('data-filter');
      items.forEach(function(item){
        if (filter === '*' || item.getAttribute('data-category') === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
})();

// Lightbox modal
(function(){
  var modalEl = document.getElementById('lightboxModal');
  var modalImg = document.getElementById('lightboxImage');
  document.querySelectorAll('.gallery-thumb').forEach(function(img){
    img.addEventListener('click', function(){
      var full = this.getAttribute('data-full') || this.src;
      if (modalImg) modalImg.src = full;
    });
  });
  if (modalEl) {
    modalEl.addEventListener('hidden.bs.modal', function(){
      if (modalImg) modalImg.src = '';
    });
  }
})();

// Footer year
(function(){
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

// Contact form (demo)
document.getElementById('contactForm')?.addEventListener('submit', function(e){
  e.preventDefault();
  alert('Thank you! Your message has been received. We will contact you shortly.');
  this.reset();
});

