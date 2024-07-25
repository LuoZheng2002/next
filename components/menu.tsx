import { ChangeEventHandler, MouseEventHandler } from "react";

interface Props {
    onClick: MouseEventHandler<HTMLButtonElement>;
    inputValue: string;
    handleInputChange: ChangeEventHandler<HTMLInputElement>;
}

function Menu({onClick, inputValue, handleInputChange}: Props) {
    return (
        <div>
            <div>This is the menu</div>
            <div>Please input your name: </div>
            <div>
            <input      type="text"  value={inputValue} onChange={handleInputChange}   placeholder="Type something..."    />
            
            </div>
            <button onClick={onClick} disabled={inputValue? false: true}>Start the game!</button>
        </div>
    );
}
export default Menu;