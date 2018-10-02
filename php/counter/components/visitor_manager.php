<?
class VisitorManager {
  const TIMEOUT = 15;

  public function __construct(VisitorStorage $storage) {
    if (!$storage) {
      throw new \Exception('need storage');
    }  
    $this->storage = $storage;
  }

  public function visitorsByTime($timeOut = false) {
    if ($timeOut === false) $timenOut = static::TIMEOUT;
    $visitors = $this->storage->getList();
    $uniqVisitors = [];
    foreach ($visitors as $id => $visitor) {
      if ((intval($visitor['lastVisit']) + $timeOut) >= time()) {
          $uniqVisitors[$id] = $visitor;
      }
    }
    return $uniqVisitors;
  }

  /**
   * use strategy pattern
   */
  public function getAllVisitors() {
    return $this->storage->getList();
  }
}
