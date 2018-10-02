<?
class CookieManager {
  public $data;

  public function __construct ($data) {
    $this->data = $data;
  }

  /**
   *
   *
   */
  public function isset($value) {
    return (bool) array_key_exists($value, $this->data);
  }

  public function __get($value) {
    if($this->isset($value)) {
      return $this->data[$value];
    }
    return false;
  }

  public function test($a) {

  }

  //HARD HACK
  public function __set($key, $value) {
    $this->data[$key] = $value;
    setcookie($key, $value);
  }
}
