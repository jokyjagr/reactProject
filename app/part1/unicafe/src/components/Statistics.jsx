import StatisticLine from "./StatisticLine.jsx";

const Statistics = (props) => {
    let statistics = props.values;

    if (statistics.all === 0) {
        return (
            <>
                {"No Feedback given"}
            </>
        )
    } else {
        return (
            <>
                <StatisticLine text="Good: " value={statistics.good}/>
                <StatisticLine text="Neutral: " value={statistics.neutral}/>
                <StatisticLine text="Bad: " value={statistics.bad}/>
                <StatisticLine text="All: " value={statistics.all}/>
                <StatisticLine text="Average: " value={statistics.average}/>
                <StatisticLine text="Positive: " value={statistics.positive}/>
            </>
        )
    }


}

export default Statistics;