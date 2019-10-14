-- MySQL Script generated by MySQL Workbench
-- Fri Oct 11 11:18:24 2019
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `CITY`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `CITY` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `CITY` (
  `idCITY` INT NOT NULL,
  `fkCOUNTRY` INT NOT NULL,
  `NAME` VARCHAR(45) NOT NULL,
  `DESCRIPTION` VARCHAR(500) NOT NULL,
  `TEXT` LONGTEXT NOT NULL,
  PRIMARY KEY (`idCITY`, `fkCOUNTRY`))
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE INDEX `fk_CITY_COUNTRY_idx` ON `CITY` (`fkCOUNTRY` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `COUNTRY`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `COUNTRY` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `COUNTRY` (
  `idCOUNTRY` INT NOT NULL,
  PRIMARY KEY (`idCOUNTRY`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `LIKE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `LIKE` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `LIKE` (
  `fkPlace` INT NOT NULL,
  `fkUSER` INT NOT NULL,
  `LIKE` INT NOT NULL,
  `DATE` DATETIME NOT NULL,
  PRIMARY KEY (`fkPlace`))
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE INDEX `fk_LIKE_PLACE1_idx` ON `LIKE` (`fkPlace` ASC) VISIBLE;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `PLACE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PLACE` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `PLACE` (
  `idPLACE` INT NOT NULL,
  `fkCITY` INT NOT NULL,
  `LONG` DECIMAL(11,7) NOT NULL,
  `LAT` DECIMAL(11,7) NOT NULL,
  PRIMARY KEY (`idPLACE`, `fkCITY`))
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE INDEX `fk_PLACE_CITY1_idx` ON `PLACE` (`fkCITY` ASC) VISIBLE;

SHOW WARNINGS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;