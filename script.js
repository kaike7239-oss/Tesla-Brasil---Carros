// =====================================================
// FUNCIONALIDADE 1: MODO CLARO/ESCURO
// =====================================================

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeText = document.getElementById('theme-text');

// Verificar se ha preferencia salva no localStorage
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    updateThemeButton(true);
  }
}

// Atualizar o texto e icone do botao
function updateThemeButton(isDark) {
  if (isDark) {
    themeIcon.textContent = '☀️';
    themeText.textContent = 'Modo Claro';
  } else {
    themeIcon.textContent = '🌙';
    themeText.textContent = 'Modo Escuro';
  }
}

// Alternar tema ao clicar no botao
themeToggle.addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  
  // Salvar preferencia no localStorage
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  
  // Atualizar botao
  updateThemeButton(isDark);
});

// Carregar tema ao iniciar a pagina
loadTheme();


// =====================================================
// FUNCIONALIDADE 2: GALERIA DE IMAGENS COM LIGHTBOX
// =====================================================

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxCounter = document.getElementById('lightbox-counter');

// Array com as imagens da galeria
const galleryImages = [
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/model-3-JzPJoW9xCXb28CIpr7ZRADRBfZ5rcs.jpg',
    caption: 'Model 3 - O sedan eletrico mais vendido do mundo'
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/model-x-YVfmtTR6MU1cydPftyNRpumhAeau0C.jpg',
    caption: 'Model X - SUV com portas Falcon Wing'
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/interior-do48Cj5BOHtm2V7QSj3XED0WjhfFdN.jpg',
    caption: 'Interior minimalista com tecnologia avancada'
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/supercharger-SqmBspDUstz0gbEHJGmEO8MKnZKAEl.jpg',
    caption: 'Rede de Superchargers em expansao global'
  }
];

let currentImageIndex = 0;

// Abrir o lightbox com a imagem clicada
function openLightbox(index) {
  currentImageIndex = index;
  updateLightboxImage();
  lightbox.classList.add('active');
  
  // Impedir scroll da pagina quando lightbox esta aberto
  document.body.style.overflow = 'hidden';
}

// Fechar o lightbox
function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Mudar para proxima ou anterior imagem
function changeImage(direction) {
  currentImageIndex += direction;
  
  // Voltar ao inicio ou fim se ultrapassar os limites
  if (currentImageIndex >= galleryImages.length) {
    currentImageIndex = 0;
  } else if (currentImageIndex < 0) {
    currentImageIndex = galleryImages.length - 1;
  }
  
  updateLightboxImage();
}

// Atualizar a imagem exibida no lightbox
function updateLightboxImage() {
  const image = galleryImages[currentImageIndex];
  lightboxImg.src = image.src;
  lightboxCaption.textContent = image.caption;
  lightboxCounter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
}

// Fechar lightbox ao clicar fora da imagem
lightbox.addEventListener('click', function(e) {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Navegacao por teclado
document.addEventListener('keydown', function(e) {
  if (!lightbox.classList.contains('active')) return;
  
  if (e.key === 'Escape') {
    closeLightbox();
  } else if (e.key === 'ArrowLeft') {
    changeImage(-1);
  } else if (e.key === 'ArrowRight') {
    changeImage(1);
  }
});
