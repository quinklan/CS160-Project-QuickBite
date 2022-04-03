import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Alert } from "@material-ui/lab/";
import { createUser } from "../../ApiFunctions/User";
import Landing from "../../Components/Landing/Landing";
import "./Home.css";
import MemberNavbar from "../../Components/Navbar/MemberNavbar";
import QuestionCard from "../../Components/QuestionCard/QuestionCard";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import $ from "jquery";
import QuestionList from "../../Components/QuestionList/QuestionList";


const useStyles = makeStyles((theme) => ({
  paper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 0),
  },
  alert: {
    width: "100%",
    margin: theme.spacing(2, 0, 0),
  },
  field: {
    background: "#FFFFFF",
  },
}));
export default function Home() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [address, setAddress] = useState("hi");
  const [payment, setPayment] = useState("bye");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [distance, setDistance] = useState(0);
  const submitHandler = async (user) => {
    createUser(user).then((res) => {
      setError(res.error);
      setSuccess(!res.error);
    });
    return false;
  };

  return (
    <React.Fragment>
      <MemberNavbar />
      <div className="home-background">
        <Grid
          container
          spacing={3}
          xs={12}
          style={{
            paddingTop: 30,
            margin: 0,
            height: "-webkit-fill-available",
          }}
        >
            <QuestionList></QuestionList>
          {/* <QuestionCard>
            <Typography style = {{fontSize: 30}}>Find Restaurant</Typography>
            <Typography style = {{fontSize: 20}}>How far do you want to travel?</Typography>
            <Slider
              style={{ width: "85%" }}
              defaultValue={0}
              max={50}
              onChange={(e, val) => {
                setDistance(val);
              }}
            ></Slider>
            <Typography>{distance + " miles   "}</Typography>
            <Button
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Next
            </Button>
          </QuestionCard> */}
        </Grid>
      </div>
    </React.Fragment>
  );
}