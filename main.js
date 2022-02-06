import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js';

import { Sky } from './src/sky.js';
import { Ground } from './src/ground.js';
import { Natur } from './src/natur.js';
import { Dino } from './src/dino.js';



class World {
    constructor(){
            
        this._fov = 75;
        this._aspect = window.innerWidth / window.innerHeight;
        this._near = 0.1;
        this._far = 1000;

        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(
            this._fov,
            this._aspect,
            this._near,
            this._far,
        );

        this._renderer = new THREE.WebGLRenderer( {antialias: true} );
        this._renderer.shadowMap.enabled = true;
        this._renderer.shadowMap.type = THREE.PCDSoftShadowMap;
        this._renderer.setSize( window.innerWidth, window.innerHeight );

        document.body.append( this._renderer.domElement );

        this._camera.position.set( 0, 3, 10 );

        this._orbitControls = new OrbitControls( this._camera, this._renderer.domElement );
        this._orbitControls.maxPolarAngle = 1.5;
        this._orbitControls.enablePan = false;
        this._orbitControls.update();

        this._dirLight = new THREE.DirectionalLight( 0xffffff, 1, 10000 );
        this._dirLight.position.set( 0, 50, 0 );
        this._dirLight.castShadow = true;

        this._pointLight = new THREE.PointLight( 0x363636, 5, 1000 );
        this._pointLight.position.set( 0, 200, 0 );

        this._scene.add( this._dirLight, this._pointLight );

        this._pics = document.querySelectorAll('li');

        this._ground = new Ground( { scene: this._scene } );
        this._sky = new Sky( { scene: this._scene });
        this._natur = new Natur( { scene: this._scene });
        this._dino = new Dino( { scene: this._scene } );


        this._animate();

        window.addEventListener('resize', () => {
            this._onWindowResize();
        }, false);
    };

    _onWindowResize() {
        this._camera.aspect = this._aspect;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize( window.innerWidth, window.innerHeight );
    };

    _animate() {

        requestAnimationFrame( ( t ) => {

            if( this._previousAnimation === null){
                this._previousAnimation = t;
            };

            this._animate();
            this._orbitControls;

            if( this._dino._isLoaded ){
                this._natur._meshPack.forEach( m => {
                    m.position.x -= 0.05;
                    if( m.position.x < -640 ){
                        m.position.x = 640;
                    }
                });
                this._sky._cloudObjects.forEach( c => {
                    c.position.x -= 0.05;
                    if( c.position.x < -600 ){
                        c.position.x = 600;
                    }
                })
            };

            this._dino._update((t - this._previousAnimation) / 1000.0);


            this._renderer.render( this._scene, this._camera );
            this._previousAnimation = t;

        });
    };
};

let APP = null;

window.addEventListener('DOMContentLoaded', () => {
    APP = new World();
});