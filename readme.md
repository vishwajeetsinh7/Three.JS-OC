![THREE.s](https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Three.js_Icon.svg/150px-Three.js_Icon.svg.png) 


#  **[Three.JS](https://threejs.org/)** 


___
---

> **1) WHAT IS THREE.JS**

ANS: Three.JS is  a 3D JavaScript library that enables developers to create 3D experiences for the web

It works with WebGL, but you can make it work with SVG and CSS but those two are quite limited.

* JAVASCRIPT LIBRARY 
* MIT LICENSE
* RIGHT ABOVE WEBGLCREATOR: Richardo Cabello , aka Mr.doob


>2.  What IS WebGL

ANS: is a JavaScript API 
* DRAWING a single triangle on the canvas would take at least 100 lines of code
That is why native WebGL is so hard

* Native WebGL benefits from exiting at a low level which enables optimization and more control

----
___
## F I R S T     
## S    C   E   N   E


### * WE NEED 4 ELEMENT TO GET STARTED

1) A scene that will contain objects.
2)  Some objects.
3) A camara
4) A renderer 

> `1) SCENE` 
 >>* like a container
>> * we put object, models, lights, etc in it
>> * at some point we ask Three.js to render that scene

```javascript
const scene = new THREE.Scene()
```

### OBJECT CAN BE MANY THINGS
* PRIMARY GEOMETRIES
* IMPORTED MODELS
* PARTICALS
* LIGHTS



> `2) SIMPLE RED CUBE `

1) WE need to create a MESH combination of geometry ( the shapes ) and material (how it looks) start with a BoxGeometry and a MeshBasicMaterial

```js
const geometry = new THREE.BoxGeometry(1,1,1)
```
The first 3 parameters correspond to box size



> `2.2) MATERIAL `
Instantiate a MeshBasicMaterial

```JS
const material = new THREE.MeshBasicMaterial({ color:'red'})

```

> `2.3) MESH`
Instantiate the Mesh with the geometry and the material

```JS
const mesh = new THREE.Mesh(geometry, material)

```
> `2.4) ALSO ADD IT TO SCENE`

```JS
scene.add(mesh)

```


>> `3) CAMERA`

* Not visible 
* Serve as point of view when doing a render
* Can have multiple and switch between them 
* Different types
* We are going to use PerspectiveCamera (if object are far small  if near large)

```JS
// camera
const camera = new THREE.PerspectiveCamera(75, )
scene.add(camera)
```



### `Constructor`
PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )

1) (75) THE FIELD OF VIEW - 1st parameter  	
* VERTICAL VISION ANGLE
* IN DEGREE
* ALSO CALLED FOV

2) THE ASPECT RATIO -2nd parameter
- The width of the render divided by the height of the render we don’t have the render yet, but we can decide on size now

```js
// create this before camera for value
const sizes = {
    width: 800,
    height: 600
}

```


### ` RENDERER`
* Render the scene from the camera point of view
* Result drawn into canvas
* A canvas is a HTML element in which you can draw stuff
* Three.JS will use WebGL to draw the render inside this canvas
* You can create it or you can let Three.JS do it

USE
```JS
 const canvas = document.querySelector(‘.webgl’)
```
To retrieve the canvas we created in the HTML and store it in  a canvas variable. 
Ex : <canvas class=”webgl”>          <canvas>

* Use the setSize() method to update the size of the renderer
```JS
renderer.setSize(sizes.width, sizes.height)

```

### : : `: FIRST RENDER`

Call the render(...) method on the renderer with scene and the camera as the parameter

* Now nothing is visible because the camera is inside the cube we need move the camera backward

**To transform an object, we can use the following properties**
* Position
* Rotation
* scale

: the position property is also an object with x, y, z properties Three.JS consider the forward/backward axis to be z


**We need to move the camera backward before doing the render**
```JS
//camera 
camera.position.z = 3
```


**At last we have to render both scene and camera**

```JS
camera.position.z = 3

```


---
___
---

# **FULL CODE**

```JS
 
// 1) create a scene With captital S
const scene = new THREE.Scene()
 
// 2) // red cube
 
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({ color:0xff0000})
const mesh = new THREE.Mesh(geometry, material)
 
scene.add(mesh)
 
 
const sizes = {
    width: 800,
    height: 600
}
 
// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)
 
 
// renderer
const canvas = document.querySelector('.webgl')
 
 
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene,camera)


```