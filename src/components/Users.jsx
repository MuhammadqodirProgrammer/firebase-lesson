import { useEffect } from "react";
import { db } from "../firebase.config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc
} from "firebase/firestore";
import { useState } from "react";
import { useRef } from "react";

export const Users = () => {
  const [users, setUsers] = useState([]);

  const nameRef = useRef();
  const ageRef = useRef();
  const phoneRef = useRef();
  const usersCollectionRef = collection(db, "users");

  // get all users

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  //   create users collection

  const handleCreateUsers = async (evt) => {
    evt.preventDefault();
    const newUser = {
      name: nameRef.current.value,
      age: parseInt(ageRef.current.value),
      phone: phoneRef.current.value,
    };

    await addDoc(usersCollectionRef, newUser);
    getUsers();
  };

  useEffect(() => {
    getUsers();
  }, []);

  //   edit
  const handleEdit = async (user) => {
    const oneUserRef = doc(db, "users", user.id);
    const value = prompt("Enter new name", user.name);
    const newData = {
      ...user,
      name: value,
    };
    await updateDoc(oneUserRef, newData);
    getUsers();
  };

  //   delete
  const handleDelete = async (id) => {
    const oneUserRef = doc(db, "users", id);
    await deleteDoc(oneUserRef);
    getUsers();
  };

  return (
    <div>
      <h1>Users</h1>

      <form onSubmit={handleCreateUsers}>
        <input type="text" placeholder="name" ref={nameRef} />
        <input type="number" placeholder="age" ref={ageRef} />
        <input type="text" placeholder="phone" ref={phoneRef} />
        <button>submit</button>
      </form>

      <ul>
        {users?.map((user) => (
          <li key={user?.id}>
            {user?.name} - {user?.age}
            <div>
              <button onClick={() => handleEdit(user)}> Edit </button>
              <button onClick={()=>handleDelete(user.id)}> Delete </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
