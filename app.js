let express = require("express"),
    path = require("path"),
    bodyParser = require("body-parser"),
    cons = require("consolidate"),
    dust = require("dustjs-helpers"),
    pg = require("pg"),
    app = express();


// DB Connect String
let connect = "posgres://admin:office123@localhost/contentdb";

// Подключаем движок DUST к файлам ".dust"

app.engine("dust", cons.dust);

// Устанавливаем путь к файлам ".dust"

app.set("view engine", "dust");
app.set("views", __dirname + "/views");

// Устанавливаем путь к папке public

app.use(express.static(path.join(__dirname, "public")));

// Body Parser Middleware 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", function(req, res) {
    //CONNECT
    pg.connect(connect, function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        client.query("SELECT * FROM content_table", function(err, result) {
            if (err) {
                return console.error("error running query", err);
            }
            res.render("index", {content_table: result.rows});
            done();
        });
    });
});

//ADD DESCRIPTION
app.post("/add", function(req, res) {
    //CONNECT
    pg.connect(connect, function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        client.query("INSERT INTO content_table(article, name, description) VALUES($1, $2, $3)", [req.body.article, req.body.name, req.body.description]);

        done();
        res.redirect("/");
    });
});

//DELETE DESCRIPTION
app.delete("/delete/:id", function(req, res) {
    //CONNECT
    pg.connect(connect, function(err, client, done) {
      if(err) {
          return console.error('error fetching client from pool', err);
      }
      client.query("DELETE FROM content_table WHERE id = $1", [req.params.id]);

      done();
      res.sendStatus(200);
  });
});


//UPDATE DESCRIPTION
app.post("/edit", function(req, res) {
    //CONNECT
    pg.connect(connect, function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        client.query("UPDATE content_table SET article = $1, name = $2, description = $3 WHERE id = $4", [req.body.article, req.body.name, req.body.description, req.body.id]);

        done();
        res.redirect("/");
    });
})


//SERVER
app.listen(3000,function() {
    console.log("Listening to port 3000");
});