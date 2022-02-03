![THREE.s](https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Three.js_Icon.svg/150px-Three.js_Icon.svg.png) 


#  [Three.JS](https://threejs.org/) 


___
---

> 1) WHAT IS THREE.JS

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



Constructor
PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )





