/* global process */
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
  } catch {
    res.status(550).json({ error: 'Failed to retrieve nominations' });
  }
});

// 2. Submit new nomination
app.post('/api/nominations', (req, res) => {
  try {
    const newNom = req.body;
    const generate15CharId = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < 15; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };
    const id = generate15CharId();
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

    // Trigger Mock SMTP email log
    const emailTo = submission.email || 'nominee@panchayatawards.gov.in';
    const emailSubject = `Nomination Submission Received - Ref ID: ${id}`;
    const emailBody = `Dear ${submission.fullName},\n\nWe have received your nomination application for the project "${submission.projectName}" under the category "${submission.category}" for the National Panchayat Raj Awards.\n\nYour application reference ID is: ${id}.\nThe verification process will be conducted at three levels (Block, District, and State level) before final compilation by the Jury Panel.\n\nYou can track your live application status in the Nominee Portal using your credentials.\n\nBest regards,\nMinistry of Panchayati Raj,\nGovernment of India.`;

    console.log("\n=======================================================");
    console.log(`✉️  [SMTP Server] Sending Nomination Success Email to: ${emailTo}`);
    console.log(`Subject: ${emailSubject}`);
    console.log("-------------------------------------------------------");
    console.log(emailBody);
    console.log("=======================================================\n");

    res.status(201).json({
      ...saved,
      mockEmailSent: {
        to: emailTo,
        subject: emailSubject,
        body: emailBody
      }
    });
  } catch {
    res.status(500).json({ error: 'Failed to submit nomination' });
  }
});

