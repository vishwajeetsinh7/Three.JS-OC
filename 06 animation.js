import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

console.log(gsap)
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// time 
// let time = Date.now()


// CLOCK 2ND METHOD FOR ACCURATE ROTATION
const clock = new THREE.Clock()


    // use G S A P 
    gsap.to(mesh.position, {duration:1 ,delay:1, x:1})
    gsap.to(mesh.position, {duration:1 ,delay:2, x:0})
    



// A N I M A T I O N 

const tick = ()  => 
{
    let  one = 1;
    let two = 2;
    // second method clock 
    const elapsedTime = clock.getElapsedTime()

    // //time
    // const currentTime = Date.now()
    // const deltaTime = currentTime - time
    // time = currentTime

    // console.log(deltaTime)

    // update object with the help of clock 
    // mesh.rotation.y = elapsedTime
    // console.log(elapsedTime)

    //update object complete one round per second 
    // mesh.rotation.y = elapsedTime * Math.PI * 2

    // use sin theta and cos theta mta in rotation
    //update objects  
    // mesh.position.x = Math.sin(elapsedTime)
    // mesh.position.z = Math.cos(elapsedTime)

    // camera.position.x = Math.sin(elapsedTime)
    // camera.position.y = Math.sin(elapsedTime)
    // camera.position.z = Math.sin(elapsedTime)

    // camera.lookAt(mesh.position)

    // update object
    // mesh.rotation.x += 0.001 * deltaTime
  

    // renderer
    renderer.render(scene, camera)

    console.log('tick')
    window.requestAnimationFrame(tick)
}

tick()