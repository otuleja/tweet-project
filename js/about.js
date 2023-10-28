function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if (runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function (tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	console.log(tweet_array);
	var earliestdate = null
	var latestdate = null
	var completedEventCounter = 0
	var liveEventCounter = 0
	var achievementEventCounter = 0
	var miscellaneousEventCounter = 0

	var countHasUserWritten = 0
	tweet_array.forEach(function (tweet) {
		if (tweet.written === true) {
			countHasUserWritten += 1
		}
		if (tweet.source === "completed_event") {
			// console.log("completed")
			// console.log(tweet.text)
			// console.log("\n\n")
		}
		var time = tweet.time;
		if (!earliestdate) {
			earliestdate = time
		} else {
			if (time < earliestdate) {
				earliestdate = time
			}
		}

		if (!latestdate) {
			latestdate = time
		} else {
			if (time > latestdate) {
				latestdate = time
			}
		}
		if (tweet.source === "completed_event") {
			completedEventCounter += 1
		}
		if (tweet.source === "live_event") {
			liveEventCounter += 1
		}

		if (tweet.source === "achievement") {
			achievementEventCounter += 1
		}
		if (tweet.source === "miscellaneous") {
			miscellaneousEventCounter += 1
		}
	});
	console.log(countHasUserWritten)
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;
	const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	document.getElementById('firstDate').innerText = earliestdate.toLocaleDateString(undefined, options)
	document.getElementById('lastDate').innerText = latestdate.toLocaleDateString(undefined, options)
	document.querySelectorAll('.completedEvents').forEach(function (element) {
		element.innerText = completedEventCounter;
	})
	document.querySelector('.liveEvents').innerText = liveEventCounter;
	document.querySelector('.achievements').innerText = achievementEventCounter;
	document.querySelector('.miscellaneous').innerText = miscellaneousEventCounter;
	document.querySelector('.completedEventsPct').innerText = (completedEventCounter / tweet_array.length).toLocaleString('en-GB', { style: 'percent', minimumFractionDigits: 2 });
	document.querySelector('.liveEventsPct').innerText = (liveEventCounter / tweet_array.length).toLocaleString('en-GB', { style: 'percent', minimumFractionDigits: 2 });
	document.querySelector('.achievementsPct').innerText = (achievementEventCounter / tweet_array.length).toLocaleString('en-GB', { style: 'percent', minimumFractionDigits: 2 });
	document.querySelector('.miscellaneousPct').innerText = (miscellaneousEventCounter / tweet_array.length).toLocaleString('en-GB', { style: 'percent', minimumFractionDigits: 2 });
	document.querySelector('.written').innerText = countHasUserWritten
	document.querySelector(".writtenPct").innerText = (countHasUserWritten / completedEventCounter).toLocaleString('en-GB', { style: 'percent', minimumFractionDigits: 2 });
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});