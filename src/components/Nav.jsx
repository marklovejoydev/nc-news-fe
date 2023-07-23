import React from 'react'
import {Link} from 'react-router-dom'
export default function Nav() {
  return (
    <div>
        <nav>
			<ul className="navLinks">
				<li>
        <Link className="link" to={"/"}>
				Home
				</Link>
        <Link className="link" to={"/topics"}>
				Topics
				</Link>
        
          <p className='Username'>Username : Tickle122</p>
					
				</li>				
			</ul>
		</nav>
    </div>
  )
}
