<?php
require "app/config/constant.php";
require "app/config/router.php";

// Nếu các tham số nhận được từ URL không hợp lệ thì set các tham số để để trả về màn hình lỗi.
if (!array_key_exists($controller, $controllerList) || !in_array($action, $controllerList[$controller])) {
    $controller = 'pages';
    $action = 'error';
}

// Nhúng file định nghĩa controller vào để có thể dùng được class định nghĩa trong file đó
include_once('app/controllers/' . $controller . 'Controller.php');

// Tạo ra tên controller class từ các giá trị lấy được từ URL sau đó gọi ra để hiển thị trả về cho người dùng.
$controllerName = $controller . 'Controller';
$controller = new $controllerName;
$controller->$action();
?>
