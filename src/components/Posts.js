import React, {useEffect, useState} from 'react';
import Container from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";
import Card from './Card';
import Loading from './Loading';
import {fetchMainPosts} from "../util/api";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: theme.spacing(4),
  }
}));

const cache = {};

export default function Posts({type}) {

  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    function handlePostsChange(posts) {
      setPosts(posts);
      cache[type] = posts;
      setLoading(false);
    }

    if (cache[type] === undefined) {
      setLoading(true);
      fetchMainPosts(type)
        .then(handlePostsChange);
    } else {
      handlePostsChange(cache[type]);
    }
  }, [type]);

  if (isLoading) {
    return <Loading />
  } else {
    return (
      <Container maxWidth="lg"
                 component="main"
                 className={classes.cardContent}>
        <Grid container
              spacing={4}
              direction="column"
              alignItems="flex-start">
          {posts.map((post, index) => {
            return (
              <Grid key={index}
                    item
                    xs={12}>
                <Card post={post} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    )
  }
}
