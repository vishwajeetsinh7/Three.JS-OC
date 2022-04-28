import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// import image
import imageSource from '../static/textures/door/color.jpg'
import { LinearMipmapLinearFilter } from 'three'
console.log(imageSource)

// loading  MANAGER
const loadingManager  = new THREE.LoadingManager()

// loadingManager.onStart = () => {
//     console.log('onstart')
// }

// loadingManager.onLoaded = () => {
//     console.log('onloaded')
// }

// loadingManager.onProgress = () => {
//     console.log('onprogress')
// }

// loadingManager.onError = () => {
//     console.log('onerror')
// }


const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('/textures/minecraft.png')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

// repeat the textures it is vector2

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3

// // // repette the pattern 
// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping

// //offset 
// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5

// rotate
// colorTexture.rotation = Math.PI * 0.8

// // rotate point of the rotation 
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

// deactivate 
colorTexture.generateMipmaps = false 

// MINFILTER
colorTexture.minFilter = THREE.NearestFilter

// magfilter
colorTexture.magFilter = THREE.NearestFilter

// colorTexture.minFilter = THREE.LinearFilter
// colorTexture.minFilter = THREE.NearestMipmapLinearFilter
// colorTexture.minFilter = LinearMipmapLinearFilter (default)





/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */

const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
console.log(geometry.attributes.uv)

//or 
// const geometry = new THREE.SphereBufferGeometry(1,32,32)

//or
// const geometry = new THREE.ConeBufferGeometry(1,1,32);  

// or
// const geometry = new THREE.TorusBufferGeometry(1, 0.35, 32, 100 )


// now the change the color to the material 
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()