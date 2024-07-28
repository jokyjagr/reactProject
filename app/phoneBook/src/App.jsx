import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])

    const [newName, setNewName] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const addName = (event) => {
        event.preventDefault()
        const noteObject = {
            name: newName
        }
        setPersons(persons.concat(noteObject))
        setNewName('')
    }

    return (
    <div>
        debug: {newName}
        <h2>Phonebook</h2>
            <form onSubmit={addName}>
                <div>
                    <ul>
                        {persons.map(person => <li key={person.name}>{person.name}</li>)}
                    </ul>
                    name: <input
                    value={newName}
                onChange={handleNameChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            ...
        </div>
    )
}

export default App