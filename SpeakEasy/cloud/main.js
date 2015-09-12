
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});



//If you provide id of a recording object, calls wolfram with that file, otherwise calls wolfram with
//the most recently created file from the user
Parse.Cloud.define("wolframTranscript", function(request, response) {
	var query = new Parse.Query("RecordingTranscript");
	query.descending("createdAt");

	//query.equalTo("user", request.user);
	query.first({
		success: function (r) {
			Parse.Cloud.httpRequest({
			  url: 'https://www.wolframcloud.com/objects/a7574b30-da78-40ea-bd4b-e4324ee308eb?snd='+r.get("file").url()
			}).then(function(httpResponse) {
			  // success
			  var text = httpResponse.text;
			  var patt = /\d+/g;
			  var matches = text.match(patt);
			  var black = parseInt(matches[1]);
			  black = black/r.get("size");
			  var white = parseInt(matches[3]);
			  white = white/r.get("size");
			  var pBlack = black / (black + white);
			  var p100 = 100*pBlack;

			  response.success(p100);
			},function(httpResponse) {
			  // error
			  response.error(httpResponse);
			});
		}, error: function (e) {response.error(e);}
	});
});

Parse.Cloud.define("wolframRecite", function(request, response) {
	var query = new Parse.Query("RecordingRecite");
	query.descending("createdAt");

	//query.equalTo("user", request.user);
	query.first({
		success: function (r) {
			Parse.Cloud.httpRequest({
			  url: 'https://www.wolframcloud.com/objects/a7574b30-da78-40ea-bd4b-e4324ee308eb?snd='+r.get("file").url()
			}).then(function(httpResponse) {
			  // success
			  var text = httpResponse.text;
			  var patt = /\d+/g;
			  var matches = text.match(patt);
			  var black = parseInt(matches[1]);
			  black = black/r.get("size");
			  var white = parseInt(matches[3]);
			  white = white/r.get("size");
			  var pBlack = black / (black + white);
			  var p100 = 100*pBlack;

			  response.success(p100);
			},function(httpResponse) {
			  // error
			  response.error(httpResponse);
			});
		}, error: function (e) {response.error(e);}
	});
});


Parse.Cloud.define("AvgWolfram", function(request, response) {
	var query = new Parse.Query("Recording");
	query.descending("createdAt");

	//query.equalTo("user", request.user);
	query.first({
		success: function (r) {
			Parse.Cloud.httpRequest({
			  url: 'https://www.wolframcloud.com/objects/a7574b30-da78-40ea-bd4b-e4324ee308eb?snd='+r.get("file").url()
			}).then(function(httpResponse) {
			  // success
			  var text = httpResponse.text;
			  var patt = /\d+/g;
			  var matches = text.match(patt);
			  var black = parseInt(matches[1]);
			  var white = parseInt(matches[3]);
			  var pBlack = black / (black + white);
			  var p100 = 100*pBlack;


			  var avgCount = request.user.get("avgCount");
			  var avgIntensity = request.user.get("avgIntensity");
			  var newIntensity = (avgIntensity*avgCount + p100)/(avgCount + 1);
			  request.user.set("avgCount", avgCount+1);
			  request.user.set("avgIntensity", newIntensity);

			  response.success(p100);
			},function(httpResponse) {
			  // error
			  response.error(httpResponse);
			});
		}, error: function (e) {response.error(e);}
	});
});


Parse.Cloud.define("clearRecordings", function(request, response) {
	var query = new Parse.Query("Recording");

	query.equalTo("user", request.user);

	query.find({
		success: function(r) {
			for(var i = 0; i < r.size(); i++)
				r[i].destroy();
			request.user.set("cIntensity", 0);
			request.user.set("cMonotoness", 0);
			request.user.set("cCount", 0);
		},
		error: function(e) {

		}
	});
});



Parse.Cloud.define("clearUser", function(request, response) {
	var query = new Parse.Query("Recording");

	query.equalTo("user", request.user);

	query.find({
		success: function(r) {
			for(var i = 0; i < r.size(); i++)
				r[i].destroy();
			request.user.set("cIntensity", 0);
			request.user.set("cMonotoness", 0);
			request.user.set("cCount", 0);
			request.user.set("avgIntensity", 0);
			request.user.set("avgMonotoness", 0);
			request.user.set("avgCount", 0);

		},
		error: function(e) {

		}
	});
});


