function ListOfNumbers({numbersToShow, deletePerson}) {
    return (
        <>
            <ul>
                {numbersToShow.map(person => <li key={person.name}>{person.name} {person.number}
                    <button onClick={deletePerson(person.id)}>Delete</button>
                </li>)}
            </ul>
        </>
    )
}

export default ListOfNumbers;