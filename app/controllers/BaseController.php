<?php
class BaseController
{
  // Tên thư mục chứa các file template của trang đang truy cập.
  protected $folder;

  // Hàm hiển thị kết quả ra cho người dùng.
  function render($file, $data = array())
  {
    // Kiểm tra file gọi đến có tồn tại hay không?
    $view_file = 'app/views/' . $this->folder . '/' . $file . '.php';
    if (is_file($view_file)) {
      extract($data);
      require_once($view_file);
    } else {
      header('Location: index.php?controller=pages&action=error');
    }
  }
}
