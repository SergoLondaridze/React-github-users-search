import './reset.css';
import './App.css';
import { useEffect, useState } from 'react';
import Search from './Search';
import Defindersection from './Devfindersection';
import Userinfo from './Userinfo';
function App() {
  const [showinfo, setShowinfo] = useState(false);
  const [showresult, setShowresult] = useState(true);
  const [user, setUser] = useState('Search GitHub username…')
  const [repos, setRepos] = useState('');
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [time, setTime] = useState('');
  const [avatar, setAvatar] = useState('');
  const [location, setLocation] = useState('');
  const [blog, setBlog] = useState('');
  const [bio, setBio] = useState('');
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [mode, setMode] = useState(false);
  const [twitter, setTwitter] = useState('');
  let backgroundcolor, colorp1, colorinput, colorp2, repandfoll, info;
  function changeMode() {
    if (mode) {
      backgroundcolor = '#141D2F'
      colorp1 = '#FFFFFF'
      colorinput = '#1E2A47'
      colorp2 = '#FFFFFF'
      repandfoll = '#141D2F'
    } else {
      backgroundcolor = '#F6F8FF';
      colorp1 = '#222731';
      colorinput = '#FEFEFE'
      colorp2 = '#4B6A9B'
      repandfoll = '#F6F8FF'
    }
  }
  async function getUser() {
    await fetch(`https://api.github.com/users/${user}`).then((response) => { return response.json(); }).then((json) => {
      info = json
      if (info.message !== "Not Found") {
        setUser(info.login);
        setFollowers(info.followers);
        setTime(info['created_at']);
        setFollowing(info.following);
        setAvatar(info['avatar_url']);
        setBlog(info.blog);
        setLocation(info.location);
        setTwitter(info['twitter_username']);
        setBio(info.bio);
        setCompany(info.company);
        setName(info.name);
        setShowinfo(true);
        setShowresult(true);
      } else {
        setShowinfo(false);
        setShowresult(false);
      }

    })
  }
  async function getRepos() {
    await fetch(`https://api.github.com/users/${user}/repos`).then((response) => { return response.json(); }).then((json) => {
      info = json
      if (info.message === undefined) {
        setRepos(json.length)
      }
    })
  }
  return (
    <div >
      {changeMode()}
      <div className="App" style={{ backgroundColor: backgroundcolor }}>
        <div className='container'>
          <Defindersection setMode={setMode} backgroundcolor={backgroundcolor} colorp1={colorp1} />
          {showresult ? null : <p className='noresult'>No results</p>}
          <Search setUser={setUser} user={user} colorinput={colorinput} colorp2={colorp2} getUser={getUser} getRepos={getRepos} />
          {showinfo && <Userinfo repandfoll={repandfoll} colorp1={colorp1} colorp2={colorp2} colorinput={colorinput}
            bio={bio} name={name} company={company} user={user} repos={repos}
            followers={followers} following={following} time={time} avatar={avatar} location={location} blog={blog} twitter={twitter} />}
        </div>
      </div>
    </div>
  );
}

export default App;
