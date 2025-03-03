import express from "express";
import { client } from "./db.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// app.get("/", (req, res) => {
//     // res.send is used when sending a string or html to the client
//     res.send("Hello World");
// });

// Get all posts
app.get("/posts", async (req, res) => {
    try {
        const result = await client.query("SELECT * FROM posts");
        res.json(result.rows);
    } catch (err) {
        console.error("❌ Error retrieving posts:", err.message); // Debug output in terminal
        res.status(500).json({ error: err.message }); // Show error
    }
});

// Get post by id
app.get("/posts/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await client.query("SELECT * FROM posts WHERE id = $1", [
            id,
        ]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json(result.rows);
    } catch (err) {
        console.error("❌ Error retrieving posts:", err.message); // Debug output in terminal
        res.status(500).json({ error: err.message }); // Show error
    }
});

// Create a new post
app.post("/posts", async (req, res) => {
    const { author, title, content, cover } = req.body;
    try {
        const result = await client.query(
            "INSERT INTO posts (author, title, content, cover) VALUES ($1, $2, $3, $4) RETURNING *",
            [author, title, content, cover]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("❌ Error creating post:", err.message); // Debug output in terminal
        res.status(400).json({ error: err.message }); // Show error
    }
});

// Update a post
app.put("/posts/:id", async (req, res) => {
    const { id } = req.params;
    const { author, title, content, cover } = req.body;
    try {
        const result = await client.query(
            "UPDATE posts SET author = $1, title = $2, content = $3, cover = $4 WHERE id = $5 RETURNING *",
            [author, title, content, cover, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error("❌ Error updating post:", err.message); // Debug output in terminal
        res.status(400).json({ error: err.message }); // Show error
    }
});

// Delete a post
app.delete("/posts/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await client.query("DELETE FROM posts WHERE id = $1", [id]);
        res.json({ message: "Post deleted" });
    } catch (err) {
        res.status(400).json({ error: "❌ Error deleting post" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on  http://localhost:${port}`);
});
