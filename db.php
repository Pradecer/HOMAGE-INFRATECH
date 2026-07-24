<?php
$servername = "localhost";
$username   = "u199801444_user";       // Aapka MySQL Username
$password   = "Homage@2005";           // Jo password aapne create karte waqt dala tha
$dbname     = "u199801444_inquiries";  // Aapka Database Name

// Connection create karein
$conn = new mysqli($servername, $username, $password, $dbname);

// Connection check karein
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
