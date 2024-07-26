
type Props={
    time: number;
}

export default function Transition({time}: Props){
    return (
        <div style={{fontSize: "3vw"}}>{time} seconds to the next question.</div>
    )
}