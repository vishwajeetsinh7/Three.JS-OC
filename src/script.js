import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import gui debugger
import * as dat from 'dat.gui'

/*
****Debug
*/
const gui = new dat.GUI()


/*
Texture Loader 
*/
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcculusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const metcapTexture = textureLoader.load('/textures/matcaps/1.png')
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
// deactivate them 
gradientTexture.generateMipmaps = false


// CUBE TEXTURE LOADER

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/3/nx.jpg',
    '/textures/environmentMaps/3/px.jpg',
    '/textures/environmentMaps/3/py.jpg',
    '/textures/environmentMaps/3/ny.jpg',
    '/textures/environmentMaps/3/pz.jpg',
    '/textures/environmentMaps/3/nz.jpg',
])


// console.log(doorColorTexture)


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/*
objects
*/

// LAMBER MATERIAL 

// const material = new THREE.MeshLambertMaterial()



// MESH PHONG MATERIAL:

// const material = new  THREE.MeshPhongMaterial()

// // control the shininess and specular
// material.shininess = 1000
// material.specular = new THREE.Color(0xff00ff)




// const material = new  THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture




// MESH STANDARARD MATERIAL:

const material = new THREE.MeshStandardMaterial()
// change roughness and metalness

material.metalness = 0.7
material.roughness = 0.2

material.envMap = environmentMapTexture




// material.map = doorColorTexture
// material.aoMap = doorAmbientOcculusionTexture
// material.aoMapIntensity  = 7
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.05

// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture

// material.normalMap = doorNormalTexture

// material.normalScale.set(0.5, 0.5)

// material.alphaMap = doorAlphaTexture
// material.transparent = true

















// add the tweaks
gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.0001)
gui.add(material, 'displacementScale').min(0).max(1).step(0.0001)































// const material = new THREE.MeshDepthMaterial()

// THE FOLLOWING MATERIAL NEEDS LIGHT

// CREATE AN AMBIENT LIGHT


















// const material = new THREE.MeshNormalMaterial()

// material.flatShading = true

















// const material = new THREE.MeshBasicMaterial([])

// most of material properties set in two ways
// material.color.set('#ff00ff')
// we can combine color and map
// material.map = doorColorTexture  
// material.color = new THREE.Color('red')


// we can  use wirefame for show triangle insite of it 
// material.wireframe = true

// opacity contorl the general opacity 
// We need to set transparent = true

// material.opacity = 0.5
// material.transparent = true


// alpha material 

// material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide




// we need to true transparent
material.transparent = true

const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5,64,64),
    material
) 

sphere.geometry.setAttribute(
    'uv2',
     new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
     )



sphere.position.x = -1.5
// console.log(sphere.geometry.attributes)

const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1,1,100,100),
    material
)

plane.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
)



// console.log(plane.geometry.attributes.uv.array)
sphere.geometry.setAttribute(
    'uv2',
     new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
     )

const torus = new THREE.Mesh(
    new THREE.TorusBufferGeometry(0.3, 0.2, 64, 128)
    ,material
)

// torus.geometry.setAttribute(
//     'uv2',
//     new THREE.BuffergAttribute(torus.geometry.attributes.uv.array, 2)
// )

torus.position.x = 1.5

scene.add(sphere, plane, torus)







/**  
* LIGHT
*****/

const ambiientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambiientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)















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
camera.position.z = 2
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

    // console.log(elapsedTime)
    // Update Objects 

    sphere.rotation.y = 0.1 * elapsedTime  
    plane.rotation.y = 0.1 * elapsedTime  
    torus.rotation.y = 0.1 * elapsedTime  

    sphere.rotation.x = 0.15 * elapsedTime  
    plane.rotation.x= 0.15 * elapsedTime  
    torus.rotation.x= 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()   