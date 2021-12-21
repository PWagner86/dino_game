import * as THREE from 'https://cdn.skypack.dev/three@latest';
import { OBJLoader } from 'https://cdn.skypack.dev/three@latest/examples/jsm/loaders/OBJLoader.js';

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
        this._camera.position.set( 0, 0, 5 );

        this._renderer = new THREE.WebGLRenderer();
        this._renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.append( this._renderer.domElement );

        this._OBJLoader = new OBJLoader();

        this._dino = new Dino( { scene: this._scene, loader: this._OBJLoader } );

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
        const animate = () => {
            requestAnimationFrame( animate );
            this._renderer.render( this._scene, this._camera )
        };
        animate();
    };

};

let APP = null;

window.addEventListener('DOMContentLoaded', () => {
    APP = new World();
})