import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Axios from "../../components/API";
import videocall_logo from "../../assets/svgs/duo_black.svg";

const Wrapper = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background: white;
`

const Input = styled.input`
    width: 300px;
    height: 40px;
    color: #333;
    font-size: 20px;
    font-weight: 700;
    padding-left: 5px;
    margin: 20px 0;
    border-radius: 5px;
    border: 1px solid lightgray;
    outline: none;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.3), 0px 10px 20px rgba(0, 0, 0, 0.05);
`

const Button = styled.button`
    height: 60px;
    width: 200px;
    background: #2f80ec;
    border: none;
    border-radius: 30px;
    margin: 0 15px;
    font-size: 18px;
    font-weight: 700;
    color: white;
    margin-top: 30px;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.3), 0px 10px 20px rgba(0, 0, 0, 0.05);

    :hover {
        cursor: pointer;
    }

    :active {
        transform: translate(0%, 2%);
    }
`

const Image = styled.img`
    padding-bottom: 40px;
    width: 100px;
    height: 100px;
`

const Login = () => {
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    console.log(username, password);
    const OnUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const OnPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const url = "auth/token/";
        const body = {
            username: username,
            password: password,
        };
        try {
            const response = await Axios.post(url, body);

            if (response.status === 200) {
                setUsername("");
                setPassword("");

                sessionStorage.setItem("token", response.data.access);
                history.push("/call");
            }
        }
        catch(err) {
            console.log(err);
        }
    }

    return (
        <Wrapper onSubmit={onSubmitHandler} >
            <Image src={videocall_logo} />
            <h2>VoIP Login</h2>
            <Input name="E-Mail address" onChange={OnUsernameChange} type="text" placeholder="Username" />
            <Input name="Password" onChange={OnPasswordChange} type="password" placeholder="Password" />
            <Button action="Login" >LOGIN</Button>
        </Wrapper>
    )
}

export default Login;