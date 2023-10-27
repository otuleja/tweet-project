class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
        if(this.text.toLowerCase().includes("completed")){
            return 'completed_event'
        }
        if(this.text.toLowerCase().includes("now")) {
            return 'live_event'
        }
        if (this.text.toLowerCase().includes("achieve")) {
            return 'achievement'
        }
    
        
        return "miscellaneous";
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        if(this.text.toLowerCase().startsWith("just completed a")) {
            return false
        }
        else{
            return true 
        }
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        return this.text.split("http")[0];
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        if(this.text.includes("mi")) {
            var arr = this.text.split(" ")
            var i = arr.indexOf("mi")
            var activityType = arr[i + 1]
            return activityType
        }

        if(this.text.includes("km")) {
            var arr = this.text.split(" ")
            var i = arr.indexOf("km")
            var activityType = arr[i + 1]
            return activityType
        }
        //TODO: parse the activity type from the text of the tweet
        return 'unknown';
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        if(this.text.includes("mi")) {
            var arr = this.text.split(" ")
            var i = arr.indexOf("mi")
            var distance = parseFloat(arr[i - 1]) ||0
            return distance
        }

        if(this.text.includes("km")) {
            var arr = this.text.split(" ")
            var i = arr.indexOf("km")
            var distance = parseFloat(arr[i - 1]) ||0
            distance = distance/1.609
            return distance
        }
        return 0;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}