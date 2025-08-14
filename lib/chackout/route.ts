import Stripe from 'stripe'

export const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIP_SECRET_KEY!, {
    typescript: true
});