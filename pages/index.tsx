import io from 'socket.io-client';
import { useState, useEffect, useRef, ChangeEvent, KeyboardEventHandler } from 'react';
import { Socket } from 'socket.io-client';
import { GetServerSideProps } from 'next';
import Menu from 'components/menu';
import Countdown from 'components/countdown';
import Game from '@/components/game';
import Wait from '@/components/wait';
import Gameover from '@/components/gameover';
import Transition from '@/components/transition';
type Props = {
  ip: string
};


export default function Home({ ip }: Props) {
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState(null as Socket | null);
  const socketRef = useRef(socket);
  const onMenuClick = () => {
    console.log('button clicked');
    if (socketRef.current === null) {
      console.log('socket not connected');
    }
    socketRef.current?.emit('play', {name: inputValue});
    console.log('playing with name: ' + inputValue);
  }

  const [countdown, setCountdown] = useState(10);
  const [state, setState] = useState('menu');
  const [room, setRoom] = useState(-1);
  const [description, setDescription] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [questionnum, setQuestionnum] = useState(0);
  const [problem, setProblem] = useState('Problem');
  const [name, setName] = useState('your name');
  const [opponent, setOpponent] = useState('opponent name');
  const answerValueRef = useRef('answer');
  const [answerer, setAnswerer] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [answer, setAnswer] = useState('answer result');
  const [myscore, setMyscore] = useState(100);
  const [opponentscore, setOpponentscore] = useState(50);
  const [addition, setAddition] = useState("+5");
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>)=>{
    setInputValue(event.target.value);
  }
  const onStartOver = ()=>{
    setState('menu');
  }
  useEffect(() => {
    console.log('useEffect triggered');
    const socket = io(`${ip}:3001`);
    socket.on('connect', () => {
      setConnected(true);
    });

    socket.on('message', message => {
      if ('state' in message) {
        setState(message.state);
      }
      if ('countdown' in message) {
        setCountdown(message.countdown);
      }
      if ('room' in message){
        setRoom(message.room);
      }
      if ('description' in message){
        setDescription(message.description);
      }
      if ('questionnum' in message){
        setQuestionnum(message.questionnum);
      }
      if ('name' in message){
        setName(message.name);
      }
      if ('opponent' in message){
        setOpponent(message.opponent);
      }
      if ('answerer' in message){
        setAnswerer(message.answerer);
      }
      if ('correct' in message){
        setCorrect(message.correct);
      }
      if ('answer' in message){
        setAnswer(message.answer);
      }
      if ('myscore' in message){
        setMyscore(message.myscore);
      }
      if ('opponentscore' in message){
        setOpponentscore(message.opponentscore);
      }
      if ('addition' in message){
        setAddition(message.addition);
      }
      if ('problem' in message){
        setProblem(message.problem);
      }
      console.log('received message from server: ' + JSON.stringify(message));
    });
    setSocket(socket);
    socketRef.current = socket;
    return () => {
      socket.disconnect();
      console.log('useEffect destructed');
    }
  }, []);
  
  const handleKeyPress: KeyboardEventHandler = (event) => {
    if (event.key === 'Enter') {
      // Trigger your desired action here
      console.log(`You entered: ${answerValueRef.current}`);
      socketRef.current?.emit('message', {answer: answerValueRef.current});
      // For example, you could call a function or set a state
    }
  };

  const renderComponent = () => {
    console.log('rerender');
    switch (state) {
      case 'menu':
        return <Menu onClick={onMenuClick} inputValue={inputValue} handleInputChange={handleInputChange} />;
      case 'wait':
        return <Wait/>;
      case 'countdown':
        return <Countdown countdown={countdown} room={room}/>;
      case 'transition':
        return <Transition time={countdown}/>;
      case 'game':
        return <Game countdown={countdown} questionnum={questionnum} problem={problem} name={name} opponent={opponent} handleKeyPress={handleKeyPress} answerValueRef={answerValueRef} answered={false} answerer={false} correct={false} answerresult={answer} myscore={myscore} opponentscore={opponentscore} addition={addition}/>;
      case 'result':
        return <Game countdown={countdown} questionnum={questionnum} problem={problem} name={name} opponent={opponent} handleKeyPress={handleKeyPress} answerValueRef={answerValueRef} answered={true} answerer={answerer} correct={correct} answerresult={answer} myscore={myscore} opponentscore={opponentscore} addition={addition}/>;
      case 'gameover':
        return <Gameover onClick={onStartOver} description={description}/>
      default:
        break;
    }
    console.log(state);
    return <div>error</div>
  }
  return (<>
    {renderComponent()}
    
  </>

  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  // Get the server's IP address
  const ip = process.env.SERVER_IP!;
  return {
    props: {
      ip: ip
    }
  };
}