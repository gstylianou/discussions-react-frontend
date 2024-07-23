import './App.css';
import * as React from 'react';
import Cards from './components/cards';
import { useLoaderData } from 'react-router-dom';

// eslint-disable-next-line prefer-const
let discussionEmpty = {
  main: {
    id: '2',
    text: null,
    stars: 0,
    empty: true,
    replyNumber: 0,
    approved: false,
  },
  children: [],
};

const discussion = {
  main: {
    id: '1',
    text: 'Hey Do you know how can I replace the radio for my Toyota Verso 2017?',
    stars: 4,
    empty: false,
    replyNumber: 3,
    approved: true,
    owner: 'ownerId',
    videos: ['https://www.youtube.com/watch?v=LXb3EKWsInQ', 'https://www.youtube.com/watch?v=LXb3EKWsInQ', 'https://vimeo.com/838818874'],
  },
  children: [
    {
      id: '12',
      text: 'Answer 1',
      // icon: DeleteIcon,
      videos: ['https://www.youtube.com/watch?v=LXb3EKWsInQ'],
      images: [],
      stars: 4,
      approved: true,
      owner: 'ownerId #1',
    },
    {
      id: '13',
      text: 'Answer 2',
      // icon: DeleteIcon,
      stars: 3,
      videos: ['https://www.youtube.com/watch?v=LXb3EKWsInQ', 'https://www.youtube.com/watch?v=LXb3EKWsInQ', 'https://vimeo.com/838818874'],
      images: ['https://assets.codepen.io/6093409/river.jpg', 'https://assets.codepen.io/6093409/river.jpg'],
      approved: true,
      owner: 'ownerId #2',
    },
    {
      id: '14',
      text: 'Answer 3',
      // icon: DeleteIcon,
      videos: ['https://assets.codepen.io/6093409/river.mp4'],
      images: ['https://assets.codepen.io/6093409/river.jpg'],
      stars: 1,
      approved: false,
      owner: 'ownerId #3',
    },
  ],
};


const discussions = [discussion, discussionEmpty];


export async function loader({ params, request }) {
  const url = new URL(request.url);
  const user = url.searchParams.get('user');
  console.log('user=' + user);
  return user;
}


// eslint-disable-next-line require-jsdoc
function App() {
  const params = useLoaderData();

  return (
    <>
      <Cards data={discussions} />
    </>
  );
}

export default App;
