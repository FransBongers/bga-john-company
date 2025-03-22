<?php

namespace Bga\Games\JohnCompany\Managers;

use Bga\GameFramework\Notify;
use Bga\Games\JohnCompany\Game;
use Bga\Games\JohnCompany\Boilerplate\Core\Notifications;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Locations;
use Bga\Games\JohnCompany\Boilerplate\Helpers\Utils;


class Orders extends \Bga\Games\JohnCompany\Boilerplate\Helpers\Pieces
{
  protected static $table = 'orders';
  protected static $prefix = 'order_';
  protected static $customFields = [
    'status',
  ];
  protected static $autoremovePrefix = false;
  protected static $autoreshuffle = false;
  protected static $autoIncrement = false;

  protected static function cast($row)
  {
    return self::getInstance($row['order_id'], $row);
  }

  public static function getInstance($id, $data = null)
  {
    // $prefix = self::getClassPrefix($id);

    $className = "\Bga\Games\JohnCompany\Orders\\$id";
    return new $className($data);
  }


  // ..######..########.########.##.....##.########.
  // .##....##.##..........##....##.....##.##.....##
  // .##.......##..........##....##.....##.##.....##
  // ..######..######......##....##.....##.########.
  // .......##.##..........##....##.....##.##.......
  // .##....##.##..........##....##.....##.##.......
  // ..######..########....##.....#######..##.......


  public static function setupNewGame()
  {
    $scenarioOrders = Scenarios::get()->getOrders();

    $orders = [];
    foreach (ORDERS as $orderId) {
      $order = self::getInstance($orderId);
      // TODO: set location based on scenario
      $orders[$orderId] = [
        'id' => $orderId,
        'location' => $order->getRegionId(),
        'status' => isset($scenarioOrders[$orderId]) ? $scenarioOrders[$orderId] : OPEN,
      ];
    }

    // Notifications::log('orders', $orders);
    self::create($orders, null);
  }

  public static function getClosedOrders()
  {
    $orders = self::getAll()->toArray();
    return Utils::filter($orders, function ($order) {
      return $order->getStatus() === CLOSED;
    });
  }
}
