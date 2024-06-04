/* eslint-disable no-unused-vars */
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Icon from '@mdi/react';
import { mdiPlusBox } from '@mdi/js';

const AllProducts = (props) => {
    const navigate = useNavigate(); // Keeping navigate in case you need to use it later

    const notifyCart = (msg) => toast.success(msg);
    const notifyError = (msg) => toast.error(msg);

    const addtoCart = async () => {
        const res = await fetch('/addtoCart', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'pid': props.pid,
                'uid': props.uid,
                'productUrl': props.productUrl,
                'productName': props.productName,
                'productPrice': props.productPrice,
                'productType': props.productType
            })
        });

        const data = await res.json();

        if (res.status === 201) {
            notifyCart(data.message);
        } else {
            notifyError(data.message);
        }
    };

    return (
        <>
            <Toaster />
            {props.addButton ?
                <>
                    <NavLink to='/addProduct' className="card-link">
                        <Icon path={mdiPlusBox} size={4} color="#0066ff" />
                    </NavLink>
                </>
                :
                <>
                    <NavLink to={{
                        pathname: '/orders',
                        state: {
                            pid: props.pid,
                            uid: props.uid,
                            productUrl: props.productUrl,
                            productName: props.productName,
                            productType: props.productType,
                            productPrice: props.productPrice,
                            rating: props.rating
                        }
                    }} style={{ color: 'black' }}>
                        <div className="card cardwidth">
                            {/* Removed redundant alt text */}
                            {/* <img className="card-img-top imagestyle" src={props.productUrl} alt={props.productName} /> */}
                            <div className="card-body">
                                <p className="card-text">{props.productName}</p>
                                <p className="card-text"><span style={{ fontWeight: 'bold' }}>Ksh {props.productPrice}</span> for {props.productType}</p>
                                <NavLink to='/' className="card-link" onClick={addtoCart}>
                                    <p>ADD TO CART</p>
                                </NavLink>
                            </div>
                        </div>
                    </NavLink>
                </>
            }
        </>
    );
}

export default AllProducts;
