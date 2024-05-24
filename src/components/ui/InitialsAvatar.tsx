import React from "react"
import "@/index.css"

interface InitialsAvatarProps {
  name: string
  className?: string
}

const getInitials = (name: string): string => {
  const nameArray = name.split(" ")
  if (nameArray.length === 1) {
    return nameArray[0][0].toUpperCase()
  } else {
    return (nameArray[0][0] + nameArray[1][0]).toUpperCase()
  }
}

const InitialsAvatar: React.FC<InitialsAvatarProps> = ({ name, className }) => {
  const initials = getInitials(name)

  return <div className={`initials-avatar ${className}`}>{initials}</div>
}

export default InitialsAvatar
