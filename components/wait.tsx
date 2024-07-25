type Props={
    room: number;
}
export default function Wait({room}: Props){
    return (
    <div>
        <div>Wait for connection...</div>
        <div>You are at room {room}</div>
    </div>);
}