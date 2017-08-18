import React from 'react'
import Token from "./Token"

import '../css/oswald.css'
import '../css/open-sans.css'
import '../css/pure-min.css'
import './Home.css'
import {Link, NavLink, Route} from "react-router-dom"

// For testing react redux routing.
const NewPage = ({match}) => {
    return (
        <div>
            <p>HOLA!</p>
        </div>)
}

export default () => (
    <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <NavLink to={"/"} className="pure-menu-heading pure-menu-link">Token Transfer Redux</NavLink>

            <ul className="pure-menu-list">
                <li className="pure-menu-item">
                    <NavLink to={"/newPage"} className="pure-menu-link">New Page</NavLink>
                </li>
            </ul>
        </nav>

        <main className="container">
            <div className="pure-g">
                <div className="pure-u-1-1">
                    <Route exact={true} path="/" component={Token}/>
                    <Route path="/newPage" component={NewPage}/>
                </div>
            </div>
        </main>
    </div>
)

