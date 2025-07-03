
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/13.0.0/math.min.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/proj4js/2.9.0/proj4-src.js"></script>



M30T_W_defauls={
    pixel:1.6 / 1000000,
    focal_length:0.0045,
    width:4000,
    heigth :3000,
    dfov:84,
}
M30T_T_defauls={
    pixel:12 / 1000000,
    focal_length:0.0091,
    width:640,
    heigth :512,
    dfov:61,
}

L2_W_defauls={
    pixel:2.4 / 1000000,
    focal_length:0.0045,
    width:5280 ,
    heigth :3956,
    dfov:84,
}

// 根据实际情况获取这10个参数
// # 传感器像素大小
const pixel = 1.6 / 1000000
// 图片中的数据
// # 焦距,长，宽
const focal_length = 0.0044
const width = 4000
const heigth = 3000
// # 经纬度，相对高
const longitude = 113.40431236111111;
const latitude = 22.17658877777778;
const altitude = 50.247
// # 滚角，俯仰角，偏航角
const yaw = -34.3
const pitch = -47.4
const roll = 0.0



const wgs84 = 'EPSG:4326';
const webMercator = 'EPSG:3857';


//北-东-地
const camera_matrix = math.matrix([
    [0, 1, 0],
    [1, 0, 0],
    [0, 0, -1]
]);
// degress to rad
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
} 

//云台旋转  Z-Y-X
function rotateMatrix(yaw, pitch, roll) {

    const yawRad = toRadians(yaw);
    const pitchRad = toRadians(pitch);
    const rollRad = toRadians(roll);

    const Rz = math.matrix([
        [math.cos(yawRad), -math.sin(yawRad), 0],
        [math.sin(yawRad), math.cos(yawRad), 0],
        [0, 0, 1]
    ]);

    const Ry = math.matrix([
        [math.cos(pitchRad), 0, math.sin(pitchRad)],
        [0, 1, 0],
        [-math.sin(pitchRad), 0, math.cos(pitchRad)]
    ]);

    const Rx = math.matrix([
        [1, 0, 0],
        [0, math.cos(rollRad), -math.sin(rollRad)],
        [0, math.sin(rollRad), math.cos(rollRad)]
    ]);

    // Apply rotations in the order Z-Y-X
    const rotationMatrix = math.multiply(math.multiply(Rz, Ry), Rx);

    return rotationMatrix;
}

// # 三点共线，已经知道 O,P 坐标 以及 G（x,y,z）坐标中的z值，计算 x,y 并返回G
function pointFromCollinearity(O, P, z) {
    // 检查是否平行，避免除以零的情况
    if ((P[2] - O[2]) === 0 || (z - P[2]) === 0) {
        console.log("线和平面平行,没有交点");
        return [Infinity, Infinity, z];
    }

    let lambda = (P[2] - O[2]) / (z - P[2]);

    let x = (P[0] - O[0]) / lambda + P[0];
    let y = (P[1] - O[1]) / lambda + P[1];
    return [x, y, z];
}

// # 定义，把图像坐标（左上角是原点）像素点- 转到 相机云台初始坐标系下 3维
function imageToCamera(width, height, x, y, pixel, focalLength) {

    let cX = focalLength;
    let cY = (x - width / 2) * pixel;
    let cZ = (y - height / 2) * pixel;

    return [cX, cY, cZ];
}

// 图片坐标 转地理坐标
function pixelcoord_to_geocoord(pixel_x, pixel_y) {

    var pixel_position = imageToCamera(width, heigth, pixel_x, pixel_y, pixel, focal_length)

    var rotate_matrix = rotateMatrix(yaw, pitch, roll);

    pixel_position = math.multiply(rotate_matrix, pixel_position)

    // 转换为Web Mercator坐标  
    var camera_position = proj4(wgs84, webMercator, [longitude, latitude]);

    var move_vector = [camera_position[0], camera_position[1], altitude]

    pixel_position = math.multiply(camera_matrix, pixel_position)

    pixel_position = math.add(pixel_position, move_vector);

    target_position = pointFromCollinearity(move_vector, pixel_position.toArray(), 0)

    // 转经纬
    var lon_lat = proj4(webMercator, wgs84, [target_position[0], target_position[1]])

    return lon_lat

}


// 地理坐标 转 图片坐标
function geocoord_to_pixelcoord(target_longitude, target_latitude) {
    // 转换为Web Mercator坐标  
    var camera_position = proj4(wgs84, webMercator, [longitude, latitude]);
    var move_vector = [camera_position[0], camera_position[1], altitude];

    var target_xy = proj4(wgs84, webMercator, [target_longitude, target_latitude])
    var target_vector = [target_xy[0], target_xy[1], 0]

    var vector = math.subtract(target_vector, move_vector);

    var rotate_matrix = rotateMatrix(yaw, pitch, roll);

    var rotate_matrix_inv = math.inv(rotate_matrix)

    var camera_matrix_inv = math.inv(camera_matrix)

    var target_point = math.multiply(math.multiply(rotate_matrix_inv, camera_matrix_inv), vector)

    target_point = target_point.toArray()

    // 三点共线
    t = focal_length / target_point[0]
    x_p = t * target_point[0] / pixel
    y_p = t * target_point[1] / pixel
    z_p = t * target_point[2] / pixel

    pixel_x = y_p + width / 2
    pixel_y = z_p + heigth / 2

    return [Math.round(pixel_x), Math.round(pixel_y)]

}

//示例： 图片像素坐标 转 地理经纬坐标
lon_lat = pixelcoord_to_geocoord(4000, 3000)
console.info("lon:" + lon_lat[0])
console.info("lat:" + lon_lat[1])
//示例： 经纬坐标 转 图片像素坐标
pixel_xy = geocoord_to_pixelcoord(113.40449434120687, 22.176829788712435)
console.info("pixel_x:" + pixel_xy[0])
console.info("pixel_y:" + pixel_xy[1])
