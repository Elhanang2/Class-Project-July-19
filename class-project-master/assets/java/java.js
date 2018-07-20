var gameArray = [];
var gameArrayObjects = [];
var gameArrayFinal = [];
var gameIdArray = [];
var foundGame = null;
var leagueIdArray = ["20406", "20470", "20335", "20322", "20358", "20333", "20370", "20336", "20334", "20372"];
var leagueImageArray = ["https://vignette.wikia.nocookie.net/thejackie/images/6/66/Premier-League-Logo.png/revision/latest?cb=20131024155152", "http://files.laliga.es/seccion_logos/laliga-v-1200x1200_2018.png", "https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Bundesliga_logo_%282017%29.svg/1200px-Bundesliga_logo_%282017%29.svg.png", "https://i.pinimg.com/originals/5a/4e/8d/5a4e8d4d23fea497145b79b51559afd5.jpg", "https://c1.staticflickr.com/1/681/21939206411_1f5b0efed4_b.jpg", "http://1.bp.blogspot.com/-78yKAM5K36I/VAJVBab5MzI/AAAAAAAAD-A/cuujhkfkOwU/s1600/Logo%2BEredivisie%2BNetherlands.png", "https://upload.wikimedia.org/wikipedia/en/0/0d/Chinese_Super_League_Logo_2.png", "https://i.pinimg.com/originals/fa/45/23/fa45234efa3eb16f889858562abd517f.jpg", "https://upload.wikimedia.org/wikipedia/en/thumb/4/42/Campeonato_Brasileiro_S%C3%A9rie_A_logo.png/200px-Campeonato_Brasileiro_S%C3%A9rie_A_logo.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Superliga_2010.svg/1200px-Superliga_2010.svg.png"]
var leagueObjectArray = [];
var myLeagueID = "20406";
var mashapeLeagueURL = "https://bettingodds-bettingoddsapi-v1.p.mashape.com/events/league/" + myLeagueID;
var mashapeLeagueListURL = "https://bettingodds-bettingoddsapi-v1.p.mashape.com/leagues";
var homeTeam;
var awayTeam;
var gameResponse;
var myEventID;
var currentGameNum = 0;

function next2() {
	myfunction2();
	onYouTubeIframeAPIReady2();
}

function getTeamNames() {
	homeTeam = gameResponse[myEventID].home.name;
	awayTeam = gameResponse[myEventID].away.name;
	$("#team1").text(homeTeam);
	$("#team2").text(awayTeam);
}

function nextGame() {
	myEventID = gameIdArray[currentGameNum];
	nameCall();
	videoDisplay();
}

function generateGameId() {
	for (n = 0; n < 3; n++) {
		var currentGameObject = gameArrayFinal[n];
		var currentGameId = currentGameObject.id;
		gameIdArray.push(currentGameId);
	}
	nextGame();
}

function videoDisplay() {
	myfunction();
	onYouTubeIframeAPIReady(homeTeam, awayTeam);
	$("#player").show();
}

