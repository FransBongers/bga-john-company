<?php
namespace Bga\Games\JohnCompany\Boilerplate\Helpers;
use Bga\Games\JohnCompany\Game;

class UserException extends \BgaUserException
{
  public function __construct($str)
  {
    parent::__construct(Game::get()::translate($str));
  }
}
?>
