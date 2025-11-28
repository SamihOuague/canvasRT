import { ft_dot, ft_normalize, ft_product, ft_sub } from "./utils";

class Plan {
    constructor(direction, point, color = { x: 120, y: 255, z: 55 }) {
        this.direction = direction;
        this.point = point;
        this.origin = point;
        this.color = color;
    }

    ft_has_intersection(ray) {
        let d;
        let num;
        let den;

        den = ft_dot(this.direction, ray.direction);
        if (Math.abs(den) <= 0.001)
            return (0);
        num = ft_dot(this.direction, ft_sub(this.point, ray.from));
        d = num / den;
        ray.hit.distance = d;
        ray.hit.normal = ft_normalize(this.direction);
        ray.hit.pixel = this.color;
        if (ft_dot(ray.direction, ray.hit.normal) > 0)
            ray.hit.normal = ft_product(ray.hit.normal, -1);
        return (1);
    }
}

export default Plan;