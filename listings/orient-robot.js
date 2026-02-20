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
        // calculates arena axes if needed
        if (!this.#isAxesOk) this.#estimateArenaAxes();

        const robot = this.#robots.find(r => r.getId() === id);
        if (robot) {
            robot.orient(this.#axes.y, orient);
        }
    }
}
