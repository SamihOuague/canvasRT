import Ray from "./Ray";

class Scene {
    constructor(objects, light, ctx) {
        this.objects = objects;
        this.light = light;
        this.ctx = ctx;
        this.width = 250;
        this.height = 250;
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
        for (let i = 0; i < 250 * 250; i++) {
            x = i % 250;
            y = Math.floor(i / 250);
            ray = new Ray({ x: 0, y: 0, z: 0 }, { x, y, z: 1 });
            ray.direction = ray.ft_ray_direction(ray.direction);
            this.ctx.fillStyle = this.getPixel(ray);
            
            this.ctx.fillRect(x, 250 - 1 - y, 1, 1);
        }
    }
}

export default Scene;