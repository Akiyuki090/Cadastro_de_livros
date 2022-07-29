const router = require("express").Router();
const conn = require("../database/configdatabse");

router.post("/books/insertbook", (req, res) => {
  const title = req.body.title;
  const pagesqty = req.body.pagesqty;

  const sql = `INSERT INTO books (title, pagesqty) VALUE ('${title}', '${pagesqty}')`;

  conn.query(sql, (err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
