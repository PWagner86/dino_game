import * as THREE from 'https://cdn.skypack.dev/three@latest';

export class Ground {
    constructor( params ){

        this._params = params;
        this._createGround();

    };

    _createGround(){
        const geo = new THREE.PlaneGeometry( 10000, 10000 );
        const material = new THREE.MeshLambertMaterial( { color: 0xffffff , side: THREE.DoubleSide } );
        material.color.setHSL( 0.095, 1, 0.75 );
        const ground = new THREE.Mesh( geo, material );
        ground.rotation.x = Math.PI / 2;
        ground.receiveShadow = true;
        this._params.scene.add( ground );
    };
};