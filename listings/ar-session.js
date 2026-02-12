// xr session features
const reqFeats = ["unbounded", "camera-access"];
...
async function init() {
    ...
    // initialize WebGLRender with custom parameters
    renderer = new THREE.WebGLRenderer({
        antialias: true, 
        canvas: canvas, 
        preserveDrawingBuffer: true });
    // enable webxr support
    renderer.xr.enabled = true;

    // add helper button to initialize an XSession with the given features
    document.body.appendChild(ARButton.createButton(renderer, {
        requiredFeatures: reqFeats,
        optionalFeatures: ["dom-overlay"],
        domOverlay: { root: divUi }
    }));
    ...
}
