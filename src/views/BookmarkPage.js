import React, {useState, useEffect} from 'react';
import {get} from 'services';
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
import ContentLoader from 'react-content-loader';

const dashboardRoutes = [];
const useStyles = makeStyles(styles);

const BookmarkPage = ({rest, history}) => {
  const classes = useStyles();
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const EmptyResult = () =>
      (
          <div style={{'text-align': 'center'}}>
            <img src={require('assets/img/bookmark.png')} style={{
              margin: 'auto',
              display: 'block',
              width: '100px',
            }}/>
            <h3 className={'makeStyles-title-2'}
                style={{'color': 'black'}}>No Results Found</h3>
            <h5 className={'makeStyles-title-3'}
                style={{'color': 'black'}}>Mark news as favorite</h5>
          </div>
      );

  const MainContent = () => (
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}
             style={{paddingTop: '20px', paddingBottom: '20px'}}>
          {isLoading ? Loader() :
              (!bookmarks.length ?
                      EmptyResult() :

                      <SectionNews section={''} items={bookmarks}
                                   onHandleShowNews={showNews}/>
              )}

        </div>
      </div>
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
        <Parallax filter image={require('assets/img/landing-bg.jpg')}
                  style={{'height': '300px'}}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>Bookmarks</h1>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
      </>
  );

  const loadBookmarks = () => {
    let headers = {
      Authorization: `Token ${localStorage['token']}`,
    };
    get('/api/bookmark', response => {
      setBookmarks(response.data.bookmarks);
      setIsLoading(false);
    }, {headers});
  };

  const showNews = (id, portal_name) => history.push(
      `/news/${portal_name}/${id}`);

  useEffect(() => {
    loadBookmarks();
  }, []);

  return (
      <div>
        {TopContent()}
        {MainContent()}
        <Footer/>
      </div>
  );
};

export default BookmarkPage;
