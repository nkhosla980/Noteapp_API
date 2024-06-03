const db = require("../config/db.config");

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await db("notes").where({ user_id: req.userId });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes." });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const note = await db("notes")
      .where({ id: req.params.id, user_id: req.userId })
      .first();
    if (note) {
      res.status(200).json(note);
    } else {
      res.status(404).json({ error: "Note not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the note." });
  }
};

exports.createNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const [noteId] = await db("notes").insert({
      user_id: req.userId,
      title,
      content,
    });
    res.status(201).json({ id: noteId, title, content });
  } catch (error) {
    res.status(500).json({ error: "Failed to create note." });
  }
};

exports.updateNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const updatedRows = await db("notes")
      .where({ id: req.params.id, user_id: req.userId })
      .update({ title, content });
    if (updatedRows) {
      res.status(200).json({ id: req.params.id, title, content });
    } else {
      res.status(404).json({ error: "Note not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update note." });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const deletedRows = await db("notes")
      .where({ id: req.params.id, user_id: req.userId })
      .del();
    if (deletedRows) {
      res.status(200).json({ message: "Note deleted successfully." });
    } else {
      res.status(404).json({ error: "Note not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note." });
  }
};
