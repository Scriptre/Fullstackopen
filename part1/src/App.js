import { useState } from 'react'
// const Hello = (props) => {
//   console.log(props)
//   return (
//     <div>
//       <p>
//         Hello {props.name}, you are {props.age} years old
//       </p>
//     </div>
//   )
// }

// const App = () => { // React can only return 1 html, do wrapping in div is important
//   const friends = [
//     { name: 'peter', age: 4},
//     { name: 'Maya', age: 10 },
//   ]
//   return (
//     <div> 
//       <h1>Greetings</h1>
//       <Hello name= 'Maya' age= {26 +18} />
//       <p>{friends[0].name} {friends[0].age}</p>
//     </div>
//   )
// }

// --------1b Javascript------------------------------------
const x=1
let y = 5
console.log (x, y)
y += 10
console.log(x, y)
y = 'sometext'
console.log(x, y)

const t = [1, 2, 3]
const m1 = t.map(value => '<p>' + value * 2 + '</p>')
console.log(m1)   // [2, 4, 6] is printed

const t1 = [1, 2, 3, 4, 5]
const [first, second, ...rest] = t1 // Assigning variables to t

console.log(first, second)  // 1, 2 is printed
console.log(rest)          // [3, 4, 5] is printed

const object1 = {
  name: 'Arto Hellas',
  age: 35,
  education: 'PhD',
}

const object3 = {
  name: {
    first: 'Dan',
    last: 'Abramov',
  },
  grades: [2, 3, 5, 3],
  department: 'Stanford University',
}
console.log(object1.name)         // Arto Hellas is printed
const fieldName = 'age' 
console.log(object1[fieldName]) 
const lastName = 'last'
console.log(object3.name[lastName])

const sum = (p1, p2) => {
  console.log(p1)
  console.log(p2)
  return p1 + p2
}

// const square = p => {   
//   console.log(p)
//   return p * p
// }

const square = p => p*p //if a function only contains a single
                        // expression then curly braces are not necessary
const tSquared = t.map(p => p * p) // tSquared is now [1, 4, 9]

const result = sum(1,5)
console.log(result)

function product(a, b) { //
  return a * b
}
// const average = function(a, b) {   another way to declare a function
//   return (a + b) / 2
// }
const results = product(2, 6)
// result is now 12

class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  greet() {
    console.log('hello, my name is ' + this.name)
  }
}

const adam = new Person('Adam Ondra', 29)
adam.greet()

const janja = new Person('Janja Garnbret', 23)
janja.greet()

//-----1c Component state, event handlers--------
// const Hello = ({name, age}) => { //destructuring
//   const name = props.name
//   const age = props.age

//   const {name, age} = props

//   // const bornYear = () => { //Defining a function inside of a function
//   //   const yearNow = new Date().getFullYear()
//   //   return yearNow - props.age
//   // }
//   const bornYear = () => new Date().getFullYear() - age

//   return (
//     <div>
//       <p>
//         Hello {name}, you are {age} years old
//       </p>
//       <p>So you were probably born in {bornYear()}</p>
//     </div>
//   )
// }
//---------------1c--------------------------
// const Display = (props) => {
//   return (
//     <div>{props.counter}</div>
//   )
// }

// const Button = (props) => {
//   return (
//     <button onClick={props.handleClick}>
//       {props.text}
//     </button>
//   )
// }

// const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>
// const Display = ({ counter }) => <div>{counter}</div>

// const App = () => {
//   const [counter, setCounter] = useState(0)
//   console.log('rendering with counter value', counter)

//   const increaseByOne = () => {
//     console.log('increasing, value before', counter)
//     setCounter(counter + 1)
//   }

//   const decreaseByOne = () => { 
//     console.log('decreasing, value before', counter)
//     setCounter(counter - 1)
//   }

//   const setToZero = () => {
//     console.log('resetting to zero, value before', counter)
//     setCounter(0)
//   }
       
//   //on click, the arrow function is called. 
//   //For <button onClick={setCounter(counter + 1)}></button>, setCounter(counter + 1) is treated as a value
//   //It's recommended to write React components that are small and reusable across the application and even across projects
//   //<div>{counter}</div> -----> <Display counter={counter}/>
//   return (
//     <div>
//       <Display counter={counter}/>
//       <Button
//         handleClick={increaseByOne}
//         text='plus'
//       />
//       <Button
//         handleClick={setToZero}
//         text='zero'
//       />     
//       <Button
//         handleClick={decreaseByOne}
//         text='minus'
//       />           
//     </div>
//   )
// }

