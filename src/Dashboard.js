import React from 'react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
<>
<div className='dash'>
<h1>
Welcome to Dashboard
  
  </h1>  
  <Link className="logout" to="/">Logout</Link>
  </div>

</>  )
}
