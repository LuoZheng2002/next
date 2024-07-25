import io from 'socket.io-client';
import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { Socket } from 'socket.io-client';
import { GetServerSideProps } from 'next';
import Menu from 'components/menu';
import Countdown from 'components/countdown';
import Game from '@/components/game';
import Wait from '@/components/wait';
import Gameover from '@/components/gameover';
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

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>)=>{
    setInputValue(event.target.value);
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
      console.log('received message from server' + message);
    });
    setSocket(socket);
    socketRef.current = socket;
    return () => {
      socket.disconnect();
      console.log('useEffect destructed');
    }
  }, []);

  const renderComponent = () => {
    console.log('rerender');
    switch (state) {
      case 'menu':
        return <Menu onClick={onMenuClick} inputValue={inputValue} handleInputChange={handleInputChange} />;
      case 'wait':
        return <Wait room = {room}/>;
      case 'countdown':
        return <Countdown countdown={countdown} room={room} />;
      case 'ingame':
        return <Game />;
      case 'gameover':
        return <Gameover description={description}/>
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