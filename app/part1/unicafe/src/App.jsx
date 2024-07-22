import {useState} from 'react'
import Header from "./components/Header.jsx";
import StatisticLine from "./components/StatisticLine.jsx";

const App = () => {
    const goodValue = 1;
    const neutralValue = 0;
    const badValue = -1;

    const [statistics, setClicks] = useState({
        good: 0,
        neutral: 0,
        bad: 0,
        all: 0,
        weightedTotal: 0,
        average: 0,
        positive: 0 + '%'
    })
    const calculateWeightedTotal = (good, neutral, bad) => {
        return (goodValue * good) + (neutralValue * neutral) + (badValue * bad);
    }

    const handleGoodClick = () => {
        const totalClicks = statistics.all + 1;
        const totalGoodClicks = statistics.good + 1;
        const newClicks = {
            ...statistics,
            good: totalGoodClicks,
            all: totalClicks,
            average: calculateWeightedTotal(totalGoodClicks, statistics.neutral, statistics.bad) / totalClicks,
            positive: totalGoodClicks / totalClicks * 100 + "%"
        }
        setClicks(newClicks)
    }

    const handleNeutralClick = () => {
        const totalClicks = statistics.all + 1;
        const totalNeutralClicks = statistics.neutral + 1;
        const newClicks = {
            ...statistics,
            neutral: totalNeutralClicks,
            all: totalClicks,
            average: calculateWeightedTotal(statistics.good, totalNeutralClicks, statistics.bad) / totalClicks,
            positive: statistics.good / totalClicks * 100 + "%"
        }
        setClicks(newClicks)
    }

    const handleBadClick = () => {
        const totalClicks = statistics.all + 1;
        const totalBadClicks = statistics.bad + 1;
        const newClicks = {
            ...statistics,
            bad: totalBadClicks,
            all: totalClicks,
            average: calculateWeightedTotal(statistics.good, statistics.good, totalBadClicks) / totalClicks,
            positive: statistics.good / totalClicks * 100 + "%"
        }
        setClicks(newClicks)
    }


    return (
        <>
            <Header text={"Give feedback"}/>
            <button onClick={handleGoodClick}>good</button>
            <button onClick={handleNeutralClick}>neutral</button>
            <button onClick={handleBadClick}>bad</button>

            <Header text={"Statistics"}/>
            <StatisticLine text="Good: " value={statistics.good}/>
            <StatisticLine text="Neutral: " value={statistics.neutral}/>
            <StatisticLine text="Bad: " value={statistics.bad}/>
            <StatisticLine text="All: " value={statistics.all}/>
            <StatisticLine text="Average: " value={statistics.average}/>
            <StatisticLine text="Positive: " value={statistics.positive}/>
        </>
    )
}

export default App
