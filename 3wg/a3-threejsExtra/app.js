/*
 * 3DWebGraphics Aufgabe 3
 * (C)opyright Martin Puse, mpuse@beuth-hochschule.de
 */

window.onload = function() {

    //texture loaeder
    const loader = new THREE.TextureLoader();
    // setup the renderer
    let renderer  = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth-20, window.innerHeight-20 );
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
    //Player
    const planetTexture = loader.load('textures/2k_earth.jpg');
    var geometry = new THREE.BoxGeometry( 2, 2, 2 );
    var material = new THREE.MeshBasicMaterial( { map: planetTexture } );
    var player = new THREE.Mesh( geometry, material );
    player.position.y = 11;
    let playerGroup = new THREE.Group();
    playerGroup.add(player);
    playerGroup.rotation.x = 1;
   // playerGroup.rotation.z += 1;
  //  scene.add( playerGroup );

//light globe
    var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 0.7 );
   scene.add( light );


        //Planet
   // const planetTexture = loader.load('textures/2k_earth.jpg');
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
**/



// alternative camrea
    let cameraPlayer = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 200 );
    var groupPlayerCamera = new THREE.Group();
    let vecPlayer = new THREE.Vector3(0,0,0);
    groupPlayerCamera.add(cameraPlayer);
    player.add(groupPlayerCamera);
    groupPlayerCamera.position.z += 5;
    groupPlayerCamera.position.y += 2;
    //cameraPlayer.lookAt(player.position);
    player.getWorldPosition(vecPlayer);
    cameraPlayer.lookAt(vecPlayer);

    //testRotation
    let playerWithCameraGroup = new THREE.Group()
    playerWithCameraGroup.add(playerGroup);
    scene.add(playerWithCameraGroup);



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

    let movingStraight = true;
    let movingLeft = false;
    let movingRight = false;
    let movingDown= false;

    let speedPlayer = 0.01;
    let mainCamera = true;
    document.addEventListener("keydown", onDocumentKeyDown, false);
    function onDocumentKeyDown(event) {
        var keyCode = event.which;
        if(keyCode===32){
            if(mainCamera){
                camreaTorender = cameraPlayer;
                mainCamera=false;
            }
            else{
                camreaTorender=camera;
                mainCamera=true;
            }
        }
        //left arrow
        if(keyCode === 37 ){
            console.log("rotating left"+ THREE.Math.degToRad(90));
            player.rotateY(THREE.Math.degToRad(90));
            SetMovementDirectionToLeft();
        }
        //right arrow
        if(keyCode === 39){
            console.log("rotating right" + THREE.Math.degToRad(270));
             player.rotation.y-=(THREE.Math.degToRad(90));
            SetMovementDirectionToRight();
        }
        //up arrow
        if(keyCode === 38){
            if (movingStraight){
                console.log("moving strait");
                playerWithCameraGroup.rotateX(-speedPlayer);
            }
            if(movingDown){
                console.log("moving down");
                playerWithCameraGroup.rotateX(speedPlayer);
            }
        }
        //down arrow
        if(keyCode === 40){
            if (movingStraight){
                playerWithCameraGroup.rotation.x +=speedPlayer;
            }
            if(movingDown){
                playerWithCameraGroup.rotation.x -=speedPlayer;
            }

        }
    }

    function SetMovementDirectionToLeft(){
        console.log(" BEFOR$EE strait "+ movingStraight + " left " + movingLeft + " right " + movingRight + " down " + movingDown);
        if(movingStraight){
            movingLeft =true;
            movingStraight = false;
        }
        else if(movingLeft){
            movingDown=true;
            movingLeft=false;
        }
        else if(movingDown){
            movingRight=true;
            movingDown=false;
        }
        else if(movingRight){
            movingStraight=true;
            movingRight=false;
        }
        console.log(" AFTER strait "+ movingStraight + " left " + movingLeft + " right " + movingRight + " down " + movingDown);
    }

    function SetMovementDirectionToRight(){
        if(movingStraight){
            movingRight =true;
            movingStraight = false;
        }
        else if(movingRight){
            movingDown=true;
            movingRight=false;
        }
        else if(movingDown){
            movingLeft=true;
            movingDown=false;
        }
        else if(movingLeft){
            movingStraight=true;
            movingLeft=false;
        }
    }

    //create Text
     CreateText(0,10,2,5,"hello");

    //text
    function CreateText(x,y,z,size,textToWrite){


    var fontLoader = new THREE.FontLoader();
    fontLoader.load( 'texts/Sittella_Regular.json', function ( font ) {

        var xMid, text;

        var color = 0x006699;

        var matLite = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 1,
            side: THREE.DoubleSide
        });

    var message = textToWrite;

    var shapes = font.generateShapes( message, size );
    var geometry = new THREE.ShapeBufferGeometry( shapes );
    geometry.computeBoundingBox();
    xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
    geometry.translate( xMid, 0, 0 );

    // make shape ( N.B. edge view not visible )
    text = new THREE.Mesh( geometry, matLite );
    text.position.z =  z;
    text.position.y =  y;
    text.position.x =  x;


        scene.add(text);

        var holeShapes = [];

        for ( var i = 0; i < shapes.length; i ++ ) {

            var shape = shapes[ i ];

            if ( shape.holes && shape.holes.length > 0 ) {

                for ( var j = 0; j < shape.holes.length; j ++ ) {
                    var hole = shape.holes[ j ];
                    holeShapes.push( hole );
                }
            }
        }
        shapes.push.apply( shapes, holeShapes );

    });

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
