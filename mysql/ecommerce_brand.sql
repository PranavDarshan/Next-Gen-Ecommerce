-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ecommerce
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS brand;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE brand (
  brand_id int NOT NULL AUTO_INCREMENT,
  brand_name varchar(100) DEFAULT NULL,
  brand_description varchar(255) DEFAULT 'No description available',
  brand_foundation_year int DEFAULT NULL,
  brand_country varchar(100) DEFAULT NULL,
  PRIMARY KEY (brand_id)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand`
--

LOCK TABLES brand WRITE;
/*!40000 ALTER TABLE brand DISABLE KEYS */;
INSERT INTO brand VALUES (1,'THE SNACKS FACTORY','man',2010,'Thailand'),(5,'THE SNACKS FACTORY','Manufacturer of high-quality and delicious popcorn snacks',2010,'Thailand'),(6,'THE SNACKS FACTORY','A manufacturer specializing in snack food production, offering a variety of flavors with an emphasis on quality and taste',2015,'China'),(7,'YouTube','YouTube is a video-sharing platform where users can upload, share, and view videos, creating a platform with a casual vibe',2005,'USA'),(8,'Limca','Indian soft drink brand',1971,'India'),(9,'Limca','Limca is a popular Indian soft drink brand that offers a range of refreshing beverages, including lemon-lime flavored drinks.',1971,'India'),(10,'Limca','Celebrating 50 years of refreshing India',1971,'India'),(11,'Limca','A popular lemon-lime flavored soft drink brand in India, known for its unique taste and refreshing qualities. Established in the 1970s in India, the brand is well known for its citrusy taste.',1971,'India'),(12,'Limca','A citrus-flavored soft drink celebrating 50 years of refreshing India.',1972,'India'),(13,'Limca','A popular Indian soft drink known for its unique lemon-lime flavor. Experience the invigorating taste of Limca, a refreshing and tangy beverage that\'s perfect for quenching your thirst on a hot day.',1971,'India'),(14,'Happy Fizz','Happy Fizz is a flavored sparkling drink brand that offers a refreshing and fizzy beverage experience.',2015,'United States'),(19,'The Baker\'s Dozen','Daily Goodness, Baked Perfect. Our bakery is committed to providing delicious treats, made with love and care.',2008,'India'),(20,'Pringles','A renowned international brand of stackable potato chips.',1968,'United States'),(21,'Dabur','Indian multinational consumer goods company that produces Ayurvedic medicine and natural consumer products.',1884,'India'),(22,'DesiChef','DesiChef is a brand that specializes in traditional Indian cuisine, offering a range of authentic and flavorful dishes.',2019,'India'),(23,'Pringles','A popular brand of stackable potato chips known for their unique shape and flavor.',1968,'USA'),(24,'Mazza','Mazza is a beverage company specializing in fruit-flavored drinks, known for its vibrant packaging and refreshing flavors.',2008,'India'),(25,'Akshayakalpa','Akshayakalpa is an organic dairy brand that promotes sustainable and eco-friendly practices, committed to animal welfare and natural farming methods.',2010,'India'),(26,'Haldiram\'s','Haldiram\'s is an Indian snack company known for its wide range of delicious and authentic snacks',1941,'India'),(27,'Haldiram\'s','Haldiram\'s is a well-known Indian snack food company that offers a wide range of products, including salty snacks, sweet treats, and savory delights.',1937,'India');
/*!40000 ALTER TABLE brand ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-19 20:24:37
