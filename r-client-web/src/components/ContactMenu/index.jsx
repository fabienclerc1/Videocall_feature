import { useContext, useEffect, useState } from "react";
import styled from 'styled-components';
import Axios from "../API";
import ConnectionMenu from "../ConnectionMenu";
import { SocketContext } from "../SocketContext";
import {v4 as uuidv4} from 'uuid';
import LeftBar from "../../components/LeftBar";
import NotificationBar from "../NotificationBar";

const Container = styled.div`
    display: flex;
    width:100%;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 90%;
    padding-top: 20px;
`

const Contact = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 90%;
    background: #fff;
    color: black;
    padding: 20px;
    margin: 4px 0;
    border-radius: 4px;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.3), 0px 10px 20px rgba(0, 0, 0, 0.05);

    :hover {
        cursor: pointer;
    }
`

const Name = styled.h3`
    font-size: 16px;
    font-weight: 700;
    padding-bottom: 5px;
`

const Id = styled.h4`
    font-size: 14px;
    font-weight: 400;
    color: rgba(0,0,0,0.5);
`

const Title = styled.h3`
    font-size: 24px;
    font-weight: 700;
    padding-bottom: 5px;
`

const ContactMenu = () => {
    const [patients, setPatients] = useState([]);
    const { me , showConnections, setShowConnections, setShowPatientInfo} = useContext(SocketContext);
    const [selectedPatient, setSelectedPatient] = useState({});
    const [showPatients, setShowPatients] = useState(false);
   

    useEffect(() => {
        FetchPatients(); //List of all patients available in the DB
    }, [me]);

    const FetchPatients = async () => {
        const url = `patients/`;
        const response = await Axios.get(url);
        setPatients(response.data);
    };

    const OnChangeSelectedPatient = (patient) => {
        setSelectedPatient(patient);
        setShowConnections(true);
        setShowPatients(false);
        setShowPatientInfo(true);
    };

    const OnDisplayPatients = () => {
        setShowPatients(!showPatients);
        setSelectedPatient({});
        setShowConnections(false);
    };

    return (
        <Container>
            <LeftBar onClick={OnDisplayPatients}/>
            <Column>
                <NotificationBar />
                {showPatients && (
                    <Menu>
                        <Title>Patients list</Title>
                        {patients.map(patient => <Contact key={uuidv4()} onClick={() => OnChangeSelectedPatient(patient)}>
                            <Name>{patient.user.first_name} {patient.user.last_name}</Name>
                            <Id>Patient code: #{patient.patient_code}</Id>
                        </Contact>)}
                    </Menu>
                )}
                {showConnections && (
                    <Menu>
                        <ConnectionMenu patient={selectedPatient} ></ConnectionMenu>
                    </Menu>
                )}
            </Column>
        </Container>
    )
};

export default ContactMenu;