import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, StandardMaterial, Texture} from "@babylonjs/core";
import * as earcut from "earcut";
(window as any).earcut = earcut;

class App {
    constructor() {
        // create the canvas html element and attach it to the webpage
        var canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);

        // initialize babylon scene and engine
        var engine = new Engine(canvas, true);
        var scene = new Scene(engine);

        const camera = new ArcRotateCamera("Camera", Math.PI / 2, 0, 50, new Vector3(21.0/2, 0, 29.7/2), scene);
        camera.attachControl(canvas, true);
        const light = new HemisphericLight("hemiLight", new Vector3(10, 10, 0), scene);
        const light2 = new HemisphericLight("hemiLight2", new Vector3(10, -10, 0), scene);
        light2.intensity = 0.7;
        //Polygon shape in XoZ plane
        
	    const shape = [ 
		    new Vector3(-10, 0, -10), 
            new Vector3(11.0, 0, -10), 
            new Vector3(11.0, 0, 19.7),
            new Vector3(-10, 0, 19.7),
     ];
		   
    const polygon = MeshBuilder.ExtrudePolygon("polygon", {shape:shape, sideOrientation: Mesh.DOUBLESIDE, depth: 0.1}, scene);
    
    
    polygon.position.z += 10;
    polygon.position.x += 10;

    
    var paper = new StandardMaterial("paper", scene);
    paper.diffuseTexture = new Texture("https://raw.githubusercontent.com/JackFlannery/CapstoneSP22/master/paper-texture-overlay-2.jpg", scene);

    polygon.material = paper;

        // hide/show the Inspector
        window.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    scene.debugLayer.show();
                }
            }
        });

        // run the main render loop
        engine.runRenderLoop(() => {
            scene.render();
        });
    }
}
new App();