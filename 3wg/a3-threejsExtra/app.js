/*
 * 3DWebGraphics Aufgabe 3
 * (C)opyright Martin Puse, mpuse@beuth-hochschule.de
 */

window.onload = function() {

    //texture loaeder
    const loader = new THREE.TextureLoader();
    // setup the renderer
    let renderer  = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    renderer.shadowMapEnabled = true;

    // create a scene
    let scene = new THREE.Scene();
    let axesHelper = new THREE.AxesHelper(2)
    scene.add(axesHelper)

    // create a camera
    let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
   camera.position.z = 27;
    camera.position.y = 2;
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
    var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 0.7 );
   scene.add( light );


        //Planet
    const planetTexture = loader.load('textures/2k_earth.jpg');
    var sphereGeometry = new THREE.SphereGeometry( 10, 32, 32 );
    var material = new THREE.MeshLambertMaterial( { color: 0x11B2D4 } );
    var planet = new THREE.Mesh( sphereGeometry, material );
    planet.receiveShadow = true;
   //sun.castShadow = true;
    scene.add( planet );

    //tree
    let treeCrown = new THREE.Group();
    let treeGroup = new THREE.Group();
    var geometry = new THREE.ConeGeometry(3, 3, 5 );
    var material = new THREE.MeshLambertMaterial( {color: 0x11D4B2} );
    var cone = new THREE.Mesh( geometry, material );
    let cone2 = cone.clone();
    let cone3 = cone.clone();
    let cone4 = cone.clone();
    cone2.position.y =2;
    cone3.position.y =3;
    cone4.position.y =1;
    treeCrown.add( cone );
   treeCrown.add( cone2 );
   treeCrown.add( cone3 );
    treeCrown.add( cone4 );
treeCrown.position.y = 2;
    treeGroup.add(treeCrown);

    //tree stamp
    let treeStamp = new THREE.Group();
    var geometry = new THREE.BoxGeometry( 0.5, 4, 0.5 );
     var material = new THREE.MeshBasicMaterial( { color: 0x92510E } );
     var stamp = new THREE.Mesh( geometry, material );
     treeStamp.add(stamp);

     treeGroup.add( treeStamp );
     treeGroup.position.y = 10;
     treeGroup.scale.set(0.4,0.4,0.4);
     let tree2 = treeGroup.clone();
    let tree2Group = new THREE.Group();
    tree2Group.add(tree2);
    tree2Group.rotation.z += 0.7;


     scene.add(treeGroup);
     scene.add(tree2Group);

/**    //sunLIght
    var light = new THREE.PointLight( 0xFFFFFF, 1, 8000 );
    light.position.set( 0, 0, 0 );
    light.castShadow = true;
    light.shadowDarkness = 0.5;
    scene.add( light );
ß



  //alternative camrea
    let cameraJupiter = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 200 );
    let vecJupiter = new THREE.Vector3(0,0,0);
    var groupJupiterCamera = new THREE.Group();
    groupJupiterCamera.add(cameraJupiter);
    jupiter.add(groupJupiterCamera);
    cameraJupiter.translateZ(4);
    cameraJupiter.translateY(2);
**/

    //skydome

    const bgTexture = loader.load('textures/eso0932a.jpg');
   // scene.background = bgTexture;

   var textureSky = new THREE.TextureLoader().load( 'textures/eso0932a.jpg' );
    var skydomeGeometry = new THREE.SphereGeometry( 100, 20, 20 );
    var materialSky = new THREE.MeshBasicMaterial( { map: textureSky } );
    materialSky.side=(THREE.BackSide);
    var sky = new THREE.Mesh( skydomeGeometry, materialSky );
    scene.add(sky);




let camreaTorender = camera;
    let update = function() {
        time += delta

       // groupJupiterCamera.rotation.y += 0.003;


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
