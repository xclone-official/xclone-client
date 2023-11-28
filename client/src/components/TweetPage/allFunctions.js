import axios from "axios";
const backendURL = process.env.REACT_APP_BACKEND_URL;
export async function removeBookMark(tweetId, userId) {
  try {
    const res = await axios.post(
      `${backendURL}/bookmark/savebookmark/${tweetId}/${userId}`
    );
    const { status, user, tweet } = res.data;
    const allReturns = { status, user, tweet };
    return allReturns;
  } catch (error) {
    console.log("error", error);
  }
}

export async function addBookMark(tweetId, userId) {
  try {
    const res = await axios.post(
      `${backendURL}/bookmark/savebookmark/${tweetId}/${userId}`
    );
    const { status, user, tweet } = res.data;
    const allReturns = { status, user, tweet };
    return allReturns;
  } catch (error) {
    console.log("error", error);
  }
}
