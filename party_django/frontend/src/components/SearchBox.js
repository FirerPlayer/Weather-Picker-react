import React, { Component, useState } from 'react';
import './SearchBox.css'


class searchData {
    constructor(dados) {
        this.dados = dados;
    }
}

function SearchBox() {

    const [query, setQuery] = useState('')
    const [comlist, setComlist] = useState([]);
    const [input, setInput] = useState('');
    const transfer = new searchData({ 'input': input, 'query': query })
    const atualizaTransfer = () => {
        transfer.dados = { 'input': input, 'query': query };
    }

    const resetComlist = () => {
        setComlist([]);
    }

    const resetInput = () => {
        setInput('');
    }

    const updateComlist = (val) => {
        // var res = document.querySelector(".autocom-box");
        // res.innerHTML = '';
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
        <div className="search-box font-ubunto text-stone-800 absolute top-0 max-w-[100%]">
            <input type="text" placeholder="Search" onKeyUp={e => {
                updateComlist(e.target.value);
                setQuery(e.target.value);
                setInput(e.target.value);
                atualizaTransfer();
            }} value={input} onChange={(e) => {
                setInput(e.target.value);
                atualizaTransfer();
            }}></input>
            <div className="search-icon">
                <i className="fas fa-search"></i>
            </div>
            <div className="cancel-icon" onClick={() => { resetComlist(); resetInput(); atualizaTransfer(); }}>
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
    );

}

export default SearchBox;