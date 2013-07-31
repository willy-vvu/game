function Sprite(name, texture, xOffset, yOffset, width, height, mWidth, mHeight) {
	this.name = name;
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
	this.map.offset.y = 1 - this.map.repeat.y - (this.yOffset / this.mHeight);
	this.plane = new THREE.Mesh(
		new THREE.PlaneGeometry(this.width, this.height),
		new THREE.MeshBasicMaterial({
			map:this.map
		})
	);
	this.render = function(x, y) {
		scene.remove(this.plane);
		var rX = -width / 2;
		rX += this.width / 2;
		rX -= -x;
		var rY = height / 2;
		rY -= this.height / 2;
		rY += -y;
		this.plane.position.x = rX;
		this.plane.position.y = rY;
		scene.add(this.plane);
	}
}

function setup2d() {

}

function setup3d() {

}