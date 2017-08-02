import React from 'react'
import YoutubeTokenInterfaceContainer from './tokenInterface/YoutubeTokenInterface.js'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

export default () => {
    return (
        <div className="App">
            <nav className="navbar pure-menu pure-menu-horizontal">
                <a href="#" className="pure-menu-heading pure-menu-link">Basic Contract Interface</a>
            </nav>

            <main className="container">
                <div className="pure-g">
                    <div className="pure-u-1-1">
                        <YoutubeTokenInterfaceContainer />
                    </div>
                </div>
            </main>
        </div>
    );
}
