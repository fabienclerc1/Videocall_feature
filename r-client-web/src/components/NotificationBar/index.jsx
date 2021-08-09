import { SocketContext } from '../SocketContext';
import { useContext } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const AnswerButton = styled.button`
    height: 32px;
    width: 120px;
    background: #2f80ec;
    color: black;
    border-radius: 5px;
    margin: 20px 15px;
    font-size: 18px;
    font-weight: 700;
    color: white;
`

const Message = styled.h1`
    padding: 20px;
`

const NotificationBar = () => {
    const { AcceptCall, call, callAccepted } = useContext(SocketContext);
    return (
        <div>
            {call.isReceivedCall && !callAccepted && (
                <Container>
                    <Message>Call pending...</Message>
                    <AnswerButton onClick={() => AcceptCall(call)}>Answer</AnswerButton>
                </Container>
            )}
        </div>
    )
}

export default NotificationBar;
