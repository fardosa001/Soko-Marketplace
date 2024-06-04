import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Rating = (props) => {
    const [hoveredStar, setHoveredStar] = useState(null);
    const [selectedRating, setSelectedRating] = useState(null);

    const notifyRatings = (msg) => toast.success(msg, {
        icon: '😀',
    });

    const submitRating = async (rating) => {
        const res = await fetch('/addRating', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'rating': rating,
                'pid': props.pid
            })
        });

        const data = await res.json();

        if (res.status === 201) {
            notifyRatings(data.message);
        } else {
            window.alert(data.message);
        }
    };

    const handleMouseOver = (index) => {
        setHoveredStar(index);
    };

    const handleMouseLeave = () => {
        setHoveredStar(null);
    };

    const handleClick = (index) => {
        setSelectedRating(index);
        submitRating(index);
    };

    return (
        <div style={{ marginTop: '60px', marginBottom: '60px' }}>
            <Toaster />
            <div className="wrap">
                <div className="stars">
                    {[1, 2, 3, 4, 5].map((index) => (
                        <label key={index} className="rate">
                            <input type="radio" name="radio1" value={`star${index}`} />
                            <div className="face"></div>
                            <i
                                className={`far fa-star star ${index}-star ${hoveredStar >= index || selectedRating >= index ? 'fas' : ''}`}
                                onMouseOver={() => handleMouseOver(index)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleClick(index)}
                            ></i>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Rating;
