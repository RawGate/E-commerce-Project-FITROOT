import { RootState } from '@/tookit/store'
import React from 'react'
import { useSelector } from 'react-redux'

const useUserState = () => {
    const { userData, isLoading, error, token, isLoggedIn } = useSelector(
        (state: RootState) => state.userR
    )
    
  return (
    {userData, isLoading, error, token, isLoggedIn}
  )
}

export default useUserState