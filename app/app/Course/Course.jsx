import Header from "./Header.jsx";
import Content from "./Content.jsx";
import Total from "./Total.jsx";


const Course = ({courses}) => {
    return (
        <>
            {courses.map((part, index) => (
                <span key={index}>
                    <Header course={part.name}/>
                    <Content parts={part.parts}/>
                    <Total parts={part.parts}/>
                </span>
            ))}
        </>
)
}

export default Course;