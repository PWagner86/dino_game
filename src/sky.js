import * as THREE from 'https://cdn.skypack.dev/three@latest';

export class Sky{
    constructor( params ){

        this._params = params;
        this._createSkyBox();
    };

    _createSkyBox(){
        this._params.scene.background = new THREE.CubeTextureLoader().load( [
            './src/skybox/TropicalSunnyDay_px.jpg',
            './src/skybox/TropicalSunnyDay_nx.jpg',
            './src/skybox/TropicalSunnyDay_py.jpg',
            './src/skybox/TropicalSunnyDay_ny.jpg',
            './src/skybox/TropicalSunnyDay_pz.jpg',
            './src/skybox/TropicalSunnyDay_nz.jpg',
        ] );
    };
};