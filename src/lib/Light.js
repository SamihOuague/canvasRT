import { ft_sum, ft_sub, ft_normalize, ft_get_rgb, ft_dot, ft_product } from "./utils";
import Ray from "./Ray";

class Light {
    constructor(origin, intensity, ambient, color, shapes) {
        this.origin = origin;
        this.intensity = intensity;
        this.ambient = ambient;
        this.color = color;
        this.shapes = shapes;
    }

    ft_is_shadow(ray, shapes, shape) {
        let hit;
        let shadow = {};
        let light_d;
        let light = ft_sum(this.origin, ft_product(ray.direction, 1e-6));
        
        hit = ft_sum(ray.from, ft_product(ray.direction, ray.hit.distance));
        shadow.direction = ft_normalize(ft_sub(light, hit));
        shadow.from = hit;
        shadow = new Ray(shadow.from, shadow.direction);
        light = ft_sub(light, hit);
        light_d = Math.sqrt(ft_dot(light, light));
        
        shadow = shadow.shadowHasIntersection(shapes, shape);

        if (shadow && shadow.hit.distance > 0)
        {
                
            return (1);
        }
        return (0);
    }

    ft_light(ray, shape) {
        let v;
        let lm;
        let n;
        let i;
        let intensity;

        v = ft_sum(ray.from, ft_product(ray.direction, ray.hit.distance));
        lm = ft_normalize(ft_sub(this.origin, v));
        n = ray.hit.normal;
        intensity = ft_dot(lm, n);
        if (intensity < 0 || this.ft_is_shadow(ray, this.shapes, shape))
            intensity = 0;
        intensity = (intensity * this.intensity);
        i = {
            x: intensity + this.ambient * (this.color.x / 255.0),
            y: intensity + this.ambient * (this.color.y / 255.0),
            z: intensity + this.ambient * (this.color.z / 255.0)
        };
        if (i.x > 1)
            i.x = 1;
        if (i.y > 1)
            i.y = 1;
        if (i.z > 1)
            i.z = 1;
        return (ft_get_rgb(ray.hit.pixel.x * i.x,
            ray.hit.pixel.y * i.y, ray.hit.pixel.z * i.z));
    }

}

export default Light;