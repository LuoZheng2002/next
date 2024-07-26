import { ChangeEvent, KeyboardEventHandler, MutableRefObject, useEffect, useRef } from "react";

type Props = {
    countdown: number;
    questionnum: number;
    problem: string;
    name: string;
    opponent: string;
    handleKeyPress: KeyboardEventHandler;
    answerValueRef: MutableRefObject<string>;
    answered: boolean;
    correct: boolean;
    answerer: boolean;
    answerresult: string;
    myscore: number;
    opponentscore: number;
    addition: string;
}

export default function Game({ countdown, questionnum, problem, name, opponent, handleKeyPress, answerValueRef, answered, answerer, correct, answerresult, myscore, opponentscore, addition }: Props) {
    const inputRef = useRef(null as null | HTMLInputElement);
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);


    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        answerValueRef.current = event.target.value;
        console.log('answer changed to: ' + answerValueRef.current);
    }
    return (
        <div style={{ width: "100%", height: "100vh", backgroundColor: "magenta", display: "flex", flexDirection: "column" }}>
            <div>
                <div style={{ textAlign: "center", fontSize: "3vw" }}>Question {questionnum}</div>
                <div style={{ textAlign: "center", fontSize: "3vw" }}>{countdown} seconds left</div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ width: "50%", margin: "3vw" }}>
                        <div>
                            <span style={{ fontSize: "3vw", marginBottom: "2vw" }}>{name}</span>
                            <span style={{ fontSize: "3vw", marginBottom: "2vw", marginLeft: "2vw" }}>Score: {myscore}</span>
                            <span style={{ fontSize: "4vw", marginBottom: "2vw", color: addition[0]=='+'?'green': 'red' }}>{answered? (answerer ? addition : ''):''}</span>
                        </div>
                        <div style={{ fontSize: "3vw", marginBottom: "2vw" }}>{problem}</div>
                        <div style={{ borderWidth: "5px", borderColor: answered ? (answerer ? (correct ? "green" : "red") : "lightgray") : "lightgray", width: "60%" }}>
                            <input ref={inputRef} style={{ fontSize: "4vw", width: "100%" }} onKeyDownCapture={handleKeyPress} placeholder="Fill this!" onChange={onChange} disabled={answered}></input>
                        </div>
                    </div>
                    <div style={{ flexGrow: "1", margin: "3vw" }}>
                        <div>
                            <span style={{ fontSize: "3vw", marginBottom: "2vw" }}>{opponent}</span>
                            <span style={{ fontSize: "3vw", marginBottom: "2vw", marginLeft: "2vw" }}>Score: {opponentscore}</span>
                            <span style={{ fontSize: "4vw", marginBottom: "2vw", color: addition[0]=='+'?'green': 'red'}}>{answered?(answerer ? '' : addition):''}</span>
                        </div>
                        <div style={{ fontSize: "3vw", marginBottom: "2vw" }}>{problem}</div>
                        <div style={{ borderWidth: "5px", borderColor: answered ? (answerer ? "lightgray" : (correct ? "green" : "red")) : "lightgray", width: "60%" }}>
                            <input style={{ fontSize: "4vw", width: "100%" }} disabled={true} placeholder="Opponent's" value={answered ? (answerer ? '' : answerresult) : ''}></input>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}