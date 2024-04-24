import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/navbar";
import { useNavigate } from "react-router-dom";
import * as searchClient from "./client";
import "./search.css";

export default function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const search = async () => {
        fetchSearchResults();
    };
    const [weather, setWeather] = useState<{
        current: {
            condition: { text: string };
            cloud: number;
            temp_f: number;
        };
        location: {
            name: string;
            region: string;
            country: string;
            lat: number;
            lon: number;
        };
    }>({
        current: { condition: { text: "" }, cloud: 0, temp_f: 0 },
        location: { name: "", region: "", country: "", lat: 0, lon: 0 },
    });
    const fetchSearchResults = async () => {
        sessionStorage.setItem("searchTerm", searchTerm);
        const weather = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=de89c429a2fb44b595372203242304&q=${searchTerm}&aqi=no`
        );
        const weatherData = await weather.json();
        setWeather(weatherData);
        sessionStorage.setItem("weatherData", JSON.stringify(weatherData));
        navigate(`/Search/?city=${searchTerm}`);
    };

    useEffect(() => {
        const searchTerm = sessionStorage.getItem('searchTerm');
        if (searchTerm) {
            setSearchTerm(searchTerm);
            const storedWeatherData = sessionStorage.getItem('weatherData');
            if (storedWeatherData) {
                setWeather(JSON.parse(storedWeatherData));
            }
            navigate(`/Search/?city=${searchTerm}`);
        }
    }, []);

    return (
        <div>
            <NavBar />
            <div className="searchpage">
                <h1>Search for Weather of Your Dive Site</h1>
                <input
                    placeholder="Search for Weather in Dive Site"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={search}> Search </button>
                <div>Conditions: {weather?.current?.condition?.text}</div>
                <div>Visibility: {weather?.current?.cloud}</div>
                <div>Temperature: {weather?.current?.temp_f} degrees</div>
                <div>Location: {weather?.location?.name}</div>
                <div>Region: {weather?.location?.region}</div>
                <div>Country: {weather?.location?.country}</div>
                <button onClick={() => navigate(`/Home/?city=${searchTerm}`)}> Show Posts In This City </button>
            </div>
        </div>
    );
}
