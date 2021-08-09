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
    border-radius: 10px;
    border: 1px solid #e9e9e9;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.3), 0px 10px 20px rgba(0, 0, 0, 0.05);
  

    :hover {
        background: #f9f9f9;
        cursor: pointer;
    }
`

const PhysicianId = styled.h3`
    font-size: 8px;
    color: #e6e6e6;
    font-weight: 200;
    padding-bottom: 5px;
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

const Title = styled.h3`
    font-size: 30px;
    font-weight: 700;
    padding-bottom: 5px;
`

const ContactMenu = () => {
    const [patients, setPatients] = useState([]);
    const { me , showConnections, setShowConnections, setShowPatientInfo} = useContext(SocketContext);
    const [selectedPatient, setSelectedPatient] = useState({});
    const [showPatients, setShowPatients] = useState(false);
   

    useEffect(() => {
        FetchPatients();
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
                <PhysicianId>id: {me}</PhysicianId>
                <NotificationBar />
                {showPatients && (
                    <Menu>
                        <Title>Patients</Title>
                        {patients.map(patient => <Contact key={uuidv4()} onClick={() => OnChangeSelectedPatient(patient)}>
                            <Name>{patient.user.first_name} {patient.user.last_name}</Name>
                            <Id>Patient code: # {patient.patient_code}</Id>
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