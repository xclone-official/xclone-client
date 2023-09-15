import React, { useContext } from "react";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";

export default function Profile() {
  const [
    showLogin,
    setShowLogin,
    showRegister,
    setShowRegister,
    userData,
    setUserData,
    loading,
    setLoading,
    allTweets,
    setAllTweets,
    infoLoader,
    setInfoLoader,
  ] = useContext(AuthContext);
  React.useEffect(() => {
    if (userData) {
      document.title = `${userData.fullname} (@${userData.username}) / X`;
    } else document.title = "X";
  }, []);
  return (
    <div>
      <div>Profile</div>
    </div>
  );
}
