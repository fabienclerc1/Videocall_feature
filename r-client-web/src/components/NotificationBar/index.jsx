import { SocketContext } from '../SocketContext';
import { useContext } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const AnswerButton = styled.button`
    height: 60px;
    width: 200px;
    background: #2f80ec;
    border-radius: 30px;
    border: none;
    margin: 20px 15px;
    font-size: 18px;
    font-weight: 700;
    color: white;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.3), 0px 10px 20px rgba(0, 0, 0, 0.05);

    :hover {
        cursor: pointer;
    }

    :active {
        transform: translate(0%, 2%);
    }
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
