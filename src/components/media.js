
/* eslint-disable require-jsdoc */
import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

MediaImages.propTypes = MediaVideos.propTypes = {
  source: PropTypes.array,
};


function MediaVideos(props) {
  const {
    source,
  } = props;

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 1, sm: 2, md: 2 }} useFlexGap flexWrap="wrap" justifyContent="left"
      alignItems="center" paddingTop={2}>
      {Array.from(Array(source.length)).map((_, index) => (
        <Item key={index}>
          <ReactPlayer url={source[index]} height={200} width={200} controls={true} muted={true} />
        </Item>
      ))}
    </Stack>
  );
}

function MediaImages(props) {
  const {
    source,
  } = props;

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 1, sm: 2, md: 2 }} useFlexGap flexWrap="wrap" justifyContent="left"
      alignItems="center" paddingTop={2}>
      {Array.from(Array(source.length)).map((_, index) => (
        <Item key={index}>
          <img width={200}
            src={source[index]}
            loading="lazy"
          />
        </Item>
      ))}
    </Stack>
  );
}


export { MediaImages, MediaVideos };
