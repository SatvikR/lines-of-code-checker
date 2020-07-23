import React, { useState } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import "./main.css"

function App() {
  const [user, setUser] = useState("");
  const [repo, setRepo] = useState("");
  const [langs, setLangs] = useState([]);

  const handleUser = (e) => {
    setUser(e.target.value);
  };

  const handleRepo = (e) => {
    setRepo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get("https://api.codetabs.com/v1/loc?github=" + user + "/" + repo)
      .then((res) => {
        setLangs(res.data);     
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="app">
      <h1 className="title"> Github Lines of Code Checker </h1>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <input type="text" value={user} placeholder="Github Username" onChange={handleUser} />
          <input type="text" value={repo} placeholder="Repository" onChange={handleRepo} />
          <input type="submit" value="Submit" />
        </form>
      </div>
      <div className="langs">
        <table>
          <thead>
            <tr>
              <th>Language</th>
              <th>Lines of Code</th>
            </tr>
          </thead>
          <tbody>
          {
          langs.map((lang, i) => {
            return (
              <tr key={Math.random().toString()}>
                <td>{lang.language}</td>
                <td>{lang.lines} lines of code</td>
              </tr>
            );
          })
          }
          </tbody>
        </table>
      </div>
    </div>      
  );
}

export default App;
