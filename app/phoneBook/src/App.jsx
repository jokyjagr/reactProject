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

    const handleNameChange = (event) => setNewName(event.target.value)
    const handleNumberChange = (event) => setNewNumber(event.target.value)
    const handleFindNameChange = (event) => setFindName(event.target.value)

    const numbersToShow = findName === ""
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(findName.toLowerCase()));

    const addNewValue = (event) => {
        event.preventDefault()

        const existingPerson = persons.find(n => n.name === newName);

        if (persons.length > 0 && existingPerson) {
            if (newNumber) {
                if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                    const personObject = {name: newName, number: newNumber}
                    updatePhone(existingPerson.id, personObject);
                }
            } else {
                alert(`${newName} is already added to phonebook`);
            }
            return false;
        }
        const personObject = {name: newName, number: newNumber}

        personService.create(personObject)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNewName('')
                setNewNumber('')
            })
    }

    const deletePerson = (id) => {
        personService.remove(id)
            .then(() => {
                setPersons(persons.filter(person => person.id !== id))
            })
            .catch(error => {
                console.log('error deleting a person:', error)
            })
    }

    useEffect(() => {
        console.log('Inside the hook')
        axios.get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }, []);

    const confirmDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this person?')) {
            deletePerson(id);
        }
    };

    const updatePhone = (id, newObject) => {
        const person = persons.find(n => n.id === id)
        const changedPerson = {...person, number: newObject.number}

        personService.update(id, changedPerson)
            .then(returnedPerson => {
                setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            }).catch(() => {
            alert(
                `Undefined error`
            )
            // setPersons(persons.filter(n => n.id !== id))
        })
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter findName={findName} handleFindNameChange={handleFindNameChange}/>
            <h2>Add new one</h2>
            <AddNewValue addNewValue={addNewValue} newName={newName} handleNameChange={handleNameChange}
                         newNumber={newNumber} handleNumberChange={handleNumberChange}/>
            <h2>Numbers</h2>
            <ListOfNumbers numbersToShow={numbersToShow} deletePerson={confirmDelete}/>
        </div>
    )
}

export default App