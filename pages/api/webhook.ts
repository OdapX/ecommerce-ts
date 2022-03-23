// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { buffer } from 'micro'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'
import { initializeApp, cert, getApp, getApps } from 'firebase-admin/app'

const serviceAccount = require('../../permissions.json')

if (!getApps().length) {
  const app = initializeApp({
    credential: cert(serviceAccount),
  })
} else {
  const app = getApp()
}

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const endpointSecret = process.env.STRIPE_SIGNIN_SERCRET

const PostOrder = async (data: any) => {
  const DB = getFirestore()
  return DB.collection('users')
    .doc(data.metadata.email)
    .collection('orders')
    .doc(data.id)
    .set({
      amount: data.amount_total,
      images: JSON.parse(data.metadata.images),
      shipping_amount: data.total_details.amount_shipping,
      timestamp: FieldValue.serverTimestamp(),
    })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let event

  if (endpointSecret) {
    const signature = req.headers['stripe-signature']
    const BufferRequest = await buffer(req)
    const payload = BufferRequest.toString()

    try {
      event = stripe.webhooks.constructEvent(payload, signature, endpointSecret)
    } catch (err: any) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message)
      return res.status(400)
    }

    if (event.type === 'checkout.session.completed') {
      const sessionInfo = event.data.object

      // post the order into firebase

      try {
        await PostOrder(sessionInfo)
        console.log('SUCEEEEES')
        return res.status(200).send('Order Confirmed !')
      } catch (err) {
        console.log(err)
      }
    }
  }

  res.status(200).json({ name: 'John Doe' })
}

export const config = {
  api: {
    bodyParser: false,
  },
}
