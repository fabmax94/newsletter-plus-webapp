import React from 'react';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {Star, Person} from '@material-ui/icons';
import CustomDropdown from 'components/CustomDropdown/CustomDropdown.js';
import Button from 'components/CustomButtons/Button.js';

import styles
  from 'assets/jss/material-kit-react/components/headerLinksStyle.js';

import {Context} from 'context.js';

const useStyles = makeStyles(styles);

const HeaderLinks = () => {
  const classes = useStyles();

  const {username, logout} = React.useContext(Context);

  return (
      <List className={classes.list}>
        {username ? (
            <ListItem className={classes.listItem}>
              <Button
                  href="/bookmark"
                  color="transparent"
                  className={classes.navLink}
              >
                <Star className={classes.icons}/> Favoritos
              </Button>
            </ListItem>
        ) : null}
        <ListItem className={classes.listItem}>
          {username ? (
              <CustomDropdown
                  noLiPadding
                  buttonText={username}
                  buttonProps={{
                    className: classes.navLink,
                    color: 'transparent',
                  }}
                  buttonIcon={Person}
                  dropdownList={[
                    <Link to={'/'} onClick={logout}
                          className={classes.dropdownLink}>
                      Logout
                    </Link>,
                  ]}
              />
          ) : (<CustomDropdown
              noLiPadding
              buttonText="Account"
              buttonProps={{
                className: classes.navLink,
                color: 'transparent',
              }}
              buttonIcon={Person}
              dropdownList={[
                <Link to={`/login`} className={classes.dropdownLink}>
                  Log In
                </Link>,
                <Link to={`/register`} className={classes.dropdownLink}>
                  Register
                </Link>,
              ]}
          />)}

        </ListItem>
      </List>
  );
};

export default HeaderLinks;
