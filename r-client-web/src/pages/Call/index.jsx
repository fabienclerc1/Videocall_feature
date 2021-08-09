import styled from "styled-components";
import ContactMenu from "../../components/ContactMenu";
import VideoWindow from "../../components/Video";
import { ContextProvider } from "../../components/SocketContext";

const LeftMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  background: #fafafa;
`

const RightContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 70%;
  background: #fefefe;
`
const BackgroundImage = styled.img`
    width: 70vw;
    height: 60vh;
    z-index: 1;
`



const Call = () => {
    return (
        <ContextProvider>
            <LeftMenu>
                <div>
                    <ContactMenu></ContactMenu>
                </div>
            </LeftMenu>
            <RightContainer>
                <VideoWindow />
            </RightContainer>
        </ContextProvider>
    )
}

export default Call;