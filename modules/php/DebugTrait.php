<?php

namespace Bga\Games\JohnCompany;

use Bga\Games\JohnCompany\Boilerplate\Core\Globals;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;


trait DebugTrait
{

  function debug_test()
  {
 

  }


  function debug_engineDisplay()
  {
    Notifications::log('engine', Globals::getEngine());
  }


}
