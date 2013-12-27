<?php
$wordFreq = array(
   array("text" => "zero", "freq" => 0),
   array("text" => "one", "freq" => 1),
   array("text" => "two", "freq" => 2),
   array("text" => "three", "freq" => 3),
   array("text" => "four", "freq" => 4),
   array("text" => "five", "freq" => 5),
   array("text" => "six", "freq" => 6),
   array("text" => "seven", "freq" => 7),
   array("text" => "eight", "freq" => 8),
   array("text" => "nine", "freq" => 9),
   array("text" => "ten", "freq" => 10),
   array("text" => "fifty", "freq" => 50),
   array("text" => "hundred", "freq" => 100)
 );

header ("Content-Type: application/json");
echo json_encode($wordFreq);
    
?>