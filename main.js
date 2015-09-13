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

	  var recordingTranscriptType = new Parse.Object("RecordingTranscript");
	  recordingTranscriptType.set("file", parseFileTranscript);
	  recordingTranscriptType.set("size", fileT.size);
	  recordingTranscriptType.save();

	  var recordingReciteType = new Parse.Object("RecordingRecite");
	  recordingReciteType.set("file", parseFileRecite);
	  recordingReciteType.set("size", fileR.size);
	  recordingReciteType.save();

	  $(".section1").fadeOut(300);
	  $(".section2").delay(300).fadeIn(300);

	  runWolfram();
	}
});

$("#reset").click(function (e) {
//	$(".section3").fadeOut(300);
//	$(".section1").delay(300).fadeIn(300);
	location.reload(true);
});	

function runWolfram() {
	var f1comp = false;
	var f2comp = false;
	var tVal, rVal;
	Parse.Cloud.run("wolframTranscript", {}, {
		success: function(s) {
			f1comp = true;
			tVal = s;
			if(f1comp&&f2comp) analyze(tVal, rVal);
		}, error: function(e) {console.log(error);}
	});
	Parse.Cloud.run("wolframRecite", {}, {
		success: function(s) {
			f2comp = true;
			rVal = s;
			if(f1comp&&f2comp) analyze(tVal, rVal);
		}, error: function(e) {console.log(error);}
	});
}

function analyze(a,b) {
	var error = ((b-a)/a)*100;
	if(Math.abs(error)<15) {
		//all good
	} else {
		if(error > 0) {
			//higher
			$(".x-percent").text(Math.abs(error));
			$(".lower, .doing-great").hide();
		} else {
			//lower
			$(".x-percent").text(Math.abs(error));
			$(".higher, .doing-great").hide();
		}
	}
	$(".section2").fadeOut(300);
	$(".section3").delay(300).fadeIn(300);
}
