/* eslint-disable require-jsdoc */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BasicRating from './basicRating';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Media from './media';
import Grid from '@mui/material/Grid';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


ViewCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    videos: PropTypes.array,
    images: PropTypes.array,
    text: PropTypes.string,
    stars: PropTypes.number,
    replyNumber: PropTypes.number,

  }),
  onChangeCard: PropTypes.func,
};


export default function ViewCard({ data, onChangeCard }) {
  const [expanded, setExpanded] = React.useState(false);
  // function showMedia(media) {
  //   return (
  //     <>
  //       {Array.isArray(media) && media.length > 0 ? <Media source={media} /> : null}
  //     </>
  //   );
  // }


  function showReplies(replyNumber) {
    if (replyNumber == null || replyNumber == 0) return;
    if (replyNumber == 1) {
      return (
        <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1, marginTop: 1 }}>
          {replyNumber} reply
        </Typography>);
    }
    return (
      <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1, marginTop: 1 }}>
        {replyNumber} replies
      </Typography>);
  }

  function setStarRating(rating) {
    data.stars = rating;
    onChangeCard({ ...data, stars: rating }, false);
  }


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <Card sx={{ maxWidth: 0.99, minWidth: 400 }}>
      <CardContent>
        <Grid container direction="column">
          <Typography variant="header2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {data.text}
          </Typography>
          {showReplies(data.replyNumber)}
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <BasicRating aria-label="rating" ratingIn={data.stars} setStarRating={setStarRating}>
        </BasicRating>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {/* {showMedia(data.videos)} */}
        </CardContent>
      </Collapse>
    </Card >
  );
}
