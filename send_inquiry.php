<?php
// Error reporting ON
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database connection file include
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Receive and sanitize form data
    $full_name     = mysqli_real_escape_string($conn, $_POST['full_name']);
    $phone_number  = mysqli_real_escape_string($conn, $_POST['phone_number']);
    $email         = mysqli_real_escape_string($conn, $_POST['email']);
    
    $plot_interest = isset($_POST['plot_interest']) ? mysqli_real_escape_string($conn, $_POST['plot_interest']) : NULL;
    $message       = isset($_POST['message']) ? mysqli_real_escape_string($conn, $_POST['message']) : NULL;

    // 1. Insert into 'inquiries' table
    $sql_inquiries = "INSERT INTO inquiries (full_name, phone_number, email, plot_interest, message) 
                      VALUES ('$full_name', '$phone_number', '$email', '$plot_interest', '$message')";
    $res1 = $conn->query($sql_inquiries);

    // 2. Insert into 'Broucher' table (Name, Phone_no, Email) as shown in phpMyAdmin
    @$conn->query("INSERT INTO Broucher (Name, Phone_no, Email) VALUES ('$full_name', '$phone_number', '$email')");
    @$conn->query("INSERT INTO broucher (Name, Phone_no, Email) VALUES ('$full_name', '$phone_number', '$email')");

    $is_ajax = (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') || isset($_POST['ajax']);

    if ($res1 === TRUE || $conn->affected_rows > 0) {
        if ($is_ajax) {
            header('Content-Type: application/json');
            echo json_encode(["status" => "success", "message" => "Inquiry saved successfully"]);
            exit;
        } else {
            echo "<script>alert('Thank you! Your inquiry has been submitted successfully.'); window.location.href='index.html';</script>";
        }
    } else {
        if ($is_ajax) {
            header('Content-Type: application/json');
            echo json_encode(["status" => "error", "error" => $conn->error]);
            exit;
        } else {
            echo "Error: " . $sql_inquiries . "<br>" . $conn->error;
        }
    }

    $conn->close();
}
?>
