import * as THREE from 'https://cdn.skypack.dev/three@latest';
import { FBXLoader } from 'https://cdn.skypack.dev/three@latest/examples/jsm/loaders/FBXLoader.js';

export class Dino {
    constructor( params ){

        // this._position = new THREE.Vector3( 0, 0, 0);
        // this._velocity = 30.0;

        this._params = params;

        this._state = {
            walking: false,
            jumping: false
        }

        this._load = document.querySelector('.load');
        console.log(this._load)

        this._species = null;

        this._pics = document.querySelectorAll('li');  
        
        this._pics.forEach( pic => {
            const children = this._params.scene.children
            pic.addEventListener('click', () => {
                if( children.length > 2) children.splice( children.length - 1, 1);
                switch( pic.id ){
                    case 'apatosaurus':
                        this._species = 'Apatosaurus';
                        this._getDino();
                        break;
                    case 'parasaurolophus':
                        this._species = 'Parasaurolophus';
                        this._getDino();
                        console.log(this._params.scene);
                        break;
                    case 'stegosaurus':
                        this._species = 'Stegosaurus';
                        this._getDino();
                        break;
                    case 'trex':
                        this._species = 'Trex';
                        this._getDino();
                        break;
                    case 'triceratops':
                        this._species = 'Triceratops';
                        this._getDino();
                        break;
                    case 'raptor':
                        this._species = 'Velociraptor';
                        this._getDino();
                        break;
                };
            });
        });
    };

    _getDino(){

        const loader = new FBXLoader();
    
        loader.load(
            `./src/dinos/FBX/${ this._species }.fbx`,
            ( fbx ) => {
                fbx.name = this._species;
                fbx.scale.setScalar( 0.0025 );
                fbx.rotation.y = Math.PI / 2;
                this._mesh = fbx;
                this._params.scene.add( this._mesh );

                const m = new THREE.AnimationMixer( fbx );
                this._mixer = m;

//                 document.addEventListener('keydown', ( e ) => {
//                     switch( e.key ){
//                         case "w":
//                             this._walk( fbx );
//                             break;
//                     };
//                 });

//                 document.addEventListener('keypress', ( e ) => {
//                     switch( e.key ){
//                         case " ":
//                             this._jump( fbx );
//                             setTimeout( () => {
//                                 this._state.jumping = false;
//                                 this._mixer.stopAllAction();
//                             }, fbx.animations[0].duration * 1000 );
//                             break;
//                     };
//                 });

//                 document.addEventListener('keyup', ( e ) => {
//                     switch( e.key ){
//                         case "w":
//                             this._state.walking = false;
//                             this._mixer.stopAllAction();
//                             break;
//                     }
//                 });
// ;

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
                
                const time = Math.floor( xhr.loaded / xhr.total * 100 );
                console.log ( time + '%' );
                
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

    _walk( fbx ){
        for( let s in this._state ){
            s = false;
        };  
        this._state.walking = true;
        if( this._state.walking ){  
            fbx.animations.forEach( ( move ) => {
                if( move.name.includes( 'Walk' ) ){
                    const clip = move;
                    const action = this._mixer.clipAction( clip );
                    action.play();
                };
            });
        };
    };

    _jump( fbx ){
        for( let s in this._state ){
            s = false;
        };  
        this._state.jumping = true;
        if( this._state.jumping ){
            fbx.animations.forEach( ( move ) => {
                if( move.name.includes( 'Jump' ) ){
                    const clip = move;
                    const action = this._mixer.clipAction( clip );
                    action.play();
                };
            });
        };
    };
};