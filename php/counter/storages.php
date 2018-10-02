<?
interface VisitorStorage {
  /**
   * current
   */
  public function getCurrent() : Array;

  /**
   * all list
   */
  public function getList() : Array;

  /**
   * save storage
   */
  public function save($data);
}

class DataBaseStorage implements VisitorStorage {
  public function getCurrent() :Array {}
  public function getList() :Array {}
  public function save($data) {}
}

class NosqlStorage implements VisitorStorage {
  public function getCurrent() : Array {}
  public function getList() :Array {}
  public function save($data) {}
}


/**
 * implements one interface
 */
class FileStorage implements VisitorStorage {
  const STORAGE_FILE_NAME = 'visitor_cookie.txt';
  const SEPARATOR = '==';
  public static $loadCount = 0;


  public function __construct($fileName = false) {
    //set storage file
    if($fileName) {
      $this->file = $fileName;
    } else {
      $this->file = static::STORAGE_FILE_NAME;
    }
    $this->currentId = $this->getCurrent()['id'];
    $this->data = $this->load();
    $this->save($this->data);
  }

  public function getCurrent() : Array {
    if (array_key_exists('user_id', $_COOKIE)) {
      $userId = $_COOKIE['user_id'];
    } else {
      $userId = uniqid();
      setcookie('user_id', $userId);
    }

    return ['id' => $userId];
  }

  public function getList() : Array {
    return $this->data;
  }

  public function load() : Array {
    //pust current user
    $visitorsData[$this->currentId] = [
      'id' => $this->currentId,
      'lastVisit' => time(),
      'visitCount' => 1
    ];

    $oldVisitor = false;
    if (!file_exists($this->file)) return $visitorsData;
    if (!is_writable($this->file)) throw new \Exception('storage not avaliable');

    $visitors = file($this->file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    $visitors = unserialize($visitors[0]);
    $visitorsCount = count($visitors);
    foreach($visitors as $id => $visitor) {
      if ($id !== $this->currentId) {
        $visitorsData[$id] = $visitor;
      } else {
        $visitorsData[$this->currentId]['visitCount'] = $visitor['visitCount'] + 1  ;
      }
    }
    return $visitorsData;
  }

  
  public function save($data) {
    if (!file_put_contents($this->file, serialize($data))) {
      throw new \Exception('errors save storage');
    };
  }
}
