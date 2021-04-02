import React, { useState, createContext, useContext, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { io } from "socket.io-client";

const socket = io("localhost:5000");

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export default function Provider({ children }) {
  const [username, setUsername] = useState("");
  const [id, setId] = useState(uuid());
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    /* adds a new message when a user joins the chat */
    socket.on("message", ({ id, message, username }) => {
      setMessages((prevState) => [...prevState, { id, message, username }]);
    });
  }, []);

  const data = {
    socket,
    username,
    setUsername,
    id,
    setId,
    room,
    setRoom,
    messages,
    setMessages,
  };
  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
}
