<<<<<<< HEAD
const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

const playTone = (freq: number, type: OscillatorType, duration: number, volume: number) => {
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);

  gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + duration);
};

export const sounds = {
  move: () => {
    playTone(400, 'sine', 0.1, 0.1);
    setTimeout(() => playTone(600, 'sine', 0.1, 0.05), 50);
  },
  click: () => {
    playTone(800, 'square', 0.05, 0.03);
  },
  check: () => {
    playTone(200, 'sawtooth', 0.3, 0.1);
    playTone(300, 'sawtooth', 0.3, 0.1);
  },
  gameOver: (isWin: boolean) => {
    if (isWin) {
      const notes = [440, 554, 659, 880];
      notes.forEach((f, i) => {
        setTimeout(() => playTone(f, 'triangle', 0.5, 0.1), i * 150);
      });
    } else {
      const notes = [440, 330, 220];
      notes.forEach((f, i) => {
        setTimeout(() => playTone(f, 'sawtooth', 0.6, 0.1), i * 200);
      });
    }
  }
};
=======
const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

const playTone = (freq: number, type: OscillatorType, duration: number, volume: number) => {
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);

  gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + duration);
};

export const sounds = {
  move: () => {
    playTone(400, 'sine', 0.1, 0.1);
    setTimeout(() => playTone(600, 'sine', 0.1, 0.05), 50);
  },
  click: () => {
    playTone(800, 'square', 0.05, 0.03);
  },
  check: () => {
    playTone(200, 'sawtooth', 0.3, 0.1);
    playTone(300, 'sawtooth', 0.3, 0.1);
  },
  gameOver: (isWin: boolean) => {
    if (isWin) {
      const notes = [440, 554, 659, 880];
      notes.forEach((f, i) => {
        setTimeout(() => playTone(f, 'triangle', 0.5, 0.1), i * 150);
      });
    } else {
      const notes = [440, 330, 220];
      notes.forEach((f, i) => {
        setTimeout(() => playTone(f, 'sawtooth', 0.6, 0.1), i * 200);
      });
    }
  }
};
>>>>>>> 58ae2d66e6140b224578a2d3f1955de90803f31d
