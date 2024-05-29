import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiTrashCanOutline, mdiSquareEditOutline, mdiPlusBox } from '@mdi/js';
import PropTypes from 'prop-types';

const AllProducts = ({ addButton, productName, productPrice, productType, uid, productUrl }) => {
    return (
        <>
            {addButton ? (
                <NavLink to="/addProduct" className="card-link">
                    <Icon path={mdiPlusBox} size={4} color="#0066ff" />
                </NavLink>
            ) : (
                <div className="card cardwidth">
                    <div className="card-body">
                        <p className="card-text">{productName}</p>
                        <p className="card-text">
                            <span style={{ fontWeight: 'bold' }}>₹ {productPrice}</span> for {productType}
                        </p>
                        <NavLink
                            to="/editProduct"
                            state={{ uid, productUrl, productName, productType, productPrice }}
                            className="card-link"
                        >
                            <Icon path={mdiSquareEditOutline} size={1} color="#0066ff" />
                        </NavLink>
                        <NavLink
                            to="/deleteProduct"
                            state={{ uid }}
                            className="card-link"
                        >
                            <Icon path={mdiTrashCanOutline} size={1} color="red" />
                        </NavLink>
                    </div>
                </div>
            )}
        </>
    );
};

AllProducts.propTypes = {
    addButton: PropTypes.bool,
    productName: PropTypes.string.isRequired,
    productPrice: PropTypes.number.isRequired,
    productType: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    productUrl: PropTypes.string.isRequired
};

export default AllProducts;
