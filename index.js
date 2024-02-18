import {createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger'

// store
const store = createStore(reducer,applyMiddleware(logger.default))

// reducer
function reducer(state = {amount : 1},action)
{
    if(action.type == 'inc')
    {
        return {amount : state.amount + 1} // always return a copy of state should change existing state
    }
    if(action.type == 'dec')
    {
        return {amount : state.amount - 1} // always return a copy of state should change existing state
    }
    if(action.type == 'incBy')
    {
        return {amount : state.amount + action.payload} // always return a copy of state should change existing state
    }
    return state
}



// global state

store.subscribe(()=>
{
    console.log(store.getState())
})
// console.log(store.getState())  there is change in state subscribe will run


// Action creater
function increment()
{
    return {type : 'inc'}
}

function decrement()
{
    return {type : 'dec'}
}
function incrementBy(value)
{
    return {type : 'incBy',payload : value }
}
setInterval(()=>
{
    store.dispatch(incrementBy(5))
},5000)