import React, { Component } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
const stripeApiPublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

const cardOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      fontFamily: "sans-serif",
    },
    invalid: {
      color: "#c23d4b",
    },
  },
};

class CheckoutForm extends Component {
  constructor() {
    super();
    this.state = {
      address: "",
    };
  }

  handleFormSubmission = (event, stripe, elements) => {
    event.preventDefault();
    stripe
      .createToken(elements.getElement(CardElement))
      .then((data) => {
        const token = data.token.id;
        const { address } = this.state;
        this.props.onCheckout({
          token,
          address,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div>
        <Elements stripe={loadStripe(stripeApiPublicKey)}>
          <ElementsConsumer>
            {({ stripe, elements }) => (
              <form onSubmit={(event) => this.handleFormSubmission(event, stripe, elements)}>
                <label htmlFor="input-address">Shipping Address</label>
                <input
                  id="input-address"
                  type="text"
                  placeholder="Your Address"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleInputChange}
                />

                <label>Credit Card details</label>
                <CardElement options={cardOptions} />

                <button>Complete Purchase</button>
              </form>
            )}
          </ElementsConsumer>
        </Elements>
      </div>
    );
  }
}

export default CheckoutForm;
