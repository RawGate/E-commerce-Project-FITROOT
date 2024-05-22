import { RootState } from '@/tookit/store'
import React from 'react'
import { useSelector } from 'react-redux'

const useUserState = () => {
    const {users, totalPages, userData, isLoading, error, token, isLoggedIn } = useSelector(
        (state: RootState) => state.userR
    )
    
  return { users, totalPages, userData, isLoading, error, token, isLoggedIn }
}

export default useUserState