import logo from './planet-logo.svg';
import './App.css';
import {useEffect, useState} from 'react';

function App() {

  const [data, setData] = useState([]);

  const [queryPhrase, setQueryPhrase] = useState('');

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
          MCC Finder
        </p>
      </header>
      <div className="add-results-container">
         <form onSubmit={handleSubmit}>
            <input type="text" className="form-control" value={queryPhrase}
               onChange={(e) => setQueryPhrase(e.target.value)}
            />
            <button class="button-70" role="button" type="submit">Get MCC Results</button>
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
