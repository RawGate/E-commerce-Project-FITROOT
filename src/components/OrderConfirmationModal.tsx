import React from "react"
import styles from "./OrderConfirmationModal.module.css"

interface OrderConfirmationModalProps {
  onClose: () => void
}

const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({ onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Order Placed Successfully!</h2>
        <p>Your order has been placed successfully. Thank you for shopping with us!</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  )
}

export default OrderConfirmationModal
