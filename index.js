import express from 'express';
import axios from 'axios';
import ejs from 'ejs';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// EJS ayarları
app.set('view engine', 'ejs');
const yourBearerToken = "b3c5fcf6-1d84-44ab-8806-95b03c46fed0";
const API_URL = "https://secrets-api.appbrewery.com/random";
const config = {
    headers: { Authorization: `Bearer ${yourBearerToken}` },
  };

// Routes
app.get('/', async (req, res) => {
    try {
        const result = await axios.get(API_URL);
        console.log(result);
        res.render("index.ejs", { secret: result.data.secret, user: result.data.username });
      } catch (error) {
        res.render("index.ejs", { secret: JSON.stringify(error.response.data) });
      }
});

// Başlatma 
app.listen(port, () => {
  console.log(`Uygulama ${port} portunda çalışıyor.`);
});


// HINTS:
// 1. Import express and axios

// 2. Create an express app and set the port number.

// 3. Use the public folder for static files.

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.
