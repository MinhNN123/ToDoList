<?php
require "app/config/constant.php";

//Kiểm tra các tham số truyền vào từ URL
if (isset($_GET['controller'])) {
    $controller = $_GET['controller'];
    $action = isset($_GET['action']) ? $_GET['action'] : '';
} else {
    $controller = 'pages';
    $action = 'home';
}

//Khởi tạo danh sách controller
$controllerList = array(
    'pages' => ['home', 'error', 'getList', 'getEvent', 'addEvent', 'updateEvent', 'deleteEvent']
);

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
