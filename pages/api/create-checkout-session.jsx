// pages/api/create-checkout-session.js
import Stripe from 'stripe';
import clientPromise from '../../lib/mongodb'; // Use the MongoDB connection from your clientPromise
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Wait for the MongoDB client connection to be established
      
      const client = await clientPromise;
      const db = client.db(); 

      const membership = await db.collection('memberships').findOne({});
      if (!membership) {
        return res.status(404).json({ error: 'Membership not found' });
      }

      const price = membership?.price || 100; // Default to $1 (100 cents) if not set
      const { userId } = req.body; // Retrieve userId if you need to identify the user later

      // Create a Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: { name: 'Cpc-Membership Plan' },
              unit_amount: price * 100, // Convert dollars to cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cancel`,
      });

      res.status(200).json({ sessionId: session.id });
    } catch (error) {
      console.error('Stripe session creation failed:', error);
      res.status(500).json({ error: 'Failed to create checkout session' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
