# phpMyAdmin MySQL-Dump
# version 2.2.0rc1
# http://phpwizard.net/phpMyAdmin/
# http://phpmyadmin.sourceforge.net/ (download page)
#
# Host: localhost
# Generation Time: October 18, 2001, 1:57 pm
# Server version: 3.23.32
# PHP Version: 4.0.6
# Database : oscar
# --------------------------------------------------------

#
# Table structure for tables 'report_cache' and 'x_report_cache'
#

CREATE TABLE `report_cache` (
  `digest` varchar(32) NOT NULL default '',
  `report` mediumtext NOT NULL,
  `expiration` date NOT NULL default '0000-00-00',
  PRIMARY KEY (`digest`)
) TYPE=MyISAM;

CREATE TABLE `x_report_cache` (
  `digest` varchar(32) NOT NULL default '',
  `report` mediumtext NOT NULL,
  `expiration` date NOT NULL default '0000-00-00',
  PRIMARY KEY (`digest`)
) TYPE=MyISAM;
