/* eslint-disable require-jsdoc */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BasicRating from './basicRating';
import Textarea from '@mui/joy/Textarea';
import ReplyIcon from '@mui/icons-material/Reply';
import SendIcon from '@mui/icons-material/Send';
import ThreadTreeView from './threadTree';
import PropTypes from 'prop-types';
import { useImmer } from 'use-immer';
import TextAreaWithButtom from './textAreaComment';
import _ from 'lodash';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import DropzoneArea from './dropZoneArea';
import { Dropzone, FileMosaic } from '@files-ui/react';
import Accordion from './accordion';
import * as APIAdapter from '../backend/adapter';

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

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

DiscussionCard.propTypes = {
  data: PropTypes.shape({
    main: PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
      stars: PropTypes.number,
      approved: PropTypes.bool,
      replyNumber: PropTypes.number,
      owner: PropTypes.string,
      empty: PropTypes.bool,
      videos: PropTypes.array,
      images: PropTypes.array,
    }),
    children: PropTypes.array,
  }),
  onChangeCard: PropTypes.func,
};

function handleFinishUpload(params) {
  console.log('handle finish upload', params);
}

export default function DiscussionCard({ data, onChangeCard }) {
  const [text, setText] = useImmer('');
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const state = data;

  console.log('loading discussion card with state', state);

  function renderLabel() {
    return state.main.empty == true ? 'Enter your question/request:' : 'Enter your answer:';
  }

  async function setQuestion() {
    console.log('set question is triggered', state);
    if (text.length == 0) {
      return;
    }
    // only this section must remain
    const response = await APIAdapter.post({ id: state.id, text });
    console.log('backend save response', response);

    state.main = _.cloneDeep(response.main);
    state.children = _.cloneDeep(response.children);

    // onChangeCard(state, false);

    // response must be used to update the state
    // end of section
    // if (state.main.empty == true) {
    //   state.main.text = text;
    //   state.main.empty = false;
    //   state.main.stars = 0;
    //   onChangeCard(state, true);
    // } else {
    //   let id = 0;
    //   if (state.children.length > 0) {
    //     id = Number(state.children[state.children.length - 1].id);
    //   }
    //   id = (id == 0 ? Number(state.id) * 10 : id + 1);
    //   state.children = [...state.children, {
    //     id: id,
    //     text: text,
    //     stars: 0,
    //   }];
    //   onChangeCard(state, false);
    // }

    setText('');
  }


  async function RenderTreeView({ data, onChangeCard }) {
    if (data.main.empty == false) {
      return <ThreadTreeView data={data} onChangeCard={onChangeCard} />;
    }
  }

  const [files, setFiles] = React.useState([]);
  const updateFiles = (incomingFiles) => {
    // do something with the files
    console.log('incoming files', incomingFiles, files);
    setFiles(incomingFiles);
    // even your own upload implementation
  };


  return (
    <Card sx={{ maxWidth: 0.9, minWidth: 400, marginBottom: 5 }}>
      <CardContent>
        {/* <RenderTreeView data={state} onChangeCard={onChangeCard} /> */}
        <Accordion data={state} onChangeCard={onChangeCard} />
        <Typography variant="body1" color="text.secondary" sx={{ marginTop: 5 }}>
          {renderLabel()}
        </Typography>
        <Textarea size="lg" name="Size" placeholder="Just type" value={text} onChange={(event) => {
          setText(event.target.value);
        }} />
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          // expand={expanded}
          onClick={handleExpandClick}
          // aria-expanded={expanded}
          aria-label="Add files"
        >
          <CloudUploadIcon />
        </ExpandMore>
        <IconButton aria-label="send" onClick={() => {
          setQuestion();
        }}>
          <SendIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Dropzone
            onChange={updateFiles}
            value={files}
            maxFileSize={28 * 1024 * 1024}
            maxFiles={3}
            actionButtons={{ position: 'after', abortButton: {} }}
            uploadConfig={{ cleanOnUpload: true, autoUpload: true, url: 'http://localhost:4000/upload' }}
            onUploadFinish={handleFinishUpload}
          // fakeUpload
          >
            {files.map((file) => (
              <FileMosaic key={file.id} {...file} info />
            ))}
          </Dropzone>
        </CardContent>
      </Collapse>

    </Card >
  );
}
