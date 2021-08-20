import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width:100%;
`

export const Contact = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 90%;
    background: #fff;
    margin: 4px 0px;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.3), 0px 10px 20px rgba(0, 0, 0, 0.05);
`

export const Name = styled.h3`
    font-size: 16px;
    font-weight: 700;
    padding-bottom: 5px;
`

export const Id = styled.h4`
    font-size: 14px;
    font-weight: 400;
    color: rgba(0,0,0,0.5);
`

export const CallButton = styled.button`
    height: 60px;
    width: 200px;
    background: #2f80ec;
    border-radius: 30px;
    border: none;
    margin: 15px 15px;
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

export const HangUpButton = styled.button`
    height: 60px;
    width: 200px;
    background: #f6484a;
    border-radius: 30px;
    border: none;
    margin: 15px 15px;
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

export const Title = styled.h3`
    font-size: 24px;
    font-weight: 700;
    padding-bottom: 5px;
`