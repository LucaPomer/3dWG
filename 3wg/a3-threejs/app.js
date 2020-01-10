/*
 * 3DWebGraphics Aufgabe 3
 * (C)opyright Martin Puse, mpuse@beuth-hochschule.de
 */

window.onload = function() {

    // setup the renderer
    let renderer  = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // create a scene
    let scene = new THREE.Scene();
    let axesHelper = new THREE.AxesHelper(2)
    scene.add(axesHelper)

    // create a camera
    let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    let radius = 10

    // setup simulation
    let delta = 1 / 60
    let time = -delta

    //scene
    var geometry = new THREE.BoxGeometry( 3, 3, 3 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );



    let update = function() {
        time += delta
        cube.rotation.x += 0.01;
        camera.position.x = radius * Math.sin(time)
        camera.position.z = radius * Math.cos(time)
        camera.lookAt(new THREE.Vector3(0, 0, 0))
    }

    // simulation loop
    let render = function() {
        requestAnimationFrame(render)
        
        update()
        renderer.render(scene, camera)
    }

    // go
    render()
}
