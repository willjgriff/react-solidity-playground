import React from 'react'
import Home from "./layout/Home.js"
import store from "./redux/store"
import {Provider} from "react-redux"

const App = () => (
    <Provider store={store}>
        <Home/>
    </Provider>
)

export default App
