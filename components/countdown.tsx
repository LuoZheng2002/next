type Props={
    room: number,
    countdown: number
};

export default function Home({room, countdown}: Props){
    return (
    <div>
        <div>{countdown} seconds before the game begins!</div>
        <div> room number: {room}</div>
    </div>
    );
}