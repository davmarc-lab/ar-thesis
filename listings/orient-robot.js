class Robot {
    ...
    orient(axis, orient) {
        const offset = this.#orientation - orient;
        this.#orientation = orient;
        this.#mesh.rotateOnAxis(axis, offset);
    }
}

class Arena {
    ...
    orientRobot(id, orient) {
        const robot = this.#robots.find(r => r.getId() === id);
        if (robot) {
            robot.orient(ROBOT_UP, orient)
        }
    }
}
