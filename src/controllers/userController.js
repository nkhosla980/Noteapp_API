const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db.config");
console.log("db", db);

exports.signup = async (req, res) => {
  const { username, password } = req.body;
  console.log("username", username, "password", password);

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const [userId] = await db("app_users").insert({
      username,
      password: hashedPassword,
    });
    res.status(201).json({ userId });
  } catch (error) {
    res.status(500).json({ error: "Registration failed." });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db("app_users").where({ username }).first();
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ token });
    } else {
      res.status(401).json({ error: "Incorrect details." });
    }
  } catch (error) {
    res.status(500).json({ error: "Login failed." });
  }
};
