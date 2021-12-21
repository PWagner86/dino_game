import * as THREE from 'https://cdn.skypack.dev/three@latest';

export class Dino {
    constructor( props ){

        this._props = props;
        this._loader = this._props.loader;

        this._getDino();

    };

    _getDino(){

        // this._loader.load(
        //     './src/'
        // );
        // const geo = new THREE.BoxGeometry();
        // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        // const dino = new THREE.Mesh( geo, material );
        // this._props.scene.add ( dino );
    };
};