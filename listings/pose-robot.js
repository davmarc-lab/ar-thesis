class Arena {
        async addRobot(id, position, orientation) {
        ...

        // robot position start from arena origin point
        if (!position) position = new THREE.Vector3();
        const robotPos = this.#calcRelativePosition(position);
        const mesh = await createRobotMesh(robotPos);
        if (mesh === undefined) {
            console.error("[ERROR] Cannot create robot mesh");
            return undefined;
        }

        // robot rotation matrix
        const rb = new THREE.Matrix4().makeBasis(ROBOT_RIGHT, ROBOT_BASE, ROBOT_FRONT);
        // plane rotation matrix
        const tb = new THREE.Matrix4().makeBasis(this.#axes.x, this.#axes.z.clone().negate(), this.#axes.y);
        // mat * rb = tb => mat = tb / rb = tb * 1/rb = tb * inverse(rb)
        const mat = new THREE.Matrix4().multiplyMatrices(tb, rb.clone().invert());
        mesh.rotation.setFromRotationMatrix(mat);
        // saves the current orientation to calculate offset rotation
        // (avoiding setRotationFromAxisAngle to keep the previous rotation)
        const robot = new Robot(id, mesh, orientation);
        // adjust mesh orientation
        mesh.rotateOnAxis(this.#axes.y, orientation);
        ...
    }
}
