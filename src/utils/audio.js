import { Howl } from 'howler';

class AudioManager {
  constructor() {
    this.sounds = {};
    this.isMuted = false;
    this.currentBackgroundMusic = null;
    this.isPlayingSuccess = false;
    this.successSound = null;
  }

  // Preload all sounds
  preloadSounds() {
    const soundList = {
      success: '/sounds/success-sound.mp3',
      music1: '/sounds/study-music-1.mp3',
      music2: '/sounds/study-music-2.mp3',
      music3: '/sounds/study-music-3.mp3',
      music4: '/sounds/study-music-4.mp3',
      music5: '/sounds/study-music-5.mp3',
      music6: '/sounds/study-music-6.mp3',
      click: '/sounds/click.mp3' // Optional: add more sounds
    };

  Object.keys(soundList).forEach(key => {
      this.sounds[key] = new Howl({
        src: [soundList[key]],
        html5: true,
        preload: true,
        volume: 0.5,
        onend: () => {
          if (key === 'success') {
            this.isPlayingSuccess = false;
            this.resumeBackgroundMusic();
          }
        }
      });
    });
  }

  // Play background music based on mood
  playMoodMusic(mood) {
    // Don't play if success sound is playing
    if (this.isPlayingSuccess) {
      return;
    }

    // Stop current background music
    if (this.currentBackgroundMusic) {
      this.currentBackgroundMusic.stop();
    }
    // Map moods to music files
    const moodMusicMap = {
      happy: 'music1',
      studying: 'music2',
      focused: 'music3',
      relaxed: 'music6',
      energetic: 'music5'
    };

    const soundKey = moodMusicMap[mood] || 'music1';
    
     if (this.sounds[soundKey] && !this.isMuted) {
      this.currentBackgroundMusic = this.sounds[soundKey];
      this.currentBackgroundMusic.loop(true);
      this.currentBackgroundMusic.play();
    }
  }

  // Stop background music
  stopBackgroundMusic() {
    if (this.currentBackgroundMusic) {
      this.currentBackgroundMusic.stop();
    }
  }

  // Pause background music
  pauseBackgroundMusic() {
    if (this.currentBackgroundMusic) {
      this.currentBackgroundMusic.pause();
    }
  }

  // Resume background music
  resumeBackgroundMusic() {
    if (this.currentBackgroundMusic && !this.isMuted && !this.isPlayingSuccess) {
      this.currentBackgroundMusic.play();
    }
  }

  // Play success sound (pauses background music)
  playSuccess(quick = false) {
  if (this.sounds.success && !this.isMuted) {
    // Pause background music
    this.pauseBackgroundMusic();
    
    // Set flag
    this.isPlayingSuccess = true;
    
    // Play success sound
    this.sounds.success.play();
    
    // For quick celebrations, resume faster
    if (quick) {
      setTimeout(() => {
        this.isPlayingSuccess = false;
        this.resumeBackgroundMusic();
      }, 1500); // Resume after 1.5 seconds for quick celebrations
    } else {
      this.sounds.success.once('end', () => {
        this.isPlayingSuccess = false;
        this.resumeBackgroundMusic();
      });
    }
  }
}

  // Force stop success sound and resume background music
  stopSuccessSound() {
    if (this.sounds.success) {
      this.sounds.success.stop();
      this.isPlayingSuccess = false;
      this.resumeBackgroundMusic();
    }
  }

  // Toggle mute
  toggleMute() {
    this.isMuted = !this.isMuted;
    
    if (this.isMuted) {
      Howler.mute(true);
    } else {
      Howler.mute(false);
      // Resume music if not playing success sound
      if (!this.isPlayingSuccess) {
        this.resumeBackgroundMusic();
      }
    }
    
    return this.isMuted;
  }

  // Set volume
  setVolume(volume) {
    Howler.volume(volume);
  }

  // Get current volume
  getVolume() {
    return Howler.volume();
  }

  // Check if music is playing
  isMusicPlaying() {
    return this.currentBackgroundMusic && this.currentBackgroundMusic.playing();
  }

  // Get current playing state
  getPlayingState() {
    return {
      isMuted: this.isMuted,
      isPlayingSuccess: this.isPlayingSuccess,
      isBackgroundMusicPlaying: this.isMusicPlaying()
    };
  }
}

// Create singleton instance
const audioManager = new AudioManager();
export default audioManager;