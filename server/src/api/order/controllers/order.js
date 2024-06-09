"use strict";
// @ts-ignore
const stripe = require("stripe")(process.env.STRIPE_KEY);

/**
 * order controller
 */
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products } = ctx.request.body;

    try {
      // Map the products to Stripe line items
      const lineItems = await Promise.all(
        products.map(async (product) => {
          // Fetch the product details from Strapi
          const item = await strapi
            .service("api::product.product")
            .findOne(product.id);

          // Return the line item structure for Stripe
          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: item.title,
              },
              unit_amount: Math.round(item.price * 100),
            },
            quantity: product.attributes.quantity,
          };
        })
      );

      // Create a checkout session with Stripe
      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: { allowed_countries: ["IN"] },
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}?success=false`,
        line_items: lineItems,
      });

      // Save the order in Strapi with the Stripe session ID
      await strapi
        .service("api::order.order")
        .create({ data: { products, stripeId: session.id } });

      // Return the Stripe session to the client
      return { stripeSession: session };
    } catch (error) {
      // Log the error for debugging
      console.error("Error creating Stripe session:", error);

      // Set response status and return the error
      ctx.response.status = 500;
      return { error: error.message };
    }
  },
}));
