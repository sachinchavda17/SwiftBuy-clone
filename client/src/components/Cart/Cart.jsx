import "./Cart.scss";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import CartItem from "./CartItem/CartItem";
import { useContext } from "react";
import { Context } from "../../utils/context";
import { loadStripe } from "@stripe/stripe-js";
import { makePaymentRequest } from "../../utils/api";

const Cart = ({ setShowCart }) => {
  const { cartSubTotal, cartItems } = useContext(Context);
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

  const handlePayment = async () => {
    try {
        const stripe = await stripePromise;
        const res = await makePaymentRequest.post("/api/orders", {
            products: cartItems,
        });
        await stripe.redirectToCheckout({
            sessionId: res.data.stripeSession.id,
        });
    } catch (err) {
        console.log(err);
    }
};

  return (
    <div className="cart-panel">
      <div className="opac-layer"></div>
      <div className="cart-content">
        <div className="cart-header">
          <div className="heading">Shopping Cart</div>
          <span className="close-btn" onClick={() => setShowCart(false)}>
            <MdClose />
            <span className="text">close</span>
          </span>
        </div>
        {cartItems?.length ? (
          <>
            <CartItem />
            <div className="cart-footer">
              <div className="subtotal">
                <span className="text">Subtotal : </span>
                <span className="text total">&#8377; {cartSubTotal} </span>
              </div>
              <div className="button" >
                <div className="checkout-cta" onClick={handlePayment} >Checkout</div>
              </div>
            </div>
          </>
        ) : (
          <div className="empty-cart">
            <BsCartX />
            <span>No Products in cart.</span>
            <button className="return-cta">RETURN TO SHOP</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
