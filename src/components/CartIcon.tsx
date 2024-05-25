import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

export const CartIcon = ({ value }: { value: number }) => {
  return (
    <div className="cart-icon">
      <FontAwesomeIcon icon={faCartShopping} />
      {value > 0 && <span className="items-number">{value}</span>}
    </div>
  )
}
