const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    console.log(course.parts)

    return (
        <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
        </div>
    )
}

const Header = (props) => {
    return(
        <>
            <h1>{props.course}</h1>
        </>
    )
}

const Content = (props) => {
    return(
        <>
            {props.parts.map((part, i) => (
                <Part name={part.name} exercises={part.exercises} key={i}/>
            ))}
        </>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.name} {props.exercises}
        </p>
    )
}

const Total = (props) => {
    let total = props.parts.map(part => (part.exercises)).reduce((sum, current) => sum + current)
    return (
        <>
            <p>Number of exercises {total}</p>
        </>
    )
}
export default App