export function ft_normalize(v) {
    let magnitude = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    if (magnitude === 0) {
        return ({
            x: 0,
            y: 0,
            z: 0
        });
    }
    return ({
        x: v.x / magnitude,
        y: v.y / magnitude,
        z: v.z / magnitude
    });
}

export function ft_product(a, b) {
    return ({
        x: a.x * b,
        y: a.y * b,
        z: a.z * b,
    });
}

export function ft_dot(a, b) {
    return (a.x * b.x + a.y * b.y + a.z * b.z);
}

export function ft_sub(a, b) {
    return ({
        x: a.x - b.x,
        y: a.y - b.y,
        z: a.z - b.z
    });
}

export function ft_radian(x) {
    return (x * Math.PI / 180);
}

export function ft_sum(a, b) {
    return ({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z });
}

export function ft_get_rgb(r, g, b) {
    let color = [
        Math.floor(r).toString(16),
        Math.floor(g).toString(16),
        Math.floor(b).toString(16),
    ];
    color = color.map((v, i) => {
        if (v.length < 2)
            return "0" + v;
        return v;
    });
    return (color[0] + color[1] + color[2]);
}

export function ft_cross_product(a, b) {
    let c = { x: a.y * b.z - a.z * b.y,
               y: a.z * b.x - a.x * b.z,
               z: a.x * b.y - a.y * b.x };
    return (c);
}