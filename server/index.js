import express from 'express';
import cors from 'cors';
import { db } from './database.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend cross-origin requests
app.use(cors());

// Parse incoming request body as JSON
app.use(express.json());

// API Endpoints

// 1. Fetch nominations
app.get('/api/nominations', (req, res) => {
  try {
    const list = db.getNominations();
    res.json(list);
  } catch (error) {
    res.status(550).json({ error: 'Failed to retrieve nominations' });
  }
});

// 2. Submit new nomination
app.post('/api/nominations', (req, res) => {
  try {
    const newNom = req.body;
    const id = `nom-${Math.floor(100 + Math.random() * 900)}`;
    const submission = {
      ...newNom,
      id,
      status: 'Pending',
      juryScores: null,
      juryRemarks: '',
      fieldVisit: ''
    };

    const saved = db.saveNomination(submission);

    // Auto-generate notification
    const alert = {
      id: Date.now(),
      title: 'New Application',
      message: `Nomination by "${submission.fullName}" submitted under "${submission.category}".`,
      time: 'Just now',
      read: false
    };
    db.saveNotification(alert);

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit nomination' });
  }
});

// 3. Update status (admin action)
app.put('/api/nominations/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = db.updateNominationStatus(id, status);

    // Auto-generate notification
    const alert = {
      id: Date.now(),
      title: 'Status Updated',
      message: `Nomination ID #${id.slice(0, 5)} changed status to ${status}.`,
      time: 'Just now',
      read: false
    };
    db.saveNotification(alert);

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// 4. Update scores and field verification details (jury action)
app.put('/api/nominations/:id/scores', (req, res) => {
  try {
    const { id } = req.params;
    const { scores, remarks, fieldVisit } = req.body;

    const updated = db.addJuryScores(id, scores, remarks, fieldVisit);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save jury scores' });
  }
});

// 5. Fetch notifications
app.get('/api/notifications', (req, res) => {
  try {
    const list = db.getNotifications();
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve notifications' });
  }
});

// 6. Clear notifications
app.post('/api/notifications/clear', (req, res) => {
  try {
    const list = db.clearNotifications();
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear notifications' });
  }
});

// Start listening
app.listen(PORT, () => {
  console.log(`[Express] Backend server running on http://localhost:${PORT}`);
});
