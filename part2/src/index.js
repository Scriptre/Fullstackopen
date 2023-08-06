import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import axios from 'axios'
import './index.css'

//Creating a promise object is unecessary
const promise = axios.get('http://localhost:3001/notes')
console.log(promise)

// promise.then(response => {
//   console.log(response)
// }) //then method is used to access the result of the operation represented by promise

// const promise2 = axios.get('http://localhost:3001/foobar')
// console.log(promise2)

// axios //Access data directly by chaining instead of binding to an object. This can be somwhat problematic. hint: use effect-hooks in App.js
//   .get('http://localhost:3001/notes')
//   .then(response => {
//   const notes = response.data
//   ReactDOM.createRoot(document.getElementById('root')).render(<App notes={notes} />)
//   console.log(notes)
// }) 

//The Effect Hook lets you perform side effects on function components. 
//Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects.

// const notes = [
//   {
//     id: 1,
//     content: 'HTML is easy',
//     important: true
//   },
//   {
//     id: 2,
//     content: 'Browser can execute only JavaScript',
//     important: false
//   },
//   {
//     id: 3,
//     content: 'GET and POST are the most important methods of HTTP protocol',
//     important: true
//   }
// ]

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <App notes={notes} />
// )

ReactDOM.createRoot(document.getElementById('root')).render(<App />) //modified because we are accessing data from db.json