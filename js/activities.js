function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	var activityCounterObject = {}


	tweet_array.forEach(function(tweet) {
		console.log(tweet.activityType)
		console.log(tweet.distance)
		if(!activityCounterObject[tweet.activityType]) {
			activityCounterObject[tweet.activityType] = 1
		} 
		else {
			activityCounterObject[tweet.activityType] += 1
		}

	} )
	console.log(activityCounterObject)
	document.getElementById("numberActivities").innerText = Object.keys(activityCounterObject).length
	var sortedActivities = Object.keys(activityCounterObject).sort(function(a,b) {
		return activityCounterObject[b] - activityCounterObject[a]
	})
	console.log(sortedActivities)
	document.getElementById("firstMost").innerText = sortedActivities[0]
	document.getElementById("secondMost").innerText = sortedActivities[1]
	document.getElementById("thirdMost").innerText = sortedActivities[2]
	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.

	// activity_vis_spec = {
	//   "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	//   "description": "A graph of the number of Tweets containing each type of activity.",
	//   "data": {
	//     "values": tweet_array
	//   }
	//   //TODO: Add mark and encoding
	// };
	// vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});