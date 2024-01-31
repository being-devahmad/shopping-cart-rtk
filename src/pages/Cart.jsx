import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { remove } from "../Redux/CartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const handleRemove = (id) => {
    dispatch(remove(id));
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-8 m-auto">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="border d-flex justify-content-around p-3 mb-3"
              >
                <img
                  src={item.image}
                  style={{ width: "50px", height: "50px" }}
                />
                <div>{item.title.slice(0, 20)}</div>
                <div>${item.price}</div>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-dark"
                    // onClick={() => removeFromCart(item.id)}
                    onClick={() => handleRemove(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <NavLink to={"/"} className="btn btn-dark mt-3">
            Continue shopping
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Cart;
