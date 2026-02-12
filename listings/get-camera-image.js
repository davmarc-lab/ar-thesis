function update(time) {
    if (renderer.info.render.frame % 100 == 0 && !calibrated) {
        const image = getCameraImage();
        if (!image) return;
    }
    ...
}

function getCameraImage() {
    // it is possible to retrieve camera parameters only
    // in an XRSession context
    if (!renderer.xr.getSession()) return;

    // current generated renderer frame
    const frame = renderer.xr.getFrame();
    // current reference space
    const refSpace = renderer.xr.getReferenceSpace();
    if (!frame || !refSpace)
        return;
    // retrieves the view pose
    const viewPose = frame.getViewerPose(refSpace);
    if (!viewPose)
        return;
    // retrieves the device used, in this case a basic webcam is supported
    const view = viewPose.views.find(view => view.camera);
    if (!view)
        return;
    // retrieve a flipped camera texture
    const camText = renderer.xr.getCameraTexture(view.camera);
    if (!camText)
        return;

    // draw the camera content in another scene as background
    imageScene.background = camText;
    imageScene.background.needsUpdate = true;

    // retrieve the current render buffer to restore after snapshot
    const old = renderer.getRenderTarget();
    // creates an images by taking a screenshot of the renderer scene
    // using the given camera
    const imageData = Utils.snapshot(renderer, camera, imageScene);
    renderer.setRenderTarget(old);

    return imageData;
}

