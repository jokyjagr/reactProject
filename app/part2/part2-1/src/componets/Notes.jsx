const Note = ({note}) => {

    console.log("This is the note object value: ", note)

    return (
        <li>{note.content}</li>
    )
}

export default Note