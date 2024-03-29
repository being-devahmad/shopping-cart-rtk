import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { remove } from "../Redux/CartSlice";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems);

  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {})
  );

  const handleRemove = (id) => {
    dispatch(remove(id));

    toast.error("Item removed from cart!");
  };

  const decrement = (id) => {
    if (quantities[id] > 1) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [id]: prevQuantities[id] - 1,
      }));
    }
  };

  const increment = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: prevQuantities[id] + 1,
    }));
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + quantities[item.id] * item.price,
    0
  );

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 m-auto">
            {cartItems.map((item) => {
              const { id, image, title, price } = item;
              return (
                <div
                  key={id}
                  className="border d-flex justify-content-around align-items-center p-3 mb-3"
                >
                  <img src={image} style={{ width: "50px", height: "50px" }} />
                  <div>{title.slice(0, 20)}</div>
                  <div>${price}</div>
                  <div className="d-flex items-center align-items-center gap-2">
                    <button
                      className="btn btn-dark"
                      onClick={() => decrement(id)}
                    >
                      -
                    </button>
                    <span>{quantities[id]}</span>
                    <button
                      className="btn btn-dark"
                      onClick={() => increment(id)}
                    >
                      +
                    </button>
                  </div>

                  <i
                    class="bi bi-x-lg"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleRemove(id)}
                  ></i>
                </div>
              );
            })}
          </div>
          <div className="col-lg-4">
            <div className="border py-2 px-3 mb-3">
              <div>
                <h3>Order Summary</h3>
                <div className="border d-flex">
                  <h4 className="me-5">Total</h4>
                  <h4 className="ps-5">${totalAmount}</h4>
                </div>
                <div>
                  <NavLink to="/">
                    <button className="btn btn-primary mt-5 w-100">
                      Proceed to shopping
                    </button>
                  </NavLink>
                </div>
                <div>
                  <button
                    className="btn btn-danger mt-5 w-100"
                    // onClick={checkout}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
