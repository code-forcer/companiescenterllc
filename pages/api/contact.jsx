import clientPromise from '../../lib/mongodb';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, subject, message, emergency } = req.body;

    try {
      // Connect to MongoDB
      const client = await clientPromise;
      const db = client.db('test');
      const collection = db.collection('contacts');

      // Insert the form data into MongoDB
      const contact = { name, email, subject, message, emergency, date: new Date() };
      await collection.insertOne(contact);

      // Set up nodemailer transporter
      let transporter = nodemailer.createTransport({
        service: 'gmail', // or your preferred email service
        auth: {
          user: process.env.EMAIL_USER, // your email
          pass: process.env.EMAIL_PASS, // your email password or app-specific password
        },
      });

      // Send email to site owner
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_OWNER, // site owner's email
        subject: `New Contact Form Submission: ${subject}`,
        text: `You have a new contact form submission from ${name} (${email}):\n\n${message}\n\nEmergency: ${emergency ? 'Yes' : 'No'}`,
      });

      // Send acknowledgment email to sender (user)
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email, // sender's email dynamically picked from the form
        subject: 'Thank you for contacting us!',
        text: `Dear ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you shortly.\n\nBest regards,\nusedItem.com Team`,
      });

      // Respond with a success message
      res.status(200).json({ success: true, message: 'Form submitted successfully' });
    } catch (error) {
      console.error('Error submitting form:', error);
      res.status(500).json({ success: false, message: 'An error occurred while submitting the form' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
