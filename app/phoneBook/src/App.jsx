import {useState, useEffect} from "react";
import axios from 'axios'
import Filter from "./components/Filter.jsx";
import AddNewValue from "./components/AddNewValue.jsx";
import ListOfNumbers from "./components/ListOfNumbers.jsx";
import personService from './services/persons';
import Notification from "./components/Notification.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [findName, setFindName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null);

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
                setSuccessMessage(`Added ${returnedPerson.name}`);
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 5000);
            })
    }

    const deletePerson = (id) => {
        personService.remove(id)
            .then(() => {
                setPersons(persons.filter(person => person.id !== id))
            })
            .catch(error => {
                const name = persons.find(person => person.id === id).name;
                setErrorMessage(`Error deleting ${name}`);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
                console.log("This is the error:", error);
            })
    }

    useEffect(() => {
        console.log('Inside the hook')
        axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
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
                setNewName('')
                setNewNumber('')
                setSuccessMessage(`Update ${returnedPerson.name}`);
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 5000);
            }).catch(() => {
            setErrorMessage(
                `Undefined error occurred while updating the phone number of ${changedPerson.name}`
            )
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        })
    }

    return (
        <div>
            <Notification message={errorMessage} classStyle={'error'} />
            <h2>Phonebook</h2>
            <Notification message={successMessage} classStyle={'success'} />
            <Filter findName={findName} handleFindNameChange={handleFindNameChange}/>
            <h2>Add new one</h2>
            <AddNewValue addNewValue={addNewValue} newName={newName} handleNameChange={handleNameChange}
                         newNumber={newNumber} handleNumberChange={handleNumberChange}/>
            <h2>Numbers</h2>
            <ListOfNumbers numbersToShow={numbersToShow} deletePerson={confirmDelete}/>
            <Footer/>

        </div>
    )
}

export default App