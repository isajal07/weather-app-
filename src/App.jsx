import React,{Component} from 'react';
import './App.css';
import './sass/app.scss';

import TopSection from "./components/top/index";
import BottomSection from "./components/bottom/index"

import axios from 'axios';

const KEY = "5b1196fbab0b4f61849112937192107";

class App extends Component{

  constructor(props){
    super(props);
    this.state={
      cityName:"Kathmandu",
      numForcastDays:4,
      isLoading:true
    };
  }

  updateWeather() {
    const{cityName, numForcastDays} = this.state;
    const URL = `http://api.apixu.com/v1/forecast.json?key=${KEY}&q=${cityName}&days=${numForcastDays}`;
    axios.get(URL)
    .then((res)=>res.data)
    .then((data)=>{
      this.setState({
                   isLoading: false,
                      temp_c: data.current.temp_c,
                       isDay: data.current.is_day,
                        text: data.current.condition.text,
                     iconURL: data.current.condition.icon,
                     forecastdays: data.forecast.forecastday
                   });
    })
    .catch(err => {
      if(err) console.error("Cannot fetch Weather Data from API, ", err);
    });
  }

  componentDidMount() {

    const { eventEmitter } = this.props;

    this.updateWeather();

      eventEmitter.on("updateWeather",(data)=>{
      this.setState({cityName: data},()=>this.updateWeather());
    });

  }


  render() {
    const {isLoading, cityName, temp_c, isDay, text, iconURL, forecastdays} = this.state;

    return(
      <div className="app-container">
       <div className="main-container">
        {isLoading && <h3>Loading Weather...</h3>}
         {!isLoading && (
          <div className="top-section">
        <TopSection
         location={cityName}
         temp_c={temp_c}
         isDay={isDay}
         text={text}
         iconURL={iconURL}
         eventEmitter={this.props.eventEmitter}
         />
    </div>
       )}
     <div className="bottom-section">
      <BottomSection forecastdays={forecastdays}/>
     </div>
    </div>
    </div>
  );
  }
}

export default App;
