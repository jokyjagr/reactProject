import Course from "../Course/Course.jsx";
import Notes from "../Course/Notes.jsx";
import {useState, useEffect} from "react";
import axios from 'axios'
import noteService from './services/notes'

const App = () => {
    const arrayNotes = [
        {
            id: 1,
            content: 'HTML is easy',
            important: true
        },
        {
            id: 2,
            content: 'Browser can execute only JavaScript',
            important: false
        },
        {
            id: 3,
            content: 'GET and POST are the most important methods of HTTP protocol',
            important: true
        }]

    const [notes, setNotes] = useState([])

    const [newNote, setNewNote] = useState('a new note...')

    const [showAll, setShowAll] = useState(true)

    const notesToShow = showAll ? notes : notes.filter(note => note.important)

    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
            // id: notes.length + 1,
        }
        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                setNewNote('')
            })
    }

    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {
                console.log(initialNotes)
                setNotes(initialNotes)
            })
    }, [])

    const toggleImportanceOf = id => {
        const url = `http://localhost:3001/notes/${id}`
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnedNote))
            }).catch(error => {
            alert(
                `the note '${note.content}' was already deleted from server`
            )
            setNotes(notes.filter(n => n.id !== id))
        })
    }

    return (
        // <div>
        //     <Course courses={courses}/>
        // </div>
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map(note =>
                    <Notes
                        key={note.id}
                        note={note}
                        toggleImportance={() => toggleImportanceOf(note.id)}/>
                )}
            </ul>
            <form onSubmit={addNote}>
                <input
                    value={newNote}
                    onChange={handleNoteChange}/>
                <button type="submit">save</button>
            </form>
        </div>

    )
}

export default App