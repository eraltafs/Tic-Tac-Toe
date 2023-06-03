import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { useState } from "react";
import JoinGame from "./components/JoinGame";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const api_key = "7avmc67anp34";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [isAuth, setIsAuth] = useState(false);
  const client = StreamChat.getInstance(api_key);
  

  // on click logout delete cookies and return to home or login
  const logout = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("username");
    cookies.remove("channelName");
    client.disconnectUser();
    setIsAuth(false);
  };
  // if get token in cookie show the create room page

  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then((user) => {
        setIsAuth(true);
      });
  }

  return (
    // error handling by errror boundary
    <ErrorBoundary>
      <div className="App">
        {isAuth ? (
          <Chat client={client}>
            <button id="logout-btn" onClick={logout}>
              Logout
            </button>
            <JoinGame />
          </Chat>
        ) : (
          <>
            <div id="loginsignup" style={{ display: "flex", gap: "40px" }}>
              <SignUp setIsAuth={setIsAuth} />
              <Login setIsAuth={setIsAuth} />
            </div>
          </>
        )}
      </div>

    </ErrorBoundary>
  );
}

export default App;
