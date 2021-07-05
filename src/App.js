// import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

const url = "https://randomuser.me/api";

function fetchData(page) {
  return axios
    .get(url, { page })
    .then((res) => {
      const { results } = res.data;
      return results;
    })
    .catch((err) => {
      console.error(err);
    });
}

function getFullName(user) {
  const {
    name: { first, last },
  } = user;

  return `${first} ${last}`;
}

function getProfileImage(user) {
  const {
    picture: { medium },
  } = user;

  return medium;
}

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState([]);
  const [page, setPage] = useState(1);
  let userArray = [];

  useEffect(() => {
    userArray = [...user];
    fetchData(page).then((res) => {
      userArray.push(res[0]);

      setUser(userArray);
    });
  }, [page]);

  return (
    <div className="App">
      <button onClick={() => setCount((prevCount) => prevCount - 1)}>-</button>
      {count}
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>+</button>

      {user?.map((user) => {
        return (
          <div key={user.cell}>
            <h3>{getFullName(user)}</h3>
            <img src={getProfileImage(user)} alt={getFullName(user)} />
          </div>
        );
      })}

      <button onClick={() => setPage((prevPage) => prevPage + 1)}>
        Load more...
      </button>
    </div>
  );
}

export default App;
