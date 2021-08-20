import { io } from "socket.io-client";
import React, { createContext, useState, useRef, useEffect } from "react";
import Peer from 'peerjs';
import { v4 as uuidv4 } from 'uuid';
import Axios from "../API";

const SocketContext = createContext();

const socket = io('localhost:5000');

const ContextProvider = ({ children }) => {
    const [stream, setStream] = useState();
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [me, setMe] = useState(''); //socket id assigned by the server
    const [name, setName] = useState('');
    //
    const [userList, setUserList] = useState([]); //list of users linked to the same patient id
    const [peer, setPeer] = useState(null); // peer js client information
    const [peers, setPeers] = useState({});
    const [roomId, setRoomId] = useState();
    const [showConnections, setShowConnections] = useState(false); //left menu, connections list with same patient id
    const [showPatientInfo, setShowPatientInfo] = useState(false); //left menu, patients list
    const [showStreams, setShowStreams] = useState(false); //show stream during call

    // Video references
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

        //store mediaStream (in a reference to make sure we can access it everywhere later on)
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then((currentStream) => {
                setStream(currentStream);
                myStream.current = currentStream;
                ownVideo.current.srcObject = currentStream;
            });

        // default event to connect to server
        socket.emit('connect-server', socket.id);

        socket.on('callUser', ({ from, name: callerName, roomId }) => {
            //set call property to display the notification on client app
            setCall({ isReceivedCall: true, from, name: callerName, roomId });
        });

        socket.on('user-connected', ({ peerId, socketId }) => {
            //share media stream to the first user who picked up the call (joined the room)
            ConnectToNewUser(peerId);
            //cancel call for the other users who did not pick up the call
            CancelForOthers(me, socketId);
        });

        socket.on('user-disconnected', () => {
            //Also hang up the call if the other user leaves the call
            HangUp();
        });

        myPeer.current.on('call', (call) => {
            //Peer js event triggered when we receive a mediastream from a user already in the room
            AnswerCall(call);
        });

        socket.on('cancel-call', () => {
            // set object to cancel call, event forwarded by the server
            setCall({ isReceivedCall: false });
        });
    }, []);

    useEffect(() => {
        //Call method at loading of the component to store socket id in DB
        StoreSocketIdInDb();
    }, [me]);

    useEffect(() => {
        console.log('list is', userList);
    }, [userList])

    // Event to trigger a deletion of the id in DB if tab is refreshed
    window.addEventListener('beforeunload', (event) => {
        event.preventDefault();
        DeleteSocketIdFromDb();
        return null;
    });

    // Event to trigger a deletion of the id in DB if tab/browser is closed
    window.addEventListener('unload', (event) => {
        event.preventDefault();
        DeleteSocketIdFromDb();
        return null;
    });

    // Store socket id associated with user account JWT token in DB
    const StoreSocketIdInDb = async () => {
        const config = {
            headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
        };
        const url = `connections/create/`;
        const data = { socket_id: socket.id };
        try {
            const response = await Axios.post(url, data, config);
        } catch (error) {
            console.log(error);
        }
    }

    // Delete socket id of the user from the DB
    const DeleteSocketIdFromDb = async () => {
        const config = {
            headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
        };
        const url = `connections/delete/`;
        const data = { socket_id: socket.id };
        try {
            const response = await Axios.post(url, data, config);
        } catch (error) {
            console.log(error);
        }
    }

    // Cancel call for user who were on the list but who did not pick up the call first
    const CancelForOthers = (initiatior, callee) => {
        console.log('cancel call', userList);
        userList.forEach(user => {
            if (user.socket_id !== initiatior && user.socket_id !== callee) {
                console.log('cancel call for user');
                socket.emit('cancel-call', { userToCall: user.socket_id });
            }
        });
    };

    // Store list of users (patients + related contacts) in state
    const SelectContacts = (list) => {
        setUserList(list);
    }

    // Share media stream to user in room
    const ConnectToNewUser = (peerId) => {
        setCallAccepted(true);
        const call = myPeer.current.call(peerId, myStream.current);
        call.on('stream', (remoteStream) => {
            remoteVideo.current.srcObject = remoteStream;
        });
        setPeers(call);
    }

    // Share media stream to user who already shared them media stream
    const AnswerCall = (call) => {
        call.answer(myStream.current);
        call.on('stream', (remoteStream) => {
            remoteVideo.current.srcObject = remoteStream;
        });
        setPeers(call);
    };

    // Accept call and join room
    const AcceptCall = ({ from, roomId }) => {
        setCallAccepted(true);
        setCallEnded(false);
        setRoomId(roomId);
        roomIdRef.current = roomId;
        socket.emit('join-room', { roomId, userId: myRef.current, peerId: peer.id });
    };

    // Initiate call and call all users available and related to same patient id
    const MakeCall = () => {
        setCallEnded(false);
        setShowPatientInfo(false);
        setShowStreams(true);
        const id = uuidv4();
        setRoomId(id);
        roomIdRef.current = id;
        socket.emit('join-room', { roomId: id, userId: me, peerId: peer.id });

        userList.forEach(user => {
            socket.emit('callUser', { userToCall: user.socket_id, from: me, name, roomId: id });
        });
    };

    // Hang up the call, inform server and reset all flags
    const LeaveCall = () => {
        peers.close();
        setCall({ isReceivedCall: false });
        setCallEnded(true);
        setCallAccepted(false);
        socket.emit('user-disconnected', { roomId: roomIdRef.current });
        socket.emit('leave-room', { roomId: roomIdRef.current, userId: me });
    }

    // Method triggered by the server to hang up the call when the other user already left the call
    const HangUp = () => {
        setCall({ isReceivedCall: false });
        setCallEnded(true);
        setCallAccepted(false);
        socket.emit('leave-room', { roomId: roomIdRef.current, userId: myRef.current });
    }

    return (
        <SocketContext.Provider value={{
            call, callAccepted, ownVideo, remoteVideo, stream, name, setName, userList, callEnded, me, MakeCall, LeaveCall, AcceptCall, AnswerCall, SelectContacts, showConnections,
            setShowConnections, showPatientInfo, setShowPatientInfo, showStreams
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export { ContextProvider, SocketContext };