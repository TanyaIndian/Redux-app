import {createStore,applyMiddleware, combineReducers} from 'redux'
import logger from 'redux-logger'
import axios from 'axios'
import { thunk } from 'redux-thunk'

// action name constant

const inc = 'account/inc';
const dec = 'account/dec';
const incBy = 'account/incBy';
const incBonus = 'bonus/inc';
const decBonus = 'bonus/dec';
// to handle Api properly
const getAccUserPending = 'account/getUser/pending';
const getAccUserFulFilled = 'account/getUser/fulfilled';
const getAccUserRejected = 'account/getUser/rejected';


// store
// if two reducer need to use combineReducer otherwise just write the name of reducer if only 1
const store = createStore(combineReducers({account : amountReducer,bonus : bonusReducer}),applyMiddleware(logger.default,thunk))

// reducer
function amountReducer(state = {amount : 1},action)
{
    if(action.type == inc)
    {
        return {amount : state.amount + 1} // always return a copy of state should change existing state
    }
    if(action.type == dec)
    {
        return {amount : state.amount - 1} // always return a copy of state should change existing state
    }
    if(action.type == incBy)
    {
        return {amount : state.amount + action.payload} // always return a copy of state should change existing state
    }
    if(action.type == getAccUserFulFilled)
    {
        return {amount : action.payload, pending : false} // always return a copy of state should change existing state
    }
    if(action.type == getAccUserRejected)
    {
        return {...state, error : action.error, pending : false}
    }
    if(action.type == getAccUserPending)
    {
        return {...state, pending : true}
    }
    return state
}

function bonusReducer(state = {points : 0},action)
{
    
    if(action.type == incBy)
    {
        if(action.payload >= 100)    //if amount > 100 point will get inc by 1 because incBy is written in both the reducer
        return {points : state.points + 1} 
        
    }
    if(action.type == incBonus)
    {
        return {points : state.points + 1}
    }
    if(action.type == decBonus)
    {
        return {points : state.points - 1}
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

 function getUser(id)
 {
return async (dispatch,getState)=>
{
    try
    {
         dispatch(getAccUserPendingFn())
        const {data} = await axios.get(`http://localhost:3000/account/${id}`)
        //  console.log(data)
         dispatch(getAmountUerFullFilledFn(data.amount))
    }
    catch(error)
    {
       dispatch(getAmountUerrejectedFn(error.message))
    }
    
}

    
}


function getAmountUerFullFilledFn(value)
{
    return {type : getAccUserFulFilled, payload : value}
}
function getAccUserPendingFn()
{
    return {type : getAccUserPending}
}

function getAmountUerrejectedFn(error)
{
    return {type : getAccUserRejected, error : error}
}

function increment()
{
    return {type : inc}
}
function incrementBonus()
{
    return {type : incBonus}
}

function decrement()
{
    return {type : dec}
}
function incrementBy(value)
{
    return {type : incBy,payload : value }
}
setInterval(()=>
{
    // store.dispatch(incrementBy(100))
    // store.dispatch(incrementBonus())
    store.dispatch(getUser(1))


},5000)