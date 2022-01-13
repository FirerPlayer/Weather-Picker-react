// import SearchBox from './SearchBox';
import { useState } from 'react';
import './SearchBox.css'

const api = { 'base': 'http://api.weatherapi.com/v1/', 'key': 'e38c705c66ab40f7b2312432221101' };

var cidade = 'Londres';
var pais = 'United Kingdom';
var temp = 15;
var iconUrl = '';
var situacao = '';


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
    const [query, setQuery] = useState('')
    const [comlist, setComlist] = useState([]);
    const [input, setInput] = useState('');


    const resetComlist = () => {
        setComlist([]);
    }

    const resetInput = () => {
        setInput('');
    }

    const updateWeather = (query) => {
        fetch(api.base + 'current.json?key=' + api.key + '&q=' + query + '&aqi=no')
            .then(
                function (response) {
                    return response.json();
                })
            .then(function (data) {
                if (!data.error) {
                    cidade = data.location.name;
                    pais = data.location.country;
                    temp = data.current.temp_c;
                    iconUrl = data.current.condition.icon;
                    situacao = data.current.condition.text;
                }
            })
    }

    const updateComlist = (val) => {
        let list = []
        fetch('http://api.weatherapi.com/v1/search.json?key=e38c705c66ab40f7b2312432221101&q=' + val)
            .then(
                function (response) {
                    return response.json();
                })
            .then(function (data) {
                data.forEach(x => {
                    list.push(x.name + ', ' + x.country)
                });
                setComlist(list);
                return true;
            }).catch(function (err) {
                return false;
            });
    }
    return (
        <div className="p-4 h-[100%] flex flex-col items-center justify-center bg-transparent trounded-x select-none ">
            <div className="search-box font-ubunto text-stone-800 absolute top-0 max-w-[100%]">
                <input type="text" placeholder="Search" onKeyUp={e => {
                    updateComlist(e.target.value);
                    setQuery(e.target.value);
                    setInput(e.target.value);
                }} value={input} onChange={(e) => {
                    setInput(e.target.value);

                }}></input>
                <div className="search-icon">
                    <i className="fas fa-search"></i>
                </div>
                <div className="cancel-icon" onClick={() => { resetComlist(); resetInput(); }}>
                    <i className="fas fa-times"></i>
                </div>
                <div className="autocom-box rounded-[16px]">
                    {(comlist.length !== 0) ? (
                        comlist.slice(0, 5).map((x, index) => {
                            return <li key={index} className="bg-white bg-opacity-80"
                                onClick={() => { setInput(x) }}>{x}</li>
                        })
                    ) : (
                        ""
                    )}

                </div>
            </div>
            <p id="LabelText" className="font-ubunto text-[clamp(1rem,1em+1vw,4rem)] text-center">
                {cidade}, {pais}<br></br>
                <span className="italic">{dateBuilder(new Date())}</span>
            </p>
            <p className="font-ubunto">
                <span id="temp" className="font-ubunto text-[clamp(4rem,4rem+4vw,14rem)]">28</span>
                <span className="relative text-[clamp(1rem,1em+1vw,6rem)] bottom-[3.3vh] left-1">ºC</span>
            </p>
            <svg id="iW" className="w-24 h-24 rounded-[0_16px_0_16px] bg-cold bg-cover"></svg>
        </div>

    );
}
export default Painel;