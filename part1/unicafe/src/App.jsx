import { useState } from 'react'

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [total, setTotal] = useState(0)
    const [average, setAverage] = useState(0)
    const [percentage, setPercentage] = useState(0)

    // click handlers
    const handleGoodClick = () => {
        const newGood = good + 1
        setGood(newGood)
        updateCalculations(newGood, neutral, bad)
    }

    const handleNeutralClick = () => {
        const newNeutral = neutral + 1
        setNeutral(newNeutral)
        updateCalculations(good, newNeutral, bad)
    }

    const handleBadClick = () => {
        const newBad = bad + 1
        setBad(newBad)
        updateCalculations(good, neutral, newBad)
    }

    const updateCalculations = ( goodCount, neutralCount, badCount ) => {
        setTotal(goodCount + neutralCount + badCount)
        setAverage((goodCount + badCount*-1)/(goodCount + neutralCount + badCount))
        setPercentage((goodCount/(goodCount + badCount + neutralCount)) * 100)
    }

    return (
        <div>
            <Header />

            <Button handleClick={handleGoodClick} value={"good"} />
            <Button handleClick={handleNeutralClick} value={"neutral"} />
            <Button handleClick={handleBadClick} value={"bad"} />

            <Subheader />

            <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} percentage={percentage} />
        </div>
    )
}

// components

const Header = () => {
    return (
        <h1>give feedback</h1>
    )
}

const Button = ({ handleClick, value }) => {
    return(
        <button onClick={handleClick}>
            {value}
        </button>
    )
}

const Subheader = () => {
    return(
        <h2>statistics</h2>
    )
}

const StatisticLine = ({text, value}) => {
    if (text === "positive") {
        return(
            <tr>
                <td>{text}</td>
                <td>{value}%</td>
            </tr>
        )
    }
    return(
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({ good, neutral, bad, total, average, percentage }) => {
    if (!total) {
        return(
            <p>no feedback given</p>
        )
    }
    return (
        <table>
            <tbody>
                <StatisticLine text="good" value={good} />
                <StatisticLine text="neutral" value={neutral} />
                <StatisticLine text="bad" value={bad} />
                <StatisticLine text="all" value={total} />
                <StatisticLine text="average" value={average} />
                <StatisticLine text="positive" value={percentage} />
            </tbody>
        </table>
    )

}

export default App