/*import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import LoginForm from './LoginForm'
import Twitter from './Twitter'
import Error from './Error'
import {
    BrowserRouter,
    Route,
    Switch,
    NavLink,
    Redirect
} from 'react-router-dom'



class App extends React.Component{
    render(){
        return(
        <BrowserRouter>
            <div>
                    <Route path='/' component={LoginForm} exact />
                    <Route path='/twitter' component={Twitter} exact />
                    <Route component={Error}/>
            </div>
        </BrowserRouter>
        )
    }
}
    
ReactDOM.render(<App/>,document.getElementById('root'))
*/
import React, {Component} from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom'
import store from './store/store';
import SearchContainer from './containers/search-container';

import './styles/index.css'

class App extends React.Component{
    render(){
        const qwer = store.getState()
        console.log(qwer.dataReducer[5])
        return(
        <Provider store={store}>
            <SearchContainer />
        </Provider>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('root'))