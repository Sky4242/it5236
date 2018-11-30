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

	//validate input
	var errors = new Array();
	

	
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
		}
		
		console.log("Connected!");
		var sql = "SELECT isadmin FROM users WHERE userid = (?)";
		
		conn.query(sql, [event.userid], function (err, result) {
		  if(!event.userid){
					callback(formatErrorResponse("BAD_REQUEST", "User Does Not Exist"));
				}else{
					if(result[0] == 0){
					callback(formatErrorResponse("BAD_REQUEST", "Access Denied"));
		  	 }else{
		  		console.log("Is Admin");
		  		callback(null, "Is Admin");
		  		setTimeout(function(){ conn.end(); }, 3000);
				}}
		  	}); //query registration codes
		}); //connect database
	} //no validation errors
}; //handler
