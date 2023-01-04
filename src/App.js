import logo from './planet-logo.svg';
import './App.css';
import {useEffect, useState} from 'react';

function App() {

  const [posts, setPosts] = useState([]);

  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
       .then((response) => response.json())
       .then((data) => {
          console.log(data);
          setPosts(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
 }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <p>
        hello world again
      </p>
      <div className="add-post-container">
         <form onSubmit={handleSubmit}>
            <input type="text" className="form-control" value={query}
               onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Get MCC Results</button>
         </form>
      </div>
    </div>
  );
}

export default App;
