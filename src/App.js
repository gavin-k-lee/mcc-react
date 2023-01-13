// import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import { inject } from '@vercel/analytics';

function App() {
  
  inject();

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
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h1>
          MCC Finder
        </h1>
      </header>
      <div className="add-results-container">
        <h2>
          About
        </h2>
        <ul>
          <li>
            Merchant category codes (MCCs) are four-digit numbers that describe a merchant's primary business activities.
          </li>
          <li>
            This application uses MCC descriptions from <a href='https://www.mastercard.us/content/dam/mccom/en-us/documents/rules/quick-reference-booklet-merchant-edition.pdf' target="_blank">Mastercard (2018)</a> and <a href='https://pypi.org/project/sentence-transformers/' target="_blank">natural language models</a> (machine learning) to find the best match of your query to an MCC. 
          </li>
          <li>
            This is an open source project and you can access it here: <a href='https://github.com/gavin-k-lee/mcc-react' target="_blank">front-end</a> and <a href='https://github.com/gavin-k-lee/mcc-api' target="_blank">back-end</a>.
          </li>
        </ul>
        <br></br>
         <form onSubmit={handleSubmit}>
            <input type="text"
                  className="form-control"
                  value={queryPhrase}
                  placeholder="Enter a search phrase"
                  onChange={(e) => setQueryPhrase(e.target.value)}
            />
            <button class="button-70" role="button" type="submit">Get MCC Matches</button>
         </form>
      </div>
      <table class="content-table">
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
              <td>{item.mcc_description.length > 250 ? `${item.mcc_description.substring(0, 250)}...` : item.mcc_description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
