function Filter({findName, handleFindNameChange}) {
    return (
        <>
            filter chown with: <input
            value={findName}
            onChange={handleFindNameChange}/>
        </>
    )
}

export default Filter;