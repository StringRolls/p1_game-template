class Sounds {
  main = new Audio("./sounds/main.mp3");
  // collision = new Audio("./sounds/collision.mp3");

  play(sound) {
    this[sound].play();
  }

  pause(sound) {
    this[sound].pause();
  }
}
