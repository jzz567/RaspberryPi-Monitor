<?php
$temp = file_get_contents('/sys/class/thermal/thermal_zone0/temp');
echo $temp;

