import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Comments from '../utils/Comments';
import Rating from '../utils/Rating';

const Orders = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [count, setCount] = useState(1);

    const state = location.state || {};

    const notifyOrder = (msg) => toast.success(msg, {
        icon: '😀',
    });

    const notifyError = (msg) => toast.error(msg);

    const placeOrder = async () => {
        try {
            const response = await fetch('/userOrders', {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pid: state.pid,
                    uid: state.uid,
                    productUrl: state.productUrl,
                    productName: state.productName,
                    productPrice: state.productPrice,
                    productType: state.productType,
                    qty: count
                })
            });

            const data = await response.json();

            if (response.status === 201) {
                notifyOrder(data.message);
                setTimeout(() => {
                    navigate('/allOrders');
                    window.location.reload();
                }, 2000);
            } else {
                notifyError(data.message);
            }
        } catch (error) {
            notifyError("Something went wrong!");
            console.error("Error placing order:", error);
        }
    };

    return (
        <>
            <div className="container d-flex justify-content-center">
                <Toaster />
                <figure className="card card-product-grid card-lg">
                    <NavLink to="#" className="img-wrap" data-abc="true">
                        <img src="https://i.imgur.com/MPqUt62.jpg" alt="Product" />
                    </NavLink>
                    <figcaption className="info-wrap">
                        <div className="row">
                            <div className="col-md-9 col-xs-9">
                                <NavLink to="#" className="title" data-abc="true">
                                    {state.productName}
                                </NavLink>
                                <span className="rated">Laptops</span>
                            </div>
                        </div>
                    </figcaption>
                    <div className="bottom-wrap-payment">
                        <figcaption className="info-wrap">
                            <div className="row">
                                <div className="col-md-9 col-xs-9">
                                    <NavLink to="#" className="title" data-abc="true">Price</NavLink>
                                    <span className="rated">for {state.productType}</span>
                                </div>
                                <div className="col-md-3 col-xs-3">
                                    <div className="rating text-right">KSH {state.productPrice}</div>
                                </div>
                            </div>
                        </figcaption>
                    </div>
                    <div className="bottom-wrap-payment">
                        <figcaption className="info-wrap">
                            <div className="row">
                                <div className="col-md-9 col-xs-9">
                                    <NavLink to="#" className="title" data-abc="true">Quantity</NavLink>
                                    <br />
                                    <i className="fas fa-plus" onClick={() => setCount(count + 1)} /> &nbsp; &nbsp;
                                    <i className="fas fa-minus" onClick={() => count > 1 && setCount(count - 1)} />
                                </div>
                                <div className="col-md-3 col-xs-3">
                                    <div className="rating text-right">{count}</div>
                                </div>
                            </div>
                        </figcaption>
                    </div>
                    <div className="bottom-wrap-payment">
                        <figcaption className="info-wrap">
                            <div className="row">
                                <div className="col-md-9 col-xs-9">
                                    <NavLink to="#" className="title" data-abc="true">Rating</NavLink>
                                </div>
                                <div className="col-md-3 col-xs-3">
                                    {state.rating ? (
                                        <div className="rating text-right">{state.rating}/5</div>
                                    ) : (
                                        <div className="rating text-right">No Ratings</div>
                                    )}
                                </div>
                            </div>
                        </figcaption>
                    </div>
                    <div className="bottom-wrap" style={{ marginBottom: '30px' }}>
                        <NavLink to="/allOrders" className="btn btn-primary float-right" data-abc="true" onClick={placeOrder}>
                            Buy now
                        </NavLink>
                        <div className="price-wrap">
                            <NavLink to="/" className="btn btn-warning float-left" data-abc="true">
                                Cancel
                            </NavLink>
                        </div>
                    </div>
                </figure>
            </div>
            <div style={{ marginTop: '20px' }}>
                <Rating pid={state.pid} />
            </div>
            <div style={{ marginTop: '20px' }}>
                <Comments pid={state.pid} uid={state.uid} />
            </div>
        </>
    );
};

export default Orders;