// 2.5. Register volunteer/NGO/CSR and trigger confirmation email
app.post('/api/register', (req, res) => {
  try {
    const { name, email, phone, org, interest, role } = req.body;
    
    // Auto-generate system alert for admin
    const alert = {
      id: Date.now(),
      title: `New ${role.toUpperCase()} Registered`,
      message: `${name} has registered as a ${role} focusing on SDG: ${interest}.`,
      time: 'Just now',
      read: false
    };
    db.saveNotification(alert);

    // Trigger Mock SMTP email log
    const emailSubject = `Registration Confirmation - National Panchayat Awards`;
    const emailBody = `Dear ${name},\n\nThank you for registering as a ${role.toUpperCase()} on the Panchayat Raj Sustainable Development Portal.\n\nRegistered Details:\n- Role: ${role.toUpperCase()}\n- Focus Area: ${interest.toUpperCase()}\n- Mobile: ${phone}\n${org ? `- Organization: ${org}\n` : ''}\nYour credentials have been successfully updated in the National Sustainable Development Registry database. Our local block representatives and community managers will reach out to you with specific updates and volunteer guidelines.\n\nBest regards,\nMinistry of Panchayati Raj,\nGovernment of India.`;

    console.log("\n=======================================================");
    console.log(`✉️  [SMTP Server] Sending Registration Success Email to: ${email}`);
    console.log(`Subject: ${emailSubject}`);
    console.log("-------------------------------------------------------");
    console.log(emailBody);
    console.log("=======================================================\n");

    res.status(200).json({
      success: true,
      message: `${role.toUpperCase()} registered successfully!`,
      mockEmailSent: {
        to: email,
        subject: emailSubject,
        body: emailBody
      }
    });
  } catch {
    res.status(500).json({ error: 'Failed to register' });
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
  } catch {
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// 3.5. Delete nomination (admin action)
app.delete('/api/nominations/:id', (req, res) => {
  try {
    const { id } = req.params;
    const remaining = db.deleteNomination(id);
    res.json(remaining);
  } catch {
    res.status(500).json({ error: 'Failed to delete nomination' });
  }
});

// 4. Update scores and field verification details (jury action)
app.put('/api/nominations/:id/scores', (req, res) => {
  try {
    const { id } = req.params;
    const { scores, remarks, fieldVisit } = req.body;

    const updated = db.addJuryScores(id, scores, remarks, fieldVisit);
    res.json(updated);
  } catch {
    res.status(500).json({ error: 'Failed to save jury scores' });
  }
});

// 3.8. Update certificate ID (admin action)
app.put('/api/nominations/:id/certificate', (req, res) => {
  try {
    const { id } = req.params;
    const { certificateId } = req.body;
    const updated = db.addCertificateId(id, certificateId);
    
    // Auto-generate notification
    const alert = {
      id: Date.now(),
      title: 'Certificate Issued',
      message: `Certificate ID ${certificateId} generated for Nomination #${id.slice(0, 5)}.`,
      time: 'Just now',
      read: false
    };
    db.saveNotification(alert);

    res.json(updated);
  } catch {
    res.status(500).json({ error: 'Failed to save certificate ID' });
  }
});

// 7. Create jury panel and invite (admin action)
app.post('/api/jury/create', (req, res) => {
  try {
    const { category, emails } = req.body;
    if (!category || !emails) {
      return res.status(400).json({ error: 'Category and emails are required' });
    }
    
    const emailList = emails.split(',').map(e => e.trim()).filter(Boolean);
    const categorySlug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const generatedPassword = `Jury@${categorySlug.slice(0, 8)}`;
    
    // Log mock SMTP dispatches
    console.log("\n=======================================================");
    console.log(`✉️  [SMTP Server] Dispatching Jury Panel Invitations`);
    console.log(`Category: ${category}`);
    console.log(`Assigned Password: ${generatedPassword}`);
    console.log("-------------------------------------------------------");
    emailList.forEach(email => {
      console.log(`To: ${email}`);
      console.log(`Subject: Invitation: Category Jury Evaluation Panel for ${category}`);
      console.log(`Body: Dear Evaluator,\n\nYou have been designated to serve on the Regional Jury Evaluation Panel for the "${category}" award category under the Ministry of Panchayati Raj.\n\nSecure Access Details:\n- Portal URL: http://localhost:5173/\n- Login Email: ${email}\n- Temp Password: ${generatedPassword}\n\nPlease verify this invitation by logging in and checking your assigned nominations list.\n\nBest regards,\nMinistry of Panchayati Raj,\nGovernment of India.\n`);
    });
    console.log("=======================================================\n");
    
    // Create system notification
    const alert = {
      id: Date.now(),
      read: false,
      title: 'New Jury Panel Registered',
      message: `Jury panel generated for "${category}" with ${emailList.length} members.`,
      time: 'Just now'
    };
    db.saveNotification(alert);
    
    res.status(201).json({
      success: true,
      category,
      emails: emailList,
      password: generatedPassword,
      accessLink: `http://localhost:5173/`,
      logs: emailList.map(email => ({
        to: email,
        subject: `Invitation: Category Jury Evaluation Panel for ${category}`,
        body: `Dear Evaluator,\n\nYou have been designated to serve on the Regional Jury Evaluation Panel for the "${category}" award category under the Ministry of Panchayati Raj.\n\nSecure Access Details:\n- Portal URL: http://localhost:5173/\n- Login Email: ${email}\n- Temp Password: ${generatedPassword}\n\nPlease verify this invitation by logging in and checking your assigned nominations list.\n\nBest regards,\nMinistry of Panchayati Raj,\nGovernment of India.`
      }))
    });
  } catch {
    res.status(500).json({ error: 'Failed to create jury panel' });
  }
});

// 5. Fetch notifications
app.get('/api/notifications', (req, res) => {
  try {
    const list = db.getNotifications();
    res.json(list);
  } catch {
    res.status(500).json({ error: 'Failed to retrieve notifications' });
  }
});

// 6. Clear notifications
app.post('/api/notifications/clear', (req, res) => {
  try {
    const list = db.clearNotifications();
    res.json(list);
  } catch {
    res.status(500).json({ error: 'Failed to clear notifications' });
  }
});

export default app;

// Start listening if run directly and not on Vercel
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[Express] Backend server running on http://localhost:${PORT}`);
  });
}
