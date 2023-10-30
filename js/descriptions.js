var writtenTweetsArray = []
function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	runkeeper_tweets = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	//TODO: Filter to just the written tweets
	writtenTweetsArray = runkeeper_tweets.filter(function(tweet){
		return tweet.written
	})
}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	document.getElementById("textFilter").addEventListener('keyup', handleSearch)
	
}
function handleSearch() {
	document.getElementById("tweetTable").innerHTML = ""
	var searchTerm = document.getElementById("textFilter").value 
	console.log(searchTerm)
	if (searchTerm) {
	var filteredTweets = writtenTweetsArray.filter(function(tweet){
		return tweet.writtenText.includes(searchTerm)

	})
console.log(filteredTweets)
var htmlString = ""
filteredTweets.forEach(function(tweet, index){
	var row = tweet.getHTMLTableRow(index + 1)
	htmlString += row
})
document.getElementById("tweetTable").innerHTML = htmlString
document.getElementById("searchText").innerText = searchTerm
document.getElementById("searchCount").innerText = filteredTweets.length
	}

}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});