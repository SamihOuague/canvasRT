import Sphere from "./lib/Sphere";
import Light from "./lib/Light";
import Scene from "./lib/Scene";
import Plan from "./lib/Plan";
import Cylinder from "./lib/Cylinder";

let sphere = new Sphere({x: 0, y: -10, z: 55}, 10);
let plan = new Plan({x: 0, y: 1, z: 0}, { x: 10, y: -10, z: 20 });
let cylinder = new Cylinder({x: 5, y: -10, z: 30}, { x: 1, y: 1, z: -1 }, 10, 3);
let shapes = [plan, cylinder, sphere];
let light = new Light({x: 120, y: 50, z: 120}, 0.8, 0.2, {x: 255, y: 255, z: 255}, shapes);
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let scene = new Scene(shapes, light, ctx);
scene.render();