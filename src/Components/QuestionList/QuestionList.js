import {
  ButtonGroup,
  Grid,
  Icon,
  MenuItem,
  Typography,
} from "@material-ui/core";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import RefreshIcon from "@mui/icons-material/Refresh";
import FormControl from "@mui/material/FormControl";
import React, { useEffect, useState } from "react";
import QuestionCard from "../QuestionCard/QuestionCard";
import { Slider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
// import FormControl from "@material-ui/core/FormControl";
// import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@mui/material/IconButton";
import "./QuestionList.css";
import { OutlinedInput } from "@mui/material";
import RestaurantListing from "../RestaurantListing/RestaurantListing";
import axios from "axios";
import { BorderColor } from "@material-ui/icons";
import { SxProps } from "@mui/material/styles";

// function increaseQuestionIndex() {
//   setQuestionIndex(++1)
// }
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

export default function QuestionList(props) {
  const classes = useStyles();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [distance, setDistance] = useState(0);
  const [cuisine, setCuisine] = React.useState("");
  const [dollar, setDollar] = useState(1);
  const [found, setFound] = useState(false);
  const [restaurant, setRestaurant] = useState({});
  // const [latitude, setLatitude] = React.useState('');
  // const [longitude, setLongitude] = React.useState('');
  const getCusineCategory = {
    Thai: "thai",
    Indian: "indpak",
    Chinese: "chinese",
    Italian: "italian",
    Mexican: "mexican",
    Japanese: "japanese",
    American: "tradamerican",
    French: "french",
    Korean: "korean",
    Mediterranean: "mediterranean",
  };

  const getResults = () => {
    axios
      .get(
        `https://radiant-ocean-98981.herokuapp.com/https://api.yelp.com/v3/businesses/search?`,
        {
          headers: {
            Authorization: `Bearer R_NfHZkf-x2LiKEKtJ7hU2FHZbmM2exfFsNO1etgf6NAgisNoVBBdPnWJnFIYhGZRoEHc81zQaMDFwk95Ye2ny9SEkX9iEaSbp1Pfynkgb6kEQcxxygpwa-ivuBAYnYx`,
          },
          params: {
            longitude: -122.0322,
            latitude: 37.323,
            // longitude: longitude,
            // latitude: latitude,
            categories: getCusineCategory[cuisine],
            open_now: true,
            radius: distance * 1609,
            price: dollar,
          },
        }
      )
      .then((res) => {
        let random = Math.floor(Math.random() * res.data.businesses.length);
        setRestaurant(res.data.businesses[random]);
        setFound(true);
      })
      .catch((err) => {
        console.log("error");
      });
  };

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     setLatitude(position.coords.latitude);
  //     setLongitude(position.coords.longitude)
  //   })
  // }, []);
  
  const questions = [
    {
      text: "How far are you willing to travel?",
      component: (
        <React.Fragment>
          <Slider
            id = 'slider'
            style={{ width: "85%" }}
            defaultValue={0}
            max={20}
            onChange={(e, val) => {
              setDistance(val);
            }}
          ></Slider>
          <Typography style={{ fontSize: 27 }}>
            {distance + " miles   "}
          </Typography>
        </React.Fragment>
      ),
    },
    {
      text: "What type of cuisine do you want eat?",
      component: (
        <React.Fragment>
          <FormControl style={{ width: "40%", marginTop: "2%" }}>
            <InputLabel id="demo-simple-select-label">
              Choose Cuisine Type
            </InputLabel>
            <Select
              className={classes.select}
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              style={{ padding: 3 }}
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              input={<OutlinedInput label="Choose Cuisine Type" />}
            >
              <MenuItem value={"Thai"}>Thai</MenuItem>
              <MenuItem value={"Indian"}>Indian</MenuItem>
              <MenuItem value={"Chinese"}>Chinese</MenuItem>
              <MenuItem value={"Italian"}>Italian</MenuItem>
              <MenuItem value={"Mexican"}>Mexican</MenuItem>
              <MenuItem value={"Japanese"}>Japanese</MenuItem>
              <MenuItem value={"American"}>American</MenuItem>
              <MenuItem value={"French"}>French</MenuItem>
              <MenuItem value={"Korean"}>Korean</MenuItem>
              <MenuItem value={"Mediterranean"}>Mediterranean</MenuItem>
            </Select>
          </FormControl>
        </React.Fragment>
      ),
    },
    {
      text: "What do you want the price range to be?",
      component: (
        <React.Fragment>
          <ButtonGroup
            variant="outlined"
            aria-label="outlined button group"
            style={{ width: "75%", marginTop: "1.5%" }}
          >
            <Button
              style={{
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
                width: "25%",
                padding: 15,
                backgroundColor: dollar === 1 ? "#f69e20" : null,
              }}
              onClick={() => setDollar(1)}
            >
              $
            </Button>
            <Button
              style={{
                width: "25%",
                backgroundColor: dollar === 2 ? "#f69e20" : null,
              }}
              onClick={() => setDollar(2)}
            >
              $$
            </Button>
            <Button
              style={{
                width: "25%",
                backgroundColor: dollar === 3 ? "#f69e20" : null,
              }}
              onClick={() => setDollar(3)}
            >
              $$$
            </Button>
            <Button
              style={{
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
                width: "25%",
                backgroundColor: dollar === 4 ? "#f69e20" : null,
              }}
              onClick={() => setDollar(4)}
            >
              $$$$
            </Button>
          </ButtonGroup>
        </React.Fragment>
      ),
    },
  ];
  
  return (
    <QuestionCard align={found ? "" : "center"}>
      {!found ? (
        <React.Fragment>
          <Typography style={{ fontSize: 50, marginBottom: "5%" }}>
            Find Restaurant
          </Typography>
          <div style={{ marginBottom: "5%" }}>
            <Typography style={{ fontSize: 30 }}>
              {questions[questionIndex].text}
            </Typography>
            {questions[questionIndex].component}
          </div>

          {questionIndex < questions.length - 1 ? (
            <Button
              onClick={() => setQuestionIndex(questionIndex + 1)}
              style={{
                color: "white",
                backgroundColor: "#5AA1FF",
                borderRadius: 10,
                float: "right",
              }}
            >
              <ArrowRightAltIcon style={{ fontSize: 50 }}></ArrowRightAltIcon>
            </Button>
          ) : null}

          {questionIndex !== 0 ? (
            <Button
              className="back-button"
              onClick={() => setQuestionIndex(questionIndex - 1)}
              style={{
                color: "white",
                backgroundColor: "#979DA4",
                borderRadius: 10,
                float: "left",
              }}
            >
              <ArrowRightAltIcon style={{ fontSize: 50 }}></ArrowRightAltIcon>
            </Button>
          ) : null}

          {questionIndex == questions.length - 1 ? (
            <Button
              style={{
                color: "white",
                backgroundColor: "#5AA1FF",
                borderRadius: 10,
                float: "right",
                fontSize: 20,
                padding: 13,
              }}
              onClick={() => getResults()}
            >
              Search
            </Button>
          ) : null}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography
            style={{ fontSize: 50, marginBottom: "2%", textAlign: "center" }}
          >
            We found a restaurant for you!
          </Typography>
          <IconButton
            style={{
              position: "absolute",
              top: "8%",
              right: "3%",
              backgroundColor: "#4B87C7",
            }}
            onClick={() => getResults()}
          >
            <RefreshIcon style={{ fontSize: 50, color: "white" }} />
          </IconButton>
          <RestaurantListing
            user={props.user}
            restaurant={{
              image: restaurant?.image_url
                ? restaurant.image_url
                : "https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg",
              rating: restaurant?.rating,
              tags: restaurant?.categories,
              // address:`${restaurant?.location?.address1}, ${restaurant?.location?.city}`,
              address: restaurant?.location?.address1 + ", " + restaurant?.location?.city  + ", " + restaurant?.location?.state + " " + restaurant?.location?.zip_code + " (" + (restaurant?.distance/1609).toFixed(1) + " mi)",
              title: restaurant?.name
                ? restaurant.name
                : [
                    "No restaurant was found with the given criteria.",
                    <br />,
                    'Please click "RESTART" and try again.',
                  ],
            }}
            listing
          />
        </React.Fragment>
      )}
    </QuestionCard>
  );
}
