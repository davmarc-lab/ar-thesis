async function createArena(bestValues = true) {
    ...
    arena = new Arena(corners, simWorldSize);
    arena.createCasters();
    // add the arena 3d virtual object to the scene
    scene.add(arena.getArena());

    broker.onMessage = async (topic, msg) => {
        // json parsed content of mqtt message
        const json = parseBrokerMessage(msg);
        const rId = json.robot_id;
        const simPos = { x: json.x, y: json.y };
        const orient = json.orientation;
        // convert simulated arena coords into arena coords
        const normPos = Arena.normalizeSimulatedPos(arena, simPos));

        // if the robot is not in the arena it will be created
        if (!arena.hasRobot(rId)) {
            await arena.addRobot(rId, normPos, orient);
        }

        // robot position
        arena.moveRobot(rId, normPos)
        // robot arena y-axis orientation
        arena.orientRobot(rId, orient)
    };
}

class Arena {
    ...
    static normalizeSimulatedPos(arena, position) {
        const arenaSize = arena.getArenaSize();
        const simSize = arena.getSimulatedSize();

        const xfactor = arenaSize.x / simSize;
        const yfactor = arenaSize.y / simSize;

        return new THREE.Vector3(position.x * xfactor, position.y * yfactor, 0);
    }
}
