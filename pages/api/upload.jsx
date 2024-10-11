import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      companyName,
      companyDescription,
      companyPrice,
      companyLocation,
      companyMapUrl,
      companyWebsite,
      companyContact,
      companyImage,
    } = req.body;

    try {
      const client = await clientPromise;
      const db = client.db();

      // Insert the company data into the database
      await db.collection('memes').insertOne({
        name: companyName,
        description: companyDescription,
        price: companyPrice,
        location: companyLocation,
        mapUrl: companyMapUrl,
        website: companyWebsite,
        contact: companyContact,
        image: companyImage,
        uploadedAt: new Date(),
      });

      res.status(201).json({ message: 'Company information uploaded successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
