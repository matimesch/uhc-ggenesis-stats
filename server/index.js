const express = require('express');
const { google } = require('googleapis');
const path = require('path');
const cors = require('cors');
const dotenv = 'dotenv'
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;
const spreadsheetId = process.env.SPREADSHEET_ID;

const googlePrivateKey = process.env.GOOGLE_PRIVATE_KEY;
const googleClientEmail = process.env.GOOGLE_CLIENT_EMAIL;

const auth = new google.auth.GoogleAuth({
  credentials: {
    private_key: googlePrivateKey,
    client_email: googleClientEmail,
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

// Use CORS middleware to allow requests from the frontend
app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

app.get('/api/sheet-data', async (req, res) => {
  try {
    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient });

    const range = '2024!A3:D16';
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    res.json(rows);
  } catch (error) {
    console.error('Error fetching data from Google Sheets', error);
    res.status(500).send('Error fetching data');
  }
});

// app.use(express.static(path.join(__dirname, 'google-sheets-frontend/dist')));

// app.get('*', (req, res) => {
//   res.sendFile('index.html',{root : path.join(__dirname, 'google-sheets-frontend/dist')});
// });

app.use("/", (req,res) =>{
  res.send("Server running");
})

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;