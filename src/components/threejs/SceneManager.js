import { Clock, Scene, Color, WebGLRenderer, PerspectiveCamera } from 'three';
import OrbitControls from "orbit-controls-es6";
import SceneSubject from "./SceneSubject";
import GeneralLights from "./GeneralLights";

export default canvas => {
    const clock = new Clock();

    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    };

    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    const controls = new OrbitControls(camera, renderer.domElement);
    const sceneSubjects = createSceneSubjects(scene);

    function buildScene() {
        const scene = new Scene();
        scene.background = new Color("#f2f2f2");
        return scene;
    }
    function buildRender({ width, height }) {
        const renderer = new WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
        const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);

        renderer.gammaInput = true;
        renderer.gammaOutput = true;

        return renderer;
    }
    function buildCamera ({ width, height }) {
        const aspectRatio = width / height;
        const fieldOfView = 60;
        const nearPlane = 1;
        const farPlane = 100;

        return new PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    }
    function createSceneSubjects (scene) {
        return [
            new GeneralLights(scene),
            new SceneSubject(scene)
        ];
    }
    const update = () => {
        const elapsedTime = clock.getElapsedTime();

        for(let i=0; i<sceneSubjects.length; i++)
            sceneSubjects[i].update(elapsedTime);

        renderer.render(scene, camera);
    };
    function createOrbitControls(camera, component) {
        const controls = new OrbitControls(camera, component);
        controls.enabled = true;
        controls.maxDistance = 1500;
        controls.minDistance = 0;

        return controls
    }
    const onWindowResize = () => {
        const { width, height } = canvas;

        screenDimensions.width = width;
        screenDimensions.height = height;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    };
    return {
        update,
        onWindowResize
    }
}
