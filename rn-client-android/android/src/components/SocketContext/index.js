import React, {createContext, useEffect, useRef, useState} from 'react';
import Peer from 'react-native-peerjs';
import {mediaDevices} from 'react-native-webrtc';
import {v4 as uuidv4} from 'uuid';

const SocketContext = createContext();

const ContextProvider = ({children}) => {
  const [stream, setStream] = useState();
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [me, setMe] = useState('');
  const [name, setName] = useState('');
  const [userList, setUserList] = useState([]);
  const [peer, setPeer] = useState(null);
  const [peers, setPeers] = useState({});
  const [roomId, setRoomId] = useState();
  const [remoteVideo, setRemoteVideo] = useState();
  const [myPeer, setMyPeer] = useState();
  const [socket, setSocket] = useState()
  const [ownVideo, setOwnVideo] = useState();

  const myStream = useRef();

  useEffect(() => {
    const peer = new Peer(undefined, {
      host: '10.0.2.2',
      port: 9000,
      path: '/peer',
      secure: false,
    });
    setMyPeer(peer);
    let isFront = true;
    mediaDevices.enumerateDevices().then((sourceInfos) => {
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (
          sourceInfo.kind === 'videoinput' &&
          sourceInfo.facing === (isFront ? 'front' : 'environment')
        ) {
          videoSourceId = sourceInfo.deviceId;
        }
      }
      mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            mandatory: {
              minWidth: 500,
              minHeight: 300,
              minFrameRate: 30,
            },
            facingMode: isFront ? 'user' : 'environment',
            optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
          },
        })
        .then((currentStream) => {
          setOwnVideo(currentStream);
          myStream.current = currentStream; 
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);
  

  const ConnectToNewUser = (peerId) => {
    this.setCallAccepted(true);
    const call = myPeer.current.call(peerId, myStream.current);
    call.on('stream', (remoteStream) => {
      setRemoteVideo(remoteStream);
    });
    setPeers(call);
  };

  const AnswerCall = (call) => {
    call.answer(ownVideo);
    call.on('stream', (remoteStream) => {
      setRemoteVideo(remoteStream);
    });
    setPeers(call);
  };

  const AcceptCall = (roomId) => {
    setCallAccepted(true);
    setCallEnded(false);
    setRoomId(roomId);
    socket.emit('join-room', {roomId, userId: socket.id, peerId: myPeer.id});
  };

  const MakeCall = (list) => {
    const roomId = uuidv4();
    socket.emit('join-room', {roomId, userId: me, peerId: peer.id});

    list.forEach((id) => {
      socket.emit('callUser', {userToCall: id, from: me, name, roomId});
    });
  };

  const HangUp = () => {
    setCall({ isReceivedCall: false});
    setCallEnded(true);
    setCallAccepted(false);
    socket.emit('leave-room', {roomId: roomId, userId: socket.id});
}

const LeaveCall = () => {
  peers.close();
  setCall({ isReceivedCall: false});
  setCallEnded(true);
  setCallAccepted(false);
  socket.emit('user-disconnected', {roomId: roomId});
  socket.emit('leave-room', {roomId: roomId, userId: socket.id});
}

const RejectCall = () => {
  setCallAccepted(false);
  socket.emit('reject', {roomId: roomId, userId: socket.id});
}

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        ownVideo,
        setOwnVideo,
        setSocket,
        setMyPeer,
        myPeer,
        remoteVideo,
        setRemoteVideo,
        setCallAccepted,
        stream,
        name,
        setName,
        userList,
        callEnded,
        peers,
        setCall,
        MakeCall,
        HangUp,
        AcceptCall,
        AnswerCall,
        ConnectToNewUser,
        LeaveCall,
        RejectCall
      }}>
      {children}
    </SocketContext.Provider>
  );
};

export {ContextProvider, SocketContext};
