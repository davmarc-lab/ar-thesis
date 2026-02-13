class Arena {
    ...
    #estimateArenaOrigin() {
        const x = this.#calculateCentroid(this.corners.map(p => p.position.x));
        const y = this.#calculateCentroid(this.corners.map(p => p.position.y));
        const z = this.#calculateCentroid(this.corners.map(p => p.position.z));

        this.#origin = new THREE.Vector3(x, y, z);
        this.#isOriginOk = true;

        this.arena.position.set(this.#origin.x, this.#origin.y, this.#origin.z);
    }

    #calculateCentroid(points) {
        if (points === undefined || points.length === 0) {
            console.error("[ERROR] points cannot be empty");
            return undefined;
        }
        if (points.length == 1) return points[0];
        return points.reduce((acc, val, _) => acc + val) / points.length;
    }
    ...
}
