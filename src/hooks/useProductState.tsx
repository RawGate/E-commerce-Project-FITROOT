import { RootState } from "@/tookit/store"
import React from "react"
import { useSelector } from "react-redux"

const useProductState = () => {
  const { products ,isLoading, error, } = useSelector(
    (state: RootState) => state.productR
  )

  return { products, isLoading, error }
}

export default useProductState
