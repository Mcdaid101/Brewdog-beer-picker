import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// renders home page
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// render a random beer 
app.get("/random", async (req, res) => {
  try {
    const result = await axios.get('https://api.punkapi.com/v2/beers/random');
    console.log(result);
    res.render("random.ejs", { beers: [result.data[0]] });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// search for a beer by year 
app.post("/search-by-year", async (req, res) => {
  try {
    console.log(req.body);
    const year = req.body.year;
    const response = await axios.get(
      `https://api.punkapi.com/v2/beers?brewed_before=12-${year}&brewed_after=01-${year}&per_page=80`
    );
    const beerYears = response.data;
    console.log(beerYears);
    res.render("beerYears.ejs", { beers: beerYears });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// search for a beer by food pairings 
app.post("/search-by-food", async (req, res) => {
  try {
    console.log(req.body);
    const food = req.body.search;
    const response = await axios.get(
      `https://api.punkapi.com/v2/beers?food=${food}&per_page=80`
    );
    const matchingFoods = response.data;
    console.log(matchingFoods);
    res.render("food.ejs", { foods: matchingFoods });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// search for a beer by name
app.post("/search-by-name", async (req, res) => {
  try {
    console.log(req.body);
    const name = req.body.search;
    const response = await axios.get(
      `https://api.punkapi.com/v2/beers?beer_name=${name}&per_page=80`
    );
    const nameMatch = response.data;
    console.log(nameMatch);
    res.render("name.ejs", { beerName: nameMatch });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});