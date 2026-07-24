<?php
// Error reporting ON karein
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database connection file include karein
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Form se aaye hue data ko receive aur sanitize karein
    $full_name     = mysqli_real_escape_string($conn, $_POST['full_name']);
    $phone_number  = mysqli_real_escape_string($conn, $_POST['phone_number']);
    $email         = mysqli_real_escape_string($conn, $_POST['email']);
    
    // Agar ye fields form me hain toh receive hongi, nahi toh NULL rahengi
    $plot_interest = isset($_POST['plot_interest']) ? mysqli_real_escape_string($conn, $_POST['plot_interest']) : NULL;
    $message       = isset($_POST['message']) ? mysqli_real_escape_string($conn, $_POST['message']) : NULL;

    // Database me data insert karne ke liye SQL Query
    $sql = "INSERT INTO inquiries (full_name, phone_number, email, plot_interest, message) 
            VALUES ('$full_name', '$phone_number', '$email', '$plot_interest', '$message')";

    if ($conn->query($sql) === TRUE) {
        // Data save hone ke baad message ya redirect
        echo "<script>alert('Thank you! Your inquiry has been submitted successfully.'); window.location.href='index.html';</script>";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>
