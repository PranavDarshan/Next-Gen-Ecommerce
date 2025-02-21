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
-- Table structure for table `store`
--

DROP TABLE IF EXISTS store;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE store (
  store_id int NOT NULL,
  store_name varchar(100) DEFAULT NULL,
  location varchar(200) DEFAULT NULL,
  email varchar(100) DEFAULT NULL,
  phone mediumtext,
  PRIMARY KEY (store_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store`
--

LOCK TABLES store WRITE;
/*!40000 ALTER TABLE store DISABLE KEYS */;
INSERT INTO store VALUES (1,'SuperMart India','MG Road, Bengaluru, Karnataka','supermart.bangalore@email.com','+91 80 1234 5678'),(2,'SuperMart India','Connaught Place, New Delhi','supermart.delhi@email.com','+91 11 2345 6789'),(3,'SuperMart India','Andheri West, Mumbai, Maharashtra','supermart.mumbai@email.com','+91 22 3456 7890'),(4,'SuperMart India','Banjara Hills, Hyderabad, Telangana','supermart.hyderabad@email.com','+91 40 5678 9012'),(5,'SuperMart India','Kochi, Kerala','supermart.kochi@email.com','+91 484 1234 5678'),(6,'SuperMart India','Sadar Bazar, Lucknow, Uttar Pradesh','supermart.lucknow@email.com','+91 522 2345 6789'),(7,'SuperMart India','Koramangala, Bengaluru, Karnataka','supermart.koramangala@email.com','+91 80 3456 7891'),(8,'SuperMart India','Bangalore Road, Pune, Maharashtra','supermart.pune@email.com','+91 20 4567 8901'),(9,'SuperMart India','Sector 15, Chandigarh','supermart.chd@email.com','+91 172 5678 9012'),(10,'SuperMart India','Viman Nagar, Pune, Maharashtra','supermart.viman@email.com','+91 20 6789 0123'),(11,'SuperMart India','Hauz Khas, New Delhi','supermart.hauzkhas@email.com','+91 11 7890 1234'),(12,'SuperMart India','Jayanagar, Bengaluru, Karnataka','supermart.jayanagar@email.com','+91 80 2345 6789'),(13,'SuperMart India','Nungambakkam, Chennai, Tamil Nadu','supermart.chennai@email.com','+91 44 3456 7890'),(14,'SuperMart India','Janakpuri, New Delhi','supermart.janakpuri@email.com','+91 11 4567 8901'),(15,'SuperMart India','South Extension, New Delhi','supermart.southextension@email.com','+91 11 5678 9012');
/*!40000 ALTER TABLE store ENABLE KEYS */;
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
