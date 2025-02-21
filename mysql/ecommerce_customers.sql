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
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS customers;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE customers (
  customer_id int NOT NULL,
  customer_name varchar(100) DEFAULT NULL,
  address varchar(200) DEFAULT NULL,
  email varchar(100) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  PRIMARY KEY (customer_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES customers WRITE;
/*!40000 ALTER TABLE customers DISABLE KEYS */;
INSERT INTO customers VALUES (1,'Alice Johnson','123 Maple Street, Springfield, IL','alice.johnson@email.com','password123'),(2,'Bob Smith','456 Oak Avenue, Chicago, IL','bob.smith@email.com','securepass456'),(3,'Charlie Brown','789 Pine Road, Austin, TX','charlie.brown@email.com','mypassword789'),(4,'David White','101 Elm Drive, Denver, CO','david.white@email.com','davidpass101'),(5,'Eva Green','202 Birch Lane, Seattle, WA','eva.green@email.com','eva12345'),(6,'Frank Harris','303 Cedar Street, Miami, FL','frank.harris@email.com','frankpassword123'),(7,'Grace Lee','404 Maple Road, Los Angeles, CA','grace.lee@email.com','grace@1234'),(8,'Henry Martin','505 Willow Boulevard, New York, NY','henry.martin@email.com','henrypass56'),(9,'Isla Davis','606 Redwood Avenue, Portland, OR','isla.davis@email.com','isla9876'),(10,'Jack Wilson','707 Cedar Grove, San Francisco, CA','jack.wilson@email.com','jackson123'),(11,'Kathy Taylor','808 Palm Street, Phoenix, AZ','kathy.taylor@email.com','kathytaylor456'),(12,'Louis Clark','909 Oak Lane, Boston, MA','louis.clark@email.com','louis7890'),(13,'Maria Lewis','1001 Birch Road, Dallas, TX','maria.lewis@email.com','maria@123'),(14,'Nathan Walker','1112 Pine Street, Tampa, FL','nathan.walker@email.com','nathanwalker@1'),(15,'Olivia Young','1213 Maple Circle, Orlando, FL','olivia.young@email.com','olivia12345');
/*!40000 ALTER TABLE customers ENABLE KEYS */;
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
