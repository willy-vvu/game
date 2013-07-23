var CORNERED = new Object();

CORNERED.Mouse = function() {
this.left = false;
this.middle = false;
this.right = false;
this.x = 0;
this.y = 0;
this.mX = 0;
this.mY = 0;
};

CORNERED.Sprite = function(texture, xOffset, yOffset, width, height, mWidth, mHeight) {
this.texture = texture;
this.xOffset = xOffset;
this.yOffset = yOffset;
this.width = width;
this.height = height;
this.mWidth = mWidth;
this.mHeight = mHeight;
this.map = THREE.ImageUtils.loadTexture(texture);
this.map.repeat.x = this.width / this.mWidth;
this.map.repeat.y = this.height / this.mHeight;
this.map.offset.x = this.xOffset / this.mWidth;
this.map.offset.y = this.map.repeat.y - (this.yOffset / this.mHeight);
this.plane = new THREE.Mesh(
new THREE.PlaneGeometry(this.width, this.height),
new THREE.MeshBasicMaterial({
map:this.map
})
);
this.render = function(x, y, scale, width, height) {//to render using scale call render(x, y, scale) to render using width and height call render(x, y, 1, width, height)
if(width == "undefined" || height == "undefined") {
//change this.plane width to this.width * scale and same for height
var rX = -jsRendererWidth / 2;
rX += this.width / 2;
rX -= -x;
var rY = jsRendererHeight / 2;
rY -= this.height / 2;
rY += -y;
this.plane.position.x = rX;
this.plane.position.y = rY;
jsScene.remove(this.plane);
jsScene.add(this.plane);
} else {
//change this.plane width to width and same for height
var rX = -jsRendererWidth / 2;
rX += this.width / 2;
rX -= -x;
var rY = jsRendererHeight / 2;
rY -= this.height / 2;
rY += -y;
this.plane.position.x = rX;
this.plane.position.y = rY;
jsScene.remove(this.plane);
jsScene.add(this.plane);
}
};
};