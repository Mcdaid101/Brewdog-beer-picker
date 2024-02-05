import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", async (req, res) => {
  try {
    const result = await axios.get('https://api.punkapi.com/v2/beers/random');
    console.log(result);
    res.render("index.ejs", { beers: [result.data[0]] });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


app.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const year = req.body.year;
    const response = await axios.get(
      `https://api.punkapi.com/v2/beers?brewed_before=12-${year}&brewed_after=01-${year}`
    );
    const beerYears = response.data;
    console.log(beerYears);
    res.render("beerYears.ejs", { beers: beerYears });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});