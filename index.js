import express from 'express'

const app = express();
const port = process.env.PORT || 4000;;


app.get('/', (req, res) => res.send('Hello World 101'))
app.listen(port, () => {
    console.log(`Sever is running on port ${port}`);
})