const wrapper = document.querySelector(".wrapper"),
    topBar = document.querySelector(".top-bar span"),
    musicImg = wrapper.querySelector(".img-area img"),
    musicName = wrapper.querySelector(".song-details .name"),
    musicArtist = wrapper.querySelector(".song-details .artist"),
    playPauseBtn = wrapper.querySelector(".play-pause"),
    prevBtn = wrapper.querySelector("#prev"),
    nextBtn = wrapper.querySelector("#next"),
    mainAudio = wrapper.querySelector("#main-audio"),
    progressArea = wrapper.querySelector(".progress-area"),
    progressBar = progressArea.querySelector(".progress-bar"),
    musicList = wrapper.querySelector(".music-list"),
    moreMusicBtn = wrapper.querySelector("#more-music"),
    closemoreMusic = musicList.querySelector("#close");
let recent_volume = document.querySelector("#volume"),
    volume_show = document.querySelector("#volume_show"),
    volume_icon = document.querySelector("#volume_icon"),
    wave = document.getElementById("wave"),
    musicIndex = Math.floor(Math.random() * allMusic.length + 1);

function loadMusic(e) {
    musicName.innerText = allMusic[e - 1].name, musicArtist.innerText = allMusic[e - 1].artist, musicImg.alt = allMusic[e - 1].artist, musicImg.title = allMusic[e - 1].artist, musicImg.src = allMusic[e - 1].img, mainAudio.src = allMusic[e - 1].src, topBar.innerText = "Now Playing"
}

function playMusic() {
    wrapper.classList.add("paused"), playPauseBtn.querySelector("i").innerText = "pause", mainAudio.play(), wave.classList.add("loader"), musicImg.classList.add("rotate")
}

function pauseMusic() {
    wrapper.classList.remove("paused"), playPauseBtn.querySelector("i").innerText = "play_arrow", mainAudio.pause(), wave.classList.remove("loader"), musicImg.classList.remove("rotate")
}

function prevMusic() {
    loadMusic(musicIndex = --musicIndex < 1 ? allMusic.length : musicIndex), playMusic(), playingSong()
}

function nextMusic() {
    loadMusic(musicIndex = ++musicIndex > allMusic.length ? 1 : musicIndex), playMusic(), playingSong()
}
isMusicPaused = !0, window.addEventListener("load", () => {
    loadMusic(musicIndex), playingSong()
}), playPauseBtn.addEventListener("click", () => {
    let e = wrapper.classList.contains("paused");
    e ? pauseMusic() : playMusic(), playingSong()
}), prevBtn.addEventListener("click", () => {
    prevMusic()
}), nextBtn.addEventListener("click", () => {
    nextMusic()
}), mainAudio.addEventListener("timeupdate", e => {
    let a = e.target.currentTime,
        s = e.target.duration,
        t = a / s * 100;
    progressBar.style.width = `${t}%`;
    let r = wrapper.querySelector(".current-time"),
        n = wrapper.querySelector(".max-duration");
    mainAudio.addEventListener("loadeddata", () => {
        let e = mainAudio.duration,
            a = Math.floor(e / 60),
            s = Math.floor(e % 60);
        s < 10 && (s = `0${s}`), n.innerText = `${a}:${s}`
    });
    let l = Math.floor(a / 60),
        o = Math.floor(a % 60);
    o < 10 && (o = `0${o}`), r.innerText = `${l}:${o}`
}), progressArea.addEventListener("click", e => {
    let a = progressArea.clientWidth,
        s = e.offsetX,
        t = mainAudio.duration;
    mainAudio.currentTime = s / a * t, playMusic(), playingSong()
});
const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", () => {
    let e = repeatBtn.innerText;
    switch (e) {
        case "repeat":
            repeatBtn.innerText = "repeat_one", repeatBtn.setAttribute("title", "Song looped");
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle", repeatBtn.setAttribute("title", "Playback shuffled");
            break;
        case "shuffle":
            repeatBtn.innerText = "repeat", repeatBtn.setAttribute("title", "Playlist looped")
    }
}), mainAudio.addEventListener("ended", () => {
    let e = repeatBtn.innerText;
    switch (e) {
        case "repeat":
            nextMusic();
            break;
        case "repeat_one":
            mainAudio.currentTime = 0, loadMusic(musicIndex), playMusic();
            break;
        case "shuffle":
            let a = Math.floor(Math.random() * allMusic.length + 1);
            do a = Math.floor(Math.random() * allMusic.length + 1); while (musicIndex == a);
            loadMusic(musicIndex = a), playMusic(), playingSong()
    }
}), moreMusicBtn.addEventListener("click", () => {
    musicList.classList.toggle("show")
}), closemoreMusic.addEventListener("click", () => {
    moreMusicBtn.click()
});
const ulTag = wrapper.querySelector("ul");
for (let i = 0; i < allMusic.length; i++) {
    let e = `<li li-index="${i+1}"><div class="row"><span>${allMusic[i].name}</span><p>${allMusic[i].artist}</p></div><span id="${allMusic[i].id}" class="audio-duration">3:40</span><audio class="${allMusic[i].id}" src="${allMusic[i].src}"></audio></li>`;
    ulTag.insertAdjacentHTML("beforeend", e);
    let a = ulTag.querySelector(`#${allMusic[i].id}`),
        s = ulTag.querySelector(`.${allMusic[i].id}`);
    s.addEventListener("loadeddata", () => {
        let e = s.duration,
            t = Math.floor(e / 60),
            r = Math.floor(e % 60);
        r < 10 && (r = `0${r}`), a.innerText = `${t}:${r}`, a.setAttribute("t-duration", `${t}:${r}`)
    })
}

function playingSong() {
    let e = ulTag.querySelectorAll("li");
    for (let a = 0; a < e.length; a++) {
        let s = e[a].querySelector(".audio-duration");
        if (e[a].classList.contains("playing")) {
            e[a].classList.remove("playing");
            let t = s.getAttribute("t-duration");
            s.innerText = t
        }
        e[a].getAttribute("li-index") == musicIndex && (e[a].classList.add("playing"), s.innerHTML = "<b>Playing</b>"), e[a].setAttribute("onclick", "clicked(this)")
    }
}

function clicked(e) {
    loadMusic(musicIndex = e.getAttribute("li-index")), playMusic(), playingSong()
}

function mute_sound() {
    mainAudio.volume = 0, volume.value = 0, volume_show.innerHTML = 0, volume_icon.innerText = "volume_mute"
}

function volume_change() {
    volume_show.innerHTML = recent_volume.value, mainAudio.volume = recent_volume.value / 100, volume_icon.innerText = "volume_up"
}
