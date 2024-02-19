const playBtn = document.querySelector('.play-button');
const title = document.querySelector('.title');
const artist = document.querySelector('.artist');
const width = document.querySelector('.progress');
const background = document.getElementById('bg-img');
const playerImg = document.getElementById('cover');
const playerProgress = document.querySelector('.player-progress');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

const music = new Audio();

const songs = [
    {
        path: 'assets/1.mp3',
        displayName: 'Dynamite',
        cover: 'assets/BTS3.jpg',
        artist: 'BTS',
    },
    {
        path: 'assets/2.mp3',
        displayName: 'Butter',
        cover: 'assets/BTS4.jpg',
        artist: 'BTS',
    },
];

let musicIndex = 0;
let isPLaying = false;

function toggle() {
    if (isPLaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPLaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    music.play();
}

function pauseMusic() {
    isPLaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    music.pause();
}

function formatTime(time) {
    String(Math.floor(time)).padStart(2, '0');
}

function updateBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    width.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    currentTimeEl.innerText = `${formatTime(currentTime / 60)}:${formatTime(
        currentTime % 60
    )}`;
    durationEl.innerText = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
}

function loadMusic(song) {
    music.src = song.path;
    artist.innerText = song.artist;
    title.innerText = song.displayName;
    if (background && playerImg instanceof HTMLImageElement) {
        background.src = song.cover;
        playerImg.src = song.cover;
    }
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function setProgress(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('pointerdown', toggle);
music.addEventListener('timeupdate', updateBar);
prev.addEventListener('pointerdown', () => changeMusic(-1));
next.addEventListener('pointerdown', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
playerProgress.addEventListener('pointerdown', setProgress);

loadMusic(songs[musicIndex]);
