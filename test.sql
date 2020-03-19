/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 80016
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 80016
File Encoding         : 65001

Date: 2020-03-19 18:35:38
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tb_permissions
-- ----------------------------
DROP TABLE IF EXISTS `tb_permissions`;
CREATE TABLE `tb_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `permissions_name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '功能名称',
  `permissions_explain` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '权限说明（中文）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of tb_permissions
-- ----------------------------
INSERT INTO `tb_permissions` VALUES ('1', 'query', '信息查询');
INSERT INTO `tb_permissions` VALUES ('2', 'add', '新增');
INSERT INTO `tb_permissions` VALUES ('3', 'delete', '删除用户');

-- ----------------------------
-- Table structure for tb_role
-- ----------------------------
DROP TABLE IF EXISTS `tb_role`;
CREATE TABLE `tb_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '角色名',
  `role_explain` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '角色说明（中文）',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of tb_role
-- ----------------------------
INSERT INTO `tb_role` VALUES ('1', 'admin', '超级管理员');
INSERT INTO `tb_role` VALUES ('2', 'user', '普通用户');

-- ----------------------------
-- Table structure for tb_role_permissions
-- ----------------------------
DROP TABLE IF EXISTS `tb_role_permissions`;
CREATE TABLE `tb_role_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) DEFAULT NULL COMMENT '角色id',
  `permissions_id` int(11) DEFAULT NULL COMMENT '功能id',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of tb_role_permissions
-- ----------------------------
INSERT INTO `tb_role_permissions` VALUES ('1', '1', '1', '2020-03-16 16:32:20');
INSERT INTO `tb_role_permissions` VALUES ('2', '1', '2', '2020-03-16 16:32:29');
INSERT INTO `tb_role_permissions` VALUES ('3', '1', '3', '2020-03-19 14:21:07');
INSERT INTO `tb_role_permissions` VALUES ('5', '2', '1', '2020-03-19 14:21:11');

-- ----------------------------
-- Table structure for tb_user
-- ----------------------------
DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE `tb_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_user
-- ----------------------------
INSERT INTO `tb_user` VALUES ('3', 'root', 'CDF8F6C81EC46BEC077A9629B948BB48', '2020-03-19 09:27:47');
INSERT INTO `tb_user` VALUES ('10', 'zhangwei', '1F470ABDA924E8A0AAA30D48BEC226FB', '2020-03-19 13:39:16');
INSERT INTO `tb_user` VALUES ('11', 'laowang', '1F470ABDA924E8A0AAA30D48BEC226FB', '2020-03-19 15:03:18');

-- ----------------------------
-- Table structure for tb_user_role
-- ----------------------------
DROP TABLE IF EXISTS `tb_user_role`;
CREATE TABLE `tb_user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL COMMENT '用户id',
  `role_id` int(11) DEFAULT NULL COMMENT '角色id',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of tb_user_role
-- ----------------------------
INSERT INTO `tb_user_role` VALUES ('5', '3', '1', '2020-03-19 09:27:47');
INSERT INTO `tb_user_role` VALUES ('12', '10', '1', '2020-03-19 13:39:16');
INSERT INTO `tb_user_role` VALUES ('13', '11', '2', '2020-03-19 15:03:18');
