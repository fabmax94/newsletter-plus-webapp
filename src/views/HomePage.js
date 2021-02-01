import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import {makeStyles} from '@material-ui/core/styles';
import Header from 'components/Header/Header.js';
import Footer from 'components/Footer/Footer.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import HeaderLinks from 'components/Header/HeaderLinks.js';
import Parallax from 'components/Parallax/Parallax.js';
import styles from 'assets/jss/material-kit-react/views/landingPage.js';
import SectionNews from '../components/Section/SectionNews';
import ls from 'local-storage';
import ContentLoader from 'react-content-loader';
import InfiniteScroll from 'react-infinite-scroller';

import {get} from '../services';

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

const HomePage = ({rest, history}) => {
  const classes = useStyles();
  const Loader = () => (
      <ContentLoader viewBox="0 0 380 200">
        <rect x="40" y="30" width="40" height="40"/>
        <rect x="40" y="80" width="60" height="5"/>
        <rect x="40" y="90" width="40" height="5"/>
        <rect x="170" y="30" width="40" height="40"/>
        <rect x="170" y="80" width="60" height="5"/>
        <rect x="170" y="90" width="40" height="5"/>
        <rect x="300" y="30" width="40" height="40"/>
        <rect x="300" y="80" width="60" height="5"/>
        <rect x="300" y="90" width="40" height="5"/>

        <rect x="40" y="120" width="40" height="40"/>
        <rect x="40" y="170" width="60" height="5"/>
        <rect x="40" y="180" width="40" height="5"/>
        <rect x="170" y="120" width="40" height="40"/>
        <rect x="170" y="170" width="60" height="5"/>
        <rect x="170" y="180" width="40" height="5"/>
      </ContentLoader>
  );

  const TopContent = () => (
      <>
        <Header
            color="transparent"
            routes={dashboardRoutes}
            brand="Newsletter Plus"
            rightLinks={<HeaderLinks portals={['Medium']}/>}
            fixed
            changeColorOnScroll={{
              height: 400,
              color: 'white',
            }}
            {...rest}
        />
        <Parallax filter image={require('assets/img/bg7.jpg')}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>Newsletter Plus</h1>
                <h4>
                  A portal that brings together all your favorite news sites on
                  a single platform, completely free and open source.
                </h4>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
      </>
  );

  const MainContent = () => (
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          {isLoadingLastNews && !lastNews.length ? (
              Loader()

          ) : (
              <InfiniteScroll
                  pageStart={0}
                  loadMore={loadMore}
                  hasMore={true}
                  loader={Loader()}
              >
                <SectionNews section={'Last News'} items={lastNews}
                             onHandleShowNews={showNews}/>
              </InfiniteScroll>

          )}

        </div>
      </div>
  );

  const [lastNews, setLastNews] = useState(
      JSON.parse(ls.get('lastNews')) || []);

  const [isLoadingLastNews, setIsLoadingLastNews] = useState(true);

  const [index, setIndex] = useState(1);

  const showNews = (id, portal_name) => history.push(
      `/news/${portal_name}/${id}`);

  const loadLastNews = (indexNews) => {
    setIsLoadingLastNews(true);
    get(`/api/news/?last=true&index=${indexNews}`, response => {
      if (index === 1) {
        ls.set('lastNews', JSON.stringify(response.data.news));
      }
      setLastNews([...lastNews, ...response.data.news]);
      setIsLoadingLastNews(false);
    });
  };

  const loadMore = () => {
    if (!isLoadingLastNews) {
      loadLastNews(index + 1);
      setIndex(index + 1);
    }
  };

  useEffect(() => {
    loadLastNews(1);
  }, []);

  return (
      <div>
        {TopContent()}
        {MainContent()}
        <Footer/>
      </div>
  );
};

export default HomePage;