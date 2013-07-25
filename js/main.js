renderer=new THREE.WebGLRenderer()
holder=document.getElementById('holder')
holder.appendChild(renderer.domElement)
composer=new THREE.EffectComposer(renderer)

scene=new THREE.Scene()
camera=new THREE.PerspectiveCamera(45,0,0.01,100000)
camera.rotation.order='YXZ'
scene.add(camera)
renderPass=new THREE.RenderPass(scene,camera)
composer.addPass(renderPass)

coolPass=new THREE.ShaderPass({
	uniforms:{
		'tDiffuse': { type: 't',value: null},
		'resolution': { type: 'v2',value: new THREE.Vector2()},
		'position':{type:'v2',value: new THREE.Vector2()},
		'phase':{type:'f',value:0}
	},
	vertexShader: [
	'varying vec2 v;',
	'void main() {',
		'v = uv;',
		'gl_Position = vec4( position, 1.0 );',
	'}'
	].join('\n'),
	fragmentShader: [
	'varying vec2 v;',
	'uniform sampler2D tDiffuse;',
	'void main() {',
		'gl_FragColor=texture2D(tDiffuse,v);',
	'}'
	].join('\n')
})
coolPass.renderToScreen=true
composer.addPass(coolPass)
function resize(){
	renderer.setSize(window.innerWidth,window.innerHeight)
	composer.setSize(window.innerWidth,window.innerHeight)
	camera.aspect=window.innerWidth/window.innerHeight
	camera.updateProjectionMatrix()
}
resize()
window.onresize=resize

loader=new THREE.JSONLoader()

refractMap=new THREE.CubeRefractionMapping()

THREE.ImageUtils.loadTextureCube([
	'scene/Background.png',
	'scene/Background.png',
	'scene/Background.png',
	'scene/Background.png',
	'scene/Background.png',
	'scene/Background.png'
],refractMap,function(data){
	textureCube=data
	var uniforms=THREE.UniformsUtils.clone(THREE.ShaderLib['cube'].uniforms)
	uniforms.tCube.value=textureCube
	background=new THREE.Mesh(
		new THREE.CubeGeometry(1000,1000,1000),
		new THREE.ShaderMaterial({
			uniforms:uniforms,
			vertexShader:THREE.ShaderLib['cube'].vertexShader,
			fragmentShader:THREE.ShaderLib['cube'].fragmentShader,
			side:THREE.BackSide
		})
	)
	scene.add(background)
	loader.load('scene/World.js',function(geo){
		world=new THREE.Mesh(
			geo,
			new THREE.MeshPhongMaterial({
				diffuse:0x000000,
				ambient:0xffffff,
				specular:0xffffff,
				shininess:100,
				//envMap:textureCube,
				//refractionRatio:0.99,
				side:THREE.DoubleSide
			})
		)
		scene.add(world)
		render()
	})
})

light=new THREE.PointLight(0xffffff,1)
light.position.set(0,4,0)
scene.add(light)

vector3=new THREE.Vector3()
vector3_=new THREE.Vector3()
matrix4=new THREE.Matrix4()

function render(){
	handleKeys()
	composer.render()
	window.webkitRequestAnimationFrame(render)
}

function handleKeys(){
	var move=false
	vector3.set(0,0,0)
	for(var k=0;k<keysdown.length;k++){
		switch(keysdown[k]){
			case 87://W
				move=true
				vector3.z-=1
				break
			case 65://A
				move=true
				vector3.x-=1
				break
			case 83://S
				move=true
				vector3.z+=1
				break
			case 68://D
				move=true
				vector3.x+=1
				break
		}
	}
	if(move){
		vector3_.copy(camera.rotation)
		vector3_.x=0
		matrix4.makeRotationFromEuler(vector3_)
		vector3.normalize().multiplyScalar(0.2).transformDirection(matrix4)
		camera.position.add(vector3)
	}
}
function clamp(value,min,max){
	return Math.min(Math.max(value,min),max)
}
keysdown=[]

window.addEventListener('keydown',function(event){
	var ind=keysdown.indexOf(event.keyCode)
	if(ind==-1){
		keysdown.push(event.keyCode)
	}
	//console.log(keysdown)
})
window.addEventListener('keyup',function(event){
	var ind=keysdown.indexOf(event.keyCode)
	if(ind!=-1){
		keysdown.splice(ind,1)
	}
})
window.addEventListener('mousemove',function(event){
	if(document.webkitPointerLockElement==document.body){
		camera.rotation.y+=-event.webkitMovementX*0.01
		camera.rotation.x+=-event.webkitMovementY*0.01
		camera.rotation.x=clamp(camera.rotation.x,-Math.PI/2,Math.PI/2)
	}
})
document.body.addEventListener('click',function(event){
	document.body.webkitRequestPointerLock()
})
