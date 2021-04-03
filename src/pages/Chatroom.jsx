// TODO: add exit button

import React, { useEffect, useRef } from "react";
import { useAppContext } from "../context/Provider";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

export default function Chatroom() {
  const inputRef = useRef();
  const endRef = useRef(null);
  const history = useHistory();
  const { messages, socket, room, id, username } = useAppContext();

  /* sends the messages view to the current message at the bottom */
  const scrollToBottom = () => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  };

  /* sends message to the server and then to the other chatroom members */
  const handleSend = (e) => {
    e.preventDefault();
    if (inputRef.current.value === "") return;

    /* sends message to server */
    socket.emit("message", {
      id,
      message: inputRef.current.value,
      room,
      username,
    });
    inputRef.current.value = "";
  };

  const handleHome = (e) => {
    e.preventDefault();
    history.push("/");
  };

  //! FIX: currently reloads page and disconnects user from the socket
  /* alerts user when they try to reload the page. */
  const handleUnload = (e) => {
    e.returnValue = "unloading";
    e.preventDefault();
    socket.emit("test", room);

    return "unloading";
  };

  //! FIX: on window close send socket message
  useEffect(() => {
    window.addEventListener("beforeunload", handleUnload);
    scrollToBottom();

    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [messages]);

  return (
    <Container>
      <Header>
        <i onClick={handleHome} role="button" className="fas fa-arrow-left"></i>
        <p>Home</p>
      </Header>
      <MessagesContainer>
        {messages.map((msg, i) =>
          msg.id === id ? (
            <UserDiv key={i}>
              <UserMessage>{msg.message}</UserMessage>
              <p>{msg.username}</p>
            </UserDiv>
          ) : (
            <OtherDiv key={i}>
              <OtherMessage>{msg.message}</OtherMessage>
              <p>{msg.username}</p>
            </OtherDiv>
          )
        )}
        <InputContainer>
          <Input ref={inputRef} type="text" />
          <Send onClick={handleSend}>Send</Send>
        </InputContainer>
        <div ref={endRef} />
      </MessagesContainer>
    </Container>
  );
}

// - Styled Components - //
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 4rem 1rem;
`;

// Messages
const MessagesContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
`;
const UserDiv = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
  margin: 1rem;
`;
const UserMessage = styled.p`
  padding: 1rem;
  background: #0dca92;
  color: white;
  border-radius: 1.5rem 1.5rem 0.3rem 1.5rem;
  max-width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const OtherDiv = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  flex-direction: column;
  margin: 1rem;
`;
const OtherMessage = styled.p`
  padding: 1rem;
  background: #f7f7f5;
  color: #131313;
  border-radius: 1.5rem 1.5rem 1.5rem 0.3rem;
  max-width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Back Button
const Header = styled.div`
  position: fixed;
  width: 100%;
  max-width: 1000px;
  background: white;
  height: 5rem;
  top: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 1rem;

  i {
    font-size: 18px;
    margin-right: 1rem;
    cursor: pointer;
  }
`;

// Inputs
const InputContainer = styled.form`
  position: fixed;
  width: 100%;
  max-width: 1000px;
  background: white;
  height: 5rem;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
`;
const Input = styled.input`
  height: 3rem;
  width: 80%;
  border: 1px solid #b6b6b6;
  outline: none;
  padding-left: 1rem;
  border-radius: 1.5rem 0 0 1.5rem;
`;
const Send = styled.button`
  width: 20%;
  height: 3rem;
  cursor: pointer;
  background: #0dca92;
  color: white;
  font-weight: bold;
  border-radius: 0 1.5rem 1.5rem 0rem;
  border: 1px solid #0dca92;
`;
