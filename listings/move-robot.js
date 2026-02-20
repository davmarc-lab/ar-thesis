class Robot {
    ...
    setPosition(position) {
        this.#mesh.position.copy(position);
    }
}

class Arena {
    ...
    moveRobot(id, position) {
        // find the given robot
        const robot = this.#robots.find(r => r.getId() === id);
        if (robot) {
            // update robot position if it exists
            robot.setPosition(this.#calcRelativePosition(position));
        }
    }

    #calcRelativePosition(point) {
        // calculates arena origin if needed
        if (!this.#isOriginOk) this.#estimateArenaOrigin();
        // calculates arena axes if needed
        if (!this.#isAxesOk) this.#estimateArenaAxes();

        // robot position start from arena origin point
        const robotPos = new THREE.Vector3().copy(this.#origin);
        // calculate final position using the given relative position
        const relx = new THREE.Vector3().copy(this.#axes.x).multiplyScalar(point.x)
        const rely = new THREE.Vector3().copy(this.#axes.y).multiplyScalar(point.y)
        return robotPos.add(relx).add(rely);
    }
}
