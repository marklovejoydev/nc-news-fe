import React, { useState } from 'react'

export default function Expanding({children}) {
    const [isShowing, setIsShowing] = useState(false)

    const toggleShowing = () => {
        setIsShowing((currentIsShowing)=>{
            return !currentIsShowing
        })
    }
  return (
    <div>
        <button onClick={toggleShowing}>Filter</button>
        {isShowing && children}
    </div>
  )
}
