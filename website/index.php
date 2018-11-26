<?php
	
// Import the application classes
require_once('include/classes.php');

// Create an instance of the Application class
$app = new Application();
$app->setup();

// Declare an empty array of error messages
$errors = array();

?>

<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>sky4242.me</title>
	<meta name="description" content="Sky's personal website for IT 5236">
	<meta name="author" content="Sky Edwards">
	<link rel="stylesheet" href="css/style.css">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<div id="wrapper">
<header>	
<?php include 'include/header.php'; ?>
</header>
	<h2>My Feed</h2>
	

	<main>
<div id="heroheader"></div>
	<p>
		Loosely based on the popular hyper-local anonymous chat app,Yik Yak(a company I briefly worked with), I want to design a similar web app the web app will allow users to upload comments(jokes, tips, brags etc) which other users can agree with(upvotes) or disagree with(downvotes)
	</p>
	<p>
		Concept: Post things you like, find interesting/funny/cool etc. ask for help on homework, "Has anyone seen my keys", etc. Share newest idea with the world and let them decide if it is IT. 

	</p>
	<p>
		Users currently registered for the application may <a href="register.php">create an account</a> or proceed directly to the 
		<a href="login.php">login page</a>.
	</p>
	</main>

	<?php include 'include/footer.php'; ?>
	<script src="js/site.js"></script>
</div>
</body>
</html>
