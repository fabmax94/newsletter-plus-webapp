/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import { Star, ListAlt, Person } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

import { Context } from 'context.js';

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();

  const { username, logout, portals } = React.useContext(Context);

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Portais"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={ListAlt}
          dropdownList={portals.map(portal =>
            <Link to={`/portal/${portal}`} className={classes.dropdownLink}>
              {portal}
            </Link>
          )}
        />
      </ListItem>
      {username ? (
        <ListItem className={classes.listItem}>
          <Button
            href="/bookmark"
            color="transparent"
            className={classes.navLink}
          >
            <Star className={classes.icons} /> Favoritos
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
              color: "transparent"
            }}
            buttonIcon={Person}
            dropdownList={[
              <Link to={'/'} onClick={logout} className={classes.dropdownLink}>
                Logout
              </Link>
            ]}
          />
        ) : (<CustomDropdown
          noLiPadding
          buttonText="Conta"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Person}
          dropdownList={[
            <Link to={`/login`} className={classes.dropdownLink}>
              Login
            </Link>,
            <Link to={`/register`} className={classes.dropdownLink}>
              Register
            </Link>
          ]}
        />)}

      </ListItem>
    </List>
  );
}
