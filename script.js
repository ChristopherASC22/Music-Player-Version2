const audioPlayer = document.getElementById("audio-player");
const playButton = document.getElementById("play-button");
const stopButton = document.getElementById("stop-button");
const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");
const seekSlider = document.getElementById("seek-slider");
const volumeSlider = document.getElementById("volume-slider");
const currentTime = document.getElementById("current-time");
const totalTime = document.getElementById("total-time");
const shuffleButton = document.getElementById("shuffle-button");

let currentTrackIndex = 0;
let isShuffleOn = false;

const tracks = [
  {
    title: "Lost Angels",
    artist: "Rae Sremmurda & Swae Lee",
    album: "Swaecation",
    src: "music/Lost Angels (From Swaecation).mp3"
  },
  {
    title: "Rewind",
    artist: "Fetty Wap",
    album: "Fetty Wap (Deluxe)",
    src: "music/Fetty Wap - Rewind feat. Monty (HQ).mp3"
  },
  {
    title: "The Way Life Goes",
    artist: "Lil Uzi Vert & Oh Wonder",
    album: "Luv Is Rage 2",
    src: "music/Lil Uzi Vert - The Way Life Goes [Official Visualizer].mp3"
  },
  {
    title: "The Thrill",
    artist: "Wiz Khalifa",
    album: "The Thrill",
    src: "music/Wiz Khalifa - The Thrill [Official Audio].mp3"
  },
  {
    title: "What about Me?",
    artist: "Lil Wayne",
    album: "Tha Carter V",
    src: "music/What About Me.mp3"
  },
  {
    title: "Bedtime Stories",
    artist: "Rae Sremmurda & The Weeknd",
    album: "Swaecation",
    src: "music/Bedtime Stories.mp3"
  },
  {
    title: "Feels",
    artist: "Calvin Harris, Pharrell Williams, Katy Perry, & Big Sean",
    album: "Funk Wav Bounces Vol. 1",
    src: "music/Calvin Harris - Feels (Official Video) ft. Pharrell Williams, Katy Perry, Big Sean.mp3"
  },
  {
    title: "Demon High",
    artist: "Lil Uzi Vert",
    album: "Demon High",
    src: "music/Lil_Uzi_Demon_High.mp3"
  },
  {
    title: "One Right Now",
    artist: "Post Malone & The Weeknd",
    album: "One Right Now",
    src: "music/Post Malone, The Weeknd - One Right Now (Audio).mp3"
  },
  {
    title: "Power Trip",
    artist: "J Cole",
    album: "Born Sinner",
    src: "music/Power Trip.mp3"
  },
  {
    title: "Powerglide",
    artist: "Rae Srmmurda, Juicy J & Swae Lee",
    album: "Swaecation",
    src: "music/Rae Sremmurd, Swae Lee, Slim Jxmmi - Powerglide (Audio) ft. Juicy J.mp3"
  },
  {
    title: "CLOSE",
    artist: "Rae Sremmurda, Swae Lee, & Travis Scott",
    album: "Swaecation",
    src: "music/Rae Sremmurd, Swae Lee, Slim Jxmmi - CLOSE (Audio) ft. Travis Scott.mp3"
  },
  {
    title: "These Worries",
    artist: "Kid Cudi",
    album: "Man On The Moon II: The Legend of Mr. Rager",
    src: "music/These Worries.mp3"
  },
  {
    title: "Fallin' Apart",
    artist: "Young Franco Ft. Denzel Curry",
    album: "Fallin' Apart",
    src: "music/Young Franco - Fallin' Apart (Visualiser) ft. Denzel Curry, Pell.mp3"
  },
];

function loadTrack(index) {
  const track = tracks[index];
  audioPlayer.src = track.src;
  audioPlayer.load();
  currentTime.innerText = "0:00";
  totalTime.innerText = formatTime(audioPlayer.duration);
}

function playTrack() {
  audioPlayer.play();
  playButton.innerText = "Pause";
}

function pauseTrack() {
  audioPlayer.pause();
  playButton.innerText = "Play";
}

function stopTrack() {
  pauseTrack();
  audioPlayer.currentTime = 0;
  seekSlider.value = 0;
  currentTime.innerText = "0:00";
}

function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function updateProgress() {
  seekSlider.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  currentTime.innerText = formatTime(audioPlayer.currentTime);
}

function setVolume(volume) {
  audioPlayer.volume = volume / 100;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function toggleShuffle() {
  isShuffleOn = !isShuffleOn;
  if (isShuffleOn) {
    shuffle(tracks);
    currentTrackIndex = 0;
    loadTrack(currentTrackIndex);
    playTrack();
  } else {
    currentTrackIndex = 0;
    loadTrack(currentTrackIndex);
  }
}

loadTrack(currentTrackIndex);

playButton.addEventListener("click", () => {
  if (audioPlayer.paused) {
    playTrack();
  } else {
    pauseTrack();
  }
});

stopButton.addEventListener("click", stopTrack);

previousButton.addEventListener("click", () => {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
  playTrack();
});

nextButton.addEventListener("click", () => {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
  playTrack();
});

seekSlider.addEventListener("input", () => {
  audioPlayer.currentTime = (seekSlider.value / 100) * audioPlayer.duration;
});

volumeSlider.addEventListener("input", () => {
  setVolume(volumeSlider.value);
});

audioPlayer.addEventListener("timeupdate", updateProgress);

audioPlayer.addEventListener("ended", () => {
  if (isShuffleOn) {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    playTrack();
  } else {
    stopTrack();
  }
});

shuffleButton.addEventListener("click", toggleShuffle);
