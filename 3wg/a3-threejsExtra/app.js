/*
 * 3DWebGraphics Aufgabe 3
 * (C)opyright Martin Puse, mpuse@beuth-hochschule.de
 */

window.onload = function () {


    //texture loaeder
    const loader = new THREE.TextureLoader();
    // setup the renderer
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth - 20, window.innerHeight - 20);
    document.body.appendChild(renderer.domElement);
    renderer.shadowMapEnabled = true;

    // create a scene
    let scene = new THREE.Scene();
    let axesHelper = new THREE.AxesHelper(2)
    scene.add(axesHelper)

    // create a camera
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 27;
    camera.position.y = 2.5;
    let radius = 10


    // setup simulation
    let delta = 1 / 60
    let time = -delta

    //scene\
    //Player
    //const planetTexture = loader.load('textures/2k_earth.jpg');
    var geometry = new THREE.BoxGeometry(2, 2, 2);
    var material = new THREE.MeshBasicMaterial({color: 0xE1CEBB});
    material.opacity = 0.4;
    material.transparent = true;
    var player = new THREE.Mesh(geometry, material);
    player.position.y = 11;
    let playerGroup = new THREE.Group();
    playerGroup.add(player);
    playerGroup.rotation.x = 1;
    player.castShadow = true;
    // playerGroup.rotation.z += 1;
    //  scene.add( playerGroup );

//light globe
    var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.2);
    scene.add(light);


    //Planet
    // const planetTexture = loader.load('textures/2k_earth.jpg');
    var sphereGeometry = new THREE.SphereGeometry(10, 32, 32);
    var material = new THREE.MeshLambertMaterial({color: 0x11B2D4});
    var planet = new THREE.Mesh(sphereGeometry, material);
    planet.receiveShadow = true;
    //sun.castShadow = true;
    scene.add(planet);


    //tree
    let treeCrown = new THREE.Group();
    let treeGroup = new THREE.Group();
    var geometry = new THREE.ConeGeometry(3, 3, 5);
    var material = new THREE.MeshLambertMaterial({color: 0x11D4B2});
    var cone = new THREE.Mesh(geometry, material);
    let cone2 = cone.clone();
    let cone3 = cone.clone();
    let cone4 = cone.clone();
    cone2.position.y = 2;
    cone3.position.y = 3;
    cone4.position.y = 1;
    treeCrown.add(cone);
    treeCrown.add(cone2);
    treeCrown.add(cone3);
    treeCrown.add(cone4);
    treeCrown.position.y = 2;
    treeGroup.add(treeCrown);

    //tree stamp
    let treeStamp = new THREE.Group();
    var geometry = new THREE.BoxGeometry(0.5, 4, 0.5);
    var material = new THREE.MeshBasicMaterial({color: 0x92510E});
    var stamp = new THREE.Mesh(geometry, material);
    treeStamp.add(stamp);
    treeGroup.add(treeStamp);
    treeGroup.position.y = 10;

    //   treeGroup.scale.set(0.4,0.4,0.4);


    function CreateTree(positon, scale) {
        let tree2 = treeGroup.clone();
        let tree2Group = new THREE.Group();
        tree2Group.add(tree2);
        tree2.scale.set(scale, scale, scale);

        tree2Group.rotation.x = positon.x;
        tree2Group.rotation.y = positon.y;
        tree2Group.rotation.z = positon.z;


        scene.add(tree2Group);
    }

// --------- Forest ----------------//
    for (let i = 0; i < 25; i++) {
        CreateTree(new THREE.Vector3(i, 0.3, 0.3), 0.4);
        CreateTree(new THREE.Vector3(i, -0.3, -0.3), 0.4);
        CreateTree(new THREE.Vector3(i, 1, 1), 0.5);
        CreateTree(new THREE.Vector3(i, -1, -1), 0.5);
        //  CreateTree(new THREE.Vector3(getRandomInt(1,(Math.PI*2)),getRandomInt(1,(Math.PI*2)),getRandomInt(1,(Math.PI*2))),0.6);
    }

    //sunLIght
    var light = new THREE.PointLight(0xFFFFFF, 1, 100, 2);
    light.position.set(player.position);
    light.castShadow = true;
    light.shadowDarkness = 0.5;
    player.add(light);


