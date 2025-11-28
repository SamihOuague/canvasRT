import Ray from "./Ray";
import Camera from "./Camera";

class Scene {
    constructor(objects, light, ctx) {
        this.objects = objects;
        this.light = light;
        this.ctx = ctx;
        this.width = 800;
        this.height = 500;
        this.camera = new Camera({x: 0, y: 10, z: -10}, {x: 0, y: -0.5, z: 1}, 60, this.width, this.height);
    }

    getPixel(ray)
    {
        let distance = 10000;
        let pixel = "#000000";
        let tmpPixel = "#000000";
        let tmp = new Ray(ray.from, ray.direction);

        for (let i in this.objects)
        {
            tmpPixel = tmp.hasIntersection(this.objects[i], this.light, this.objects);
            
            if (tmpPixel != "#000000" && tmp.hit.distance > 1 && tmp.hit.distance < distance)
            {
                pixel = tmpPixel;
                distance = tmp.hit.distance;
            }
            if (i < this.objects.length - 1)
                tmp = new Ray(ray.from, ray.direction);
        }
        return pixel;
    }

    render() {
        let x;
        let y;
        let ray;

        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = "#000000";
        for (let i = 0; i < this.width * this.height; i++) {
            x = i % this.width;
            y = Math.floor(i / this.width);
            ray = this.camera.ft_init_ray(x, y);
            this.ctx.fillStyle = this.getPixel(ray);
            this.ctx.fillRect(x, this.height - 1 - y, 1, 1);
        }
    }
}

export default Scene;