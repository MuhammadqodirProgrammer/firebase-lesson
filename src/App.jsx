import { child, get, getDatabase, onValue, ref, set } from "firebase/database";
import { AuthComp } from "./components/Auth";
import FileUpload from "./components/File";
import { Users } from "./components/Users";
import { realTimeDb } from "./firebase.config";
import { useEffect, useRef, useState } from "react";
// import database from "./firebase.config";

function App() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const messageRef = useRef();
  function generateShortUUID() {
    return "xxxx".replace(/[x]/g, function () {
      const r = (Math.random() * 16) | 0; // 0 dan 15 gacha bo'lgan tasodifiy son
      return r.toString(16); // 16lik sistemaga aylantirish
    });
  }
  // create
  function writeUserData(userId, name, email, imageUrl) {
    set(ref(realTimeDb, "users/" + userId), {
      username: name,
      email: email,
      profile_picture: imageUrl,
    });
  }
  const handleSubmit = (id) => {
    set(ref(realTimeDb, "messages/" + id), {
      text: messageRef.current.value,
      id,
    });
  };

  const lisner = async () => {
    const dbRef = ref(realTimeDb, "users/");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setUsers((prev) => Object.values(data));
      console.log(Object.values(data), "lisner data");
    });
  };

  const lisnerMessages = async () => {
    const dbRef = ref(realTimeDb, "messages/");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setMessages((prev) => Object.values(data));
      console.log(Object.values(data), "lisner data");
    });
  };

  useEffect(() => {
    // lisner();
    lisnerMessages()
  }, []);

  console.log(users);

  return (
    <>
      {/* salom
  
      <AuthComp />
      <FileUpload /> */}

      {/* <center>
        <button onClick={() => {
        const userid = prompt("Enter user id ")
        const name = prompt("Enter user name ")
        writeUserData(userid,  name, "email", "imgurl")
        }}>
          add user
        </button>
      </center>

      <ul>
        {users.map((user) => (
          <li > {user?.username} </li>
        ))}
      </ul> */}

      <form >
        <input type="text" placeholder="enter your message" ref={messageRef} />
        <button type="button" onClick={()=>handleSubmit(generateShortUUID())}>send</button>
      </form>


      <ul>
        {
          messages.map((msg) => (
            <li key={msg.id}>{msg?.text}   {msg?.date}    </li>
          ))
        }
      </ul>
    </>
  );
}

export default App;
