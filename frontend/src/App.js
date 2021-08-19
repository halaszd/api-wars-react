import './App.css';
import { usePlanets } from "./api/useData";
import { useState, useEffect } from "react";
import React from "react";
import SPlanets from "./components/Planets.jsx";
import SLogin from "./components/Login.jsx";
import SRegistration from "./components/Registration.jsx";
import loading from "./components/imperial_loading.gif";
import SVoting from './components/voting';
// import planets from "./components/planets.json";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {

  // TODO: a log out csak akkor jelenjen meg, ha belépett valaki
  // ahhoz useState használata elegendő lesz. Innen adjuk át

  const [pageNum, setPageNum] = useState(0)

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [username, setUsername] = useState("");
  const [stats, setStats] = useState(null);
  const [seen, setSeen] = useState(false);


  const planets = usePlanets(pageNum);

  console.log(planets);

  useEffect(() => {
    fetch('/is-auth').then(response => response.json()).then((data) => {
      setUsername(data.name)
      setIsLoggedIn(JSON.parse(data.isAuth));
      console.log(username);
    })
  })



  function getVotingStats() {
    fetch('/votestats')
    .then(response => response.json())
    .then((data) => {setStats(data); console.log("data in fetch", data)})
    .then(() => setSeen(true))

  }

  return (
    <Router>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Planets</Link></li>
            <li onClick={()=>{ getVotingStats()}}>Voting Statistics</li>
            {isLoggedIn ? null : <li><Link to="/registration">Registration</Link></li>}
            {isLoggedIn ? <li>Logged in as: {username}</li> : <li><Link to="/login">Login</Link></li>}
            {isLoggedIn ? <li className="logoutLi"><form action="/logout?_method=DELETE" method="POST">
              <button className="logout" type="submit">Log Out</button>
            </form></li> : null}
          </ul>
        </nav>
        <h1>Star Wars Universe</h1>
      </header>



      <Switch>
        <Route exact path="/">
          <div className="App">
              {pageNum <= 1 ? <i onClick={() => setPageNum(pageNum - 1)} className="fas fa-chevron-left disabled"></i>
              : <i onClick={() => setPageNum(pageNum - 1)} className="fas fa-chevron-left"></i>
              }
              {pageNum >= 6 ? <i onClick={() => setPageNum(pageNum + 1)} className="fas fa-chevron-right disabled"></i>
              : <i onClick={() => setPageNum(pageNum + 1)} className="fas fa-chevron-right"></i>}
              { planets.results ? <SPlanets data={planets.results} loginState={isLoggedIn} /> : <div className="loadingDiv"><img className="loadingGif" src={loading} alt="loading" /></div> }
              {seen ? <SVoting data={stats} setOuterSeen={setSeen}/> : null}

          </div>

        </Route>

        <Route path="/registration">
          <SRegistration />
        </Route>
        <Route path="/login">
          <SLogin setOuterPageNum={setPageNum} outerPageNum={pageNum} loginState={setIsLoggedIn}/>
        </Route>
      </Switch>

      <footer>
        <div>Font made from <a href="http://www.onlinewebfonts.com">oNline Web Fonts</a>is licensed by CC BY 3.0</div>
      </footer>

    </Router>
  );
}
