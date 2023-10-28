class Tweet {
    private text: string;
    time: Date;

    constructor(tweet_text: string, tweet_time: string) {
        this.text = tweet_text;
        this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
    }

    //returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source(): string {
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
        if (this.text.toLowerCase().includes("completed") || this.text.toLowerCase().includes("posted")) {
            return 'completed_event'
        }
        if (this.text.toLowerCase().includes("now")) {
            return 'live_event'
        }
        if (this.text.toLowerCase().includes("achieve")) {
            return 'achievement'
        }
        return "miscellaneous";
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written(): boolean {
        let tweetText: any = this.text
        tweetText = tweetText.split("http")[0]
        tweetText = tweetText.split(" ")
        if (tweetText.length === 12
            && tweetText[0] === "Just"
            && tweetText[2] === "a"
            && tweetText[7].toLowerCase().includes("runkeeper")
        ) {
            return false
        }
        return true
    }

    get writtenText(): string {
        if (!this.written) {
            return "";
        }
        var writtenText = this.text.split("http")[0]
        if (writtenText.includes("run")) {
            return writtenText.split("run")[1]
        }
        if (writtenText.includes("walk")) {
            return writtenText.split("walk")[1]
        }
        if (writtenText.includes("bike")) {
            return writtenText.split("bike")[1]
        }
        return writtenText;
    }

    get activityType(): string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        if (this.text.includes("mi")) {
            var arr = this.text.split(" ")
            var i = arr.indexOf("mi")
            var activityType = arr[i + 1]
            return activityType
        }

        if (this.text.includes("km")) {
            var arr = this.text.split(" ")
            var i = arr.indexOf("km")
            var activityType = arr[i + 1]
            return activityType
        }
        //TODO: parse the activity type from the text of the tweet
        return 'unknown';
    }

    get distance(): number {
        if (this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        if (this.text.includes("mi")) {
            var arr = this.text.split(" ")
            var i = arr.indexOf("mi")
            var distance = parseFloat(arr[i - 1]) || 0
            return distance
        }

        if (this.text.includes("km")) {
            var arr = this.text.split(" ")
            var i = arr.indexOf("km")
            var distance = parseFloat(arr[i - 1]) || 0
            distance = distance / 1.609
            return distance
        }
        return 0;
    }

    getHTMLTableRow(rowNumber: number): string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}