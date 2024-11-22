const Course = ({course}) => {
    return(
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = ({course}) => <h1>{course}</h1>

const Content = ({parts}) => {
    return(
        <>
            {parts.map((part) => (
                <Part name={part.name} exercises={part.exercises} key={part.id}/>
            ))}
        </>
    )
}

const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Total = ({parts}) => {
    let total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return <h3>Number of exercises {total}</h3>
}

export default Course