import axios from 'axios';

async function get(userId) {
  console.log('userId [not used yet]', userId);
  const data = JSON.stringify({
    query: `query {
    discussions {
      id
      main {
        id
        text
        stars
        approved
        replyNumber
        owner
        images
        videos
        empty
      }
      children {
        id
        text
        stars
        approved
        replyNumber
        owner
        images
        videos
        empty
      }
    }
}`,
  });

  console.log('body', data);

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    baseURL: 'http://127.0.0.1:4000/graphql',
    headers: {
      'Content-Type': 'application/json',
      'apollo-require-preflight': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    },
    data: data,
  };

  try {
    const response = await axios.post('', data, config);
    console.log('Adapter get response', response.data.data.discussions);
    return response.data.data.discussions;
  } catch (error) {
    console.log(error);
  }
}


async function post(dataIn) {
  console.log('dataIn', dataIn);
  const data = JSON.stringify({
    query: `mutation{ createDiscussion(discussion: { discussionId: ${dataIn.id}, text: "${dataIn.text}"  }) {
    id
    main {
      id
        text
        stars
        approved
        replyNumber
        owner
        images
        videos
        empty
    }
    children {
         id
        text
        stars
        approved
        replyNumber
        owner
        images
        videos
        empty
    }
  }
}`,
  });

  console.log('body', data);

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    baseURL: 'http://127.0.0.1:4000/graphql',
    headers: {
      'Content-Type': 'application/json',
      'apollo-require-preflight': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    },
    data: data,
  };

  try {
    // console.log('config', config);
    const response = await axios.post('', data, config);
    console.log('response', response);
  } catch (error) {
    console.log(error);
  }
}


// async function post(dataIn) {
//   console.log('data from UI', dataIn);

//   const client = axios.create({
//     baseURL: 'http://localhost:4000/graphql',
//     headers: {
//       'apollo-require-preflight': 'true',
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
//       'Content-Type': 'application/json',
//     },
//     method: 'post',
//   });

//   client.options.headers = {
//     'apollo-require-preflight': 'true',
//   };

//   const body = JSON.stringify({
//     query: `mutation{
//     createDiscussion(discussion: { discussionId: 3, text: "AAA" }) {
//       id
//       main {
//         id
//         text
//       }
//       children {
//         id
//         text
//       }
//     }
//   }`,
//     variables: {},
//   });

//   console.log('request body', body);
//   try {
//     const response = await client.post({ url: '', data: body });
//     return response;
//   } catch (error) {
//     console.log('axios post error from frontend', error);
//     return '';
//   };
// }

export { post, get };
