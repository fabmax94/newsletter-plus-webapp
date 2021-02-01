import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import styles
  from 'assets/jss/material-kit-react/views/landingPageSections/teamStyle.js';

const useStyles = makeStyles(styles);

const SectionNews = ({section, items, onHandleShowNews}) => {
  const classes = useStyles();

  return (
      <div className={classes.section}>
        {section ? (<h2 className={classes.title}>{section}</h2>) : null}

        <div>
          <GridContainer>
            {items.map(item => {
              return (
                  <GridItem xs={12} sm={6} md={4} key={item.id}>
                    <Card style={{
                      width: '20rem',
                      cursor: 'pointer',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                          onClick={() => onHandleShowNews(item.id,
                              item.portal_name)}>
                      <img
                          style={{
                            height: '180px',
                            width: '100%',
                            display: 'block',
                          }}
                          className={classes.imgCardTop}
                          src={item.image_path}
                          alt="Card-img-cap"
                      />
                      <CardBody>
                        <h4 className={classes.cardTitle}>{item.title}</h4>
                        <p>{item.description}</p>
                      </CardBody>
                      <CardFooter className={classes.justifyCenter}>
                        <small className={classes.smallTitle}>Written
                          by {item.author} - {item.date}</small>
                      </CardFooter>
                    </Card>

                  </GridItem>);
            })}

          </GridContainer>
        </div>
      </div>
  );
};

export default SectionNews;
