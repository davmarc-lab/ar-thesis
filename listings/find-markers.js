// aruco detector
const detector = new AR.Detector({
    dictionaryName: "ARUCO"
});

function update(time) {
    if (renderer.info.render.frame % 100 == 0 && !calibrated) {
        const image = getCameraImage();
        if (!image) return;
        const markers = detectMarkers(image);
    }
    ...
}

function detectMarkers(imageData) {
    // detect all marker screen coordinates
    return detector.detect(imageData);
}

