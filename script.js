console.log("Welcome to Spotify");

// Initializing the Variables
let songInd = 0;
let audio = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "LEGION-NCS Release", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "TRAP- Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: " MAD- Invincible [NCS Release]", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven - [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-[NCS Release]", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Believe ", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Back-It-Up", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "TRUTH", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "Blue Heavens -Galaxy", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "No Sky - No Regreat", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handling play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audio.paused || audio.currentTime<=0){
        audio.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audio.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listening to Events
audio.addEventListener('timeupdate', ()=>{ 
    // Updating Seekbar
    progress = parseInt((audio.currentTime/audio.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audio.currentTime = myProgressBar.value * audio.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songInd = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audio.src = `songs/${songInd+1}.mp3`;
        masterSongName.innerText = songs[songInd].songName;
        audio.currentTime = 0;
        audio.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songInd>=9){
        songInd = 0
    }
    else{
        songInd += 1;
    }
    audio.src = `songs/${songInd+1}.mp3`;
    masterSongName.innerText = songs[songInd].songName;
    audio.currentTime = 0;
    audio.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songInd<=0){
        songInd = 0
    }
    else{
        songInd -= 1;
    }
    audio.src = `songs/${songInd+1}.mp3`;
    masterSongName.innerText = songs[songInd].songName;
    audio.currentTime = 0;
    audio.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})