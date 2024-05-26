import React from "react"


interface OrderConfirmationModalProps {
  onClose: () => void
}

const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({ onClose }) => {
  return (
    <div>
      <div>
        <h2>Order Placed Successfully!</h2>
        <p>Your order has been placed successfully. Thank you for shopping with us!</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  )
}

export default OrderConfirmationModal
