class Arena {
    ...
    orientRobot(id, orient) {
        // calculates arena axes if needed
        if (!this.#isAxesOk) this.#estimateArenaAxes();

        const robot = this.#robots.find(r => r.id === id);
        if (robot) {
            const offset = robot.orientation - orient;
            robot.orientation = orient;
            robot.mesh.rotateOnAxis(this.#axes.y, offset);
        }
    }
}

