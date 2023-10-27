function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	console.log(tweet_array);
	var earliestdate = null
	var latestdate = null
	tweet_array.forEach(function(tweet) {
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
		}	else {
			if (time > latestdate) {
				latestdate = time
			}
		}
	});
	console.log(earliestdate, latestdate)
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;	
	const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	document.getElementById('firstDate').innerText = earliestdate.toLocaleDateString(undefined, options)
	document.getElementById('lastDate').innerText = latestdate.toLocaleDateString(undefined, options)
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});