function update(time) {
    if (renderer.info.render.frame % 100 == 0 && !calibrated) {
        ...
        const markers = detectMarkers(image);
        trackMarkers(markers);
    }
    ...
}

function trackMarkers(markers) {
    if (markers.length == 0) return;

    tracked = [];
    // initialize posit object to estimante 3D position
    const posit = new POS.Posit(modelSize, renderer.domElement.width);
    markers.forEach(m => {
        let corners = m.corners;

        // center all corners in the canvas
        for (let i = 0; i < corners.length; ++i) {
            let corner = corners[i];
            corner.x = corner.x - (renderer.domElement.width / 2);
            corner.y = (renderer.domElement.height / 2) - corner.y;
        }

        // estimate the marker rotation and traslation
        const pose = posit.pose(corners);
        const t = new Marker(m.id, pose);

        // exclude already tracked markers
        if (!tracked.find(e => e.getId() == t.getId())) {
            tracked.push(t);
        }
    });
    calibrated = tracked.length === 4;
    ...
}
