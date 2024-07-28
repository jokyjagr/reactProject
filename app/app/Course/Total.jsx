const Total = (props) => {
    const total = (props.parts || []).reduce((sum, part) => sum + part.exercises, 0);
    return (
        <p>Number of exercises <b>{total}</b></p>
    )
}

export default Total;