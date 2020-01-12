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
   //camera.position.z = 15;
    camera.position.y = 15;
    let radius = 10



    // setup simulation
    let delta = 1 / 60
    let time = -delta

    //scene\
    //aufgabe 1
    /**var geometry = new THREE.BoxGeometry( 3, 3, 3 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    cube.position.set(5,5,5);
    scene.add( cube );**/
//light globe
    var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    scene.add( light );


    //SUN
    var sphereGeometry = new THREE.SphereGeometry( 3, 32, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    var sun = new THREE.Mesh( sphereGeometry, material );
    scene.add( sun );

    //sunLIght
    var light = new THREE.PointLight( 0xFFFFFF, 1, 1000 );
    light.position.set( 0, 0, 0 );
    scene.add( light );

    //EARTH
    var earthGeometry = new THREE.SphereGeometry( 1, 20, 20 );
    var materialEarth = new THREE.MeshLambertMaterial( {color: 0x3D9D9D} );
    var earth = new THREE.Mesh( earthGeometry, materialEarth );
    earth.translateZ( 5 );
    var groupEarth = new THREE.Group();
    groupEarth.add(earth);
    sun.add( groupEarth );

    //Jupiter
    var jupiterGeometry = new THREE.SphereGeometry( 1.5, 20, 20 );
    var materialJupiter = new THREE.MeshLambertMaterial( {color: 0xCAA177} );
    var jupiter = new THREE.Mesh( jupiterGeometry, materialJupiter );
    jupiter.translateZ( 8 );
    var groupJupiter = new THREE.Group();
    groupJupiter.add(jupiter);
    sun.add( groupJupiter );

    //alternative camrea
    let cameraJupiter = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 200 );
    let vecJupiter = new THREE.Vector3(0,0,0);
    var groupJupiterCamera = new THREE.Group();
    groupJupiterCamera.add(cameraJupiter);
    jupiter.add(groupJupiterCamera);
    cameraJupiter.translateZ(4);
    cameraJupiter.translateY(2);

    //moon
    var moonGeometry = new THREE.SphereGeometry( 0.2, 20, 20 );
    var materialMoon = new THREE.MeshLambertMaterial( {color: 0x818E8E} );
    var moon = new THREE.Mesh( moonGeometry, materialMoon );
    moon.translateZ( 1.5 );
    var groupMoon = new THREE.Group();
    groupMoon.add(moon);
    earth.add(groupMoon);

    //skydome
    const loader = new THREE.TextureLoader();
    const bgTexture = loader.load('textures/eso0932a.jpg');
    scene.background = bgTexture;

   var textureSky = new THREE.TextureLoader().load( 'textures/eso0932a.jpg' );
    var skydomeGeometry = new THREE.SphereGeometry( 1000, 20, 20 );
    var materialSky = new THREE.MeshBasicMaterial( { map: textureSky } );
    materialSky.side=(THREE.BackSide);
    var sky = new THREE.Mesh( skydomeGeometry, materialSky );
    scene.add(sky);




let camreaTorender = camera;
    let update = function() {
        time += delta
      groupEarth.rotation.y += 0.01;
        groupMoon.rotation.y += 0.03;
        groupJupiter.rotation.y += 0.007;
       // groupJupiterCamera.rotation.y += 0.003;

        jupiter.getWorldPosition(vecJupiter);
        cameraJupiter.lookAt(vecJupiter);

        //camera.position.x = radius * Math.sin(time)
       // camera.position.z = radius * Math.cos(time)
        camera.lookAt(new THREE.Vector3(0, 0, 0))
    }

    let mainCamera = true;
    document.addEventListener("keydown", onDocumentKeyDown, false);
    function onDocumentKeyDown(event) {
        var keyCode = event.which;
        if(keyCode===32){
            if(mainCamera){
                camreaTorender = cameraJupiter;
                mainCamera=false;
            }
            else{
                camreaTorender=camera;
                mainCamera=true;
            }

        }
    }
    // simulation loop
    let render = function() {
        requestAnimationFrame(render)
        
        update()
        renderer.render(scene, camreaTorender)
    }

    // go
    render()
}
