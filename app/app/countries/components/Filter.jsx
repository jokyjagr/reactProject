function Filter({text, findValue, handleFindChange}) {
    return (
        <>
            {text}: <input
            value={findValue}
            onChange={handleFindChange}/>
        </>
    )
}

export default Filter;