var mongoose =      require("mongoose"),
    express =       require("express"),
    app     =       express();

// APP CONFIG
mongoose.connect("mongodb://localhost/messages_app");
app.set("view engine", "ejs");
app.use(express.static("public"));

// MONGOOSE/MODEL CONFIG
// SCHEMA
var messageSchema = new mongoose.Schema({
    message: String,
});

// MODEL
var Message = mongoose.model("Message", messageSchema);

// REDIRECT TO INDEX
app.get("/", function(req, res){
    res.redirect("/messages");
});

// INDEX - SHOW ALL ID/MESSAGES
app.get("/messages", function(req, res) {
    Message.find({}, function(err, foundMessages){
        if(err){
            console.log(err);
        } else {
            res.render("index", {messages: foundMessages});
        }
    });
});

// CREATE NEW MESSAGE
app.get("/messages/:message", function(req, res){
    var msg = req.params.message;
    Message.create({message: msg}, function(err, newlyMessage){
        if(err){
        console.log(err);
        } else {
            res.render("new", {newMessage: newlyMessage});
        }
    });
});

// SEARCH MESSAGE BY ID
app.get("/messages/search/:id", function(req, res) {
    Message.findById(req.params.id, function(err, foundMessage){
        if(err){
            console.log(err);
        } else {
            res.render("search", {foundMessage: foundMessage});
        }
    });
});

app.get("/*", function(req, res) {
    res.redirect("/");
    console.log("Not implemented yet.");
})

app.listen(process.env.PORT, process.env.IP, function(err){
    if(err){
        console.log(err);
    } else {
        console.log("Server listening...");
    }
});
