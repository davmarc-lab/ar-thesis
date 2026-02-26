// mesh base normal vector 
const ROBOT_BASE = new THREE.Vector3(0, -1, 0);
// mesh normal vector used to rotate in local space
const ROBOT_UP = ROBOT_BASE.clone().negate();
// mesh front face normal vector
const ROBOT_FRONT = new THREE.Vector3(1, 0, 0);
// mesh right normal vector
const ROBOT_RIGHT = new THREE.Vector3(0, 0, 1);

class Arena {
    async addRobot(id, position, orientation) {
        ...
        const robotPos = this.#calcRelativePosition(position);
        const mesh = await createRobotMesh(robotPos);
        // robot initial matrix
        const rb = new THREE.Matrix4().makeBasis(ROBOT_RIGHT, ROBOT_BASE, ROBOT_FRONT);
        // robot target matrix
        const tb = new THREE.Matrix4().makeBasis(this.#axes.getX(), this.#axes.getZ().negate(), this.#axes.getY());
        // mat * rb = tb => mat = tb / rb = tb * 1/rb = tb * inverse(rb)
        const mat = new THREE.Matrix4().multiplyMatrices(tb, rb.clone().invert());
        mesh.rotation.setFromRotationMatrix(mat);
        // adjust mesh orientation
        mesh.rotateOnAxis(ROBOT_UP, orientation);

        // create new robot
        const robot = new Robot(id, mesh, orientation);
        this.#robots.push(robot);
        ...
    }
}
