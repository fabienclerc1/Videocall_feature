import { io } from "socket.io-client";
import React, {createContext, useState, useRef, useEffect} from "react";
import Peer from 'peerjs';
import {v4 as uuidv4} from 'uuid';
import Axios from "../API";

const SocketContext = createContext();

const socket = io('localhost:5000');

const ContextProvider = ({ children }) => {
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
    const [showConnections, setShowConnections] = useState(false);
    const [showPatientInfo, setShowPatientInfo] = useState(false);
    const [showStreams, setShowStreams] = useState(false);


    
    const ownVideo = useRef();
    const myStream = useRef();
    const myPeer = useRef();
    const remoteVideo = useRef();
    const roomIdRef = useRef();
    const myRef = useRef();

    useEffect(() => {
        socket.on('me', (id) => {
            setMe(id);
            myRef.current = id;
        });
        
        const peer = new Peer(undefined, {
            host: 'localhost',
            port: 9000,
            path: '/peer'
        });
        setPeer(peer);
        myPeer.current = peer;
        
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((currentStream) => {
            setStream(currentStream);
            myStream.current = currentStream;
            ownVideo.current.srcObject = currentStream;
        });

        socket.emit('connect-server', socket.id);

        socket.on('callUser', ({from, name: callerName, roomId}) => {
            setCall({ isReceivedCall: true, from, name: callerName, roomId});
        });

        socket.on('user-connected', ({peerId, socketId}) => {
            ConnectToNewUser(peerId);
            CancelForOthers(me, socketId);
        });

        socket.on('user-disconnected', () => {
            HangUp();
        });

        myPeer.current.on('call', (call) => {
            AnswerCall(call);
        });

        socket.on('cancel-call', () => {
            setCall({ isReceivedCall: false});
        });
    }, []);

    useEffect(() => {
        StoreSocketIdInDb();
    }, [me]);

    useEffect(() => {
        console.log('list is', userList);
    }, [userList])

    window.addEventListener('beforeunload', (event) => {
        event.preventDefault();
        DeleteSocketIdFromDb();
        return null;
    });

    window.addEventListener('unload', (event) => {
        event.preventDefault();
        DeleteSocketIdFromDb();
        return null;
    });

    const StoreSocketIdInDb = async () => {
        const config = {
            headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
        };
        const url = `connections/create/`;
        const data = {socket_id: socket.id};
        try {
            const response = await Axios.post(url, data, config);
        } catch(error) {
            console.log(error);
        }
    }

    const DeleteSocketIdFromDb = async () => {
        const config = {
            headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
        };
        const url = `connections/delete/`;
        const data = {socket_id: socket.id};
        try {
            const response = await Axios.post(url, data, config);
        } catch(error) {
            console.log(error);
        }
    }

    const CancelForOthers = (initiatior, callee) => {
        console.log('cancel call', userList);
        userList.forEach(user => {
            if (user.socket_id !== initiatior && user.socket_id !== callee) {
                console.log('cancel call for user');
                socket.emit('cancel-call', { userToCall: user.socket_id });
            }
        });
    };

    const SelectContacts = (list) => {
        setUserList(list);
    }

    const ConnectToNewUser = (peerId) => {     
        setCallAccepted(true);
        const call = myPeer.current.call(peerId, myStream.current);
        call.on('stream', (remoteStream) => {
            remoteVideo.current.srcObject = remoteStream;
        });
        setPeers(call);
    }

    const AnswerCall = (call) => {
        call.answer(myStream.current);
        call.on('stream', (remoteStream) => {
            remoteVideo.current.srcObject = remoteStream;
        });
        setPeers(call);
    };

    const AcceptCall = ({from, roomId}) => {
        setCallAccepted(true);
        setCallEnded(false);
        setRoomId(roomId);
        roomIdRef.current = roomId;
        socket.emit('join-room', {roomId, userId: myRef.current, peerId: peer.id});
    };

    const MakeCall = () => {
        setCallEnded(false);
        setShowPatientInfo(false);
        setShowStreams(true);
        const id = uuidv4();
        setRoomId(id);
        roomIdRef.current = id;
		socket.emit('join-room', {roomId : id, userId: me, peerId: peer.id});

        userList.forEach(user => {
            socket.emit('callUser', { userToCall: user.socket_id, from: me, name, roomId : id });
        });
    };

    const LeaveCall = () => {
        peers.close();
        setCall({ isReceivedCall: false});
        setCallEnded(true);
        setCallAccepted(false);
        socket.emit('user-disconnected', {roomId: roomIdRef.current});
        socket.emit('leave-room', {roomId: roomIdRef.current, userId: me});
    }

    const HangUp = () => {
        setCall({ isReceivedCall: false});
        setCallEnded(true);
        setCallAccepted(false);
        socket.emit('leave-room', {roomId: roomIdRef.current, userId: myRef.current});
    }

    return (
        <SocketContext.Provider value={{call, callAccepted, ownVideo, remoteVideo, stream, name, setName, userList, callEnded, me, MakeCall, LeaveCall, AcceptCall, AnswerCall, SelectContacts, showConnections,
            setShowConnections, showPatientInfo, setShowPatientInfo, showStreams}}>
            {children}
        </SocketContext.Provider>
    )
}

export {ContextProvider, SocketContext};