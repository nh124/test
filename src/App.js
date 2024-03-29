import react, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header.jsx";
import List from "./components/List/List.jsx";
import Map from "./components/Map/Map.jsx";
import PlaceDetails from "./components/PlaceDetails/PlaceDetails.jsx";
import { getPlacesData } from "./API/index.js";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState();
  const [bounds, setBounds] = useState(null);
  useEffect(() => {
    console.log(coordinates, bounds);
    getPlacesData().then((data) => {
      setPlaces(data);
      console.log(data);
    });
  }, [coordinates, bounds]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);
  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
