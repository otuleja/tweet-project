var graphTwoDataArray = []
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

	var arrayDataGraph = []

	tweet_array.forEach(function(tweet) {
		arrayDataGraph.push({a: tweet.activityType, b: 1})
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
	var mostFrequent = sortedActivities[0]
	var secondFrequent = sortedActivities[1]
	var thirdFrequent = sortedActivities[2]
	var o = {}
	var weekdayArray = []
	var weekendArray = []
	

	tweet_array.forEach(function(tweet) {
		if (tweet.time.getDay() === 0 || tweet.time.getDay() === 6) {
			weekendArray.push(tweet.distance)
		}
		else {
			weekdayArray.push(tweet.distance)
		}

		if (tweet.activityType === mostFrequent || tweet.activityType === secondFrequent || tweet.activityType === thirdFrequent) {
			var daysOfWeekArray = [
				"Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"
			]
			graphTwoDataArray.push({dayOfWeek: daysOfWeekArray[tweet.time.getDay()], activityType: tweet.activityType, distance: tweet.distance})

			if (!o[tweet.activityType]) {
				o[tweet.activityType] = []
			}

			o[tweet.activityType].push(tweet.distance)
		}
	})
	var weekendSum = 0
	var weekdaySum = 0
	weekendArray.forEach(function (distance){
		weekendSum += distance
	})
	var weekendAverage = weekendSum/weekendArray.length

	weekdayArray.forEach(function (distance){
		weekdaySum += distance 
	})
	var weekdayAverage = weekdaySum/weekdayArray.length
	var timePeriod = ""
	if (weekendAverage > weekdayAverage) {
		timePeriod = 'the weekend'
	

		
	}
	else {
		timePeriod = 'weekdays'
	}
	document.getElementById("weekdayOrWeekendLonger").innerText = timePeriod

var a = []
for (var activity in o) {
	var sum = 0
	o[activity].forEach(function(distance){
		sum += distance 

	}) 
var average = sum/o[activity].length
a.push({type: activity , average: average })
	}
a = a.sort(function (x, y){
	return y.average - x.average


})
document.getElementById("longestActivityType").innerText = a[0].type
document.getElementById("shortestActivityType").innerText = a[2].type



	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.

	var activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": arrayDataGraph
	  },
	  "mark": "bar",
	  "encoding": {
		"x": {"field": "a", "type": "nominal"},
		"y": {"field": "b", "type": "quantitative"}
	  }

	  //TODO: Add mark and encoding
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});
	
console.log(graphTwoDataArray)



	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
}
var graphStatus = 'distance'
var graphTwoConfig = {
	"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	"description": "A graph of activity distances by day of week.",
	"data": {
	  "values": graphTwoDataArray
	},
	"mark": "point",
	"encoding": {
		"x": {
		 // "timeUnit": "day",
		  "field": "dayOfWeek",
		  "type": "ordinal"
		},
		"y": {
		  //"aggregate": "values",
		  "type": "quantitative",
		  "field" : "distance"
		},
		"color": {
		  "field": "activityType",
		  "type": "nominal"
		}
	  }

}
function createGraph(config) {
	vegaEmbed('#distanceVis', config, {actions:false});

}
function handleClick() {
	console.log('click')
	if (graphStatus === 'distance') {
		console.log('distance')
		graphTwoConfig.encoding.y.aggregate = 'mean'
		createGraph(graphTwoConfig)
		graphStatus = 'average'
		document.getElementById('aggregate').innerText = "Show all activities"

	}
	else if (graphStatus === 'average') {
		console.log('average')
		graphTwoConfig.encoding.y.aggregate = null
		createGraph(graphTwoConfig)
		graphStatus = 'distance'
		document.getElementById('aggregate').innerText = "Show means"

	}
	
	

}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
	createGraph(graphTwoConfig)
	document.getElementById('aggregate').addEventListener('click', handleClick)
});