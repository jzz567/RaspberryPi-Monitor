<?php
echo
    "CPU:" . explode(":", exec("cat /proc/cpuinfo |grep 'model name'"))[1] .
    "<br />CPU逻辑核心数:" . exec("cat /proc/cpuinfo |grep 'processor'|wc -l") .
    "<br />CPU支持的指令集:" . explode(":", exec("cat /proc/cpuinfo |grep 'Features'"))[1];