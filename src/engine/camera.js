

const SPEED = 256; // pixels per second

function Camera(map, width, height) {
  this.x = 0;
  this.y = 0;
  this.width = width;
  this.height = height;
  this.maxX = map.width * map.tilewidth - width;
  this.maxY = map.height * map.tileheight - height;
}



Camera.prototype.move = function (delta, dirx, diry) {
  // move camera
  this.x += dirx * SPEED * delta;
  this.y += diry * SPEED * delta;
  // clamp values
  this.x = Math.max(0, Math.min(this.x, this.maxX));
  this.y = Math.max(0, Math.min(this.y, this.maxY));
};

export default Camera;