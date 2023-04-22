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
  {
    title: "I Won't",
    artist: "AJR",
    album: "I Won't",
    src: "music/AJR - I Won't (Official Video).mp3"
  },
  {
    title: "21",
    artist: "AREA 21",
    album: "Greatest Hits Vol. 1",
    src: "music/AREA21 - 21.mp3"
  },
  {
    title: "Close To You",
    artist: "Dayglow",
    album: "Harmony House",
    src: "music/Dayglow - Close to You (Official Video).mp3"
  },
  {
    title: "Relationship",
    artist: "Young Thug Ft. Future",
    album: "Beautiful Thugger Girls",
    src: "music/Young Thug - Relationship (feat. Future) [Official Music Video].mp3"
  },
  {
    title: "Hold You Down",
    artist: "DJ Dhaled, Chris Brown, August Alsina, Future, & Jeremih",
    album: "I Changed A Lot",
    src: "music/Hold You Down.mp3"
  },
  {
    title: "LA CANCION",
    artist: "J Balvin & Bad Bunny",
    album: "OASIS",
    src: "music/J Balvin, Bad Bunny - LA CANCIÓN (Audio).mp3"
  },
  {
    title: "Gold Slugs",
    artist: "DJ Khaled, Chris Brown, August Alsina, & Fetty Wap",
    album: "I Changed A Lot",
    src: "music/DJ Khaled - Gold Slugs (Audio) ft. Chris Brown, August Alsina, Fetty Wap.mp3"
  },
  {
    title: "Bang Bang",
    artist: "K'naan Ft. Adam Levine",
    album: "Troubadour",
    src: "music/K'naan, Ft. Adam Levine-Bang Bang (Lyrics Video).mp3"
  },
  {
    title: "I'm so Blessed",
    artist: "DJ Khaled, Big Sean, Wiz Khalifa, Ace Hood, T-Pain",
    album: "Kiss The Ring",
    src: "music/I'm So Blessed.mp3"
  },
  {
    title: "Surfin'",
    artist: "Kid Cudi Ft. Pharrell Williams",
    album: "The Boy Who Flew To The Moon Vol. 1",
    src: "music/Kid Cudi - Surfin' ft. Pharrell Williams.mp3"
  },
  {
    title: "Cooler Than Me",
    artist: "Mike Posner",
    album: "A Letter To My Younger Self",
    src: "music/Mike Posner - Cooler Than Me (Lyrics).mp3"
  },
  {
    title: "Am I High Rn",
    artist: "Quinn XCII Ft. blackbear",
    album: "Beautiful Thugger Girls",
    src: "music/Quinn XCII - Am I High Rn (feat. blackbear) (Official Lyric Video).mp3"
  },
  {
    title: "Rose Golden",
    artist: "Kid Cudi & WILLOW",
    album: "Passion, Pain, & Demon Slayin'",
    src: "music/Rose Golden.mp3"
  },
  {
    title: "Black & Gold",
    artist: "Sam Sparro",
    album: "Black & Gold",
    src: "music/Sam Sparro - Black and Gold.mp3"
  },
  {
    title: "Solo Dolo Part II",
    artist: "Kid Cudi & Kendrick Lamar",
    album: "Indicud",
    src: "music/Solo Dolo Part II (Explicit).mp3"
  },
  {
    title: "Borderline",
    artist: "Tame Impala",
    album: "The Slow Rush",
    src: "music/Tame Impala - Borderline (Official Audio).mp3"
  },
  {
    title: "Sleepwalking",
    artist: "The Chain Gang of 1974",
    album: "The Music of Grand Theft Auto V, Vol. 1",
    src: "music/The Chain Gang of 1974 - Sleepwalking.mp3"
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
