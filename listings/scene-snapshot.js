function snapshot(renderer, camera, scene) {
    const width = renderer.domElement.width;
    const height = renderer.domElement.height;
    // create render target
    const rt = new THREE.WebGLRenderTarget(width, height);

    // retrieve current render buffer
    const oldRt = renderer.getRenderTarget();
    renderer.setRenderTarget(rt);
    renderer.render(scene, camera);

    // create a buffer to store render target data
    // 4 bytes of data => RGBA texture format
    const buffer = new Uint8Array(width * height * 4);
    renderer.readRenderTargetPixels(rt, 0, 0, width, height, buffer);
    // reset old render target
    renderer.setRenderTarget(oldRt);

    // flip image vertically
    return flipImageVertically(new ImageData(
        new Uint8ClampedArray(buffer),
        width,
        height
    ));
}

function flipImageVertically(image) {
    const { width, height, data } = image;
    const rowSize = width * 4;
    const temp = new Uint8ClampedArray(rowSize);
    for (let y = 0; y < Math.floor(height / 2); y++) {
        const top = y * rowSize;
        const bottom = (height - y - 1) * rowSize;
        // fill temp with top row data
        temp.set(data.subarray(top, top + rowSize));
        // copy in top row the bottom row data
        data.copyWithin(top, bottom, bottom + rowSize);
        // set bottom row with top data
        data.set(temp, bottom);
    }
    return image;
}
