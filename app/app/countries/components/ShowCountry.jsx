function ShowCountry({data}) {
    console.log("Este es el valor de data:",data)
    if (!data) {return (<></>)} else {
        const languages = Object.values(data.languages);
        return (
            <>
                <h2>
                    {data.name.common}
                </h2>
                <p>
                    Capital: {data.capital}
                    <br></br>
                    Area: {data.area}
                </p>
                <h3>
                    Languages
                </h3>
                <ul>
                    {languages.map((language, id) => <li key={id}>{language}</li>)}
                </ul>
                <img src={data.flags.png} alt={`Flag of ${data.name.common}`}/>
            </>
        )
    }
}

export default ShowCountry;