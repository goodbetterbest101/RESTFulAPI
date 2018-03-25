let app = require('express')();
let users = require('./users');
let bodyParser = require('body-parser');
let mongojs = require('./db');
let db = mongojs.connect;

let port = process.env.PORT || 7777;

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
  db.users.count(function(err, result) {
        if (result <= 0) {
            db.users.insert(users.findAll(), function(err, docs) {
                // insert new data.
            });
        } 
        res.send('<h1>Hello Node.js</h1>');
    });

    // res.send('<h1>Hello Node.js</h1>');
});

app.get('/user', function (req, res) {
    // old
    // res.json(users.findAll());   
    db.users.find(function(err, docs) {
        res.json(docs);
    });
});

app.get('/user/:id', function (req, res) {
    // old
    // var id = req.params.id;
    // res.json(users.findById(id));
    var id = parseInt(req.params.id);

    db.users.findOne({id: id}, function(err, docs) {
        res.json(docs);
    });
});

app.post('/newuser', function (req, res) {
    let json = req.body;
    // res.send('Add new ' + json.name + ' Completed!');
    // var json = req.body;

	   db.users.insert(json, function(err, docs) {
		     res.send('Add new ' + docs.name + ' Completed!');
	   });
});

app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});