import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// --- Routes ---

app.get("/users", async (req, res) => {
  try {
    const { name, job } = req.query;
    const users = await userServices.getUsers(name, job);
    res.json({ users_list: users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.get("/users/name/:name/job/:job", async (req, res) => {
  try {
    const { name, job } = req.params; // ✅ extract name and job from URL
    const users = await userServices.findUserbyNameandJob(name, job);

    if (!users.length) {
      return res.status(404).json({ error: "No users found matching name and job" });
    }

    res.json({ users_list: users });
  } catch (err) {
    console.error("Error fetching users by name and job:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.get("/users/name/:name", async (req, res) => {
  try {
    const user = await userServices.findUserByName(req.params.name);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Error fetching user by Name:", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});


app.get("/users/job/:job", async (req, res) => {
  try {
    const user = await userServices.findUserByJob(req.params.job);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Error fetching user by Job:", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await userServices.findUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

app.get("/", (req, res) => {
    res.send({
      status: "ok",
      routes: [
        "GET /users",
        "GET /users?name=...&job=...",
        "GET /users/:id",
        "POST /users",
        "DELETE /users/:id"
      ]
    });
  });

// Create user
app.post("/users", async (req, res) => {
  try {
  const userToAdd = req.body;           
  const newUser = await userServices.addUser(userToAdd)
  res.status(201).send(newUser);
  // return 201 status yippee
  } catch (err) {
    res.status(400).send({error: err.message});
  }
});

// Hard delete user by id
app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  const removed = await userServices.deleteUserById(id);
  if (!removed) return res.status(404).send("Resource not found.");
  // 204 No Content is standard for successful DELETE with no body
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
