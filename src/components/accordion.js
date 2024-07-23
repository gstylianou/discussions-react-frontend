import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import ViewCard from './viewCard';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import BasicRating from './basicRating';
import { MediaVideos, MediaImages } from './media';

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


AccordionUsage.propTypes = {
  data: PropTypes.object,
  onChangeCard: PropTypes.func,

};


AccordionItem.propTypes = AccordionChild.propTypes = {
  node: PropTypes.object,
  onChangeCard: PropTypes.func,
};

function showMedia(media) {
  return (
    <>
      {Array.isArray(media.videos) && media.videos.length > 0 ? <MediaVideos source={media.videos} /> : null}
      {/* <br></br> */}
      {Array.isArray(media.images) && media.images.length > 0 ? <MediaImages source={media.images} /> : null}
    </>
  );
}


function AccordionItem({ node, parent, onChangeCard }) {
  function setStarRating(rating) {
    node.stars = rating;
    onChangeCard({ ...node, stars: rating }, false);
  }

  return (
    <>
      <Grid container direction="column">
        <Typography variant="header2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
          {node.text}
        </Typography>
        {showReplies(node.replyNumber)}
        {parent == true ? showMedia(node) : null}
        <BasicRating aria-label="rating" ratingIn={node.stars} setStarRating={setStarRating}>
        </BasicRating>
      </Grid>
    </>);
}

function AccordionChild({ node, onChangeCard }) {
  if (node.empty == true) {
    return (<></>);
  }
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <AccordionItem node={node} onChangeCard={onChangeCard} parent={false}></AccordionItem>
        </AccordionSummary>
        <AccordionDetails>
          {showMedia(node)}
        </AccordionDetails>
      </Accordion >
    </>
  );
}

export default function AccordionUsage({ data, onChangeCard }) {
  function render(nodes) {
    const childrenApproved = Array.isArray(nodes.children) ? nodes.children.filter((x) => x.approved == true) : null;

    if (nodes.main.empty == true) {
      return (
        <>
        </>);
    }

    return (
      <>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <AccordionItem node={nodes.main} onChangeCard={onChangeCard} parent={true}></AccordionItem>
          </AccordionSummary>
          <AccordionDetails>
            {childrenApproved.map((x, index) => <AccordionChild key={index} node={x} onChangeCard={onChangeCard} />)}
          </AccordionDetails>
        </Accordion>
      </>

    );
  }

  return (
    <div>
      {render(data)}
    </div>
  );
}
