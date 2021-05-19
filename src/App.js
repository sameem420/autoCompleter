import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const getUsers = async () => {
    const response = await axios.get("https://reqres.in/api/users");
    console.log(response.data)
    setUsers(response.data.data);
  }
  getUsers();
  }, []);

  const onChangeHandler = (text) => {
    let matches = [];
    if(text.length > 0) {
      matches = users.filter(user => {
        const regex = new RegExp(`${text}`, "gi")
        return user.email.match(regex)
      })
    }
    setSuggestions(matches)
    setText(text);
  }

  const onSuggestHandler = (text) => {
    setText(text);
    setSuggestions([]);
  }

  return (
    <div className="container">
      <div className="row">
        <input className="col-md-12 input-lg textInput" 
        type="text" 
        onChange={(e) => onChangeHandler(e.target.value)} 
        value={text} 
        onBlur={() => {
          setTimeout(() => {
            setSuggestions([]);
          }, 100);
        }}
        />
      
        {suggestions && suggestions.map((suggestion, index) =>
          <div key={index} className="col-md-12 text-center border border-secondary rounded mt-1 suggestion" onClick={() => onSuggestHandler(suggestion.email)}>
            {suggestion.email}
          </div>
        )}
      </div>
    </div>
    
  );
}

export default App;
