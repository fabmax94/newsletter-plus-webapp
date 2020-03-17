import React from "react";
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

// Sections for this page
import NewsSection from "../sections/NewsSection";


import { Context } from "../context";


const dashboardRoutes = [];

const useStyles = makeStyles(styles);

const HomePage = (props) => {
    const classes = useStyles();
    const { lastNews, isLoadingLastNews } = React.useContext(Context);
    const { ...rest } = props;

    const showNews = (id, portal_name) => props.history.push(`/news/${portal_name}/${id}`);


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
            <Parallax filter image={require("assets/img/landing-bg.jpg")}>
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <h1 className={classes.title}>Newsletter Plus</h1>
                            <h4>
                                Um portal que une todos os seus sites de notícia favoritos
                                em uma única plataforma, totalmente gratuita e open source.
                            </h4>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    {isLoadingLastNews && !Object.keys(lastNews).length ? (
                        <i className="fa fa-spinner fa-spin" aria-hidden="true" style={{ fontSize: "45pt", color: "black", marginLeft: "45%", marginTop: "40px", marginBottom: "40px" }}></i>

                    ) : (
                            Object.keys(lastNews).map(portal => <NewsSection section={portal} items={lastNews[portal]} onHandleShowNews={showNews} />)
                        )}

                </div>
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;