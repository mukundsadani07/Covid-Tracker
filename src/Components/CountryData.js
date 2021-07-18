import classes from "./Main.module.css";

const CountryData = (props) => {
  return (
    <>
      <div className={classes.countryData}>
        <div>
          Total Cases: <span className={classes.data}>{props.infected}</span>
        </div>
        <div>
          Total Recovered:{" "}
          <span className={classes.data}>{props.recovered}</span>
        </div>
        <div>
          Total Deaths: <span className={classes.data}>{props.death}</span>
        </div>
      </div>
    </>
  );
};
export default CountryData;
