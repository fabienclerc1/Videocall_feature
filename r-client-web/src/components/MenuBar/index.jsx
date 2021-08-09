import { useContext, useState } from "react";
import { SocketContext } from "../SocketContext";
import styled from 'styled-components';

const IdInput = styled.input`
    width:50%;
    height: 32px;
    color: #333;
    font-size: 20px;
    font-weight: 700;
    padding-left: 5px;
`

const CallButton = styled.button`
    height: 32px;
    width: 100px;
    background: #2f80ec;
    color: black;
    border-radius: 5px;
    margin: 0 15px;
    font-size: 18px;
    font-weight: 700;
    color: white;
`

const HangUpButton = styled.button`
    height: 32px;
    width: 100px;
    background: #f6484a;
    color: black;
    border-radius: 5px;
    margin: 0 15px;
    font-size: 18px;
    font-weight: 700;
    color: white;
`

const MenuBar = ({children}) => {
    const { me, callAccepted, callEnded, LeaveCall, MakeCall} = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState([]); 

    const onChangeId = (event) => {
        const list = event.target.value.split(',');

        setIdToCall(list);
    }

    return (
        <div>
            <div>
                <label htmlFor="id">Id to call: </label>
                <IdInput id="id" onChange={onChangeId}></IdInput>
                {callAccepted && !callEnded ? <HangUpButton onClick={LeaveCall}>Hang Up</HangUpButton> : <CallButton onClick={MakeCall}>Start call</CallButton>}
                <h3>My Id: {me}</h3>
            </div>
            {children}
        </div>
    )
};

export default MenuBar;