import logo from './planet-logo.svg';
import './App.css';
import {useEffect, useState} from 'react';

function App() {

  const [data, setData] = useState([]);

  const [queryPhrase, setQueryPhrase] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
       .then((response) => response.json())
       .then((response) => {
          console.log(response);
          // setData(actualData);
          // console.log(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
  }, []);

  const handleSubmit = (e) => {
      e.preventDefault();
      predictMCC(queryPhrase);
  };  

  const predictMCC = async (queryPhrase) => {
    await fetch('https://fastapi-production-c09f.up.railway.app/predict', {
       method: 'POST',
       body: JSON.stringify({
          query: queryPhrase,
       }),
       headers: {
          'Content-type': 'application/json; charset=UTF-8',
       },
    })
       .then((response) => response.json())
       .then((response) => {
          setData(response);
          console.log(data);
          // setPosts((posts) => [data, ...posts]);
          // setTitle('');
          // setBody('');
          // console.log(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
 };


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
            <input type="text" className="form-control" value={queryPhrase}
               onChange={(e) => setQueryPhrase(e.target.value)}
            />
            <button type="submit">Get MCC Results</button>
         </form>
      </div>
      <tbody>
        <tr>
          <th>MCC Code</th>
          <th>Name</th>
          <th>Match</th>
          <th>Description</th>
        </tr>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.mcc_code}</td>
            <td>{item.name}</td>
            <td>{item.mcc_match}</td>
            <td>{item.mcc_description}</td>
          </tr>
        ))}
      </tbody>
    </div>
  );
}

export default App;
