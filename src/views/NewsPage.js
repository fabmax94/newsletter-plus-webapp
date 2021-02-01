import React, {useEffect, useState} from 'react';
import {get, post} from '../services';
import classNames from 'classnames';
import {makeStyles} from '@material-ui/core/styles';
import {Star, StarBorder} from '@material-ui/icons';
import Header from 'components/Header/Header.js';
import Footer from 'components/Footer/Footer.js';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import HeaderLinks from 'components/Header/HeaderLinks.js';
import Parallax from 'components/Parallax/Parallax.js';
import Button from 'components/CustomButtons/Button.js';
import styles from 'assets/jss/material-kit-react/views/landingPage.js';
import {Context} from '../context';
import ContentLoader from 'react-content-loader';

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

const NewsPage = ({rest, match}) => {
  const classes = useStyles();
  const {id, portal} = match.params;
  const [isBookmark, setIsBookmark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const {token} = React.useContext(Context);
  const [url, setUrl] = useState('');

  const Loader = () => (
      <ContentLoader viewBox="0 0 380 500">
        <rect x="100" y="20" width="150" height="10"/>
        <rect x="100" y="40" width="100" height="50"/>
        <rect x="100" y="100" width="200" height="5"/>
        <rect x="100" y="108" width="150" height="5"/>
        <rect x="100" y="116" width="130" height="5"/>
        <rect x="100" y="124" width="180" height="5"/>
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
              height: 300,
              color: 'white',
            }}
            {...rest}
        />
        <Parallax filter image={require('assets/img/landing-bg.jpg')}
                  style={{'height': '300px'}}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>{url
                    ? <a className="news-link" target="#"
                         href={url}>{portal}</a>
                    : portal}</h1>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
      </>
  );

  const MainContent = () => (
      <div className={classNames(classes.main, classes.mainRaised)}>
        {token && !isLoading ?
            <Button onClick={onMarkBookmark} justIcon color="transparent"
                    style={{float: 'right'}}>
              {isBookmark ? <Star/> : <StarBorder/>}
            </Button>
            : null}

        <div className={classes.container} id={'news-container'}
             style={{paddingTop: '20px', paddingBottom: '20px'}}>
          {Loader()}
        </div>
      </div>
  );

  useEffect(() => {
    let headers = token ? {
      Authorization: `Token ${token}`,
    } : {};
    get(`/api/news/${id}`, response => {
      document.getElementById(
          'news-container').innerHTML = response.data.content;
      setUrl(response.data.url);
      setIsBookmark(response.data.is_bookmark);
      setIsLoading(false);
    }, {headers});
  }, []);

  const onMarkBookmark = () => {
    let headers = {
      Authorization: `Token ${token}`,
    };

    let data = {
      news_id: parseInt(id),
    };

    setIsBookmark(!isBookmark);

    post(`/api/bookmark/`, data, response => {

    }, {
      headers: headers,
    });
  };

  return (
      <div>
        {TopContent()}
        {MainContent()}
        <Footer/>
      </div>
  );
};

export default NewsPage;
