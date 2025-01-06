import dbConnect from '../../../utils/dbConnect';
import Company from '../../../models/Company';

export default async function handler(req, res) {
  await dbConnect();

  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
