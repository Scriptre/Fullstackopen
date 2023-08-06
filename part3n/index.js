// const http = require('http') //imports Node's built-in web server
// //similar to import http fromm 'http'
//express has a better interface than node

const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json()) //activates json-parser to make accessing data easy

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]


  const generateId = () => { //for unique id
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      //notes.map(n => n.id) creates a new array that contains all the ids of the notes. 
      //Math.max returns the maximum value of the numbers that are passed to it. 
      //However, notes.map(n => n.id) is an array so it can't directly be given as a parameter to Math.max. 
      //The array can be transformed into individual numbers by using the "three dot" spread syntax ...
      : 0
    return maxId + 1
  }
  
  app.post('/api/notes', (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note = {
      content: body.content,
      important: body.important || false,
      id: generateId(),
    }
  
    notes = notes.concat(note)
  
    response.json(note)
  })

  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>') //send method responds to http request by
    //sending hello world! Content-Type header automatically text/html
  })

  app.get('/api/notes', (request, response) => {
    response.json(notes)
  })

  app.get('/api/notes/:id', (request, response) => {//This is a route. Define parameter with colon, :id
    //app.get('/api/notes/:id', ...) will handle all HTTP GET requests that are of the 
    //form /api/notes/SOMETHING, where SOMETHING is an arbitrary string.
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id) // === does not consider '1' and 1 the same
  
    if (note) {
      response.json(note) //stringify happens automatically
    } else {
      response.status(404).end()
    }
  
    response.json(note)
  })

  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
  })
  

//   const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'text/plain' })
//     response.end('Hello World')
//   })

//   const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json' }) //application/json informs the reciever that
//     //the data is in JSON format
//     response.end(JSON.stringify(notes))
//   }) //this is node framework which isnt ideal so we are using express

// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)

// const PORT = 3001
const PORT = process.env.PORT || 3001 //use this when deploying on heroku, render, or flyio
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
//3b