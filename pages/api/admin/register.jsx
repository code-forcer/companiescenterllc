import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export default async function register(req, res) {
  await dbConnect();

  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (role !== 'employer' && role !== 'company') {
    return res.status(400).json({ message: 'Invalid role selected' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashedPassword, role });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    await sendWelcomeEmail(name, email);

    res.status(201).json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: 'Server error' });
  }
}

async function sendWelcomeEmail(name, email) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: '"companiescenterllc.com" <noreply@useditem.com>',
    to: email,
    subject: 'Welcome to companiescenterLLC.com!',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
        <div style="text-align: center; padding: 20px;">
          <img src="https://companiescenterllc.vercel.app/logo/imageone.jpeg" alt="companiescenterllc.com Logo" style="width: 150px;"/>
        </div>
        <p>Hello ${name},</p>
        <p>Welcome to <strong>companiescenterllc.com</strong>! We are thrilled to have you join our community.</p>
        <p>If you have any questions, feel free to reach out to us at any time.</p>
        <p>Best regards,</p>
        <p>The <strong>companiescenterllc.com</strong> Team</p>
        <p style="font-size: small; color: #888;">This is an automated message. Please do not reply directly to this email.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
