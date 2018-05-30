// @flow

import * as React from 'react';

import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import styles from './style';

const Example = ({ example, next, classes, config }) => (
  <Card className={classes.card}>
    <div className={classes.media}>
      <img src={example.url} className={classes.image} alt="example" />
    </div>
    <CardContent>
      <Typography gutterBottom variant="headline" component="h2">
        {config.prompts[config.categories.indexOf(example.category)] ||
          example.category}
      </Typography>
    </CardContent>
    <CardActions>
      <Button color="primary" onClick={next} className={classes.button}>
        Next
      </Button>
    </CardActions>
  </Card>
);

export default withStyles(styles)(Example);
