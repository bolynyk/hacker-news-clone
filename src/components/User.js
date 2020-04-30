import React, {useEffect, useState} from 'react';
import queryString from 'query-string';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Card from './Card';
import Loading from "./Loading";
import {fetchPosts, fetchUser} from "../util/api";

const useStyles = makeStyles((theme) => ({
  containerContent: {
    padding: theme.spacing(4),
  },
  aboutContent: {
    padding: theme.spacing(2, 0),
  },
  cardContent: {
    padding: theme.spacing(2, 0),
  }
}));

const cache = {};

function createMarkup(html) {
  return {
    __html: html
  };
}

export default function User(props) {

  const classes = useStyles();
  const {id} = queryString.parse(props.location.search);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    function handleUserChange(user) {
      const {submitted} = user;
      setUser(user);
      cache[id] = user;
      setLoading(false);
      fetchPosts(submitted.slice(0, 10))
        .then(handlePostsChange);
    }

    function handlePostsChange(posts) {
      setPosts(posts);
    }

    if (cache[id] === undefined) {
      setLoading(true);
      fetchUser(id)
        .then(handleUserChange);
    } else {
      handleUserChange(cache[id]);
    }
  }, [id]);

  const {created, karma, about} = user;

  if (isLoading) {
    return <Loading/>
  } else {
    return (
      <Container maxWidth="lg"
                 component="main"
                 className={classes.containerContent}>
        <Grid container
              spacing={0}
              direction="column"
              alignItems="flex-start">
          <Grid item
                xs={12}>
            <Typography variant="h4">
              {id}
            </Typography>
            <Typography variant="subtitle2"
                        color="textSecondary">
              {`joined ${new Date(created).toLocaleString()}, has ${karma} karma`}
            </Typography>
            <Typography variant="body2"
                        dangerouslySetInnerHTML={createMarkup(about)}
                        className={classes.aboutContent} />
            <Typography variant="h5">
              Posts
            </Typography>
            {posts.map((post, index) => {
              return (
                <div key={index}
                     className={classes.cardContent}>
                  <Card post={post} />
                </div>
              );
            })}
          </Grid>
        </Grid>
      </Container>
    )

  }
}
