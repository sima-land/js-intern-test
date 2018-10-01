<?
/**
 * Singleton
 */
class Application {
  /**
   * storage componets;
   */
  protected $components;

  /**
   * @var Application
   */

  private static $instance;

  protected function __construct() {}
  protected function __clone () {}

  public function __get($value) {
    if($this->components[$value]) {
      return $this->components[$value];
    }
    return false;
  }

  public function __set($key, $value) {
    $this->components[$key] = $value;
  }

  public static function getInstance() :Application {
    if(null === static::$instance) {
      static::$instance = new Static();
    }

    return static::$instance;
  }
}
