import React, { useEffect, useState } from "react";
import { get, post } from '../services';

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";


import { Star, StarBorder } from "@material-ui/icons";
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

import { Context } from '../context';


const dashboardRoutes = [];

const useStyles = makeStyles(styles);

const NewsPage = (props) => {
    const classes = useStyles();
    const { ...rest } = props;
    const { id, portal } = props.match.params;
    const [portalName, setPortalName] = useState(portal);
    const [isBookmark, setIsBookmark] = useState(false);
    const { token } = React.useContext(Context);
    const [url, setUrl] = useState('');


    useEffect(() => {
        get(`/api/news/${id}`, response => {
            document.getElementById("news-container").innerHTML = response.data.content;
            setUrl(response.data.url);
            setPortalName(response.data.portal_name);
            setIsBookmark(response.data.is_bookmark);
        });
    }, []);

    const onMarkBookmark = () => {
        let headers = {
            Authorization: `Token ${token}`
        };

        let data = {
            news_id: parseInt(id)
        };

        post(`/api/bookmark/`, data, response => {

        }, {
            headers: headers
        });
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
                    height: 300,
                    color: "white"
                }}
                {...rest}
            />
            <Parallax filter image={require("assets/img/landing-bg.jpg")} style={{ "height": "300px" }}>
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <h1 className={classes.title}>{url ? <a className="news-link" target="#" href={url}>{portalName}</a> : portalName}</h1>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                {token ?
                    <Button onClick={onMarkBookmark} justIcon color="transparent" style={{ float: "right" }}>
                        {isBookmark ? <Star /> : <StarBorder />}
                    </Button>
                    : null}

                <div className={classes.container} id={"news-container"} style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                    <i className="fa fa-spinner fa-spin" aria-hidden="true" style={{ fontSize: "45pt", color: "black", marginLeft: "45%" }}></i>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default NewsPage;
