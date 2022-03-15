import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
// how to import dat.gui
import * as dat from 'dat.gui'

/****
 * Debug
 ****/
const gui = new dat.GUI()

// create color object
const parameter = {
    color: 0x3ac33a
}
// now change the color of material 
gui.addColor(parameter, 'color').onChange( () => {
    material.color.set(parameter.color)
})


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
const material = new THREE.MeshBasicMaterial({ color: parameter.color})
const mesh = new THREE.Mesh(geometry, material)
// mesh.visible = false 
scene.add(mesh)

// CREATE  Debug  mimimum , maximum , presion
gui.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('elevation')
// add visible true or false boolean value
gui.add(mesh, 'visible')
// add wireframe boolean value
gui.add(material, 'wireframe') 
// adding color 


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
camera.position.z = 3
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