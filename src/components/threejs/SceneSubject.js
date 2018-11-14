import {Mesh, IcosahedronBufferGeometry, MeshStandardMaterial} from "three";

export default scene => {
    const radius = 2;
    const mesh = new Mesh(new IcosahedronBufferGeometry(radius, 2), new MeshStandardMaterial({ flatShading: true }));

    mesh.position.set(0, 0, -20);

    scene.add(mesh);

    const update = (time) => {
        const scale = Math.sin(time)+2;
        mesh.scale.set(scale, scale, scale);
    };

    return {
        update
    }
}
