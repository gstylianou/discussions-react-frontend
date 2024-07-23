import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useImmer } from 'use-immer';


BasicRating.propTypes = {
  ratingIn: PropTypes.number.isRequired,
  setStarRating: PropTypes.func,
};

export default function BasicRating({ ratingIn, setStarRating }) {
  const [rating, setRating] = useImmer(ratingIn);
  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend"></Typography>
      <Rating
        name="simple-controlled"
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
          setStarRating(newValue);
        }}
      />
      {/* <Typography component="legend">Read only</Typography>
      <Rating name="read-only" value={value} readOnly /> */}
      {/* <Typography component="legend">Disabled</Typography>
      <Rating name="disabled" value={value} disabled />
      <Typography component="legend">No rating given</Typography>
      <Rating name="no-value" value={null} /> */}
    </Box>
  );
}
