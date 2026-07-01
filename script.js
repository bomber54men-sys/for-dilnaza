// Настройка таймера обратного отсчета (до 20 августа 2026)
function updateTimer() {
    const targetDate = new Date('August 20, 2026 00:00:00').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference < 0) {
        document.getElementById('timer').innerHTML = "Мы скоро увидимся! ✨";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById('timer').innerHTML = 
        `${days}д  ${hours}ч  ${minutes}м  ${seconds}с`;
}
setInterval(updateTimer, 1000);
updateTimer();

// Эффект печатной машинки на первом слайде
const text = "Я приготовил для тебя кое-что особенное... Надеюсь, тебе понравится. Нажми кнопку ниже.";
let index = 0;
function typeWriter() {
    if (index < text.length) {
        document.getElementById("typing").innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 55);
    }
}
window.onload = function() {
    setTimeout(typeWriter, 1000);
};

// Переключение страниц, включение музыки и создание сердечек
function nextPage(pageNumber) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById('page' + pageNumber).classList.add('active');
    
    // Автоматический старт музыки при первом клике на "Открыть"
    if (pageNumber === 2) {
        const music = document.getElementById('music');
        const btn = document.getElementById('musicBtn');
        if (music.paused) {
            music.play().catch(err => console.log("Браузер заблокировал автоплей: нужен клик"));
            btn.classList.add('playing');
        }
    }

    // Сбрасываем 3D позиции для новой карточки и её контента
    const newCard = document.querySelector('#page' + pageNumber + ' .glass-card');
    if(newCard) {
        newCard.style.transform = `rotateX(0deg) rotateY(0deg)`;
        newCard.querySelectorAll('[data-depth]').forEach(el => {
            el.style.transform = `translateX(0px) translateY(0px)`;
        });
    }

    // Спавним летящие сердечки
    for (let i = 0; i < 15; i++) {
        setTimeout(createHeart, i * 120);
    }
}

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerText = ['❤️', '💖', '✨', '🦖'][Math.floor(Math.random() * 4)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 2 + 4 + 's';
    document.body.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 5000);
}

// Управление музыкой и эквалайзером вручную
function toggleMusic() {
    const music = document.getElementById('music');
    const btn = document.getElementById('musicBtn');
    if (music.paused) {
        music.play();
        btn.classList.add('playing');
    } else {
        music.pause();
        btn.classList.remove('playing');
    }
}

// Кастомный курсор сглаживания
const cursor = document.getElementById('customCursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// КЛИК И УВЕЛИЧЕНИЕ ФОТОГРАФИЙ
function openPhoto(element) {
    const popup = document.getElementById('photoPopup');
    const popupImg = document.getElementById('popupImg');
    popupImg.src = element.src;
    popup.style.display = 'flex';
    setTimeout(() => {
        popup.style.opacity = '1';
        popupImg.style.transform = 'scale(1)';
    }, 10);
}

function closePhoto() {
    const popup = document.getElementById('photoPopup');
    const popupImg = document.getElementById('popupImg');
    popup.style.opacity = '0';
    popupImg.style.transform = 'scale(0.9)';
    setTimeout(() => { popup.style.display = 'none'; }, 400);
}

// ЭФФЕКТ 3D-ПАРАЛЛАКСА ДЛЯ КАРТОЧЕК И ВНУТРЕННЕГО КОНТЕНТА
document.addEventListener('mousemove', (e) => {
    if (window.innerWidth <= 768) return; 
    
    const activeCard = document.querySelector('.page.active .glass-card');
    if (!activeCard) return;

    // Расчёт отклонения от центра экрана (нормализованные значения от -0.5 до 0.5)
    const offsetX = (e.clientX - window.innerWidth / 2) / window.innerWidth;
    const offsetY = (e.clientY - window.innerHeight / 2) / window.innerHeight;

    // 1. Наклон самой карточки
    const cardRotateY = offsetX * 30; // Чувствительность по горизонтали
    const cardRotateX = -offsetY * 30; // Чувствительность по вертикали
    activeCard.style.transform = `rotateY(${cardRotateY}deg) rotateX(${cardRotateX}deg)`;

    // 2. Движение внутренних элементов (текст, галерея, таймер) за курсором в 3D
    const parallaxElements = activeCard.querySelectorAll('[data-depth]');
    parallaxElements.forEach(el => {
        const depth = parseFloat(el.getAttribute('data-depth')) || 15;
        // Элементы смещаются в сторону курсора, создавая объем
        const moveX = offsetX * depth * 2;
        const moveY = offsetY * depth * 2;
        el.style.transform = `translateX(${moveX}px) translateY(${moveY}px) translateZ(${depth}px)`;
    });
});

// Плавный возврат в исходное состояние при уходе мышки с экрана
document.addEventListener('mouseleave', () => {
    const activeCard = document.querySelector('.page.active .glass-card');
    if (activeCard) {
        activeCard.style.transform = `rotateX(0deg) rotateY(0deg)`;
        activeCard.querySelectorAll('[data-depth]').forEach(el => {
            el.style.transform = `translateX(0px) translateY(0px) translateZ(0px)`;
        });
    }
});