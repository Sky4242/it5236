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
		var sql = "INSERT INTO attachments(attachmentid, filename)" + 
		"VALUES (?, ?)";
	
		conn.query(sql, [event.attachmentid, event.filename], function (err, result) {
		  if(!event.attachmentid){
				// This should be a "Internal Server Error" error
				callback(formatErrorResponse('BAD_REQUEST','incorrect username/password'));
		  	} else {

		  		console.log("Attachment saved");
		  		callback(null, "Attachment Saved");
		  	}
		  	}); //query registration codes
		}); //connect database
	} //no validation errors
}; //handler


