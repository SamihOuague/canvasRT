import { ft_radian, ft_cross_product, ft_normalize, ft_dot } from "./utils";
import Ray from "./Ray";

class Camera {
    constructor(origin, axis, fov, width, height) {
        this.origin = origin;
        this.axis = axis;
        this.fov = fov;
        this.aspectRatio = width / height;
        this.width = width;
        this.height = height;
        this.matrix = this.ft_lookat(this.axis);
    }

    ft_ray_direction(xy)
    {
        let x;
        let y;
        let fov;

        fov = this.fov;
        x = this.aspectRatio * (((xy.x + 0.5) / this.width) * 2 - 1);
        x = x * Math.tan(ft_radian(fov / 2));
        y = ((xy.y + 0.5) / this.height * 2.0 - 1.0);
        y = y * Math.tan(ft_radian(fov / 2.0));
        return ({ x, y, z: 1 });
    }

    ft_init_ray(x, y) 
    {  
        let ray = new Ray(this.origin, {x, y, z: 1});

        ray.direction = this.transform_ray(this.ft_ray_direction(ray.direction));
        return ray;
    }

    ft_lookat(forward)
    {
        let world_up;
        let right;
        let up;
        let matrix = [];
    
        world_up = {x: 0, y: 1, z: 0};
        forward = ft_normalize(forward);
        if (Math.abs(ft_dot(forward, world_up)) > 0.999)
            world_up = {x: 0, y: 0, z: 1};
        right = ft_normalize(ft_cross_product(world_up, forward));
        up = ft_cross_product(forward, right);
        matrix[0] = right;
        matrix[1] = up;
        matrix[2] = forward;
        return (matrix);
    }

    transform_ray(vector)
    {
        let	world_ray = {};
        let matrix = this.matrix;
    
        world_ray.x = vector.x * matrix[0].x
            + vector.y * matrix[1].x
            + vector.z * matrix[2].x;
        world_ray.y = vector.x * matrix[0].y
            + vector.y * matrix[1].y
            + vector.z * matrix[2].y;
        world_ray.z = vector.x * matrix[0].z
            + vector.y * matrix[1].z
            + vector.z * matrix[2].z;
        return (ft_normalize(world_ray));
    }
}

export default Camera;