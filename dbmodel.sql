-- ------
-- BGA framework: Gregory Isabelli & Emmanuel Colin & BoardGameArena
-- JohnCompany implementation : © <Your name here> <Your email address here>
-- 
-- This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
-- See http://en.boardgamearena.com/#!doc/Studio for more information.
-- -----
-- dbmodel.sql
-- This is the file where you are describing the database schema of your game
-- Basically, you just have to export from PhpMyAdmin your table structure and copy/paste
-- this export here.
-- Note that the database itself and the standard tables ("global", "stats", "gamelog" and "player") are
-- already created and must not be created here
-- Note: The database schema is created from this file when the game starts. If you modify this file,
--       you have to restart a game to see your changes in database.
-- Example 1: create a standard "card" table to be used with the "Deck" tools (see example game "hearts"):
-- CREATE TABLE IF NOT EXISTS `card` (
--   `card_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
--   `card_type` varchar(16) NOT NULL,
--   `card_type_arg` int(11) NOT NULL,
--   `card_location` varchar(16) NOT NULL,
--   `card_location_arg` int(11) NOT NULL,
--   PRIMARY KEY (`card_id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;
-- Example 2: add a custom field to the standard "player" table
-- ALTER TABLE `player` ADD `player_my_custom_field` INT UNSIGNED NOT NULL DEFAULT '0';
CREATE TABLE IF NOT EXISTS `global_variables` (
  `name` varchar(50) NOT NULL,
  `value` json,
  PRIMARY KEY (`name`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
CREATE TABLE IF NOT EXISTS `user_preferences` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `player_id` int(10) NOT NULL,
  `pref_id` int(10) NOT NULL,
  `pref_value` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
CREATE TABLE IF NOT EXISTS `log` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `move_id` int(10) NOT NULL,
  `table` varchar(32) NOT NULL,
  `primary` varchar(32) NOT NULL,
  `type` varchar(32) NOT NULL,
  `affected` JSON,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
CREATE TABLE IF NOT EXISTS `families` (
  `family_id` varchar(16) NOT NULL,
  `family_location` varchar(32) NOT NULL,
  `family_state` int(10) DEFAULT 0,
  `treasury` int(10) DEFAULT 0,
  `victory_points` int(10) DEFAULT 0,
  `opportunity_marker` varchar(32) DEFAULT NULL,
  `crown_promise_cubes` int(10) DEFAULT 0,
  `has_chairman_marker` tinyint(1) DEFAULT 0,
  `is_leader_of_opposition` tinyint(1) DEFAULT 0,
  `is_prime_minister` tinyint(1) DEFAULT 0,
  `trophies` int(10) DEFAULT 0,
  `law_pieces` int(10) DEFAULT 0,
  `spent_on_retirement` int(10) DEFAULT 0,
  PRIMARY KEY (`family_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
CREATE TABLE IF NOT EXISTS `offices` (
  `office_id` varchar(32) NOT NULL,
  `office_location` varchar(32) NOT NULL,
  `office_state` int(10) DEFAULT 0,
  `treasury` int(10) DEFAULT 0,
  `family_member_id` varchar(32) NULL,
  PRIMARY KEY (`office_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
CREATE TABLE IF NOT EXISTS `setup_cards` (
  `card_id` varchar(100) NOT NULL,
  `card_location` varchar(32) NOT NULL,
  `card_state` int(10) DEFAULT 0,
  PRIMARY KEY (`card_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
CREATE TABLE IF NOT EXISTS `family_members` (
  `family_member_id` varchar(32) NOT NULL,
  `family_member_location` varchar(32) NOT NULL,
  `family_member_state` int(10) DEFAULT 0,
  `family_id` varchar(16) NOT NULL,
  `fatigue` int(10) DEFAULT 0,
  PRIMARY KEY (`family_member_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` varchar(32) NOT NULL,
  `order_location` varchar(32) NOT NULL,
  `order_state` int(10) DEFAULT 0,
  `status` varchar(32) NOT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
ALTER TABLE `gamelog`
ADD `cancel` TINYINT(1) NOT NULL DEFAULT 0;