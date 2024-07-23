import axios from 'axios';
import FormData from 'form-data';

const client = axios.create({
  baseURL: 'http://localhost:4000/graphql',
  headers: {
    'apollo-require-preflight': 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    // ...data.getHeaders(),
  },
});

client.options.headers = {
  'apollo-require-preflight': 'true',
};

async function post(dataIn) {
  console.log('data from UI', dataIn);

  const data = new FormData();
  data.append('operations', '{"query": "mutation ($image1: Upload!){createDiscussionWithUpload(discussionInput: {discussionId:101,text:\\"question with image\\",images: [$image1]}) {id main {id text images} children {id text images}} }", "variables":{"image1":null}}');
  data.append('map', '{ "0": ["variables.image1"] }');
  // data.append('0', fs.createReadStream('postman-cloud:///1ef2736a-a93e-40b0-b9c0-47faaca11bc6'));

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'localhost:4000/graphql',
    // headers: {
    //   'apollo-require-preflight': 'true',
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    //   // ...data.getHeaders(),
    // },
    data: data,
  };

  try {
    const response = await client.request(config);
    // console.log(JSON.stringify(response.data));
  } catch (error) {
    console.log(error);
  }
}

export { post };
