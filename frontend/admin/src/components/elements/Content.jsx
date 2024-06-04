const Content = () => {
    return (
        <section className="content">
            {/* hero-section */}
            <div className="hero-bg">
                <div>
                    <div className="hero-text">
                        <h1 className="cta">GET THE NEW IPHONE<br/>15 SERIES</h1>
                        <p className="caption">A transformative triple‑camera system that adds tons of capability without complexity</p>
                    </div>

                    <div className="cta-btns">
                        <button className="buynow">Buy Now</button>
                        <button className="tradein">Trade-in With $599</button>
                    </div>
                </div>

                <div className="iPhone"></div>
            </div>

          {/* top-categories  */}
          <div className="top-category">
            <div className="tc-header">
                <h1 className="tc-title">Top Categories</h1>
                <p className="tc-subtitle">We offer a wide rage of products that suit your needs</p>
            </div>

            <div className="category-cards">
                <div className="card-1"></div>
                <div className="card-2">
                    <div className="card-2A"></div>
                    <div className="card-3">
                        <div className="card-3A"></div>
                        <div className="card-3B"></div>
                    </div>
                </div>
            </div>
          </div>

          {/* trends */}
          <div className="trends">
            <h1 className="trend-title">Now Trending</h1>
            <div className="trend-cards">
                <div className="trend-card-1"></div>
                <div className="trend-card-2"></div>
                <div className="trend-card-3"></div>
                <div className="trend-card-4"></div>
            </div>

          </div>

          {/* new-arrivals */}
            <div className="new-arrivals">
                <h1 className="na-title">New Arrivals</h1>
                <div className="na-cards">
                    <div className="na-card-1">
                        <div className="na-card-1A"></div>
                        <div className="na-card-2">
                            <div className="na-card-2A"></div>
                            <div className="na-card-2B"></div>
                        </div>
                    </div>
                    <div className="na-card-3"></div>
                </div>
            </div>

          {/* why-choose-us */}

          {/* testimonials */}
            <div className="testimonials">
                <h1 className="testimonials-title">Testimonials</h1>
                <div className="testimonials-cards">
                    <div className="testimonials-card-1"></div>
                    <div className="testimonials-card-2"></div>
                    <div className="testimonials-card-3"></div>
                </div>
            </div>

        </section>
    );
};

export default Content