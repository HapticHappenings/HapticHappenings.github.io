
var gutterImage;
var gutterOffset;
var handImages = [];

var tracks = [];

function preload() {
  // // local access
  // gutterImage = loadImage('sketch-images/gutter1.png');

  // let handIndex = 5;
  // while (handIndex >= 0) {
  //   let tempHandImage = loadImage('sketch-images/hand-' + handIndex + '.png')
  //   handImages.push(tempHandImage);
  //   handIndex--;
  // }

  // production access
  gutterImage = loadImage('assets/img/sketch-images/gutter1.png');

  let handIndex = 5;
  while (handIndex >= 0) {
    let tempHandImage =
        loadImage('assets/img/sketch-images/hand-' + handIndex + '.png')
    handImages.push(tempHandImage);
    handIndex--;
  }
}

function setup() {
  // environment
  let c = createCanvas(windowWidth, windowHeight)
  let node = document.getElementById('sketch-container');
  c.parent(node);
  imageMode(CENTER);

  // image initialization
  gutterImage.resize(0, height * 1.2);
  handImages.forEach(h => h.resize(200, 0))
  let gutterMargin = min(width * 0.1, 100);
  if (gutterImage.width / 2 <= gutterMargin) {
    gutterOffset = 0;
  } else {
    gutterOffset = gutterMargin - gutterImage.width / 2;
  }

  // debugger;
  let trackY = 0;
  while (trackY < height) {
    let trackHeight = random(40, 60);
    let newTrack = new Track(trackY, trackHeight, 0);
    tracks.push(newTrack);
    trackY += trackHeight;
  }
}

function draw() {
  // debugger;
  background('#2f4a63');

  // draw the flying hands
  tracks.forEach(track => {
    track.show();
    track.step();
  })

  // draw the gutter images
  image(gutterImage, 0 + gutterOffset, height / 2);
  image(gutterImage, width - gutterOffset, height / 2);
}

class Track {
  constructor(y, trackHeight, num) {
    this.y = y;
    this.num = num;
    this.trackHeight = trackHeight;
    this.trackVelocity = random(1, 2);
    this.carMargin = random(5, 40);
    this.cars = [];

    this.nextCarFrames;
    this.addCar();
  }

  addCar() {
    let carImage = random(handImages);
    let carWidth = this.carMargin * 2 + carImage.width;
    let carCenterX = -carWidth / 2;
    let carTotalFrames = (width + carWidth) / this.trackVelocity;
    this.nextCarFrames = carWidth / this.trackVelocity;

    let newCar = new Car(
        carCenterX, this.y + this.trackHeight / 2, this.trackVelocity, carImage,
        carTotalFrames);
    this.cars.push(newCar)
  }

  show() {
    this.cars.forEach(car => car.show());
  }

  step() {
    this.cars.forEach(car => car.step());
    if (this.cars[0].done) {
      this.cars.shift();
    }

    this.nextCarFrames--;
    if (this.nextCarFrames <= 0) this.addCar();
  }
}

class Car {
  constructor(x, y, vel, carImage, carFrames) {
    this.pos = createVector(x, y);
    this.vel = vel;
    this.carImage = carImage;
    this.carFrames = carFrames;
    this.done = false;
  }

  show() {
    // debugger;
    image(this.carImage, this.pos.x, this.pos.y);
  }
  step() {
    // debugger;
    this.pos.x = this.pos.x + this.vel;
    this.carFrames--;
    this.done = this.carFrames <= 0;
  }
}