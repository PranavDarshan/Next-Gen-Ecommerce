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
-- Table structure for table `product`
--

DROP TABLE IF EXISTS product;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE product (
  product_id int NOT NULL AUTO_INCREMENT,
  product_name varchar(100) DEFAULT NULL,
  stock int DEFAULT NULL,
  price double DEFAULT NULL,
  brand_id int NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  nutritional_information varchar(1000) DEFAULT NULL,
  category varchar(50) DEFAULT NULL,
  PRIMARY KEY (product_id),
  KEY fk_brand_id (brand_id),
  CONSTRAINT fk_brand_id FOREIGN KEY (brand_id) REFERENCES brand (brand_id)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES product WRITE;
/*!40000 ALTER TABLE product DISABLE KEYS */;
INSERT INTO product VALUES (2,'Popcorn Hot & Spicy',22,375,5,'Indulge in the delicious taste of our popcorn with the perfect blend of heat and flavor in every bite. Our locally sourced and carefully selected ingredients ensure a consistent and mouth-watering experience that will keep you coming back for more. With its vibrant orange color and enticing aroma adding to the flavor, our spicy popcorn is sure to satisfy your cravings and spice up your snack time.','{\"carbohydrates\":\"75.7\",\"protein\":\"4.3\",\"fat\":\"17\",\"calories\":\"456\"}','snack'),(11,'Popcorn',14,235,1,'IDk','{\"carbohydrates\":\"75.7\",\"protein\":\"4.3\",\"fat\":\"17\",\"calories\":\"456\"}','snack'),(12,'Plus Sign',1,204.25,7,'Experience the power of simplicity with YouTube\'s iconic plus sign, adding a touch of elegance to your browsing experience.','{\"carbohydrates\":\"40g\",\"protein\":\"5g\",\"fat\":\"10g\",\"calories\":\"250\"}','snack'),(13,'Limca Lemon',1,50,8,'Indulge in the delicious world of bright greens and vibrant hues as you savor every sip of Limca Lemon, celebrating 50 years of bringing India its unique twist on lime and lemon flavors. This refreshing drink not only quenches thirst but also evokes a sense of pride and joy in its long history of quenching the nation\'s thirst for something truly satisfying. As seen from this stunning image, this drink is ready to be served chilled or frozen, promising moments of shared happiness and well-deserved relaxation.','{\"carbohydrates\":0,\"protein\":0,\"fat\":0,\"calories\":0}','beverage'),(14,'Happy Fizz (Prahi Agro) - Flavored Sparkling Drink',1,100,14,'Happy Fizz is the perfect choice for those seeking a delightful beverage experience.','{\"carbohydrates\":\"68\",\"protein\":\"0\",\"fat\":\"0\",\"calories\":\"270\"}','beverage'),(16,'Banana Walnut Cake',0,249,19,'Indulge in the perfect blend of moist banana and crunchy walnuts with our Banana Walnut Cake, handcrafted with love and care using whole walnuts for a decadent treat.','{\"carbohydrates\":43,\"protein\":9,\"fat\":27,\"calories\":448}','snack'),(17,'Pringles Original',8,250,20,'Indulge in the timeless taste of Pringles Original, a staple of flavor that never goes out of style. With its distinctive stackable shape and irresistible crunch, this iconic snack is perfect for any occasion. Whether you\'re looking to satisfy your cravings or share with friends, Pringles Original is the ultimate choice for a delicious and convenient snacking experience.','{\"carbohydrates\":62.8,\"protein\":5,\"fat\":27.9,\"calories\":523}','snack'),(18,'Maaza Original',1,250,21,'Quench your thirst with the authentic taste of Maaza Original - a refreshing blend of natural flavors and essential nutrients that will leave you feeling revitalized and satisfied every time.','{\"carbohydrates\":\"15.8\",\"protein\":\"0\",\"fat\":\"0\",\"calories\":\"63\"}','snack'),(19,'Malabar Paratha',0,85,22,'Indulge in the rich flavors of India with our Malabar Paratha, a traditional flatbread from the Malabar region. Made with love and care, our parathas are packed with aromatic spices and herbs that will transport you to the streets of India. With a soft, flaky texture and a hint of sweetness, our Malabar Paratha is the perfect accompaniment to your favorite curries or dips. Try it today and experience the authentic taste of India in every bite.','{\"carbohydrates\":49.7,\"protein\":8.5,\"fat\":10.6,\"calories\":328.2}','snack'),(20,'Maaza',1,250,21,'Quench your thirst with the authentic taste of Maaza Original - a refreshing blend of natural flavors and essential nutrients that will leave you feeling revitalized and satisfied every time.','{\"carbohydrates\":\"15.8\",\"protein\":\"0\",\"fat\":\"0\",\"calories\":\"63\"}','snack'),(21,'Pringles',9,250,20,'Indulge in the timeless taste of Pringles Original, a staple of flavor that never goes out of style. With its distinctive stackable shape and irresistible crunch, this iconic snack is perfect for any occasion. Whether you\'re looking to satisfy your cravings or share with friends, Pringles Original is the ultimate choice for a delicious and convenient snacking experience.','{\"carbohydrates\":62.8,\"protein\":5,\"fat\":27.9,\"calories\":523}','snack'),(22,'Limca',6,50,8,'Indulge in the delicious world of bright greens and vibrant hues as you savor every sip of Limca Lemon, celebrating 50 years of bringing India its unique twist on lime and lemon flavors. This refreshing drink not only quenches thirst but also evokes a sense of pride and joy in its long history of quenching the nation\'s thirst for something truly satisfying. As seen from this stunning image, this drink is ready to be served chilled or frozen, promising moments of shared happiness and well-deserved relaxation.','{\"carbohydrates\":0,\"protein\":0,\"fat\":0,\"calories\":0}','beverage'),(23,'Mazza Original',1,189,24,'Indulge in the invigorating taste of Mazza Original, a vibrant and refreshing fruit-flavored drink that embodies the essence of simplicity and purity. With its captivating packaging and tantalizing aroma, Mazza Original is sure to quench your thirst and satisfy your cravings.','{\"carbohydrates\":\"15.8\",\"protein\":\"0\",\"fat\":\"0\",\"calories\":\"63\"}','snack'),(24,'Set Curd',0,500,25,'Indulge in the creamy goodness of Akshayakalpa\'s Set Curd, made with love and care using only the finest organic ingredients.','{\"carbohydrates\":\"5.95\",\"protein\":\"3.81\",\"fat\":\"2.96\",\"calories\":\"72.3\"}','snack'),(25,'Salted Peanuts',24,150,26,'Experience the perfect combination of salty and crunchy with Haldiram\'s Salted Peanuts. These irresistible bites are carefully selected and roasted to perfection, ensuring a delightful snacking experience. Whether you\'re looking for a quick pick-me-up or a satisfying treat, Haldiram\'s Salted Peanuts are sure to satisfy your cravings and leave you wanting more. Enjoy the rich flavor and satisfying crunch of these delicious peanuts, perfect for any occasion.','{\"carbohydrates\":21.85,\"protein\":20.62,\"fat\":51.91,\"calories\":637}','Snack');
/*!40000 ALTER TABLE product ENABLE KEYS */;
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
