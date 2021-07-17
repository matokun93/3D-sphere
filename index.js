import {OrbitControls} from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js'
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';

// Loading
const textureLoading = new THREE.TextureLoader()
const normalTexture = textureLoading.load('NormalMap2.png')

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(.5, 64, 64)

// Materials
const material = new THREE.MeshStandardMaterial()
material.metalness = 1
material.roughness = 0.6
material.color = new THREE.Color(0xcdcdcd)
material.normalMap = normalTexture;

// const shader = gui.addFolder('shader')

// shader.add(material, 'metalness').min(0).max(1).step(0.01)
// shader.add(material, 'roughness').min(0).max(1).step(0.01)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

// light 1

const pointLight1 = new THREE.PointLight(0xf08a43, 2)
pointLight1.position.set(-0.32,5,-5)
pointLight1.intensity = 9.79
//scene.add(pointLight1)

// const light1 = gui.addFolder('light 1')

// light1.add(pointLight1.position, 'x').min(-5).max(5).step(0.01)
// light1.add(pointLight1.position, 'y').min(-5).max(5).step(0.01)
// light1.add(pointLight1.position, 'z').min(-5).max(5).step(0.01)
// light1.add(pointLight1, 'intensity').min(0).max(20).step(0.01)

// const pointLight1Helper = new THREE.PointLightHelper(pointLight1, 1)
// scene.add(pointLight1Helper)

// const light1Color = {
//     color: 0x42f5ef
// }

// light1.addColor(light1Color, 'color')
//     .onChange(() => {
//         pointLight1.color.set(light1Color.color)
//     })

// light2

const pointLight2 = new THREE.PointLight(0x285b5f, 2)
pointLight2.position.set(5,-3.96,-0.65)
pointLight2.intensity = 1.41
scene.add(pointLight2)

// const light2 = gui.addFolder('light 2')

// light2.add(pointLight2.position, 'x').min(-5).max(5).step(0.01)
// light2.add(pointLight2.position, 'y').min(-5).max(5).step(0.01)
// light2.add(pointLight2.position, 'z').min(-5).max(5).step(0.01)
// light2.add(pointLight2, 'intensity').min(0).max(20).step(0.01)

// const pointLight2Helper = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLight2Helper)

// const light2Color = {
//     color: 0x42f5ef
// }

// light2.addColor(light2Color, 'color')
//     .onChange(() => {
//         pointLight2.color.set(light2Color.color)
//      })

// light3

const pointLight3 = new THREE.PointLight(0x70202, 2) 
//const pointLight3 = new THREE.PointLight(0x1b0700, 2)
pointLight3.position.set(-5,4.31,0.45)
pointLight3.intensity = 11.12
scene.add(pointLight3)

//  const light3 = gui.addFolder('light 3')

// light3.add(pointLight3.position, 'x').min(-5).max(5).step(0.01)
// light3.add(pointLight3.position, 'y').min(-5).max(5).step(0.01)
// light3.add(pointLight3.position, 'z').min(-5).max(5).step(0.01)
// light3.add(pointLight3, 'intensity').min(0).max(20).step(0.01)

// const pointLight3Helper = new THREE.PointLightHelper(pointLight3, 1)
// scene.add(pointLight3Helper)

// const light3Color = {
//         color: 0x42f5ef
//     }
    
//     light3.addColor(light3Color, 'color')
//         .onChange(() => {
//             pointLight3.color.set(light3Color.color)
//          })


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2
const windowHalfY = window.innerHeight / 2

/*onDocumentMouseMove = (event) => {
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}*/
function onDocumentMouseMove(event){
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}

const updateSphere = (event) => {
    sphere.position.y = window.scrollY * 0.001
}

window.addEventListener('scroll', updateSphere)


const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * 0.001
    targetY = mouseY * 0.001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.position.z += -.05 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()









// const canvas = document.querySelector('canvas.webgl')

// // Scene
// const scene = new THREE.Scene()

// const textureLoader = new THREE.TextureLoader()
// const myTexture = textureLoader.load('coolTex.jpg')

// // Object
// const geometry = new THREE.BoxGeometry(1,1,1)
// const geometry2 = new THREE.DodecahedronGeometry(0.5,3)
// const material = new THREE.MeshBasicMaterial({
//     map: myTexture
// })
// const boxMesh = new THREE.Mesh(geometry,material)
// const sphereMesh = new THREE.Mesh(geometry2,material)
// scene.add(boxMesh)
// // scene.add(sphereMesh)
// boxMesh.position.x = 0
// boxMesh.position.y = 0.8
// sphereMesh.position.x = -1.6
// sphereMesh.position.y = 0.5
// geometry.center()
// // Sizes
// const sizes = {
//     width:window.innerWidth,
//     height:window.innerHeight
// }

// // Renderer gets updated each time window is resized
// window.addEventListener('resize',()=>{
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     camera.aspect = sizes.width/sizes.height
//     camera.updateProjectionMatrix()

//     renderer.setSize(sizes.width,sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
    
// })

// // Camera
// const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,100)
// camera.position.z = 3
// scene.add(camera)

// // Controls
// const controls = new OrbitControls(camera, canvas)

// controls.enableZoom = false;
// controls.enableDamping = true

// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas,
//     alpha: true,
// })
// renderer.setSize(sizes.width,sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

// const clock = new THREE.Clock()

// const tick = () => {
//     const elapsedTime = clock.getElapsedTime()
//     boxMesh.rotateX(30*0.0003)
//     boxMesh.rotateY(30*0.0003)
//     sphereMesh.rotateY(30*0.0003)
//     // mesh.position.y = Math.sin(elapsedTime) *0.1
//     boxMesh.position.z = Math.sin(elapsedTime) * 1

//     controls.update()
//     controls.enableDamping = true
//     renderer.render(scene,camera)
//     window.requestAnimationFrame(tick)
// };

// tick()