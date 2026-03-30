import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProductList.css';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList() {
    const [showCart, setShowCart] = useState(false); 
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    
    // Calculate total quantity for the Navbar icon
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    const plantsArray = [
        {
            category: "Air Purifying",
            plants: [
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", cost: "$15" },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", cost: "$12" },
                { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2014/12/10/11/18/peace-lily-562854_1280.jpg", cost: "$18" },
                { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/fern-5114415_1280.jpg", cost: "$20" },
                { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", cost: "$22" },
                { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/aloe-3283030_1280.jpg", cost: "$14" }
            ]
        },
        {
            category: "Aromatic",
            plants: [
                { name: "Lavender", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", cost: "$15" },
                { name: "Rosemary", image: "https://images.unsplash.com/photo-1594140768254-257a4087bde1", cost: "$12" },
                { name: "Mint", image: "https://images.unsplash.com/photo-1588710922813-3ce17318ec7e", cost: "$10" },
                { name: "Lemon Balm", image: "https://images.unsplash.com/photo-1525498122312-42173167154a", cost: "$11" },
                { name: "Thyme", image: "https://images.unsplash.com/photo-1588710926715-68425d0f19c9", cost: "$9" },
                { name: "Basil", image: "https://images.unsplash.com/photo-1554497342-902a4901977a", cost: "$8" }
            ]
        },
        {
            category: "Easy Care",
            plants: [
                { name: "Pothos", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d", cost: "$10" },
                { name: "Succulent", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a", cost: "$12" },
                { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361", cost: "$25" },
                { name: "Cast Iron Plant", image: "https://images.unsplash.com/photo-1600411832986-5a44a182a856", cost: "$20" },
                { name: "Jade Plant", image: "https://images.unsplash.com/photo-1598935888738-20417647242c", cost: "$15" },
                { name: "Dragon Tree", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e0f", cost: "$18" }
            ]
        }
    ];

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    return (
        <div>
            <div className="navbar">
                <div className="navbar-logo">Paradise Nursery</div>
                <div className="navbar-links">
                    <a href="#" onClick={handlePlantsClick}>Plants</a>
                    <a href="#" onClick={handleCartClick} className="cart-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        <span className="cart-quantity">{totalQuantity}</span>
                    </a>
                </div>
            </div>

            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h2 className="category-title">{category.category}</h2>
                            <div className="plants-list">
                                {category.plants.map((plant, idx) => (
                                    <div key={idx} className="plant-card">
                                        <img src={plant.image} alt={plant.name} />
                                        <h3>{plant.name}</h3>
                                        <p>{plant.cost}</p>
                                        <button 
                                            disabled={cartItems.some(item => item.name === plant.name)}
                                            onClick={() => handleAddToCart(plant)}>
                                            {cartItems.some(item => item.name === plant.name) ? "Added" : "Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handlePlantsClick} />
            )}
        </div>
    );
}

export default ProductList;
