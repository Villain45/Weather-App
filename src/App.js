import  { useState } from 'react'
import axios from 'axios'

function App() {
  const [data,setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `http://api.weatherapi.com/v1/current.json?key=383dcf05ec5e4cedb6153442222406&q=${location}`
  
  const searchLocation = (event) => {
    if(event.key === 'Enter') { 
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data);
      })
      setLocation('');
    }
  }
  
  return (
    <div className="app">
      <div className="search">
        <input 
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Search Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            {data.location ? data.location.name!==data.location.region ? 
            <p>{data.location.name}, {data.location.region}, {data.location.country}</p> 
            : <p>{data.location.name}, {data.location.country}</p>
            : null}
          </div>
          <div className="temp">
            {data.current ? <h1>{data.current.temp_c.toFixed()} °C<br/>{data.current.temp_f.toFixed()} °F</h1> : null}
          </div>
          <div className="description">
            {data.current ? <p>{data.current.condition.text}</p> : null}
          </div>
        </div>
        {data.location!==undefined &&
          <div className="bottom">
          <div className="feels"> 
            {data.current ? <p className="bold">{data.current.feelslike_c.toFixed()} °C / {data.current.feelslike_f.toFixed()} °F</p> : null}
            <p>Feels like</p>
          </div>
          <div className="humidity">
            {data.current ? <p className="bold">{data.current.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.current ? <p className="bold">{data.current.wind_kph.toFixed()} KPH</p> : null}
            <p>Wind speed</p>
          </div>
        </div>
        }
      </div>      
    </div>
  );
}

export default App;
