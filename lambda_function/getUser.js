var mysql = require('./node_modules/mysql');
var config = require('./config.json');
var validator = require('./validation.js');

function formatErrorResponse(code, errs) {
	return JSON.stringify({ 
		error  : code,
		errors : errs
	});
}

exports.handler = (event, context, callback) => {
	//instruct the function to return as soon as the callback is invoked
	context.callbackWaitsForEmptyEventLoop = false;

	//validate input
	var errors = new Array();
	
	 // Validate the user input
	
	if(errors.length > 0) {
		// This should be a "Bad Request" error
		callback(formatErrorResponse('BAD_REQUEST', errors));
	} else {
	
	//getConnection equivalent
	var conn = mysql.createConnection({
		host 	: config.dbhost,
		user 	: config.dbuser,
		password : config.dbpassword,
		database : config.dbname
	});
	
	//prevent timeout from waiting event loop
	context.callbackWaitsForEmptyEventLoop = false;

	//attempts to connect to the database
	conn.connect(function(err) {
	  	
		if (err)  {
			// This should be a "Internal Server Error" error
			callback(formatErrorResponse('INTERNAL_SERVER_ERROR', [err]));
		} else {
			console.log("Connected!");
			var sql = "SELECT userid, username, email, isadmin FROM users WHERE userid = ? ";
						//START TO DIFFER
						//GET						
						conn.query(sql, [event.userid, event.username, event.email, event.isadmin], function (err, result) {
										if (err) {
											// This should be a "Internal Server Error" error
											callback(formatErrorResponse('INTERNAL_SERVER_ERROR', [err]));
										} else {
											// Pull out just the codes from the "result" array (index '1')
											// Build an object for the JSON response with the userid and reg codes
											var json = { 
												userid: event.userid,
												username: result[0].username,
												email: result[0].email,
												isadmin: result[0].isadmin
											};
											// Return the json object
											callback(null, json);
											setTimeout(function(){conn.end();},3000);
										}
			      				}); //query userregistrations
				      		} //error users
			    		}); //query users
		} //connect database
	}; // no connection errors

