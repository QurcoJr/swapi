/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const env = process.env.NODE_ENV

const awsmobile = {
  aws_project_region: 'us-east-1',
  aws_cloud_logic_custom: [
    {
      name: 'swapi',
      endpoint:
        env === 'development'
          ? 'http://localhost:3000'
          : 'https://5c1yp9dhyf.execute-api.us-east-1.amazonaws.com/dev',
      region: 'us-east-1'
    }
  ]
}

export default awsmobile