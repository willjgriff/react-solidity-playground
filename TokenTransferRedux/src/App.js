import React from 'react'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import Home from "./layout/Home"

const App = () => (

    <div className="App">

        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Token Transfer Redux Playground</a>
        </nav>

        <main className="container">
            <div className="pure-g">
                <div className="pure-u-1-1">

                    <Home/>

                </div>
            </div>
        </main>

    </div>
)

export default App
