const galleryItems = document.querySelectorAll('.gallery-item');
let currentImageIndex = 0;
let imageList = [];

if (galleryItems.length > 0) {
  galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    if (img) {
      imageList.push(img.src);
    }
    item.addEventListener('click', () => {
      currentImageIndex = index;
      openLightbox(imageList[index]);
    });
  });
}

function openLightbox(src) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  if (lightbox && lightboxImg) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function nextImage() {
  if (imageList.length === 0) return;
  currentImageIndex = (currentImageIndex + 1) % imageList.length;
  const lightboxImg = document.getElementById('lightbox-img');
  if (lightboxImg) lightboxImg.src = imageList[currentImageIndex];
}

function prevImage() {
  if (imageList.length === 0) return;
  currentImageIndex = (currentImageIndex - 1 + imageList.length) % imageList.length;
  const lightboxImg = document.getElementById('lightbox-img');
  if (lightboxImg) lightboxImg.src = imageList[currentImageIndex];
}

const lightboxEl = document.getElementById('lightbox');
if (lightboxEl) {
  lightboxEl.addEventListener('click', (e) => {
    if (e.target === lightboxEl || e.target.classList.contains('lightbox-close')) {
      closeLightbox();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (!lightboxEl.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });
}