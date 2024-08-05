const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 9000;

// Configure CORS
const corsOptions = {
  origin: 'http://localhost:7980', // Allow only the frontend application
// Can add more domains
// origin: ['http://localhost:7980', 'domain2', 'domain3'], 
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect('mongodb://localhost/stickynotesdb', { useNewUrlParser: true, useUnifiedTopology: true });

const NoteSchema = new mongoose.Schema({
  header: String,
  text: String,
  color: String
});

const Note = mongoose.model('Note', NoteSchema);

app.get('/api/notes', async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.post('/api/notes', async (req, res) => {
  const note = new Note(req.body);
  await note.save();
  res.json(note);
});

app.put('/api/notes/:id', async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(note);
});

app.delete('/api/notes/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: 'Note deleted' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));