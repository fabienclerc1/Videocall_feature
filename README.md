# Videocall project

This is the project repository for the Videocall feature capstone project. The goal was to develop in three weeks a calling feature that would be integrated in two React.js and React Native apps of a medtech company located in Zürich.

Developers on this project were [Linard Furck](https://www.linkedin.com/in/linard-furck-618a17212/), [Hannes Frömel](https://www.linkedin.com/in/hannes-froemel/) and [Fabien Clerc](https://www.linkedin.com/in/fabienclerc1/).

# Technologies

-   Signaling is done via Socket.io to exchange peers information.
-   Video calls are implemented with the PeerJS library (wrapping WebRTC) to establish the peer to peer connection and share the media streams between users.
-   The backend is built with Django and implements a REST API to store the assigned socket ids and retrieve them from the web app.

## Video call

The Socket Context contains all the logic to handle communication between peers, both for establishing the call and streaming media (audio + video).
Components can then destructure part of it to implement the available methods and states.