<?php

// Import the application classes
require_once('include/classes.php');

// Create an instance of the Application class
$app = new Application();
$app->setup();

// Declare a set of variables to hold the one time password for the user
$password = "";

// Declare an empty array of error messages
$errors = array();


// If someone is attempting to login, process their request
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

	// Pull the password from the <form> POST
	$password = $otp;

	// Attempt to login the user and capture the result flag
	$result = $app->login($password, $errors);

	// Check to see if the login attempt succeeded
	if ($result == TRUE) {

		// Redirect the user to the topics page on success
		header("Location: list.php");
		exit();

	}

}
?>

<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>skyedwards.me</title>
	<meta name="description" content="Sky's personal website for IT 5233">
	<meta name="author" content="Sky Edwards">
	<link rel="stylesheet" href="css/style.css">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<!--1. Display Errors if any exists 
	2. Display Login form (sticky):  Username and Password -->

<body>
	<?php include 'include/header.php'; ?>

	<h2>One Time Password</h2>

	<?php include('include/messages.php'); ?>
	
	<div>
		<form method="post" action="otp.php">
			

			<input type="password" name="password" id="password" placeholder="Password" value="<?php echo $password; ?>" />
			<br/>

			<input type="submit" value="Login" name="login" />
		</form>
	</div>
	<a href="register.php">Need to create an account?</a>
	<br/>
	<a href="reset.php">Resend your password?</a>
	<?php include 'include/footer.php'; ?>
	<script src="js/site.js"></script>
</body>
</html>
