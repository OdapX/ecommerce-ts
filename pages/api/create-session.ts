// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Command } from '../../typings'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || '')
type Data = {
  id: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { commands, email } = JSON.parse(req.body)

  const line_items = commands.map((command: Command) => ({
    description: command.product.description,
    price_data: {
      currency: 'eur',
      product_data: {
        name: command.product.title,
        images: [command.product.image],
      },
      unit_amount: command.product.price * 100,
    },
    quantity: command.quantity,
  }))
  const session = await stripe.checkout.sessions.create({
    line_items,
    shipping_rates: ['shr_1KfDwIB4LrBkOCLdo2xZwPgT'],

    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_HOST}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(
        commands.map((command: Command) => command.product.image)
      ),
    },
  })

  res.status(200).json({ id: session.id })
}
