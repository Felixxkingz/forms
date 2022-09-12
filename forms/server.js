var express = require("express");
var jqupload = require("jquery-file-upload-middleware");
// var formidable = require("formidable");
// var fs = require("fs");
var app = express();
var handlebars = require("express3-handlebars").create({
  defaultLayout: "main",
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.send(`
    <h2>With <code>"express"</code> npm package</h2>
    <form action="/api/upload" enctype="multipart/form-data" method="post">
      <div>Text field title: <input type="text" name="title" /></div>
      <div>File: <input type="file" name="someExpressFiles" multiple="multiple" /></div>
      <input type="submit" value="Upload" />
    </form>
  `);
});

app.post("/api/upload", (req, res, next) => {
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ fields, files });
  });
});

// app.use("/upload", function (req, res, next) {
//   var now = Date.now();
//   jqupload.fileHandler({
//     uploadDir: function () {
//       return __dirname + "/public/uploads/" + now;
//     },
//     uploadUrl: function () {
//       return "/uploads/" + now;
//     },
//   })(req, res, next);
// });

app.use(require("body-parser")());
app.get("/newsletter", function (req, res) {
  // we will learn about CSRF later...for now, we just
  // provide a dummy value
  res.render("newsletter", { csrf: "CSRF token goes here" });
});
app.post("/process", function (req, res) {
  console.log("Form (from querystring): " + req.query.form);
  console.log("CSRF token (from hidden form field): " + req.body._csrf);
  console.log("Name (from visible form field): " + req.body.name);
  console.log("Email (from visible form field): " + req.body.email);
  res.redirect(303, "/thank-you");
});

// app.get("/", function (req, res) {
//   res.render("vacation-photo");
// });

// var formidable = require("formidable");
// app.use(require("formidable")());
// app.get("/contest/vacation-photo", function (req, res) {
//   var now = new Date();
//   res.render("contest/vacation-photo", {
//     year: now.getFullYear(),
//     month: now.getMont(),
//   });
// });
// app.post("/contest/vacation-photo/:year/:month", function (req, res) {
//   var form = new formidable.IncomingForm();
//   form.parse(req, function (err, fields, files) {
//     if (err) return res.redirect(303, "/error");
//     console.log("received fields:");
//     console.log(fields);
//     console.log("received files:");
//     console.log(files);
//     res.redirect(303, "/thank-you");
//   });
// });

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), function () {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});
