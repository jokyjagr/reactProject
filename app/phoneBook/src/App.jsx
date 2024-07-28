import {useState} from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])

    const [newName, setNewName] = useState('')
    const [findName, setFindName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFindNameChange = (event) => {
        console.log("Before setFindName", findName)
        setFindName(event.target.value)
        console.log("After setFindName", findName)
    }

    const numbersToShow = findName === ""
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(findName.toLowerCase()));

    const existedName = function (person) {
        return person.name === newName;
    }

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
            <h2>Phonebook</h2>
            filter chown with: <input
            value={findName}
            onChange={handleFindNameChange}/>

            <h2>Add new one</h2>
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
                {numbersToShow.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
            </ul>

        </div>
    )
}

export default App