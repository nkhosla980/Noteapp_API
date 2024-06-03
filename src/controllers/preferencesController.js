const db = require("../config/db.config");

exports.getPreferences = async (req, res) => {
  try {
    const preferences = await db("user_preferences")
      .where({ user_id: req.userId })
      .first();
    if (preferences) {
      res.status(200).json(preferences);
    } else {
      res.status(404).json({ error: "Preferences not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch preferences." });
  }
};

exports.updatePreferences = async (req, res) => {
  const { font_size, theme } = req.body;
  try {
    const updatedRows = await db("user_preferences")
      .where({ user_id: req.userId })
      .update({ font_size, theme });
    if (updatedRows) {
      res.status(200).json({ font_size, theme });
    } else {
      res.status(404).json({ error: "Preferences not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update preferences." });
  }
};
