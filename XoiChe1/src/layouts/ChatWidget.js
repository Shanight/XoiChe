import React, { useState } from "react";
import "./ChatWidget.css";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false); // Quản lý trạng thái mở/đóng của cửa sổ chat
  const [messages, setMessages] = useState([]); // Lưu trữ tin nhắn
  const [inputValue, setInputValue] = useState(""); // Giá trị trong ô nhập

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return; // Không gửi nếu tin nhắn rỗng
    setMessages([...messages, { user: "You", text: inputValue }]);
    setInputValue(""); // Xóa nội dung ô nhập sau khi gửi
  };

  return (
    <div className="chat-widget">
      <button className="chat-toggle-btn" onClick={toggleChat}>
        💬 {isOpen ? "Đóng Chat" : "Hỗ Trợ"}
      </button>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">Hỗ Trợ Trực Tuyến</div>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.user === "You" ? "user" : "bot"}`}>
                <strong>{msg.user}: </strong>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input-container">
            <input
              type="text"
              className="chat-input"
              placeholder="Nhập tin nhắn..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button className="chat-send-btn" onClick={handleSendMessage}>
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
