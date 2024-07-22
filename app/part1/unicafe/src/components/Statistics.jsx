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
            <table>
                <tbody>
                <tr>
                    <td>Good</td>
                    <td>{statistics.good}</td>
                </tr>
                <tr>
                    <td>Neutral</td>
                    <td>{statistics.neutral}</td>
                </tr>
                <tr>
                    <td>Bad</td>
                    <td>{statistics.bad}</td>
                </tr>
                <tr>
                    <td>All</td>
                    <td>{statistics.all}</td>
                </tr>
                <tr>
                    <td>Average</td>
                    <td>{statistics.average}</td>
                </tr>
                <tr>
                    <td>Positive</td>
                    <td>{statistics.positive}</td>
                </tr>
                </tbody>
            </table>
        )
    }


}

export default Statistics;