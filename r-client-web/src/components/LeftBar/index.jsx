import styled from 'styled-components';
import logout from "../../assets/svgs/logout.svg"
import menu from "../../assets/svgs/menu.svg"
import user from "../../assets/svgs/user.svg"
import home from "../../assets/svgs/home.svg"
import React, { useState } from 'react';


const MenueButton = styled.img`
    width: 60%;
    height: 50px;
`

const HomeButton = styled.img`
    width: 60%;
    height: 50px;
`
const PatientButton = styled.img`
    width: 50%;
    height: 50px;
    
`
const ProfileImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50px;
    margin-bottom: 2vh;
`

const Logout = styled.img`
    width: 70%;
    fill: white;
    // border-top: white 2px solid;
    padding-top: 5px
`
const CopyRight = styled.div`
    color: white;

`
const LeftBarWrapper = styled.div`
    height: 100vh;
    width: 60px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    flex-direction: column;
    background-image: linear-gradient(315deg, #007bff 0%, #09c6f9 74%);
`

const UpperContainer = styled.div`
`

const LowerContainer = styled.div`
    height: 25vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`

const LeftBar = (props) => {
    const [clicked, setClicked] = useState(false);
    const onClickPatient = () =>{
        props.onClick();
    }

    const onLogout = () =>{
        setClicked(!clicked);
    }
    

    return (
        <LeftBarWrapper>
            <UpperContainer>
                <MenueButton src={menu}></MenueButton>
                <HomeButton src={home}></HomeButton>
                <PatientButton src={user} onClick={onClickPatient}></PatientButton>
            </UpperContainer>
            <LowerContainer>
                <ProfileImage src={user}></ProfileImage>
                <Logout src={logout} onClick={onLogout}></Logout>
                <CopyRight>VideoCall © 2021</CopyRight>
            </LowerContainer>
            
        </LeftBarWrapper>
    )
};

export default LeftBar;