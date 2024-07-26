type Props={
    countdown: number,
    room: number
};

export default function Home({countdown, room}: Props){
    return (
    <div>
        <div style={{fontSize: "2vw"}}>Found a match! Buckle up!</div>
        <div style={{fontSize: "2vw"}}>Room No.{room}</div>
        <div style={{fontSize: "2vw"}}>{countdown} seconds before the game begins!</div>
    </div>
    );
}