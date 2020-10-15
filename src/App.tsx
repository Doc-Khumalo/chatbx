import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import "./App.scss";

export default function App() {
  const [chatId, setChatId] = useState<any>(null);
  const [chat, setChat] = useState<any[]>([]);
  const [chatData, setChatData] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      const { code, data }: { code: number; data: any[] } = await (
        await fetch("https://gorest.co.in/public-api/posts")
      ).json();

      if (code === 200) setChatData(data);
    };
    getData();
  }, []);

  useEffect(() => {
    if (chatId) {
      const newdata = chatData.filter(({ id }) => id === chatId);
      setChat(newdata);
    }
  }, [chatId, chatData]);

  return (
    <Container maxWidth="sm">
      <div className="chat-box-wrapper-container">
        <div className="chat-box-wrapper">
          <span onClick={() => setChat([])} className="chat-header">
            {chat.length > 0 ? "View all" : "Chat"}
          </span>
          <span onClick={() => {}} className="chat-status">
            Available
          </span>
        </div>
        <div className="chat-box">
          {chat.length > 0 ? (
            <>
              {chat.map((chatitem) => (
                <p className="message" key={chatitem.id}>
                  {chatitem.body}
                </p>
              ))}
            </>
          ) : (
            <>
              {chatData.length > 0 &&
                chatData.map((item) => (
                  <div
                    className="chat"
                    onClick={() => setChatId(item.id)}
                    key={item.id}
                  >
                    <p className="chat-box-username">placeholder name</p>
                    <p className="chat-box-intro">{item.title}</p>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </Container>
  );
}
