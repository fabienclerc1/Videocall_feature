import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Axios from "../API";
import { SocketContext } from "../SocketContext";
import {v4 as uuidv4} from 'uuid';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width:100%;
`

const Contact = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 90%;
    background: #fff;
    margin: 4px 0px;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #e9e9e9;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.3), 0px 10px 20px rgba(0, 0, 0, 0.05);
`

const Name = styled.h3`
    font-size: 20px;
    font-weight: 700;
    padding-bottom: 5px;
`

const Id = styled.h4`
    font-size: 16px;
    font-weight: 400;
`

const CallButton = styled.button`
    height: 50px;
    width: 150px;
    background: #2f80ec;
    color: black;
    border-radius: 5px;
    margin: 15px 15px;
    font-size: 30px;
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

const Title = styled.h3`
    font-size: 30px;
    font-weight: 700;
    padding-bottom: 5px;
`

const ConnectionMenu = ({patient}) => {
    const {callAccepted, callEnded, LeaveCall, MakeCall, SelectContacts} = useContext(SocketContext);
    const [connections, setConnections] = useState([]);
    
    useEffect(() => {
        FetchConnections();
    }, [patient]);

    const FetchConnections = async () => {
        const url = `connections/?search=${patient.patient_code}`;
        const response = await Axios.post(url);
        setConnections(response.data);
        SelectContacts(response.data);
    };
    
    return (
        <Container>
            {connections.length > 0 ? <Title>Contacts</Title> : null }
            {connections.map(connection => <Contact key={uuidv4()}>
                <Name>{connection.first_name} {connection.last_name}</Name>
                <Id>Id: # {connection.socket_id}</Id>
            </Contact>
            )}
            {connections.length > 0 ? <>
                {callAccepted && !callEnded ? <HangUpButton onClick={LeaveCall}>Hang Up</HangUpButton> : <CallButton onClick={MakeCall}>Call</CallButton>}
            </> : <h2>No contacts associated.</h2>}
            
        </Container>
    )
};

export default ConnectionMenu;