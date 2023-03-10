const app = require("express")();
const breeds = require("./breeds.json");

const JsSearch = require("js-search"); // useful to search in [] initials words

const search = new JsSearch.Search("name"); // it which fields it should index for searching

search.addDocuments(breeds); // add objs for the search
search.addIndex("name"); // index for searching

app.get("/api/breeds", (req, res) => {
  const { query } = req;

  try {
    if (query.search) {
      // res.send(breeds.find((b) => b.name === query.search) || []); // not found return []
      res.send(search.search(query.search)); // search start with the letter or word
    }
    res.send(breeds.map((b) => ({ loco: b })));
  } catch (error) {
    console.error(error.message);
    res.send(error.message);
  }
});

app.get("/api/breeds/:id", (req, res) => {
  const { params: {id} } = req;
  res.send(breeds[id]);
});

module.exports = app;
