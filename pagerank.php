<?php
function StrToNum($Str, $Check, $Magic)
  {
  $Int32Unit = 4294967296;

  $length = strlen($Str);
  for ($i = 0; $i < $length; $i++) 
    {
    $Check *= $Magic;
    
    if ($Check >= $Int32Unit) 
      {
      $Check = ($Check - $Int32Unit * (int) ($Check / $Int32Unit));

      $Check = ($Check < -2147483648) ? ($Check + $Int32Unit) : $Check;
      }
    $Check += ord($Str{$i});
    }
  return $Check;
  }
  
function HashURL($String)
  {
  $Check1 = StrToNum($String, 0x1505, 0x21);
  $Check2 = StrToNum($String, 0, 0x1003F);

  $Check1 >>= 2;
  $Check1 = (($Check1 >> 4) & 0x3FFFFC0 ) | ($Check1 & 0x3F);
  $Check1 = (($Check1 >> 4) & 0x3FFC00 ) | ($Check1 & 0x3FF);
  $Check1 = (($Check1 >> 4) & 0x3C000 ) | ($Check1 & 0x3FFF);

  $Tmb1 = (((($Check1 & 0x3C0) << 4) | ($Check1 & 0x3C)) <<2 ) | ($Check2 & 0xF0F );
  $Tmb2 = (((($Check1 & 0xFFFFC000) << 4) | ($Check1 & 0x3C00)) << 0xA) | ($Check2 & 0xF0F0000 );

  return ($Tmb1 | $Tmb2);
  }
  
function CheckHash($Hashnum)
  {
  $CheckByte = 0;
  $Flag = 0;

  $HashStr = sprintf('%u', $Hashnum) ;
  $length = strlen($HashStr);

  for ($i = $length - 1;  $i >= 0;  $i --) 
    {
    $Rev = $HashStr{$i};
    if (1 === ($Flag % 2)) 
      {
      $Rev += $Rev;
      $Rev = (int)($Rev / 10) + ($Rev % 10);
      }
    $CheckByte += $Rev;
    $Flag ++;
    }

  $CheckByte %= 10;
  if (0 !== $CheckByte) 
    {
    $CheckByte = 10 - $CheckByte;
    if (1 === ($Flag % 2) ) 
      {
      if (1 === ($CheckByte % 2)) 
        {
        $CheckByte += 9;
        }
      $CheckByte >>= 1;
      }
    }
  return '7'.$CheckByte.$HashStr;
  }
 
function getpagerank($url) 
  {
  $fop = fsockopen("toolbarqueries.google.com", 80, $errno, $errstr, 30);
  if (!$fop) 
    {
    } 
  else 
    {
    $out = "GET /tbr?client=navclient-auto&ch=".CheckHash(HashURL($url))
    ."&features=Rank&q=info:".$url."&num=100&filter=0 HTTP/1.1\r\n";
    $out .= "Host: toolbarqueries.google.com\r\n";
    $out .= "User-Agent: Mozilla/4.0 (compatible; GoogleToolbar 2.0.114-big; Windows XP 5.1)\r\n";
    $out .= "Connection: Close\r\n\r\n";
    fwrite($fop, $out);
    while (!feof($fop)) 
      {
      $data = fgets($fop, 128);
      $pos = strpos($data, "Rank_");
      if($pos === false)
        {
            
        } 
      else
        {
        $pagerank = substr($data, $pos + 9);
        }
      }
    fclose($fop);
    }

  $pagerank = (strlen($pagerank) > 0) ? $pagerank : -1;
  $pagerank = intval($pagerank);
  return $pagerank;
  }
?>