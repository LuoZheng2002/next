import { MouseEventHandler } from "react";

type Props={
    description: string,
    onClick: MouseEventHandler<HTMLButtonElement>;
}
export default function Gameover({description,onClick}: Props){
    return (
        <div>
            <div style={{fontSize: "3vw"}}>Game over!</div>
            <div style={{fontSize: "2vw"}}>{description}</div>
            <button style={{fontSize: "2vw", backgroundColor: "lightblue", borderRadius: "0.5vw", padding: "0.5vw", margin: "2vw 0vw"}} onClick={onClick}>Start over</button>
        </div>
    );
}