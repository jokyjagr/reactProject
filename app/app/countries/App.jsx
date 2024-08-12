import { useState, useEffect } from "react";
import Country from "./components/Country.jsx";
import Filter from "./components/Filter.jsx";
import countriesServices from "./services/countries";
import ListOfCountries from "./components/ListOfCountries.jsx";
import Notification from "../components/Notification.jsx";
import './index.css';
import ShowCountry from "./components/ShowCountry.jsx";

const App = () => {
    const [countries, setCountries] = useState(null);
    const [search, setSearch] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [warningMessage, setWarningMessage] = useState(null);
    const [countriesToShow, setCountriesToShow] = useState([]);
    const [countryToShow, setCountryToShow] = useState('');
    const [dataCountry, setDataCountry] = useState('');

    console.log('Rendering the App component 1');
    useEffect(() => {
        console.log('Inside the hook 1');
        countriesServices.getAll().then(data => {
            console.log('Promise fulfilled ', data);
            setCountries(data);
        });
    }, []);

    useEffect(() => {
        console.log('Inside the hook 3');
        if (countryToShow) {
            console.log('Buscando:', countryToShow);
            countriesServices.getByParams(countryToShow).then(data => {
                console.log('Promise fulfilled ', data);
                setDataCountry(data);
            });
        }
    }, [countryToShow]);

    console.log('Rendering the App component 2');
    useEffect(() => {
        console.log('Inside the hook 2');
        if (countries && search) {
            console.log('Buscando:', search);
            const result = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()));
            const total = result.length;
            console.log('Total:', total);
            if (total === 1) {
                handleMessages(' ', '');
                setCountriesToShow(result);
                setCountryToShow(result[0].name.common);
            } else if (total >= 2 && total <= 10) {
                handleMessages(' ', '');
                setCountriesToShow(result);
            } else if (result.length > 10) {
                handleMessages('Too many matches, specify another filter', 'warning');
                setCountriesToShow([]);
            } else {
                handleMessages('Too many matches, specify another filter', 'warning');
                setCountriesToShow([]);
            }
        }
    }, [search]);

    console.log('Rendering the App component 3');
    const handleFindChange = (event) => setSearch(event.target.value);

    console.log('Rendering the App component 4');
    const handleMessages = (message, type) => {
        if (!message) {
            return null;
        }
        if (type === 'error') {
            setErrorMessage(`Error: ${message}`);
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        } else if (type === 'success') {
            setSuccessMessage(`Success: ${message}`);
            setTimeout(() => {
                setSuccessMessage(null);
            }, 5000);
        } else if (type === 'warning') {
            setWarningMessage(`Warning: ${message}`);
            setTimeout(() => {
                setWarningMessage(null);
            }, 5000);
        } else {
            setErrorMessage(null);
            setSuccessMessage(null);
            setWarningMessage(null);
        }
        console.log("This is the message:", message);
    };

    console.log('Rendering the App component 5');

    const handleShowCountry = (country) => {
        console.log('Show:', country);
        setCountryToShow(country);
    };
    return (
        <div>
            <Notification message={errorMessage} classStyle={'error'} />
            <Notification message={successMessage} classStyle={'success'} />
            <Notification message={warningMessage} classStyle={'warning'} />
            <Filter text={`find countries`} findValue={search} handleFindChange={handleFindChange} />
            <ListOfCountries countriesToShow={countriesToShow} showCountry={handleShowCountry}/>
            <ShowCountry data={dataCountry} />
        </div>
    );
};

export default App;