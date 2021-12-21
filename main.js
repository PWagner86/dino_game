import * as THREE from 'https://cdn.skypack.dev/three@latest';
// import { OrbitControls } from 'https://cdn.skypack.dev/three@latest/examples/jsm/controls/OrbitControls.js';

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

        this._renderer = new THREE.WebGLRenderer();
        this._renderer.setSize( window.innerWidth, window.innerHeight );

        // this._orbitControls = new OrbitControls( this._camera, this._renderer.domElement );
        // this._orbitControls.update();

        document.body.append( this._renderer.domElement );

        this._camera.position.set( 0, 2, 5 );


        this._dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
        this._ambientLight = new THREE.AmbientLight( 0x404040 );

        this._dino = new Dino( { scene: this._scene } );

        this._scene.add( this._dirLight, this._ambientLight );

        this._animate();

        window.addEventListener('resize', () => {
            this._onWindowResize();
        });
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
            this._dino._update((t - this._previousAnimation) / 1000.0)
            this._renderer.render( this._scene, this._camera );
            this._previousAnimation = t;

        });
    };
};

let APP = null;

window.addEventListener('DOMContentLoaded', () => {
    APP = new World();
})