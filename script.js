let musicStarted = false;

function nextPage(number){

    if(!musicStarted){
        const music = document.getElementById("music");

        if(music){
            music.play().catch(function(error){
                console.log(error);
            });
        }

        musicStarted = true;
    }

    const currentPage = document.querySelector(".active");

    if(currentPage){
        currentPage.classList.remove("active");
    }

    const next = document.getElementById("page" + number);

    if(next){
        next.classList.add("active");
    }
}

const meetDate = new Date("2026-08-20T00:00:00");

function updateTimer(){

    const timer = document.getElementById("timer");

    if(!timer) return;

    const now = new Date();
    const diff = meetDate - now;

    if(diff <= 0){
        timer.innerHTML = "Мы уже встретились ❤️";
        return;
    }

    const days = Math.floor(
        diff / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (diff % (1000 * 60 * 60))
        / (1000 * 60)
    );

    timer.innerHTML =
        days + " дней " +
        hours + " часов " +
        minutes + " минут";
}

updateTimer();
setInterval(updateTimer, 1000);

function toggleMusic(){

    const music = document.getElementById("music");
    const btn = document.getElementById("musicBtn");

    if(music.paused){
        music.play();
        btn.innerHTML = "🔊";
    }
    else{
        music.pause();
        btn.innerHTML = "🔇";
    }
}

function createHeart() {

    const heart = document.createElement("div");

    heart.classList.add("heart");
    heart.innerHTML = "✦";

    heart.style.left = Math.random() * window.innerWidth + "px";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(createHeart, 500);

const text = "У меня есть для тебя небольшой сюрприз ❤️";
let i = 0;

function typeText(){

    if(i < text.length){
        document.getElementById("typing").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeText, 70);
    }
}

typeText();