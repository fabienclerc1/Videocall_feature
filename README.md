# Videocall feature

Videocall feature to be integrated into a React.js web app and React Native mobile app.

-   The signaling is done via Socket.io to exchange peers information.
-   The video call is implemented with the PeerJS library (wrapping WebRTC) to establish the peer to peer connection and share the media streams between users.
-   The backend is built with Django and implements a REST API to store the assigned socket Ids and retrieve them from the web app.

## Video call

The Socket Context contains all the logic to handle communication between peers, both for establishing the call and streaming media (audio + video).
Components can then destructure part of it to implement the available methods and states.