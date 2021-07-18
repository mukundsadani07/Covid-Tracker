import React, { useState, useEffect, useCallback } from "react";
import classes from "./Main.module.css";
import CountryData from "./CountryData";

const Main = () => {
  const [country, setCountry] = useState("");
  const [infected, setInfected] = useState(0);
  const [recovered, setRecovered] = useState(0);
  const [death, setDeath] = useState(0);
  const [valid, setValid] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(false);

  const fetchCovidDataHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setValid(false);
    const response = await fetch(
      `https://covid19.mathdro.id/api/countries/${country}`
    );
    if (!response.ok) {
      setError(true);
    }
    const data = await response.json();
    if (data.confirmed !== undefined) {
      setInfected(data.confirmed.value);
      setRecovered(data.recovered.value);
      setDeath(data.deaths.value);
      setValid(true);
    }
    if (data.confirmed === undefined) {
      setValid(false);
    }
    setIsLoading(false);
  }, [country]);

  useEffect(() => {
    fetchCovidDataHandler();
  }, [fetchCovidDataHandler]);

  const submitHandler = (event) => {
    event.preventDefault();
    setCountry(event.target.countryName.value);
    setValid(true);
  };

  return (
    <div className={classes.main}>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Enter country name"
          name="countryName"
          className={classes.input}
        />
      </form>
      {loading && <p className={classes.countryData}>Loading...</p>}
      {valid && (
        <CountryData infected={infected} recovered={recovered} death={death} />
      )}

      {error && <p className={classes.countryData}>Something went wrong!</p>}
    </div>
  );
};

export default Main;
