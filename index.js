

app.post("/api/uploadPosting", function (req, res) {
    var content = req.body.postingContent;
    var category = req.body.postingCategory;

    //Add post to category - save in DB - interface with Jill
    res.status(200);
    //QUESTION: Do we want to reload the all the content on the page eachtime new content is added, or append to it?
    res.send()
})