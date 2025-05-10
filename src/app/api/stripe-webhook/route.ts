import { env } from "@/env";
import stripe from "@/lib/stripe";
import { NextRequest } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return new Response("Signature is missing", { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );

    console.log("Recieved event from server:", event.type, event.data.object);

    switch (event.type) {
    }
  } catch (error) {
    console.error(error);
    return new Response("Internal server error", { status: 500 });
  }
}

async function handleSessionCompletes(session: Stripe.Checkout.Session) {}

async function handleSubscriptionCreatesOrUpdated(subscriptionId: string) {
  console.log("handleSubscriptionCreatesOrUpdated");
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log("handleSubscriptionDeleted");
}
