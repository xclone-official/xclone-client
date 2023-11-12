import {
  React,
  useContext,
  useEffect,
  useState,
  Auth,
  BrowserRouter,
  Route,
  Routes,
  AuthContext,
  Loader,
  Layout,
  io,
  NotificationContext,
  MessageContext,
  Cookies,
  routes,
  Login,
  Register,
  Home,
} from "./Imports";
export default function App() {
  const [, , , , userData, , loading] = useContext(AuthContext);
  const [allNotification, setAllNotification] = useContext(NotificationContext);
  const [, setAllMessages] = useContext(MessageContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(
      io("http://localhost:5000", {
        withCredentials: true,
      })
    );
  }, []);
  useEffect(() => {
    socket?.emit("newUser", userData?.username);
  }, [userData, socket]);
  // Follow socket
  useEffect(() => {
    const handleFollowed = (data) => {
      console.log(data);
      if (
        !allNotification.some(
          (notification) =>
            notification?.authorUsername === data.authorUsername &&
            notification.type === data.type
        )
      ) {
        setAllNotification((prev) => [data, ...prev]);
      }
    };

    socket?.on("followed", handleFollowed);

    // Cleanup the event listener when the component unmounts
    return () => {
      socket?.off("followed", handleFollowed);
    };
  }, [
    socket,
    allNotification?.length,
    allNotification,
    setAllNotification,
    setAllMessages,
  ]);
  // Like socket
  useEffect(() => {
    const handleLiked = (data) => {
      // console.log("handleLike", data);
      if (
        !allNotification.some(
          (notification) =>
            notification.authorUsername === data.authorUsername &&
            notification.type === data.type &&
            notification?.tweet?._id === data?.tweetId
        )
      ) {
        setAllNotification((prev) => [data, ...prev]);
      }
    };

    socket?.on("likedtweet", handleLiked);

    // Cleanup the event listener when the component unmounts
    return () => {
      socket?.off("likedtweet", handleLiked);
    };
  }, [
    socket,
    allNotification?.length,
    allNotification,
    setAllNotification,
    setAllMessages,
  ]);

  // allMsg
  useEffect(() => {
    const handleAllMsg = (data) => {
      data?.length > 0 && setAllMessages(data);
    };

    socket?.on("setAllMsg", handleAllMsg);

    // Cleanup the event listener when the component unmounts
    return () => {
      socket?.off("setAllMsg", handleAllMsg);
    };
  }, [socket, setAllMessages]);

  // Add msg
  useEffect(() => {
    const handleAllMsg = (data) => {
      // console.log("sendAddMsg", data);

      data?.length > 0 && setAllMessages(data);
    };

    socket?.on("sendAddMsg", handleAllMsg);

    // Cleanup the event listener when the component unmounts
    return () => {
      socket?.off("sendAddMsg", handleAllMsg);
    };
  }, [socket, setAllMessages]);

  // reply socket
  useEffect(() => {
    const handleLiked = (data) => {
      setAllNotification((prev) => [data, ...prev]);
    };

    socket?.on("replytweet", handleLiked);

    // Cleanup the event listener when the component unmounts
    return () => {
      socket?.off("replytweet", handleLiked);
    };
  }, [
    socket,
    allNotification?.length,
    allNotification,
    setAllNotification,
    setAllMessages,
  ]);

  if (Cookies.get("xid")) {
    if (loading) {
      return <Loader />;
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={userData ? <Home /> : <Auth />} />
        <Route path="/flow/login" element={userData ? <Home /> : <Login />} />
        <Route
          path="/flow/register"
          element={userData ? <Home /> : <Register />}
        />
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact
            element={
              userData ? (
                <Layout socket={socket} {...route.element.props} />
              ) : (
                <Auth />
              )
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
