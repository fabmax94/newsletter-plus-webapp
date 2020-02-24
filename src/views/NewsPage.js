import React, { useState, useEffect } from "react";
import axios from 'axios';

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";


import { Star } from "@material-ui/icons";
// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";


const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function NewsPage(props) {
    const classes = useStyles();
    const { ...rest } = props;
    const { id } = props.match.params;


    useEffect(() => {
        if (!localStorage["token"]) {
            props.history.push(`/login`);
            return;
        }
        axios.get(`https://newsletter-plus.herokuapp.com/api/news/get?id=${id}`).then((response => {
            document.getElementById("news-container").innerHTML = response.data[0].content;
        }));

    }, []);

    const onMarkBookmark = () => {
        let headers = {
            Authorization: `Token ${localStorage['token']}`
        };

        let data = {
            news_id: parseInt(id)
        };

        axios.post(`https://newsletter-plus.herokuapp.com/api/bookmark/save/`, data, {
            headers: headers
        }).then((response => {

        }));
    };

    return (
        <div>
            <Header
                color="transparent"
                routes={dashboardRoutes}
                brand="Newsletter Plus"
                rightLinks={<HeaderLinks portals={["Medium"]} />}
                fixed
                changeColorOnScroll={{
                    height: 400,
                    color: "white"
                }}
                {...rest}
            />
            <Parallax filter image={require("assets/img/landing-bg.jpg")} style={{ "height": "300px" }}>
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <h1 className={classes.title}>Medium</h1>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <Button onClick={onMarkBookmark} justIcon color="transparent" style={{ float: "right" }}><Star /></Button>
                <div className={classes.container} id={"news-container"} style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                    <i className="fa fa-spinner fa-spin" aria-hidden="true" style={{ fontSize: "45pt", color: "black", marginLeft: "45%" }}></i>
                </div>
            </div>
            <Footer />
        </div>
    );
}
