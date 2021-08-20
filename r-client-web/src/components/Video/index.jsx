import { SocketContext } from '../SocketContext';
import styled from 'styled-components';
import { useContext, useEffect } from 'react';
import waiting from "../../assets/svgs/hourglass.svg";

const Container = styled.div`
    width: 100%;
    position: relative;
`

const RemoteContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    z-index: 4;
`;

const VideoContainer = styled.div`
	display: flex;
    width: 100%;
    object-fit: cover;
    z-index: 3;
`;

const MyVideo = styled.video`
    position: absolute;
    top: 2%;
    right: 2%;
    width: 200px;
    border-radius: 3px;
    border: 1px solid lightgray;
    min-width: 300px;
`

const RemoteVideo = styled.video`
    width: 100%;
    border-radius: 3px;
    object-fit: cover;
`

const ImageLogo = styled.img`
    position: absolute;
    top: 50%;
    right: 45%;
    z-index: 0;
`

const VideoWindow = () => {
    const {callAccepted, ownVideo, remoteVideo, callEnded, stream, showPatientInfo, showStreams} = useContext(SocketContext);

    useEffect(() => {
        ;
    }, [callAccepted, callEnded]);

    return (
        <Container>
            
            {<RemoteContainer style={callAccepted && !callEnded ? {visibility:'visible'} : {visibility: 'hidden'} }>
                    <RemoteVideo playsInline ref={remoteVideo} autoPlay />
            </RemoteContainer>}
            {<ImageLogo src={waiting} style={callAccepted && showStreams ? {visibility:'hidden'} : {visibility: 'visible'}}/>}
            {stream && (
                <VideoContainer  style={!showStreams ? {visibility:'hidden'} : {visibility: 'visible'}}>
                    <MyVideo playsInline muted ref={ownVideo} autoPlay />
                </VideoContainer>
            )}
        </Container>
    )
};

export default VideoWindow;
