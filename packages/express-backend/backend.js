import express from "express";

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

app.use(express.json());

// Helpers
const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };

const findUserById = (id) =>
  users.users_list.find((user) => user.id === id);

const addUser = (user) => {
  users.users_list.push(user);
  return user;
};

const deleteUserById = (id) => {
  const idx = users.users_list.findIndex((u) => u.id === id);
  if (idx === -1) return false;
  users.users_list.splice(idx, 1);
  return true;
};

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
  addUser(userToAdd);
  // 201 Created with the new resource is a nice touch
  res.status(201).send(userToAdd);
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
