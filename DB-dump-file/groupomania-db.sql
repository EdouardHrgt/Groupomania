CREATE DATABASE  IF NOT EXISTS `db_groupomania` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_groupomania`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db_groupomania
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(250) NOT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `userId` varchar(250) NOT NULL,
  `postId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `commentPostId_idx` (`postId`),
  KEY `commentUserId_idx` (`userId`),
  CONSTRAINT `commentPostId` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `commentUserId` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (131,'Don\'t hesitate to say Hi in comments !','2022-05-26 16:16:33','\"7adae989-97c0-43ae-b22f-6d6f406dd4f8\"',100),(132,'I don\'t bite that often :-)','2022-05-26 16:17:03','\"7adae989-97c0-43ae-b22f-6d6f406dd4f8\"',100),(133,'Hello Boss ! ','2022-05-26 16:17:58','\"e67b8247-db54-44bb-9edb-1db3f16d6031\"',100),(134,'Hi ! glad to see you again.','2022-05-26 16:20:59','\"5121f690-354c-4410-ae49-e8cdd9bccc21\"',100),(135,'Welcome in the familly Brice ? !','2022-05-26 16:21:40','\"5121f690-354c-4410-ae49-e8cdd9bccc21\"',101);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(250) NOT NULL,
  `postId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `likesUserId_idx` (`userId`),
  KEY `likesPostId_idx` (`postId`),
  CONSTRAINT `likesPostId` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likesUserId` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=188 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (182,'\"7adae989-97c0-43ae-b22f-6d6f406dd4f8\"',100),(184,'\"e67b8247-db54-44bb-9edb-1db3f16d6031\"',100),(185,'\"5121f690-354c-4410-ae49-e8cdd9bccc21\"',100),(186,'\"5121f690-354c-4410-ae49-e8cdd9bccc21\"',102),(187,'\"7adae989-97c0-43ae-b22f-6d6f406dd4f8\"',102);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(250) NOT NULL,
  `title` varchar(250) NOT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `imageUrl` varchar(250) NOT NULL,
  `userId` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userIdKey_idx` (`userId`),
  CONSTRAINT `userIdKey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (100,'And welcome to the Groupomania\'s Familly ! ?','Hello team !','2022-05-26 16:16:03','noImg','\"7adae989-97c0-43ae-b22f-6d6f406dd4f8\"'),(101,'I\'m a new member here so be friendly !','Hi fellows !','2022-05-26 16:18:33','noImg','\"e67b8247-db54-44bb-9edb-1db3f16d6031\"'),(102,'Just to remind you the meeting at 5.pm tomorrow, don\'t be late !','Meeting ','2022-05-26 16:19:47','noImg','\"e67b8247-db54-44bb-9edb-1db3f16d6031\"'),(103,'I\'m your nex moderator here, just stay cool and respectfull !','Good mornig o/','2022-05-26 16:25:09','noImg','\"df26ee71-d447-4365-8ee7-f7512a75f092\"');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `permission` enum('member','moderator','admin') NOT NULL DEFAULT 'member',
  `username` varchar(50) NOT NULL,
  `image` varchar(250) NOT NULL DEFAULT 'http://localhost:3000/images/default_user.jpg',
  `createDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `bio` longtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('\"5121f690-354c-4410-ae49-e8cdd9bccc21\"','edouard@groupo.com','$2b$10$fwo1BhmTYJdKEFZsvBRbS.ULT.6STdKzlmdwQR.pD7ik9KuleGI7.','member','Edouard','http://localhost:3000/images/default_user.jpg','2022-05-26 16:20:15',NULL),('\"7adae989-97c0-43ae-b22f-6d6f406dd4f8\"','admin@groupo.com','$2b$10$pdGuMU6gccdu6wliD5hkuO7IxwC7gHxzbl9QZRUZ4UFH1gu2kJDJG','admin','Administrator','http://localhost:3000/images/default_user.jpg','2022-05-26 16:15:17',NULL),('\"df26ee71-d447-4365-8ee7-f7512a75f092\"','modo@groupo.com','$2b$10$H2wQR1ZZETb8qp1UCm7fNOfWamLbic5xwtgUir13ECcwLge/4G5iC','moderator','Moderator_800','http://localhost:3000/images/default_user.jpg','2022-05-26 16:23:29',NULL),('\"e67b8247-db54-44bb-9edb-1db3f16d6031\"','brice@groupo.com','$2b$10$xb6a0JcES3ALXK/c5Hchjuysrlk7bcI0xDzMmDRIarF7nc5Qu6ri.','member','Brice','http://localhost:3000/images/default_user.jpg','2022-05-26 16:17:35',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-26 16:51:09
