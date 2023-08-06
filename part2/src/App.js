//--------------2a------------------------
import Note from './components/Note.js' // ./ refers to the current directory. Import Note, where Note is the function in the file
// filename extension .js can be omitted. Note.js should share the name of the function
//Functional programming operator of JavaScript array
//find, filter, map, and reduce. Snippets extension might be worth adding
//A whole React application can be written in a single file. Although that is, of course, not very practical.
//which is why we have index.js and app.js
// const Note = ({ note }) => (<li>{note.content}</li>) //() contains what's returned. {} to add more than 1 line
//import const Note from components/Notes.js. I think Notes.js must be capitalized

//consol.log method is the best way to fix bugs. More experience React programmers use consol.log more often.
//Quite often the root of the problem is that the props are expected to be of a different type, or called with a different 
//name than they actually are, and destructuring fails as a result.

//-------------2b----------------------------
// import { useState } from 'react'

//-------------2c----------------------------
import { useState, useEffect } from 'react'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'



const App = () => {   //(props) -> ({notes}) is destructuring. Also remember JS functions must be capitalized
  // const { notes } = props //You need this line if props is used
  // javascript in JSX(below) must be wrapped in curly braces
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(
    'a new note...'
  )  //controlled components
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const toggleImportanceOf = id => {
    const url = `http://localhost:3001/notes/${id}` //defines the unique URL for each note resource based on its id.
    const note = notes.find(n => n.id === id) //find the note we want to modify, and we then assign it to the note variable
    const changedNote = { ...note, important: !note.important } //{ ...note } creates a new object with copies of all the properties from the note object.
    //! negates the current status
    // axios.put(url, changedNote).then(response => {
    //   setNotes(notes.map(n => n.id !== id ? n : response.data))
    //   console.log(response)
    // })//new note is sent with a put request to the backend to replace the old object
    // //this is a shallow copy menaing the values of the new object is the same as the old object
    noteService
        .update(id, changedNote).then(returnedNote => {
          setNotes(notes.map(note => note.id !== id ? note : returnedNote))
        })
        .catch(error => {
          setErrorMessage(
            `Note '${note.content}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setNotes(notes.filter(n => n.id !== id))
        })
  } //catch method is used to handle rejected promises

  const deleteNote = id => {
    const note = notes.find(n=> n.id ===id)
    const updateNoteId = {...notes}
    for(let i=0; i<updateNoteId.length; i++){
    updateNoteId[i].id = i+1}
    
    console.log(updateNoteId)
    console.log(`Note Id:${note.id} has been deleted`)


    noteService.deleter(id).then(returnedNote => {
      setNotes(notes.filter(n => n.id !== id))
    }).catch(error => {console.log('something wrong')})
    
  }


  // const addNote = (event) => { //event is the click that triggers the function
  //   event.preventDefault() //keeps form from automatically submitting
  //   console.log('button clicked', event.target) // <form>_</form>
  // }
 
    // console.log('effect') //before implementing single responsibility principle
    // axios
    //   .get('http://localhost:3001/notes') //axios.get fetches data from the server and registers the function response =>... as an eent handler
    //   .then(response => {
    //     console.log('promise fulfilled')
    //     setNotes(response.data)
    //   })
    useEffect(() => {
      noteService
        .getAll()
        .then(initialNotes => {
          setNotes(initialNotes)
        })
    }, [])

  console.log('render', notes.length, 'notes')
  //useEffect(function, []). useEffect takes two parameters. The first is a function, the effect itself.
  //The second is used to specify how often the effect is run (defaults to first render)
  

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    const updatedNote = {...notes}
    // axios
    // .post('http://localhost:3001/notes', noteObject) //the object is send to the server via post method
    // .then(response => {
    //   setNotes(notes.concat(response.data)) //new note is returned from backend server to list of notes in application's state
    //   //using setNotes, 
    //   setNewNote('')//then resetting the note creation form
    //   console.log(response)
    // })
    
    noteService
      .create(noteObject)
        .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      }).catch(error =>{
        console.log('error with adding notes')
        // setNotes(notes.filter(note => note.id =! ))
      })

    
  }


  const notesToShow = showAll //if showAll is true, then return notes. Otherwise false (showAll→notes; not exactly discrete math)
    ? notes
    : notes.filter(note => note.important) //can write note => note.important === true, but it would be redundant. "===" -strict equality; "==" — loose equality

  const handleNoteChange = (event) => { //dont need event.preventDefault() because <input /> does not have the same properties as <form />
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  
  return (  
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {/* 
        <li>{notes[0].content}</li> //express these with map function
        <li>{notes[1].content}</li> //map method must each have unique key values an attribute called key within <li>
        <li>{notes[2].content}</li> //otherwise you get an unique key error
        //map always creates a new array which great because its not mutating code
        */}
      
        {/* {notes.map(note => 
        <li key={note.id}>
          {note.content}
          </li>
        )} //before destructuring*/}

        {notesToShow.map(note => 
          <Note 
          key={note.id} 
          note={note}
          toggleImportance={() => toggleImportanceOf(note.id)}
          deleteNote={() => deleteNote(note.id)}
           />
        )}
      
      </ul>
      <form onSubmit={addNote}>
      <input value={newNote} onChange={handleNoteChange}/>
      
        <button type="submit">save</button>
      </form>   
      <Footer />
      <Notification />
    </div>
  )
}

//Part 2c
//npm install -g json-server  //json=server is now installed so you dont have to install again
//json-server --port 3001 --watch db.json
//react uses port 3000, so json-server should use 3001
//db.json should be a file in dir Part2
//fetch and axios are external libraries (npm packages) and are the modern ways to communicate between browser and server
//axios is used in this course
//npm (node package manager) is being used if there is a package.json file at the root of the project
//npm install axios //npm-commands should always be run in the project root directory where package.json can be found
//axios dependency code can be found in node_modules
//Install json-server as a development dependency (only used during development) with npm install json-server --save-dev
//For convienience, add under package.json in "scripts" >> "server": "json-server -p3001 --watch db.json"
//run react and json-server simultaneously with 2 terminals
//import axios into index.js along with promise scripts
//A Promise is an object representing the eventual completion or failure of an asynchronous operation. Can have 3 states: pending, fulfilled, and rejected
//What is happening:
//The browser gets javascript from React dev server which is the application that runs after running the command npm start
//The dev-server transforms the javaSipt into a format uderstood by the browser and additionally stitches together Javascript from different files into one.
//The React application running the browser fethes the JSON formatted data from json-server on port 3001.
//Json-server gets its data from db.json
//The second parameter of useEffect is used to specify how often the effect is run. If the second parameter is an empty array [], then the effect is only run 
//along with the first render of the component.

//make sure your to npm start and npm run server on 2
//seperate terminals

//Ongoing 2d
//Cleaner Syntax for Defining Object Literals

export default App