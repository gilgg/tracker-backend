const express = require("express");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/categories/:categoryId", async (req, res) => {
  let coords = [];

  try {
    const events = (
      await axios.get(
        `${process.env.NASA_API}/categories/${req.params.categoryId}`
        // `https://eonet.gsfc.nasa.gov/api/v2.1/categories/${req.params.categoryId}`
      )
    ).data.events;

    events.forEach((event) => {
      event.geometries.forEach((geo) => {
        coords.push(geo.coordinates);
      });
    });

    res.send(coords);
  } catch (err) {
    res.status(500).send();
  }
});

app.get("/api", async (req, res) => {
  res.send("hi");
});

app.listen(process.env.PORT || 5000);
