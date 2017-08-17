import React from 'react'
import Token from "./Token"

import '../css/oswald.css'
import '../css/open-sans.css'
import '../css/pure-min.css'
import './Home.css'

export default () => (
    <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Token Transfer Redux</a>

            <ul className="pure-menu-list">
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">New Page</a></li>
            </ul>
        </nav>

        <main className="container">
            <div className="pure-g">
                <div className="pure-u-1-1">
                    <Token/>
                </div>
            </div>
        </main>
    </div>
)