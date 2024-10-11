// pages/api/auth/register.js
import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export default async function register(req, res) {
  await dbConnect();

  const { name, email, password, role } = req.body;

  // Validate the role
  if (!role || (role !== 'employer' && role !== 'company')) {
    return res.status(400).json({ message: 'Invalid role selected' });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role, // Ensure role is saved here
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Send a welcome email
    await sendWelcomeEmail(name, email);

    res.status(201).json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

// Function to send a welcome email
async function sendWelcomeEmail(name, email) {
  // Configure nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // or any email provider you are using
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or app-specific password
    },
  });

  // Email options
const mailOptions = {
  from: '"companiescenterllc.com" <noreply@useditem.com>', // sender address
  to: email, // list of receivers
  subject: 'Welcome to companiescenterLLC.com!', // Subject line
  text: `Hello ${name}, welcome to companiescenterllc.com! We are thrilled to have you with us.`, // plain text body
  html: `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5;">
      <div style="text-align: center; padding: 20px;">
        <img src="https://companiescenterllc.vercel.app/logo/imageone.jpeg" alt="companiescenterllc.com Logo" style="width: 150px;"/>
      </div>
      <p>Hello ${name},</p>
      <p>Welcome to <strong>companiescenterllc.com</strong>! We are absolutely thrilled to have you join our community.</p>
      <p>Our platform is dedicated to connecting you with top companies, exploring valuable business opportunities, and accessing high-quality services that drive success.</p>
      <p>As a member of our growing community, you will have access to exclusive offers, insightful content, and the best business connections in the industry.</p>
      <p>If you have any questions or need assistance, feel free to reach out to us at any time.</p>
      <p>We're here to help you every step of the way!</p>
      <p>Best regards,</p>
      <p>The <strong>companiescenterllc.com</strong> Team</p>
      <p style="font-size: small; color: #888;">This is an automated message. Please do not reply directly to this email.</p>
    </div>
  `, // html body
};

  // Send email
  await transporter.sendMail(mailOptions);
}
