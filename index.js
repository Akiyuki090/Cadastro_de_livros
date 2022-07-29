const express = require("express");
const exphbs = require("express-handlebars");
const conn = require("./database/configdatabse");
const router = require("./controllers/BooksController");

const app = express();
const port = 3000;

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.render("home");
});

app.use(router);

app.get("/books", (req, res) => {
  const sql = "SELECT * FROM books";
  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const books = data;
    console.log(books);
    res.render("books", { books });
  });
});

app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM books WHERE id = ${id}`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const book = data[0];
    res.render("book", { book });
  });
});

app.get("/books/edit/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM books WHERE id = ${id}`;

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const book = data[0];
    res.render("editbook", { book });
  });
});

app.post("/books/updatebook", function (req, res) {
  const id = req.body.id;
  const title = req.body.title;
  const pagesqty = req.body.pagesqty;

  const query = `UPDATE books SET title = '${title}', pagesqty = ${pagesqty} WHERE id = ${id}`;

  conn.query(query, function (err) {
    if (err) {
      console.log(err);
    }

    res.redirect(`/books/edit/${id}`);
  });
});

app.post('/books/remove/:id', (req, res) => {
    const id = req.params.id;

    const sql = `DELETE FROM books WHERE id = ${id}`

    conn.query(sql, function (err) {
      if (err) {
        console.log(err);
      }

      res.redirect('/books');
    });

})

conn.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("Conectou ao banco");
  app.listen(port, () => {
    console.log("Conectou na porta: " + port);
  });
});
