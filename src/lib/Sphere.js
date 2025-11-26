import { ft_product, ft_normalize, ft_dot, ft_sub } from "./utils";

class Sphere {
    constructor(origin, radius) {
        this.radius = radius;
        this.origin = origin;
        this.color = {
            x: 255,
            y: 20,
            z: 25
        }
    }

    ft_sphere_normal(ray)
    {
        let normal;
        let hit;

        hit = ft_product(ray.direction, ray.hit.distance);
        normal = ft_sub(hit, ft_sub(this.origin, ray.from));
        ray.hit.normal = ft_normalize(normal);
        ray.hit.pixel = { x: this.color.x, y: this.color.y, z: this.color.z };
        return (1);
    }

    ft_has_intersection(ray)
    {
        let tmp = ft_sub(ray.from, this.origin);
        let equation = {
            x: ft_dot(ray.direction, ray.direction),
            y: 2 * ft_dot(ray.direction, tmp),
            z: ft_dot(tmp, tmp) - Math.pow(this.radius, 2),
        };
        let dis = Math.pow(equation.y, 2) - 4 * (equation.x * equation.z);
        let t = [0, 0];

        if (dis < 0)
            return (0);
        t[0] = -equation.y / (2 * equation.x);
        if (dis > 0)
            dis = Math.sqrt(dis);
        t[0] = (-equation.y + dis) / (2 * equation.x);
        t[1] = (-equation.y - dis) / (2 * equation.x);
        if (t[0] < 0 && t[1] < 0)
            return (0);
        if (t[0] > t[1] && t[1] > 0)
            t[0] = t[1];
        
        ray.hit.distance = t[0];
        return (this.ft_sphere_normal(ray));
    }
}

export default Sphere;