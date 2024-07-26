import { ChangeEventHandler, MouseEventHandler } from "react";

interface Props {
    onClick: MouseEventHandler<HTMLButtonElement>;
    inputValue: string;
    handleInputChange: ChangeEventHandler<HTMLInputElement>;
}

function Menu({onClick, inputValue, handleInputChange}: Props) {
    return (
        <div>
            <div style={{fontSize: "3vw", margin: "1vw 0vw"}}>Happy Involuting!</div>
            <div style={{fontSize: "2vw"}}>Please input your name: </div>
            <div>
            <input style={{fontSize: "2vw", margin: "1vw 0vw"}}     type="text"  value={inputValue} onChange={handleInputChange}   placeholder="Type something..."    />
            </div>
            <button style={{fontSize: "2vw", backgroundColor: "lightblue", borderRadius: "0.5vw", padding: "0.5vw"}} onClick={onClick} disabled={inputValue? false: true}>Start the game!</button>
        </div>
    );
}
export default Menu;