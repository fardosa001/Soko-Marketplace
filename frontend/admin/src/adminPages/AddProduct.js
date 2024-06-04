import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const AddProduct = () => {
    const navigate = useNavigate();

    const [type, setType] = useState('Kg');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCategory, setProductCategory] = useState('Groceries');
    const [selectedFile, setSelectedFile] = useState(null);
    const [url, setUrl] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const notifyMessage = (msg) => toast.success(msg, {
        icon: '😀',
    });

    const getAdminData = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch('/getAdminData', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "auth": token })
            });

            const data = await res.json();
            if (res.status === 201) {
                setData(data[0]);
                setLoading(false);
            } else {
                window.alert('Something went wrong');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (d) => {
        try {
            const res = await fetch('/addProduct', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'adminId': d._id['$oid'],
                    'adminName': d.companyName,
                    'productUrl': url,
                    'productName': productName,
                    'productCategory': productCategory,
                    'productPrice': productPrice + '<=>' + type
                })
            });

            const responseData = await res.json();
            if (res.status === 201) {
                notifyMessage('Product Added Successfully!');
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                window.alert('Product Already Added!');
            }
        } catch (error) {
            console.log(error);
        }

        setSelectedFile(null);
        setProductName('');
        setProductPrice('');
    };

    const onImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        if (file) {
            setUrl(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        getAdminData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container flex '>
            <div className='col-md-6 offset-md-3 mt-2'>
                <Toaster />
                <div className="input-group mb-3 mt-3">
                    <input type="text" onChange={(e) => setProductName(e.target.value)} value={productName} className="form-control" placeholder="Enter Product Name" aria-label="Username" aria-describedby="basic-addon1" />
                </div>

                <div className="input-group">
                    <input type="number" className="form-control" onChange={(e) => setProductPrice(e.target.value)} value={productPrice} placeholder="Enter Product Price" aria-label="Text input with segmented dropdown button" />
                    <div className="input-group-append">
                        <button type="button" className="btn btn-outline-secondary">{type}</button>
                        <button type="button" className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="sr-only">Toggle Dropdown</span>
                        </button>
                        <div className="dropdown-menu">
                            <NavLink className="dropdown-item" to="#" onClick={() => { setType('Kg') }}>Kg</NavLink>
                            <NavLink className="dropdown-item" to="#" onClick={() => { setType('grams') }}>grams</NavLink>
                            <NavLink className="dropdown-item" to="#" onClick={() => { setType('Litre') }}>Litre</NavLink>
                            <NavLink className="dropdown-item" to="#" onClick={() => { setType('ml') }}>ml</NavLink>
                            <NavLink className="dropdown-item" to="#" onClick={() => { setType('each') }}>each</NavLink>
                        </div>
                    </div>
                </div>

                <div className="input-group">
                    <div className="input-group-append">
                        <span className="input-group-text">Product Category</span>
                    </div>
                    <div className="input-group-append" style={{ marginLeft: 'auto' }}>
                        <button type="button" className="btn btn-outline-secondary">{productCategory}</button>
                        <button type="button" className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="sr-only">Toggle Dropdown</span>
                        </button>
                        <div className="dropdown-menu">
                            <NavLink className="dropdown-item" to="#" onClick={() => { setProductCategory('Clothing') }}>CLOTHING</NavLink>
                            <NavLink className="dropdown-item" to="#" onClick={() => { setProductCategory('kitchenware') }}>KITCHENWARE</NavLink>
                            <NavLink className="dropdown-item" to="#" onClick={() => { setProductCategory('Electronic Accessories') }}>Electronic Accessories</NavLink>
                        </div>
                    </div>
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Upload Image</span>
                    </div>
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" onChange={onImageChange} />
                        <label className="custom-file-label">Choose file</label>
                    </div>
                </div>

                {productPrice && productName && productCategory ? (
                    <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => { handleSubmit(data) }}>Add product</button>
                ) : (
                    <button type="button" className="btn btn-secondary btn-lg btn-block " disabled>Add product</button>
                )}
            </div>
        </div>
    );
}

export default AddProduct;
