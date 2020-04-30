import React from 'react';
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import {Link as RouterLink} from "react-router-dom";

export default function Card(props) {
  return (
    <React.Fragment>
      <Link href={props.post.url}
            variant="subtitle1"
            underline="none">
        {props.post.title}
      </Link>
      <Typography variant="body2">
        by <Link component={RouterLink}
                 to={{pathname: '/user', search: `?id=${props.post.by}`}}>
            {props.post.by}
          </Link> on {new Date(props.post.created).toLocaleString()}, with {props.post.descendants} comments
      </Typography>
    </React.Fragment>
  );
}
