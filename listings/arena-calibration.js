class Arena {
    ...
    #getCornerFromLocation(location) {
        if (!Location.isValid(location)) return undefined;
        return this.#corners.find(c => c.location == location);
    }

    #estimateArenaAxes() {
        const topLeft = this.#getCornerFromLocation(Location.TOP_LEFT);
        const topRight = this.#getCornerFromLocation(Location.TOP_RIGHT);
        const xaxis = new THREE.Vector3().subVectors(topRight.position, topLeft.position).normalize();

        const botLeft = this.#getCornerFromLocation(Location.BOT_LEFT);
        const yaxis = new THREE.Vector3().subVectors(topLeft.position, botLeft.position).normalize();

        this.#axes = new ArenaAxis(xaxis, yaxis, new THREE.Vector3().crossVectors(xaxis, yaxis));
        this.#isAxesOk = true;
    }
    ...
}
