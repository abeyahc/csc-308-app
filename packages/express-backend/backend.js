import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
  users_list: [
    { id: "xyz789", name: "Charlie", job: "Janitor" },
    { id: "abc123", name: "Mac", job: "Bouncer" },
    { id: "ppp222", name: "Mac", job: "Professor" },
    { id: "yat999", name: "Dee", job: "Aspring actress" },
    { id: "zap555", name: "Dennis", job: "Bartender" }
  ]
};

// Helpers
const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };

  const addUser = (user) => {
    // Ensure the new user has a unique id
    if (!user.id) {
    // generate random id
      user.id = Math.random().toString(36).substr(2, 6);
    }
  
    users.users_list.push(user);
    return user;
  };

const findUserById = (id) =>
  users.users_list.find((user) => user.id === id);

const deleteUserById = (id) => {
  const idx = users.users_list.findIndex((u) => u.id === id);
  if (idx === -1) return false;
  users.users_list.splice(idx, 1);
  return true;
};

app.use(cors());
app.use(express.json());

// --- Routes ---

// Get a single user by id
app.get("/users", (req, res) => {
    const name = req.query.name;
    if (name != undefined) {
      let result = findUserByName(name);
      result = { users_list: result };
      res.send(result);
    } else {
      res.send(users);
    }
  });

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const result = findUserById(id);
  if (!result) return res.status(404).send("Resource not found.");
  res.send(result);
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
app.post("/users", (req, res) => {
  const userToAdd = req.body;           
  const newUser = addUser(userToAdd)
  // return 201 status yippee
  res.status(201).send(newUser);
});

// Hard delete user by id
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const removed = deleteUserById(id);
  if (!removed) return res.status(404).send("Resource not found.");
  // 204 No Content is standard for successful DELETE with no body
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
