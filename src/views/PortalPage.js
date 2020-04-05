import React, { useState, useEffect } from "react";
import { get } from 'services';

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";


import NewsSection from '../sections/NewsSection';

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

const PortalPage = ({ rest, history, match }) => {
    const classes = useStyles();
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { portal } = match.params;


    const loadNews = () => {
        get(`/api/news?portal=${portal}`, response => {
            setNews(response.data.news);
            setIsLoading(true)
        });
    };

    const showNews = (id, portal_name) => history.push(`/news/${portal_name}/${id}`);


    useEffect(() => {
        loadNews();
    }, []);

    return (
        <div>
            <Header
                color="transparent"
                routes={dashboardRoutes}
                brand="Newsletter Plus"
                rightLinks={<HeaderLinks />}
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
                            <h1 className={classes.title}>{portal}</h1>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    {isLoading && !news.length ? (
                        <i className="fa fa-spinner fa-spin" aria-hidden="true" style={{ fontSize: "45pt", color: "black", marginLeft: "45%", marginTop: "40px", marginBottom: "40px" }}></i>

                    ) : (
                            <NewsSection section={""} items={news} onHandleShowNews={showNews} />
                        )}

                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PortalPage;