// alternative camrea
    let cameraPlayer = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200);
    var groupPlayerCamera = new THREE.Group();
    let vecPlayer = new THREE.Vector3(0, 0, 0);
    groupPlayerCamera.add(cameraPlayer);
    player.add(groupPlayerCamera);
    groupPlayerCamera.position.z += 6;
    groupPlayerCamera.position.y += 2.5;
    //cameraPlayer.lookAt(player.position);
    player.getWorldPosition(vecPlayer);
    cameraPlayer.lookAt(vecPlayer);


    // Music by :https://patrickdearteaga.com
    // create an AudioListener and add it to the camera
    var listener = new THREE.AudioListener();
    cameraPlayer.add(listener);

    // create a global audio source
    var sound = new THREE.Audio(listener);

    // load a sound and set it as the Audio object's buffer
    var audioLoader = new THREE.AudioLoader();
    audioLoader.load('music/calm.ogg', function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.5);
        sound.play();
    });

    //testRotation
    let playerWithCameraGroup = new THREE.Group()
    playerWithCameraGroup.add(playerGroup);
    scene.add(playerWithCameraGroup);


    //skydome

    const bgTexture = loader.load('textures/eso0932a.jpg');
    // scene.background = bgTexture;

    var textureSky = new THREE.TextureLoader().load('textures/eso0932a.jpg');
    var skydomeGeometry = new THREE.SphereGeometry(100, 20, 20);
    var materialSky = new THREE.MeshBasicMaterial({map: textureSky});
    materialSky.side = (THREE.BackSide);
    var sky = new THREE.Mesh(skydomeGeometry, materialSky);
    scene.add(sky);


    let speedPlayer = 0.001;
    let camreaTorender = camera;
    let update = function () {
        time += delta
        ColisionDetection();
        playerWithCameraGroup.rotateX(-speedPlayer);
        camera.lookAt(new THREE.Vector3(0, 0, 0))
    }


    let mainCamera = true;
    document.addEventListener("keydown", onDocumentKeyDown, false);

    function onDocumentKeyDown(event) {
        var keyCode = event.which;
        if (keyCode === 32) {
            if (mainCamera) {
                camreaTorender = cameraPlayer;
                mainCamera = false;
            } else {
                camreaTorender = camera;
                mainCamera = true;
            }
        }
        //left arrow
        if (keyCode === 37) {
            player.rotateY(THREE.Math.degToRad(90));
        }
        //right arrow
        if (keyCode === 39) {
            player.rotation.y -= (THREE.Math.degToRad(90));

        }
        //up arrow
        if (keyCode === 38) {
            if(player.position.y!=12){
                player.position.y = (12);
                cameraPlayer.position.y -= 1;

            }

        }
        //down arrow
        if (keyCode === 40) {
            if(player.position.y!=11) {
                player.position.y = (11);
                cameraPlayer.position.y += 1;
            }
        }

    }


    //create Text
    CreateText(0, 10, 2, 5, "Start");

    //text
    function CreateText(x, y, z, size, textToWrite) {


        var fontLoader = new THREE.FontLoader();
        fontLoader.load('texts/Sittella_Regular.json', function (font) {

            var xMid, text;

            var color = 0x006699;

            var matLite = new THREE.MeshBasicMaterial({
                color: color,
                transparent: true,
                opacity: 1,
                side: THREE.DoubleSide
            });

            var message = textToWrite;

            var shapes = font.generateShapes(message, size);
            var geometry = new THREE.ShapeBufferGeometry(shapes);
            geometry.computeBoundingBox();
            xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
            geometry.translate(xMid, 0, 0);

            // make shape ( N.B. edge view not visible )
            text = new THREE.Mesh(geometry, matLite);
            text.position.z = z;
            text.position.y = y;
            text.position.x = x;


            scene.add(text);

            var holeShapes = [];

            for (var i = 0; i < shapes.length; i++) {

                var shape = shapes[i];

                if (shape.holes && shape.holes.length > 0) {

                    for (var j = 0; j < shape.holes.length; j++) {
                        var hole = shape.holes[j];
                        holeShapes.push(hole);
                    }
                }
            }
            shapes.push.apply(shapes, holeShapes);

        });

    }

    //***-----------SPIKES----------------*****///
    let spikes = new THREE.Group();
    var geometry = new THREE.ConeGeometry(2, 2, 5);
    var material = new THREE.MeshLambertMaterial({color: 0xEA1010});
    var spike = new THREE.Mesh(geometry, material);
    // spikes.add(spike);
    spike.position.y = 10;
    let spikeGroup = new THREE.Group();
    scene.add(spikeGroup);
    let collidableMeshList = [spike];
    let rotation = 0.3;
    for (let i = 0; i < 7 ; i++) {
        let spikeI = spike.clone();
        let spikeGroupI = new THREE.Group();
        spikeGroupI.add(spikeI);
        rotation+=Math.PI/7;
        spikeGroupI.rotation.x = rotation;
        scene.add(spikeGroupI);
        collidableMeshList.push(spikeI);
    }

    //upperSpikes
   /** rotation = 0.5;
    for (let i = 0; i < 3 ; i++) {
        let spikeI = spike.clone();
        spikeI.position.y = 13;
        let spikeGroupI = new THREE.Group();
        spikeGroupI.add(spikeI);
        rotation+=Math.PI/3;
        spikeGroupI.rotation.x = rotation;
        scene.add(spikeGroupI);
        collidableMeshList.push(spikeI);
    }**/


    //spikes.rotation.x = 2;
    spikeGroup.add(spike);
    spikeGroup.rotation.x = -0.3;






    //***-----------COLLISION DETECTION----------------*****///

    function ColisionDetection() {
        let positonPlayer = new THREE.Vector3(1, 1, 1);
        player.getWorldPosition(positonPlayer);
      //  positonPlayer=Math.abs(positonPlayer);
        let positonObject = new THREE.Vector3(0, 0, 0);

        for (let i = 0; i < collidableMeshList.length; i++) {
            collidableMeshList[i].getWorldPosition(positonObject);
        //    positonObject = Math.abs(positonObject);
            //console.log("position " +positonObject.z + " " + positonPlayer.z);
            if (Math.abs((positonObject.z - positonPlayer.z))< 1) {
                if (positonObject.y - positonPlayer.y < 1 && positonObject.y - positonPlayer.y > -1) {
                    console.log("Hit " + positonObject.z + " " + positonPlayer.z);
                    playerWithCameraGroup.rotation.x = 0.1;
                }
            }

        }

    }
        //***-----------COLLISION DETECTION----------------*****///
        // simulation loop
        let render = function () {
            requestAnimationFrame(render)

            update()
            renderer.render(scene, camreaTorender)
        }

        // go
        render()
    }
