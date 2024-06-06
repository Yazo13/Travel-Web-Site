-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2024 at 10:50 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `yazo_travel`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` int(3) UNSIGNED NOT NULL,
  `destination` varchar(100) NOT NULL,
  `date_in` varchar(100) NOT NULL,
  `date_out` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `destination`, `date_in`, `date_out`, `Email`) VALUES
(4, 'Tbilisi', '2024-06-05', '2024-06-26', 'giorgi@gau.edu.ge'),
(5, 'Tbilisi', '2024-06-26', '2024-06-29', 'giorgi@gau.edu.ge');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(3) NOT NULL,
  `description` varchar(100) NOT NULL,
  `user_id` int(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `description`, `user_id`) VALUES
(1, 'Yazo travel has such a user-friendly website. Easy to navigate, search and fiddle with dates instead', 3),
(2, 'Great communication. This was a rushed booking and she was very helpful/prompt with calls/replies to', 1),
(3, 'I must say the service we received from this company was amazing and would recommend them to anyone ', 2),
(11, 'ძალიან მომწონს თქვენი პროდუქტი მადლობაა', 1),
(23, 'ძალიან კარგი პლატფორმა ყველა ინფორმაციის მარტივად და სწრაფად მისაღებად ', 2);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(3) UNSIGNED NOT NULL,
  `name` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `id` int(3) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`id`, `title`, `description`) VALUES
(1, 'Get Best Prices !', 'Pay through our application and save thousands and get amazing rewards.'),
(2, 'Covid Safe', 'We have all the curated hotels that have all the precaution for a covid safe environment.'),
(3, 'Flexible Payment', 'Enjoy the flexible payment through our app and get rewards on every payment.'),
(4, 'Find The Best Near You', 'Find the best hotels and places to visit near you in a single click.'),
(9, 'This Project is For PHP Lectures', 'with this project I can get 10 points and experience as well'),
(18, '', '');

-- --------------------------------------------------------

--
-- Table structure for table `trip`
--

CREATE TABLE `trip` (
  `id` int(3) UNSIGNED NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `distance` text NOT NULL,
  `price` varchar(100) NOT NULL,
  `duration` varchar(100) NOT NULL,
  `Image_url` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trip`
--

INSERT INTO `trip` (`id`, `title`, `description`, `distance`, `price`, `duration`, `Image_url`) VALUES
(1, 'Singapore', 'Singapore, officialy thr Republic of Singapore, is a', '1500', '38,800', '4 Day', '../src/assets/storage/Destination1.png'),
(2, 'Thailand', 'Thailand is a Southeast Asia country. It\'s known for', '150000', '54,200', 'Approx 2 night trip', '../src/assets/storage/Destination2.png'),
(3, 'Paris', 'Paris, France\'s capital, is a major European city and a', '2032136km', '45,500', 'Approx 2 night trip', '../src/assets/storage/Destination3.png'),
(4, 'New Zealand', 'New Zealand is an island country in the', '1351506km', '24,100', 'Approx 1 night trip', '../src/assets/storage/Destination4.png'),
(27, 'Tbilisi', 'Very Biutufull! City of Saqartvelo', '1', '151521551', 'Life Time', '../src/assets/storage/merlin_138493119_dc17f17f-96a2-4487-a9ea-214914926374-superJumbo.jpg'),
(55, 'Signagi', 'Love city of Georgia', '777', '21984011029740141721421421', '2', '../src/assets/storage/6weeClV4nEyNNGtuDybpjOtP5DrV6KtogDf0TFX5.jpeg'),
(63, 'asf', 'asf', 'asfsaf', 'asf', 'asfasfsaf', '../src/assets/storage/682699.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(3) UNSIGNED NOT NULL,
  `name` varchar(25) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `user_role` int(3) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `Username`, `Email`, `password`, `user_role`) VALUES
(1, 'Luka', 'Gulverda', 'giorgi@gau.edu.ge', '81dc9bdb52d04dc20036dbd8313ed055', 2),
(2, 'Gigi', 'Sikvdila', 'gio@gau.ge', 'c8759924c3699fb35269dc39ba7fee56', 2),
(3, 'Giorgi', 'Yazo', 'giorgi.kazishvili@gau.edu.ge', '81dc9bdb52d04dc20036dbd8313ed055', 1),
(67, 'giorgi', 'Yazo', 'gkazishvili@bk.ru', '58c4fcbdbd189123ab093df7fb7d86a5', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trip`
--
ALTER TABLE `trip`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_role` (`user_role`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `trip`
--
ALTER TABLE `trip`
  MODIFY `id` int(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`user_role`) REFERENCES `role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
