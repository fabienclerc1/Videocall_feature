import React, { createContext, useEffect, useRef, useState } from 'react';
import Peer from 'react-native-peerjs';
import { mediaDevices } from 'react-native-webrtc';
import Axios from "../../API";
import { AppState } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SocketContext = createContext();

const ContextProvider = ({ children }) => {
    const [stream, setStream] = useState();
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState('');
    const [userList, setUserList] = useState([]);
    const [peers, setPeers] = useState({});
    const [roomId, setRoomId] = useState();
    const [remoteVideo, setRemoteVideo] = useState();
    const [myPeer, setMyPeer] = useState();
    const [socket, setSocket] = useState();
    const [ownVideo, setOwnVideo] = useState();
    const [username, setUsername] = useState();
    const [currentState, setCurrentState] = useState("background");
    const [showConnections, setShowConnections] = useState(false);

    // References
    const myStream = useRef();
    const mySocket = useRef();

    useEffect(() => {
        const peer = new Peer(undefined, {
            host: '10.0.2.2',
            port: 9000,
            path: '/peer',
            secure: false,
        });
        setMyPeer(peer);
        setCurrentState("foreground");
        let isFront = true;

        //store mediaStream (in a reference to make sure we can access it everywhere later on)
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
                        optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
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

    //Delete socket id in DB if app is not in foreground
    useEffect(() => {
        currentState === "foreground" ? (
            AppState.addEventListener('change', state => {
                console.log("state:", state);
                if (state === 'background' || state === 'inactive') {
                    DeleteSocketIdFromDb(socket.id);
                    setCurrentState("background");
                    return null;
                }
            })) : null;
    }, [socket]);

    // Share media stream to user already in room
    const ConnectToNewUser = (peerId) => {
        this.setCallAccepted(true);
        const call = myPeer.current.call(peerId, myStream.current);
        call.on('stream', (remoteStream) => {
            setRemoteVideo(remoteStream);
        });
        setPeers(call);
    };

    // Share media stream to user who already shared them media stream
    const AnswerCall = (call) => {
        call.answer(ownVideo);
        call.on('stream', (remoteStream) => {
            setRemoteVideo(remoteStream);
        });
        setPeers(call);
    };

    // Accept call and join room
    const AcceptCall = (roomId) => {
        setCallAccepted(true);
        setCallEnded(false);
        setRoomId(roomId);
        socket.emit('join-room', { roomId, userId: socket.id, peerId: myPeer.id });
    };

    // Method triggered by the server to hang up the call when the other user already left the call
    const HangUp = () => {
        setCall({ isReceivedCall: false });
        setCallEnded(true);
        setCallAccepted(false);
        socket.emit('leave-room', { roomId: roomId, userId: socket.id });
    }

    // Hang up the call, inform server and reset all flags
    const LeaveCall = () => {
        peers.close();
        setCall({ isReceivedCall: false });
        setCallEnded(true);
        setCallAccepted(false);
        socket.emit('user-disconnected', { roomId: roomId });
        socket.emit('leave-room', { roomId: roomId, userId: socket.id });
    }

    // Reject call and notify server
    const RejectCall = () => {
        setCallAccepted(false);
        socket.emit('reject', { roomId: roomId, userId: socket.id });
    }

    // Store socket id associated with user account JWT token in DB
    const StoreSocketIdInDb = (socketId) => {
        AsyncStorage.getItem('userToken')
            .then(
                (value) => {
                    if (value !== null) {
                        console.log("token:", value);
                        const config = {
                            headers: { Authorization: `Bearer ${value}` },
                        };
                        return config;
                    }
                })
            .then(
                (config) => {
                    console.log("config:", config)
                    const url = `connections/create/`;
                    const data = { socket_id: socketId };
                    const response = Axios.post(url, data, config);
                    return response;
                }
            )
            .then((response) => {
                console.log("response status", response);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    // Delete socket id of the user from the DB
    const DeleteSocketIdFromDb = (socketId) => {
        AsyncStorage.getItem('userToken')
            .then(
                (value) => {
                    if (value !== null) {
                        console.log("value", value);
                        const config = {
                            headers: { Authorization: `Bearer ${value}` },
                        };
                        return config;
                    }
                })
            .then(
                (config) => {
                    const url = `connections/delete/`;
                    const data = { socket_id: socketId };
                    const response = Axios.post(url, data, config);
                    return response;
                }
            )
            .then((response) => {
                console.log("response status", response.status);
            })
            .catch((e) => {
                console.log(e);
            });
    };

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
                HangUp,
                AcceptCall,
                AnswerCall,
                ConnectToNewUser,
                LeaveCall,
                RejectCall,
                DeleteSocketIdFromDb,
                StoreSocketIdInDb,
                setUsername,
                username,
                socket,
                mySocket,

            }}>
            {children}
        </SocketContext.Provider>
    );
};

export { ContextProvider, SocketContext };