function nameCall() {
	var mashapeEventURL = "https://bettingodds-bettingoddsapi-v1.p.mashape.com/event/" + myEventID;
	$.ajax({
		url: mashapeEventURL,
		method: "GET",
		headers: {
			"X-Mashape-Key": "WQSDOtC0d2msh4drUXOK9uJAyRf8p1CBBJRjsnvXZGXdLnmhAi"
		}
	}).then(function(response) {
		gameResponse = response;
		getTeamNames();
		console.log(gameResponse);
	})
}
$.ajax({
	url: mashapeLeagueURL,
	method: "GET",
	headers: {
		"X-Mashape-Key": "WQSDOtC0d2msh4drUXOK9uJAyRf8p1CBBJRjsnvXZGXdLnmhAi"
	}
}).then(function(response) {
	console.log(Object.values(response));
	var responseArray = Object.values(response);
	for (var n = 0; n < responseArray.length; n++) {
		var gameText = responseArray[n].away.name + responseArray[n].home.name + responseArray[n].datetime.value;
		for (var m = -1; m < gameArray.length; m++) {
			if (gameText === gameArray[m]) {
				console.log("duplicate found");
				foundGame = true;
			}
		}
		if (foundGame !== true) {
			gameArray.push(gameText);
			gameArrayObjects.push(responseArray[n]);
		}
		foundGame = null;
	}
	console.log(gameArrayObjects);
	for (var n = 0; n < 3; n++) {
		var randomNum = Math.floor(Math.random() * gameArrayObjects.length);
		console.log(randomNum);
		gameArrayFinal.push(gameArrayObjects[randomNum]);
	}
	console.log(gameArrayFinal);
	generateGameId();
	console.log("GameIdArray");
	nameCall();
	videoDisplay();
	console.log(gameIdArray);
});
// Generates the list of leagues using hardcoded IDs
function getLeagues() {
	$.ajax({
		url: mashapeLeagueListURL,
		method: "GET",
		headers: {
			"X-Mashape-Key": "WQSDOtC0d2msh4drUXOK9uJAyRf8p1CBBJRjsnvXZGXdLnmhAi"
		}
	}).then(function(response) {
		for (var n = 0; n < leagueIdArray.length; n++) {
			var league = new Object();
			league.name = response[leagueIdArray[n]].name;
			league.id = leagueIdArray[n];
			league.imageURL = leagueImageArray[n];
			leagueObjectArray.push(league);
		}
		console.log("league array below");
		console.log(leagueObjectArray);
		for (var n = 0; n < leagueObjectArray.length; n++) {
			var $leagueImage = $("<img>");
			$leagueImage.attr("src", leagueObjectArray[n].imageURL);
			$leagueImage.attr("style", "height: 100px");
			var $leagueName = $("<span>");
			$leagueName.text(leagueObjectArray[n].name);
			var $leagueDiv = $("<div>");
			$leagueDiv.addClass("league-button");
			$leagueDiv.attr("style", "text-align: center;display: inline-block;padding: 5px;margin: 10px");
			$leagueDiv.css({
				"width": "20%",
				"height": "15%"
			});
			$leagueDiv.append($leagueImage);
			$leagueDiv.append("<br>");
			$leagueDiv.append($leagueName);
			$("#leagues-here").append($leagueDiv);
		}
	});
}; // close ajax call
$(document).ready(function() {
	var matchbutton;
	// $("#BB4").hide();
	// $("#BB5").hide();
	$("#player").hide();
	$(".slidecontainer").hide();
	$(".slider-container").hide();
	// $(".video-form").hide();
	$(".button").hide();
	$(".btn-group").hide();
	$(".final-page").hide();
	// setTimeout(function() {$(".container1").show(1000),$("#title").css({"height":"100px","width":"100%"})},2000)
	$("#submit").on("click", function() {
		event.preventDefault();
		var ageInput = $("#age-input").val().trim();
		console.log(ageInput);
		if (ageInput >= 21) {
			$(".age-check").hide();
			var ptag = $("<p2>");
			ptag.text("These are the next three matches from the MLS this week. All of them are available for our clients to place bets. Compulsive gambling affects 1% of the US population. Our resposibility is to make sure gambling remains fun. For that reason, we ask you to answer three questions: Please try and guess the spread for each game. Those odds were compiled by recognized experts. If you can approximate their knowledge, we feel comfortable letting you bet. Everything in moderation!");
			$("#league-rules").append(ptag);
			getLeagues();
		} else if (ageInput > 0 && ageInput < 21) {
			$(".age-check").hide();
			$(".alert").text("you are too young to play");
		} else {
			$(".alert").text("you have to input an age");

			function hideAgeNotice() {
				$(".alert").text("");
			}
			setTimeout(hideAgeNotice, 1000 * 2);
		}
		$('#league-display').on('click', '.league-button', function() {
			$("#league-display").hide();
			$("#confirm").removeClass("display");
			getTeamNames();
			videoDisplay();
			// show next page
			// var youtubeVideo = $("<iframe>");
			// youtubeVideo.attr("src","https://www.youtube.com/embed/J15vfXqnwWw").css({"width":"500px","height":"300px","autoplay": "encrypted-media"});
			// $(".youtube-video").append(youtubeVideo);
		});
		$(".button").on("click", function() {
			$(".slidecontainer").hide();
			$(".slider-container").hide();
			$(".btn-group").hide();
			$(".button").hide();
			$("#player").hide();
			$(".final-page").show();
		});
	});

	function videoDisplay() {
		myfunction();
		onYouTubeIframeAPIReady(homeTeam, awayTeam);
		$("#player").show();
	}
	////////////
	function myfunction() {
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		// 3. This function creates an <iframe> (and YouTube player)
		//    after the API code downloads.
		return;
	}

	function onYouTubeIframeAPIReady(homeTeam, awayTeam) {
		console.log(homeTeam + awayTeam);
		$.get("https://www.googleapis.com/youtube/v3/search", {
				part: 'snippet',
				maxResults: 2,
				publishedAfter: "2017-01-01T00:00:00Z",
				q: homeTeam + "+" + awayTeam + "+highlights",
				d: 'UCR5wZcXtOUka8jTA57flzMg', // You can get one from Advanced settings on YouTube
				type: 'video',
				key: 'AIzaSyCxS4ovWHfBKNva2sRRLOk8LadqRSUKM14'
			}, //get end
			function(data, videoId) {
				console.log(data);
				var player = $("#player");
				player = new YT.Player('player', {
					height: '300',
					width: '440',
					videoId: data.items[0].id.videoId,
					events: {
						'onReady': onPlayerReady,
						'onStateChange': onPlayerStateChange
					} //event object end
				}); //player end
				console.log("data" + data.items[0].id.videoId);
			} //function (data) end
		); //get end    
		return (homeTeam, awayTeam);
	} //function onyoutubeIframeAPIReady end
	function myfunction2() {
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		// 3. This function creates an <iframe> (and YouTube player)
		//    after the API code downloads.
		return;
	}

	function onYouTubeIframeAPIReady2(homeTeam, awayTeam) {
		console.log(homeTeam + awayTeam);
		$.get("https://www.googleapis.com/youtube/v3/search", {
				part: 'snippet',
				maxResults: 2,
				publishedAfter: "2017-01-01T00:00:00Z",
				q: homeTeam + "+" + awayTeam + "+highlights",
				d: 'UCR5wZcXtOUka8jTA57flzMg', // You can get one from Advanced settings on YouTube
				type: 'video',
				key: 'AIzaSyCxS4ovWHfBKNva2sRRLOk8LadqRSUKM14'
			}, //get end
			function(data, videoId) {
				console.log(data);
				var player = $("#player");
				player = new YT.Player('player', {
					height: '300',
					width: '440',
					videoId: data.items[0].id.videoId,
					events: {
						'onReady': onPlayerReady,
						'onStateChange': onPlayerStateChange
					} //event object end
				}); //player end
				console.log("data" + data.items[0].id.videoId);
			} //function (data) end
		); //get end    
		return (homeTeam, awayTeam);
	} //function onyoutubeIframeAPIReady end
	//  The API will call this function when the video player is ready.
	function onPlayerReady(event) {
		event.target.stopVideo();
	}
	//  The API calls this function when the player's state changes.
	//    The function indicates that when playing a video (state=1),
	//    the player should play for six seconds and then stop.
	var done = false;

	function onPlayerStateChange(event) {
		if (event.data == YT.PlayerState.PLAYING && !done) {
			//setTimeout(stopVideo, 6000);
			done = true;
		}
	}

	function stopVideo() {
		player.stopVideo();
	}
	//league button selected 
	$('body').on('click', '.league-button', function() {
		$("#league-display").hide();
		// show next page
		//var youtubeVideo = $("<div>");
		//youtubeVideo.attr("src","https://www.youtube.com/embed/J15vfXqnwWw");
	});
	var oddsUrlDate = moment().format("YYYY-MM-DD");
	var oddUrl = "https://bettingodds-bettingoddsapi-v1.p.mashape.com/events/" + oddsUrlDate;
	console.log(oddsUrlDate);
	$("#next").on("click", function() {
		// do stuff
		currentGameNum++;
		$("#youtube-display").html("<div class='youtube-video'><div id='player'></div></div>");
		nextGame();
		getTeamNames();
		var value = $("#slider").val().trim();
		console.log(value);
	});
}); // closes Doc.ready
// JS for BB4
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;
slider.oninput = function() {
	output.innerHTML = this.value;
}