import { useSelector } from "react-redux"
import { RootState } from "@/tookit/store"

const useOrderState = () => {
  const { orders, isLoading, error, order } = useSelector(
    (state: RootState) => state.orderR
  )
  return { orders, isLoading, error, order }
}

export default useOrderState
