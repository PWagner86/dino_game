import * as THREE from 'https://cdn.skypack.dev/three@latest';
import { FBXLoader } from 'https://cdn.skypack.dev/three@latest/examples/jsm/loaders/FBXLoader.js';

export class Dino {
    constructor( params ){

        // this._position = new THREE.Vector3( 0, 0, 0);
        // this._velocity = 30.0;

        this._params = params;

        this._getDino();

    };

    _getDino(){

        const loader = new FBXLoader();
    
        loader.load(
            './src/dinos/FBX/Trex.fbx',
            ( fbx ) => {
                // console.log( fbx );
                fbx.scale.setScalar( 0.0025 );
                fbx.rotation.y = Math.PI / 2;
                this._mesh = fbx;
                this._params.scene.add( this._mesh );

                const m = new THREE.AnimationMixer( fbx );
                this._mixer = m;

                for( let i = 0; i < fbx.animations.length; i++ ){
                    if( fbx.animations[i].name.includes('Walk') ){
                        const clip = fbx.animations[i];
                        const action = this._mixer.clipAction( clip );
                        action.play();
                    };
                };
            },

            ( xhr ) => {
                console.log ( `${ Math.floor( xhr.loaded / xhr.total * 100 ) }%` );
            },

            ( error ) => {
                console.log( `An error happend ${ error }` );
            }
        );
    };

    _update( timeElapsed ){

        if( this._mesh ){
            this._mixer.update( timeElapsed );
        };
    };
};