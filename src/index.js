import Sphere from "./lib/Sphere";
import Light from "./lib/Light";
import Scene from "./lib/Scene";
import Plan from "./lib/Plan";
import Cylinder from "./lib/Cylinder";
import Camera from "./lib/Camera";

let sphere = new Sphere({ x: 0, y: 1, z: 10 }, 1);
let plan = new Plan({ x: 0, y: 1, z: 0 }, { x: 10, y: -10, z: 20 }, { x: 255, y: 255, z: 255 });
let cylinder = new Cylinder({ x: 0, y: -10, z: 10}, { x: 0, y: 1, z: 0 }, 10, 1);
let shapes = [sphere, cylinder, plan];
let light = new Light({ x: 5, y: 5, z: 5 }, 0.8, 0.2, { x: 255, y: 255, z: 255 }, shapes);
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let scene = new Scene(shapes, light, ctx);
scene.render();

let initForm = document.getElementById("init");
let objectForm = document.getElementById("object");
let selected = "sp"

let typeBtn = document.getElementsByClassName("type-btn");
for (let i = 0; i < 3; i++) {
    typeBtn[i].addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById(selected).classList.remove("active");
        document.getElementById(selected + "Fields").classList.remove("active")
        e.target.classList.toggle("active");
        selected = e.target.id;
        document.getElementById(selected + "Fields").classList.toggle("active");
    });
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        x: parseInt(result[1], 16),
        y: parseInt(result[2], 16),
        z: parseInt(result[3], 16)
    } : { x: 0, y: 0, z: 0 };
}

function updateObjectsList() {
    const list = document.getElementById('objectsList');
    if (shapes.length === 0) {
        list.innerHTML = '<p style="color: #999; text-align: center;">Aucun objet dans la scène</p>';
        return;
    }

    list.innerHTML = shapes.map((obj, index) => {
        let details = (obj instanceof Sphere && 'Sphere') || (obj instanceof Cylinder && 'Cylinder') || 'Plan';
        details += ` - Position: (${obj.origin.x}, ${obj.origin.y}, ${obj.origin.z})`;
        if (obj.radius) details += ` - Rayon: ${obj.radius}`;
        const hexColor = `#${obj.color.x.toString(16).padStart(2, '0')}${obj.color.y.toString(16).padStart(2, '0')}${obj.color.z.toString(16).padStart(2, '0')}`;
        return `
      <div class="object-item">
        <div class="object-info">
          <strong style="color: ${hexColor};">●</strong> ${details}
        </div>
        <button class="btn-delete" id="obj-${index}">Supprimer</button>
      </div>
    `;
    }).join('');
    let btnDelete = document.getElementsByClassName("btn-delete");
    for (let i = 0; i < btnDelete.length; i++) {
        btnDelete[i].addEventListener("click", (e) => {
            e.preventDefault();
            let index = Number(e.target.id.split("-")[1]);
            delete shapes[index];
            updateObjectsList();
            scene.objects = shapes;
            scene.render();
        });
    }
}
updateObjectsList();

initForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let light = new Light({
        x: Number(e.target.lightPosX.value),
        y: Number(e.target.lightPosY.value),
        z: Number(e.target.lightPosZ.value),
    }, Number(e.target.lightIntensity.value),
        Number(e.target.ambientIntensity.value),
        hexToRgb(e.target.ambientColor.value), shapes);
    let camera = new Camera({
        x: Number(e.target.camPosX.value),
        y: Number(e.target.camPosY.value),
        z: Number(e.target.camPosZ.value)
    }, {
        x: Number(e.target.camRotX.value),
        y: Number(e.target.camRotY.value),
        z: Number(e.target.camRotZ.value)
    }, Number(e.target.camFov.value), scene.width, scene.height);
    scene.light = light;
    scene.camera = camera;
    scene.render();
});

objectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let origin = {
        x: Number(e.target.objPosX.value),
        y: Number(e.target.objPosY.value),
        z: Number(e.target.objPosZ.value)
    };
    let color = hexToRgb(e.target.objColor.value);
    switch (selected) {
        case "sp":
            shapes.push(new Sphere(origin, Number(e.target.sphereRadius.value), color));
            break;
        case "cy":
            shapes.push(new Cylinder(origin,
                {
                    x: Number(e.target.cylinderOrientX.value),
                    y: Number(e.target.cylinderOrientY.value),
                    z: Number(e.target.cylinderOrientZ.value)
                },
                Number(e.target.cylinderSize.value),
                Number(e.target.cylinderRadius.value), color));
            console.log(shapes);
            break;
        case "pl":
            shapes.push(new Plan({
                x: Number(e.target.planeNormalX.value),
                y: Number(e.target.planeNormalY.value),
                z: Number(e.target.planeNormalZ.value)
            }, origin, color));
            break;
    }
    
    updateObjectsList();
    scene.render();
});