# phpMyAdmin MySQL-Dump
# version 2.2.0rc1
# http://phpwizard.net/phpMyAdmin/
# http://phpmyadmin.sourceforge.net/ (download page)
#
# Host: localhost
# Generation Time: November 3, 2001, 1:48 pm
# Server version: 3.23.32
# PHP Version: 4.0.6
# Database : oscar
# --------------------------------------------------------

#
# Table structure for tables 'authority' and 'x_authority'
#

CREATE TABLE `authority` (
  `email_addr` varchar(64) NOT NULL default '',
  `role` varchar(32) default NULL
) TYPE=MyISAM;

CREATE TABLE `x_authority` (
  `email_addr` varchar(64) NOT NULL default '',
  `role` varchar(32) default NULL
) TYPE=MyISAM;

