import styled from 'styled-components';
import logout from "../../assets/svgs/logout.svg";
import menu from "../../assets/svgs/menu.svg";
import user from "../../assets/svgs/user.svg";
import profile_picture from '../../assets/pngs/generic_user.png';
import home from "../../assets/svgs/home.svg";
import React from 'react';
import { useHistory } from 'react-router-dom';

const Image = styled.img`
    width: 40px;
    height: 40px;

    :hover {
        cursor: pointer;
    }

    :active {
        transform: translate(0%, 2%);
    }
`

const ProfileImage = styled.img`
    border-radius: 50%;
    width: 60px;
    height: 60px;
    object-fit: cover;
`

const Text = styled.h4`
    font-weight: normal;
    font-size: 12px;
    color: white;
`

const Wrapper = styled.div`
    height: 100vh;
    width: 80px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    flex-direction: column;
    background-image: linear-gradient(315deg, #007bff 0%, #09c6f9 74%);
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2), 10px 0px 20px rgba(0, 0, 0, 0.08);
`

const UpperContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 15vh;
    justify-content: space-around;
`

const LowerContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 25vh;
`

const LeftBar = (props) => {
    const history = useHistory();

    const onClickPatient = () => {
        props.onClick();
    }

    const onLogout = () => {
        sessionStorage.removeItem("token");
        history.push('/');
    }

    return (
        <Wrapper>
            <UpperContainer>
                <Image src={menu}></Image>
                <Image src={home}></Image>
                <Image src={user} onClick={onClickPatient}></Image>
            </UpperContainer>
            <LowerContainer>
                <ProfileImage src={profile_picture}></ProfileImage>
                <Image src={logout} onClick={onLogout}></Image>
                <Text>Videocall ©2021</Text>
            </LowerContainer>
        </Wrapper>
    )
};

export default LeftBar;