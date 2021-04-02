import React, { useRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useAppContext } from "../context/Provider";

export default function Join() {
  const nameRef = useRef();
  const roomRef = useRef();
  const history = useHistory();
  const [error, setError] = useState(false);
  const { socket, setUsername, setRoom, id, setMessages } = useAppContext();

  // Functions
  const handleSignIn = () => {
    if (nameRef.current.value === "" || roomRef.current.value === "") {
      /* throws error for required fields  */
      setError("Please enter a username and room");
      return;
    }

    /* resets the messages array when a user quits and signs in again */
    setMessages([]);

    /* sends room name, username, and id to the server */
    socket.emit("sign-in", {
      room: roomRef.current.value,
      name: nameRef.current.value,
      id: id,
    });

    /* set app state */
    setUsername(nameRef.current.value);
    setRoom(roomRef.current.value);

    /* takes user to the chatroom component/page */
    history.push("/chatroom");

    /* reset the inputs to their default state */
    nameRef.current.value = "";
    roomRef.current.value = "";
  };

  return (
    <Container>
      <h1>Join a Room</h1>
      <hr />
      {error && <p>{error}</p>}
      <Wrapper role="input">
        <i className="far fa-user" />
        <Input ref={nameRef} placeholder="Username" type="text" />
      </Wrapper>
      <Wrapper>
        <i className="fas fa-home" />
        <Input ref={roomRef} placeholder="Room Name" type="text" />
      </Wrapper>
      <Button onClick={handleSignIn}>Join</Button>
    </Container>
  );
}

// - Styled Components - //
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  hr {
    height: 6px;
    width: 40px;
    background: #0dca92;
    border: none;
    border-radius: 0.4rem;
    margin-bottom: 2rem;
    transition: 0.3s;
  }
  h1 {
    color: #0dca92;
    margin-bottom: 2rem;
    font-weight: bold;
    font-size: 45px;
    transition: 0.3s;
  }

  p {
    font-weight: lighter;
    margin-bottom: 1rem;
    color: #ff0000;
    transition: 0.3s;
  }
`;
const Wrapper = styled.div`
  transition: 0.3s;
  width: 300px;
  height: 50px;
  border: 2px solid #bebebe;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.4rem;
  transition: 0.2s;
  margin: 1rem 0;

  i {
    transition: 0.2s;
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: #bebebe;
  }

  &:hover {
    border: 2px solid #0dca92;

    i {
      color: #0dca92;
    }
  }
`;
const Input = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 0.4rem;
  outline: none;

  &::placeholder {
    color: #bebebe;
  }
`;
const Button = styled.button`
  padding: 1rem 3rem;
  background-color: #0dca92;
  color: white;
  font-weight: bold;
  border-radius: 2rem;
  border: none;
  outline: none;
  margin-top: 2rem;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;
