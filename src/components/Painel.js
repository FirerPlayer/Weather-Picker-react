// import SearchBox from './SearchBox';
import { useState } from 'react';
import './Painel.css'
import { ReactComponent as Sun } from '../img/sun.svg';
import { ReactComponent as SunPart } from '../img/sun_part.svg';

const api = { 'base': 'https://api.weatherapi.com/v1/', 'key': 'e38c705c66ab40f7b2312432221101' };

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} de ${month}, ${year}`
}

function Painel() {
    const [comlist, setComlist] = useState([]);
    const [input, setInput] = useState('');
    const [weather, setWeather] = useState('');

    const updateWeather = (query) => {
        if (query === '') {
            return
        }
        fetch(api.base + 'current.json?key=' + api.key + '&q=' + query + '&aqi=no')
            .then(
                function (response) {
                    return response.json();
                })
            .then(function (data) {
                if (!data.error) {
                    setWeather(data);
                }
            })
    }

    const resetComlist = () => {
        setComlist([]);
    }

    const resetInput = () => {
        setInput('');
    }

    const updateComlist = (val) => {
        let list = []
        fetch('http://api.weatherapi.com/v1/search.json?key=e38c705c66ab40f7b2312432221101&q=' + val)
            .then(
                function (response) {
                    return response.json();
                })
            .then(function (data) {
                if (data.length > 0) {
                    data.forEach(x => {
                        list.push(x.name + ', ' + x.country)
                    });
                }
                setComlist(list);
                return true;
            })
    }
    return (
        <div className="p-4 h-[100%] flex flex-col items-center justify-center bg-transparent trounded-x select-none" onLoadStart={(e) => updateWeather('London')}>
            <div className="search-box font-ubunto text-stone-800 absolute top-0 max-w-[100%]">
                <input type="text" placeholder="Search" value={input} onChange={(e) => {
                    setInput(e.target.value);
                    updateComlist(e.target.value);
                }}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            updateWeather(input);
                            resetComlist();
                        }
                    }}></input>
                <div className="search-icon">
                    <div className="w-[60px] h-[60px] rounded-full absolute -left-1 -top-1"
                        onClick={() => {
                            if (input === '') {
                                return
                            }
                            updateWeather(input);
                            resetComlist();
                        }}></div>
                    <i className="fas fa-search"></i>
                </div>
                <div className="cancel-icon" onClick={() => { resetComlist(); resetInput(); }}>
                    <i className="fas fa-times"></i>
                </div>
                <div className="autocom-box">
                    {(comlist.length !== 0) ? (
                        comlist.slice(0, 5).map((x, index) => {
                            return <div><li key={index} className=" hover:bg-zinc-200 hover:bg-opacity-80 hover:shadow-inner"
                                onClick={() => { setInput(x); resetComlist(); }}>{x}</li></div>
                        })
                    ) : (
                        ""
                    )}

                </div>
            </div>
            {(weather !== "") ? (
                <div className="flex flex-col items-center justify-center">
                    <p className="font-ubunto text-[clamp(1rem,1em+1vw,4rem)] text-center">
                        {weather.location.name}, {weather.location.country}<br></br>
                        <span className="italic">{dateBuilder(new Date())}</span>
                    </p>
                    <p className="font-ubunto">
                        <span id="temp" className="font-ubunto text-[clamp(4rem,4rem+4vw,14rem)]">{Math.round(weather.current.temp_c)}</span>
                        <span className="relative text-[clamp(1rem,1em+1vw,6rem)] bottom-[3.3vh] left-1">ºC</span>
                    </p>
                    {/* <div className={"w-24 h-24 shadow-xl  rounded-full border-4 border-current bg-[url('" + weather.current.condition.icon + "')] bg-cover"}></div> */}
                    <p id="LabelText" className="font-ubunto text-[clamp(1rem,1em+1vw,4rem)] text-center">
                        {weather.current.condition.text}
                    </p>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center bottom-0">
                    <SunPart className="absolute bottom-0 max-h-full max-w-full animate-[rotate-center_8s_ease-in-out_8s_infinite_alternate_both]" />
                    <Sun className="absolute bottom-[10px] max-h-full max-w-full" />
                </div>
            )}

        </div>

    );
}
export default Painel;