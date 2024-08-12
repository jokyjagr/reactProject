function ListOfCountries({countriesToShow, showCountry}) {
    return (
        <>
            <ul>
                {countriesToShow.map((country, id) => <li key={id}>{country.name.common} <button onClick={() => showCountry(country.name.common)}>Show</button></li>)}
            </ul>
        </>
    )
}

export default ListOfCountries;