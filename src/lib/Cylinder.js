import { ft_cross_product, ft_dot, ft_product, ft_sub, ft_sum, ft_normalize } from "./utils";

class Cylinder {
    constructor(origin, axis, height, radius, color = { x: 25, y: 155, z: 255 }) {
        this.radius = radius;
        this.height = height;
        this.axis = ft_normalize(axis);
        this.origin = origin;
        this.color = color;
    }

    ft_caps_normal_intersection(ray, d, c_top) {
        let hit;
        let origin = ft_sub(this.origin, ray.from);

        hit = ft_sub(ft_product(ray.direction, d[0]), c_top);
        ray.hit.distance = d[0];
        ray.hit.normal = this.axis;
        if (ft_dot(hit, hit) < Math.pow(this.radius, 2) && d[0] > 0) {
            if (ft_dot(ray.direction, ray.hit.normal) > 0)
                ray.hit.normal = ft_product(ray.hit.normal, -1);
            return (1);
        }
        hit = ft_sub(ft_product(ray.direction, d[1]), origin);
        ray.hit.normal = this.axis;
        ray.hit.distance = d[1];
        if (ft_dot(hit, hit) < Math.pow(this.radius, 2) && d[1] > 0) {
            if (ft_dot(ray.direction, ray.hit.normal) > 0)
                ray.hit.normal = ft_product(ray.hit.normal, -1);
            return (1);
        }
        return (0);
    }

    ft_cy_normal(ray) {
        let normal;
        let hit;
        let t;
        let origin = ft_sub(this.origin, ray.from);

        hit = ft_product(ray.direction, ray.hit.distance);
        t = ft_dot(this.axis, ft_sub(hit, origin));
        normal = ft_sub(ft_sub(hit, ft_product(this.axis, t)), origin);
        normal = ft_product(normal, 1.0 / Math.sqrt(ft_dot(normal, normal)));
        ray.hit.normal = normal;
        return (1);
    }

    ft_caps_intersection(ray) {
        let c_top;
        let den;
        let num;
        let d = [0, 0];
        let origin = ft_sub(this.origin, ray.from);

        c_top = ft_sum(origin, ft_product(this.axis, this.height));
        den = ft_dot(this.axis, ray.direction);
        if (Math.abs(den) <= 0.001)
            return (0);
        num = ft_dot(this.axis, c_top);
        d[0] = num / den;
        num = ft_dot(this.axis, origin);
        d[1] = num / den;
        if (this.ft_caps_normal_intersection(ray, d, c_top))
            return (1);
        return (0);
    }

    ft_cylinder_vars_init(cross_d, equation, ray) {
        let origin = ft_sub(this.origin, ray.from);
        
        cross_d = ft_cross_product(ray.direction, this.axis);
        equation.x = ft_dot(cross_d, cross_d);
        equation.y = ft_dot(cross_d, ft_cross_product(origin, this.axis));
        equation.z = (equation.x * Math.pow(this.radius, 2))
            - (ft_dot(this.axis,
                this.axis) * Math.pow(ft_dot(origin, cross_d), 2));
    }

    ft_has_intersection(ray) {
        let cross_d;
        let equation = { x: 0, y: 0, z: 0 };
        let t = [0, 0];
        let origin = ft_sub(this.origin, ray.from);

        ray.hit.pixel = this.color;
        this.ft_cylinder_vars_init(cross_d, equation, ray);
        if (equation.z < 0 || equation.x == 0)
            return (this.ft_caps_intersection(ray));
        t[0] = (equation.y + Math.sqrt(equation.z)) / equation.x;
        t[1] = (equation.y - Math.sqrt(equation.z)) / equation.x;
        if (t[0] < 0 && t[1] < 0)
            return (this.ft_caps_intersection(ray));
        if (t[0] > t[1] && t[1] > 0)
            t[0] = t[1];
        t[1] = ft_dot(this.axis,
            ft_sub(ft_product(ray.direction, t[0]), origin));
        if (t[1] <= 0 || t[1] >= this.height)
            return (this.ft_caps_intersection(ray));
        ray.hit.distance = t[0];
        return (this.ft_cy_normal(ray));
    }
}

export default Cylinder;