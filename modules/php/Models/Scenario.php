<?php

namespace Bga\Games\JohnCompany\Models;

class Scenario implements \JsonSerializable
{

  protected $id;
  protected $name;
  protected $setupCards;
  protected $companyDebt;
  protected $companyStanding;
  protected $companyTreasuries;
  protected $companyShips = [];
  protected $orders = [];
  protected $regions = [];
  protected $passedLaws = [];
  protected $elephant;
  protected $armies = [];
  protected $startingRegiments = 1;
  protected $startTurn;

  public function __construct() {}

  /**
   * Return an array of attributes
   */
  public function jsonSerialize(): array
  {
    $data = [
      'id' => $this->id,
      'name' => $this->name,
    ];


    return $data;
  }

  public function getCompanyStanding()
  {
    return $this->companyStanding;
  }

  public function getCompanyDebt()
  {
    return $this->companyDebt;
  }

  public function getCompanyTreasuries()
  {
    return $this->companyTreasuries;
  }
  
  public function getElephant()
  {
    return $this->elephant;
  }

  public function getOrders()
  {
    return $this->orders;
  }

  public function getRegions()
  {
    return $this->regions;
  }

  public function getSetupCards()
  {
    return $this->setupCards;
  }

  public function getStartingRegiments()
  {
    return $this->startingRegiments;
  }

  public function getStartTurn()
  {
    return $this->startTurn;
  }
}
