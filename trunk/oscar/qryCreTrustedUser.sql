# phpMyAdmin MySQL-Dump
# version 2.2.0rc1
# http://phpwizard.net/phpMyAdmin/
# http://phpmyadmin.sourceforge.net/ (download page)
#
# Host: localhost
# Generation Time: October 18, 2001, 1:55 pm
# Server version: 3.23.32
# PHP Version: 4.0.6
# Database : oscar
# --------------------------------------------------------

#
# Table structure for table 'trusted_user'
#

CREATE TABLE `trusted_user` (
  `email_address` varchar(64) NOT NULL default '',
  PRIMARY KEY (`email_address`)
) TYPE=MyISAM;