//------------------1d------------------------
const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({ handleClick, text }) => ( //The event handler must reference a function or be a function
// the event handler is assigned to return value from a function. onClick={() => console.log('clicked the button')}. console.log must be contained in a function
  <button onClick={handleClick}>
    {text}
  </button>
)
// const hello = (who) => { //function that returns a function can be used as event handler
//   const handler = () => {
//     console.log('hello', who)
//   }
//   return handler
// }

// const setToValue = (newValue) => () => { //Might be useful for <button onClick={setToValue(value + 1)}>increment</button>
//   console.log('value now', newValue)  // print the new value to console
//   setValue(newValue)
// }

// const Button = (props) => ( //passing event handler to child components
//   <button onClick={props.handleClick}>
//     {props.text}
//   </button>
// )
// 
  // // Do not define components inside another component(App). Instead move it out of App(props)
  // const Display = props => <div>{props.value}</div>

// const App = (props) => {
//   // ...
//   return (
//     <div>
//       {value}
//       <Button handleClick={() => setToValue(1000)} text="thousand" />
//       <Button handleClick={() => setToValue(0)} text="reset" />
//       <Button handleClick={() => setToValue(value + 1)} text="increment" />
//     </div>
//   )
// }


const App = () => {
  const [left, setLeft] = useState(0)    //Handling arrays
  const [right, setRight] = useState(0) // hooks-based state functions (useState or useEffect) must not be called
                                        // Inside a loop, a conditional expression, or any place that is not a fuction 
                                        // defining a component, so that hooks are always called in the same order
                                        // if ( age > 10 ) {
                                        //   // this does not work!
                                        //   const [foobar, setFoobar] = useState(null)
                                        // }
                                      
                                        // for ( let i = 0; i < age; i++ ) {
                                        //   // also this is not good
                                        //   const [rightWay, setRightWay] = useState(false)
                                        // }
                                      
                                        // const notGood = () => {
                                        //   // and this is also illegal
                                        //   const [x, setX] = useState(-1000)
                                        // }
  // const [clicks, setClicks] = useState({
  //   left: 0, right: 0
  // })
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)
  // const handleLeftClick = () => {
  //   const newClicks = { 
  //     left: clicks.left + 1, 
  //     right: clicks.right 
  //   }
  //   setClicks(newClicks)
  // }

  // const handleRightClick = () => {
  //   const newClicks = { 
  //     ...clicks, //object spread syntax for left: clicks.left.
  //     // "...clicks" creates a new object that has copies of all of the properties of the clicks object. 
  //     right: clicks.right + 1 
  //   }
  //   setClicks(newClicks)
  // }

  // const handleRightClick = () => //simplified form
  // setClicks({ ...clicks, right: clicks.right + 1 })

// It is forbidden to mutate state directly:
// const handleLeftClick = () => {
//   clicks.left++
//   setClicks(clicks)
// } //they need to simply be copied, which is done by copying those properties 
     //into a new object and setting that as the new state.

//   return (
//     <div>
//       {clicks.left}
//       <button onClick={handleLeftClick}>left</button>
//       <button onClick={handleRightClick}>right</button>
//       {clicks.right}
//     </div>
//   )
// }

//----Handling Arrays
const handleLeftClick = () => {
  setAll(allClicks.concat('L')) //concat does not mutate the existing array
  // // but rather returns a new copy of the array with the item added to it
  // // DO NOT USE .push because it mutates the array directly
  // console.log('left before', left)
  // setLeft(left + 1) //does not work because React happens asynchronously
  // console.log('left after', left)
  // setTotal(left + right)
  const updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft + right) 
}

const handleRightClick = () => {
  setAll(allClicks.concat('R')) 
  setRight(right + 1)
}
// .join joins all items into a single string, separated
// by the function parameter, which is an empty space
return (
  <div>
    {left}
    <Button handleClick={handleLeftClick} text='left' />
      <Button handleClick={handleRightClick} text='right' />
    {right}
    <p>{allClicks.join(' ')}</p> 
    <p>total {total}</p>
    <History allClicks={allClicks} />
  </div>
)
}

//pro tip: You can pause the execution of your application code in the 
//Chrome developer console's debugger, by writing the command debugger 
//anywhere in your code (sources tab). Alternatively you can use Scope -section.
//Highly recommended to add React developer tool extension in Chrome.
//The new developer tools tab can be used to inspect the different React elements 
//in the application, along with their state and props:

//Notes: use courses on Egghead.io: Start learning React and Beginners Guide to React
// found on part 1d. Also Official React documentation
export default App