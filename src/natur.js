import * as THREE from 'https://cdn.skypack.dev/three@latest';
import { FBXLoader } from 'https://cdn.skypack.dev/three@latest/examples/jsm/loaders/FBXLoader.js';

export class Natur {

    constructor( params ){

        this._params = params;

        this._meshPack = [];

        this._createNatur();
    };

    _createNatur() {

        const xzNum = 640;
        const xzPlus = 80;

        const loader = new FBXLoader();

        const naturObjects = [
            'Bush1', 
            'Bush2', 
            'Bush3', 
            'Grass1',
            'Grass2',
            'Grass3',
            'Rock1',
            'Rock2',
            'Rock3',
            'Tree1',
            'Tree2',
            'Tree3',
            'Tree4'
        ];

        for( let x = -xzNum; x < xzNum; x += xzPlus ){
            for( let z = -xzNum; z < xzNum; z += xzPlus ){

                loader.load(
                    `./src/natur/FBX/${ naturObjects[ Math.floor( Math.random() * naturObjects.length ) ] }.fbx`,
                    ( fbx ) => {
                        fbx.scale.setScalar( 0.01 );
                        fbx.name = naturObjects[ Math.floor( Math.random() * naturObjects.length ) ];
    
                        fbx.traverse( naturObject => {
                            naturObject.position.x = Math.floor( ( Math.random() * x ) + 1 );
                            naturObject.position.z = Math.floor( ( Math.random() * z ) + 1 );
                            if( 
                                naturObject.position.x > - 20 &&
                                naturObject.position.x < 20 ||
                                naturObject.position.z > -20 &&
                                naturObject.position.z < 20
                            ){
                                naturObject.position.x += 5;
                                naturObject.position.z += 5;
                            }
                        });

                        console.log( fbx );
        
                        this._mesh = fbx;
                        this._meshPack.push( this._mesh );
                        this._params.scene.add( this._mesh );
    
                        // fbx.traverse( ( d ) => {
                        //     let materials = d.material;
                        //     if( !( d.material instanceof Array ) ){
                        //         materials = [d.material];
                        //     };
                            // d.castShadow = true;
                            // d.receiveShadow = true;
                        // })
                    },
                    ( xhr ) => {
                
                        const time = Math.floor( xhr.loaded / xhr.total * 100 );
                        console.log( time + '%')
                        
                    },
        
                    ( error ) => {
                        console.log( `An error happend ${ error }` );
                    }
                );  
            };
        };
    };
};