import {useState, useEffect} from "react";
import axios from 'axios'
import Filter from "./components/Filter.jsx";
import AddNewValue from "./components/AddNewValue.jsx";
import ListOfNumbers from "./components/ListOfNumbers.jsx";
import personService from './services/persons';

const App = () => {
    const [persons, setPersons] = useState([])

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
        personService
            .create(noteObject)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNewName('')
                setNewNumber('')
            })

    }

    const hook = () => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }
    console.log('render', persons.length, 'notes')
    useEffect(hook, []);

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter findName={findName} handleFindNameChange={handleFindNameChange}/>

            <h2>Add new one</h2>
            <AddNewValue addNewValue={addNewValue} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>

            <h2>Numbers</h2>
            <ListOfNumbers numbersToShow={numbersToShow}/>
        </div>
    )
}

export default App