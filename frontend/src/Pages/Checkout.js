```jsx
import React from "react";

function Checkout() {
  return (
    <div>
      <h1>Checkout</h1>

      <p>Complete your order from Dress Shop.</p>

      <form>
        <input
          type="text"
          placeholder="Full Name"
        />
        <br />
        <br />

        <input
          type="email"
          placeholder="Email Address"
        />
        <br />
        <br />

        <input
          type="text"
          placeholder="Shipping Address"
        />
        <br />
        <br />

        <input
          type="text"
          placeholder="City"
        />
        <br />
        <br />

        <input
          type="text"
          placeholder="Phone Number"
        />
        <br />
        <br />

        <button type="submit">
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
```
