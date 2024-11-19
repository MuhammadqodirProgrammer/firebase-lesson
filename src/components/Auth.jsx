import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, singInWithGitHub, singInWithGoogle } from "../firebase.config";
import { useState } from "react";
export const AuthComp = () => {
  const [user, setUser] = useState();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const handleRegister = async (evt) => {
    evt.preventDefault();
    const data = await createUserWithEmailAndPassword(
      auth,
      evt.target.children[0].value,
      evt.target.children[1].value
    );
  };

  const handleLogin = async (evt) => {
    evt.preventDefault();
    const data = await signInWithEmailAndPassword(
      auth,
      evt.target.children[0].value,
      evt.target.children[1].value
    );
  };

  console.log(user);

  return (
    <div>
      <h1>Auth</h1>

      <button onClick={() => singInWithGoogle()}> sign in with google </button>
      <button onClick={() => singInWithGitHub()}> sign in with github </button>

      <form onSubmit={handleRegister}>
        <input type="email" placeholder="email" />
        <input type="string" placeholder="password" />
        <button>register</button>
      </form>

      <br />
      <hr />

      <form onSubmit={handleLogin}>
        <input type="email" placeholder="email" />
        <input type="string" placeholder="password" />
        <button>login</button>
      </form>

      <br />

      <button onClick={() => signOut(auth)}> log out </button>

      <div>
        <h2> User info: {user?.email || "no user"} </h2>
        {user?.photoURL && (
          <img
            src={user?.photoURL}
            alt="user photo"
            width={200}
            height={200}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        )}
      </div>
    </div>
  );
};
