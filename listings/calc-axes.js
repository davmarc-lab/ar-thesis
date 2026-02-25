class Arena {
    ...
    #getCornerFromLocation(location) {
        if (!Location.isValid(location)) return undefined;
        return this.#corners.find(c => c.getLocation() == location);
    }

    #estimateArenaAxes() {
        const topLeft = this.#getCornerFromLocation(Location.TOP_LEFT);
        const topRight = this.#getCornerFromLocation(Location.TOP_RIGHT);
        const xaxis = new THREE.Vector3().subVectors(topRight.getPosition(), topLeft.getPosition()).normalize();

        const botLeft = this.#getCornerFromLocation(Location.BOT_LEFT);
        const yaxis = new THREE.Vector3().subVectors(topLeft.getPosition(), botLeft.getPosition()).normalize();

        this.#axes = new ArenaAxes(xaxis, yaxis, new THREE.Vector3().crossVectors(xaxis, yaxis));
        this.#isAxesOk = true;
    }
    ...
}
