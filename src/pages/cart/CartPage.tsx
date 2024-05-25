import React from "react"
import useCartState from "@/hooks/useCartState"
import { useDispatch } from "react-redux"
import {
  DecreaseQuantity,
  IncreaseQuantity,
  removeAllFromCart,
  removeFromCart
} from "@/tookit/slices/CartSlice"
import { useNavigate } from "react-router-dom"
import styles from "./cart.module.css"
import useUserState from "@/hooks/useUserState"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons"

export const CartPage = () => {
  const { cartItems } = useCartState()
  const { userData, isLoggedIn } = useUserState()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const TAXES = 4.87 
  const SHIPPING = 6.87 

  const handleRemoveAllItems = () => {
    dispatch(removeAllFromCart())
  }

  const handleRemoveItem = (productId: string) => {
    if (productId) {
      dispatch(removeFromCart(productId))
    }
  }

  const calculateSubtotal = () => {
    let subtotal = 0
    cartItems && cartItems.map((cartItem) => (subtotal += cartItem.price * cartItem.orderQuantity))
    return subtotal.toFixed(2)
  }

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal())
    const total = subtotal + TAXES + SHIPPING
    return total.toFixed(2)
  }

  const handleDecreaseQuantity = (productId?: string) => {
    if (productId) {
      dispatch(DecreaseQuantity(productId))
    }
  }

  const handleIncreaseQuantity = (productId?: string) => {
    if (productId) {
      dispatch(IncreaseQuantity(productId))
    }
  }

return (
  <div className={styles.cart}>
    {cartItems && cartItems.length > 0 ? (
      <>
        <div className={styles.cart_heading}>
          <h2>Shopping Cart</h2>
          <button onClick={handleRemoveAllItems}>
            {" "}
            <FontAwesomeIcon icon={faTrash} />
            Remove all items
          </button>
        </div>
        <div className={styles.cart_body}>
          <div className={styles.cart_items}>
            {cartItems.map((cartItem) => (
              <div className={styles.cart_item} key={cartItem.productId}>
                <div className={styles.cart_item_left}>
                  <img src={cartItem.image} alt={cartItem.name} />
                </div>
                <div className={styles.cart_item_center}>
                  <p>{cartItem.name}</p>
                  <p>Stock: {cartItem.stock}</p>
                </div>
                <div className={styles.cart_item_right}>
                  <div className={styles.quantity_btn}>
                    <button
                      onClick={() => {
                        handleDecreaseQuantity(cartItem.productId)
                      }}
                    >
                      -
                    </button>
                    <span>{cartItem.orderQuantity}</span>
                    <button
                      onClick={() => {
                        handleIncreaseQuantity(cartItem.productId)
                      }}
                      disabled={cartItem.stock === cartItem.orderQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className={styles.cart_item_price}>${cartItem.price.toFixed(2)}</div>
                <div className={styles.cart_item_btn}>
                  <button
                    onClick={() => {
                      handleRemoveItem(cartItem.productId)
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.order_summary}>
            <div className={styles.summary_details}>
              <h2 className={styles.summary_title}>Summary</h2>
              <div className={styles.summary_row}>
                <span>Items {cartItems.length}</span>
                <span>${calculateSubtotal()}</span>
              </div>
              <div className={styles.summary_row}>
                <span>Shipping</span>
                <span>${SHIPPING.toFixed(2)}</span>
              </div>
              <div className={styles.summary_row}>
                <span>Taxes</span>
                <span>${TAXES.toFixed(2)}</span>
              </div>
              <div className={styles.summary_total}>
                <span>Total Price</span>
                <span>${calculateTotal()}</span>
              </div>
              {isLoggedIn ? (
                <div>
                  <p>{userData && userData.address}</p>
                  <button className={styles.checkout_button}>Checkout</button>
                </div>
              ) : (
                <div>
                  <p>Login to proceed with payment</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.back_to_shop}>
          <button onClick={() => navigate("/")}>
            {" "}
            <FontAwesomeIcon icon={faCircleArrowLeft} />
            Back to shop
          </button>
        </div>
      </>
    ) : (
      <p>No items in the cart</p>
    )}
  </div>
)

}
