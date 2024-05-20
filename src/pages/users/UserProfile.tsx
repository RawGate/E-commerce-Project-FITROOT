import UserSidebar from '@/components/layout/sidebars/UserSidebar'
import React from 'react'

export const UserProfile = () => {
  return (
    <div className="user__container">
      <UserSidebar />
      <div>user info</div>
    </div>
  )
}

