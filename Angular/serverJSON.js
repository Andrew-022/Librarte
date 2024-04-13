const express = require('express');
const fs = require('fs').promises;
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/data/users', async (req, res) => {
    try {
        const userData = req.body;

        await fs.writeFile('/data/users.json', JSON.stringify(userData));

        res.status(200).send('Data has been successfully written.');
    } catch (error) {

        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Node Express server listening on http://localhost:${PORT}`);
});
