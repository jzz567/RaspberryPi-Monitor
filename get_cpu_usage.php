<?php
echo passthru('top -n 1 |grep Cpu | cut -d "," -f 1 | cut -d ":" -f 2');
