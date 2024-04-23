import React, { useState } from "react";
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
    const weather = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=de89c429a2fb44b595372203242304&q=${searchTerm}&aqi=no`
    );
    const weatherData = await weather.json();
    console.log(weatherData);
    setWeather(weatherData);
    console.log(weatherData.current.condition.text);
  };
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
