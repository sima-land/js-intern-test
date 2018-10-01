<?
class VisitorManager {
  public function __construct(VisitorStorage $storage) {
    if (!$storage) {
      throw new \Exception('need storage');
    }  
    $this->storage = $storage;
  }

  /**
   * use strategy pattern
   */
  public function getUniq() {
    return $this->storage->getUniq();
  }

  public function getAllVisitors() {
    return $this->storage->getList();
  }
}
