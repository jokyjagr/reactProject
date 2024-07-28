import {useState} from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456'},
    ])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const existedName = function (person) {
        return person.name === newName;
    }
    console.log("Este es", existedName)

    const addNewValue = (event) => {
        event.preventDefault()

        let exist = persons.filter(existedName);

        if (exist.length > 0) {
            alert(`${newName} is already added to phonebook`)
            return
        }
        const noteObject = {
            name: newName,
            number: newNumber
        }
        setPersons(persons.concat(noteObject))
        setNewName('')
        setNewNumber('')
    }

    return (
        <div>
            debug: {newName}
            <h2>Phonebook</h2>
            <form onSubmit={addNewValue}>
                <div>


                    name: <input
                    value={newName}
                    onChange={handleNameChange}/>

                    <br/>
                    number: <input
                    value={newNumber}
                    onChange={handleNumberChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
            </ul>

        </div>
    )
}

export default App