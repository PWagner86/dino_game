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

                fbx.animations.forEach( ( move ) => {
                    if( move.name.includes('Walk') ){
                        const clip = move;
                        const action = this._mixer.clipAction( clip );
                        action.play();
                    };
                });

                fbx.traverse( ( d ) => {
                    let materials = d.material;
                    if( !( d.material instanceof Array ) ){
                        materials = [d.material];
                    }

                    for( let m of materials ){
                        if( m ){
                            m.specular = new THREE.Color( 0x000000 );
                            m.color.offsetHSL( 0, 0, 0.25 );
                        }
                    }
                    d.castShadow = true;
                    d.receiveShadow = true;
                });
            },

            ( xhr ) => {
                console.log ( `${ Math.floor( xhr.loaded / xhr.total * 100 ) }%` );
            },

            ( error ) => {
                console.log( `An error happend ${ error }` );
            }
        );
    };

    _update( timeElapsed ) {

        if( this._mesh ) {
            this._mixer.update( timeElapsed );
        };
    };
};