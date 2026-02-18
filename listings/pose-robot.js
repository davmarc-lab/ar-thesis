class Arena {
    async addRobot(id, position, orientation) {
        ...
        // robot rotation matrix
        const rb = new THREE.Matrix4().makeBasis(ROBOT_RIGHT, ROBOT_BASE, ROBOT_FRONT);
        // plane rotation matrix
        const tb = new THREE.Matrix4().makeBasis(this.#axes.x, this.#axes.z.clone().negate(), this.#axes.y);
        // mat * rb = tb => mat = tb / rb = tb * 1/rb = tb * inverse(rb)
        const mat = new THREE.Matrix4().multiplyMatrices(tb, rb.clone().invert());
        mesh.rotation.setFromRotationMatrix(mat);
        ...
    }
}
