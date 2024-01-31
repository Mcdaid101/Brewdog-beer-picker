import express from "express";
import axios from "axios";

const app = express();
const port = 3000; 


app.get("/", async (req, res) => {
    try {
      const result = await axios.get('https://api.punkapi.com/v2/beers/random');
      console.log(result);
      res.render("index.ejs", {
        
      });
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  });

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });