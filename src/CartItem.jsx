import React, { useState }  from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';
import './ProductList.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const handlecloseModal = () => setOpenModal(false);
  const handleOpenModal = () => setOpenModal(true);

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    const cartTotal = cart.reduce((accumulator, item) => {
        const cost = parseInt((item.cost).slice(1));
        return accumulator + (cost * item.quantity);
      }, 0);
    return usdFormatter.format(cartTotal);
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleIncrement = (item) => {
    const newObj = {...item, quantity: 1+item.quantity};
    dispatch(updateQuantity(newObj));    
  };

  const handleDecrement = (item) => {
    if(item.quantity > 0){
        const newObj = {...item, quantity: item.quantity - 1};
        dispatch(updateQuantity(newObj));        
    }        
  };
  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  const usdFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const cost = parseInt((item.cost).slice(1));
    return usdFormatter.format(cost * item.quantity);
  };
  const handleCheckout = () => {
    setModalText("The Checkout functionality is coming soon.");
    handleOpenModal();
  }

  return (
    <>
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: {calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: {calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={()=>handleCheckout()}>Checkout</button>
      </div>
    </div>
    <Modal show={openModal} onHide={handlecloseModal} className="modal">
                            <Modal.Header>
                            <Modal.Title className="w-100 text-center">{modalText}</Modal.Title>
                            </Modal.Header>
                            <Modal.Footer className="d-flex justify-content-center">                            
                            <Button className="modal-btn" variant="primary" onClick={handlecloseModal}>
                                OK
                            </Button>
                            </Modal.Footer>
    </Modal>
    </>
  );
};

export default CartItem;


