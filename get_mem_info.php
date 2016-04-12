<?php
$mem_total = explode(" ", exec('cat /proc/meminfo|grep MemTotal'))[9];
$mem_free = explode(" ", exec('cat /proc/meminfo|grep MemFree'))[10];
echo
    "总内存:" . round($mem_total / 1024, 2)
    . "MB<br />可用内存:" . round($mem_free / 1024, 2)
    . "MB<br />使用率:" . round((($mem_total - $mem_free) / $mem_total) * 100, 2);