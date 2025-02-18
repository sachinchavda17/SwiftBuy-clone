import Order from "../models/Order.js";
import Stripe from "stripe";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_KEY);

export const addOrderController = async (req, res) => {
  try {
    const { userId, products, paymentMethod, shippingAddress, totalAmount } =
      req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ error: "No products in the order" });
    }

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: product.title,
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    console.log("Stripe session created:", session);

    const newOrder = new Order({
      userId,
      products,
      paymentMethod,
      shippingAddress,
      totalAmount,
      paymentStatus: "Pending",
      shippingStatus: "Pending",
      orderStatus: "Pending",
      stripeSessionId: session.id,
    });
    
    await newOrder.save();

    res.status(200).json({ stripeSession: session });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send("Internal Server Error");
  }
};
