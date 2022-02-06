import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import { FBXLoader } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/loaders/FBXLoader.js';

export class Sky{
    constructor( params ){

        this._params = params;
        this._cloudObjects = [];
        this._createSkyBox();
    };

    _createSkyBox(){

        const xzNum = 600;
        const xzPlus = 300;

        const clouds = [
            'Cloud_1',
            'Cloud_2',
            'Cloud_3'
        ];

        const loader = new FBXLoader();


        this._params.scene.background = new THREE.CubeTextureLoader().load( [
            './src/skybox/TropicalSunnyDay_px.jpg',
            './src/skybox/TropicalSunnyDay_nx.jpg',
            './src/skybox/TropicalSunnyDay_py.jpg',
            './src/skybox/TropicalSunnyDay_ny.jpg',
            './src/skybox/TropicalSunnyDay_pz.jpg',
            './src/skybox/TropicalSunnyDay_nz.jpg',
        ] );

        for( let x = -xzNum; x < xzNum; x += xzPlus ){
            for( let z = -xzNum; z < xzNum; z += xzPlus ){
                loader.load(
                    `./src/natur/FBX/${ clouds[ Math.floor( Math.random() * clouds.length ) ]}.fbx`,
                    ( fbx ) => {
                        fbx.scale.setScalar( 0.2 );
                        fbx.position.set( 40, 30, 0);
                        fbx.name = clouds[ Math.floor( Math.random() * clouds.length ) ];

                        fbx.traverse( cloud => {
                            cloud.position.x = Math.floor( ( Math.random() * x ) + 1 );
                            cloud.position.z = Math.floor( ( Math.random() * z ) + 1 );
                            cloud.position.y = Math.floor( ( Math.random() * 100 ) + 75 );
                        });

                        this._mesh = fbx;
                        this._cloudObjects.push( this._mesh );
                        this._params.scene.add( this._mesh );

                        console.log( fbx );

        
                        // fbx.traverse( ( d ) => {
                        //     let materials = d.material;
                        //     if( !( d.material instanceof Array ) ){
                        //         materials = [d.material];
                        //     };
        
                        //     for( let m of materials ){
                        //         if( m ){
                        //             m.specular = new THREE.Color( 0xffffff );
                        //             m.color.offsetHSL( 0, 0, 100 );
                        //         };
                        //     };
                        //     d.castShadow = true;
                        //     d.receiveShadow = true;
                        // });
                    }
                );
            };
        };

    };
};