import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { add } from "../Redux/CartSlice";
import { toast } from "react-toastify";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data: products } = useSelector((state) => state.product);

  // Find the product with the matching id
  const singleProduct = products.find((product) => product.id === Number(id));

  const handleAdd = (singleProduct) => {
    dispatch(add(singleProduct));

    // Show toast notification
    toast.success("Item added to cart!");
  };

  if (!singleProduct) {
    return <h2>Product not found</h2>;
  }

  const { title, image, price, description } = singleProduct;
  return (
    <div className="container">
      <div className="row">
        <div className="card mb-3 m-auto p-4" style={{ maxWidth: "850px" }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={image}
                style={{ width: "250px", height: "250px" }}
                className="img-fluid rounded-start"
                alt="Product"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h3 className="card-title">{title}</h3>
                <br />
                <h6>Description</h6>
                <p className="card-text">{description}</p>
                <br />
                <div className="d-flex">
                  <p>
                    <b>Price</b>
                  </p>
                  <span className="card-text ms-2">${price}</span>
                </div>
                {/* Add the rest of your product details here */}
                <button
                  className="btn btn-dark"
                  onClick={() => handleAdd(singleProduct)}
                >
                  Add to Cart
                </button>
                <br />
                <NavLink to={"/"}>
                  <i className="bi bi-arrow-left fs-2 text-black"></i>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
