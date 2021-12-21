import * as THREE from 'https://cdn.skypack.dev/three@latest';
import { FBXLoader } from 'https://cdn.skypack.dev/three@latest/examples/jsm/loaders/FBXLoader.js';

export class Dino {
    constructor( props ){

        this._props = props;
        this._scene = this._props.scene;
        this._loader = new FBXLoader();

        this._getDino();

    };

    _getDino(){

        this._loader.load(
            './src/dinos/FBX/Trex.fbx',
            ( fbx ) => {
                console.log(fbx.quaternion)
                fbx.scale.setScalar( 0.0025 );
                fbx.rotation.y = Math.PI / 2;
                this._scene.add( fbx );
            },

            ( xhr ) => {
                console.log ( `${ Math.floor( xhr.loaded / xhr.total * 100 ) }%` );
            },

            ( error ) => {
                console.log( `An error happend ${ error }` );
            }
        );
    };
};