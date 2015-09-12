Parse.initialize("qJq2KO9TNwGiXmj9ghgAaIN1UDoowkWuaCv67BUU", "v7elTe5OBL0OZ3XgBx2f91hAtAujXK6sXLuc8apK");

$(".section1").fadeIn(300);

$("#submitAudio").click(function (e) {
			
	var fileUploadTranscript = $("#audioTranscript")[0];
	var fileUploadRecite = $("#audioRecite")[0];
	
	if (fileUploadTranscript.files.length > 0 && fileUploadRecite.files.length > 0) {
	  var fileT = fileUploadTranscript.files[0];
	  var fileR = fileUploadRecite.files[0];

	  var nameTranscript = "audioTranscript.wav";
	  var nameRecite = "audioRecite.wav";

	  var parseFileTranscript = new Parse.File(nameTranscript, fileT);
	  parseFileTranscript.save({
	  	success: function(s) {
	  		console.log(s);
	  	}, error: function(e) {
	  		console.log(e);
	  	}});

	  var parseFileRecite = new Parse.File(nameRecite, fileR);
	  parseFileRecite.save({
	  	success: function(s) {
	  		console.log(s);
	  	}, error: function(e) {
	  		console.log(e);
	  	}});

	  var recordingTranscriptType = new Parse.Object("Recording");
	  recordingTranscriptType.set("file", parseFile);
	  recordingTranscriptType.save();

	  var recordingReciteType = new Parse.Object("Recording");
	  recordingReciteType.set("file", parseFile);
	  recordingReciteType.save();
	}
});