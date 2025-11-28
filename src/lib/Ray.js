import { ft_radian } from "./utils";


class Ray {
    constructor(origin, direction)
    {
        this.from = origin;
        this.direction = direction;
        this.hit = {
            distance: 10000
        };
    }

    ft_ray_direction(xy)
    {
        let x;
        let y;
        let fov;

        fov = 70;
        x = 1 * (((xy.x + 0.5) / 250) * 2 - 1);
        x = x * Math.tan(ft_radian(fov / 2));
        y = ((xy.y + 0.5) / 250 * 2.0 - 1.0);
        y = y * Math.tan(ft_radian(fov / 2.0));
        return ({ x, y, z: 1 });
    }

    hasIntersection(shape, light)
    {
        if (shape.ft_has_intersection(this)) {
            let pixel = light.ft_light(this, shape);
            return "#" + pixel;
        }
        return "#000000";
    }

    shadowHasIntersection(shapes, shape) {
        let ray = null;

        for (let i in shapes)
        {
            let r = new Ray(this.from, this.direction);
            if (shapes[i] !== shape && shapes[i].ft_has_intersection(r) && r.hit.distance > 0
                    && (ray == null || (r.hit.distance < ray.hit.distance)))
                ray = r;
        }
        return ray;
    }
}

export default Ray;