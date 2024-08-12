function Country(props) {
    return (
        <div>
            <h1>{props.name}</h1>
            <p>{props.capital}</p>
        </div>
    );
}

export default Country;