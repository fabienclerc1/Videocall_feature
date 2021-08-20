import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Axios from "../API";
import { SocketContext } from "../SocketContext";
import {v4 as uuidv4} from 'uuid';
import { Container, Contact, Name, Id, CallButton, HangUpButton, Title } from './styles';

const ConnectionMenu = ({patient}) => {
    const {callAccepted, callEnded, LeaveCall, MakeCall, SelectContacts} = useContext(SocketContext);
    const [connections, setConnections] = useState([]);
    
    useEffect(() => {
        FetchConnections();
    }, [patient]);

    const FetchConnections = async () => {
        //Fetch socket id associated to users with same patient id (code)
        const url = `connections/?search=${patient.patient_code}`;
        const response = await Axios.post(url);
        setConnections(response.data);
        SelectContacts(response.data);
    };
    
    return (
        <Container>
            {connections.length > 0 ? <Title>User group</Title> : null }
            {connections.map(connection => <Contact key={uuidv4()}>
                <Name>{connection.first_name} {connection.last_name}</Name>
                <Id>Id: #{connection.socket_id}</Id>
            </Contact>
            )}
            {connections.length > 0 ? <>
                {callAccepted && !callEnded ? <HangUpButton onClick={LeaveCall}>Hang Up</HangUpButton> : <CallButton onClick={MakeCall}>Call group</CallButton>}
            </> : <h2>No contacts associated.</h2>}
            
        </Container>
    )
};

export default ConnectionMenu;