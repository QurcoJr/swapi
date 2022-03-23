/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const fetch = require('node-fetch')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

const apiURL = 'https://swapi.dev/api'
async function swapiWrapper(endpoint, lang) {
  return fetch(`${apiURL}/${endpoint ?? ''}`).then(async response => {
    let data
    if (lang === 'wo') {
      const text = await response.text()
      let validJSON = text.replace(/\\/g, ' ')
      validJSON = validJSON.replace(/whhuanan/g, '"whhuanan"')
      data = JSON.parse(validJSON)
    } else {
      data = await response.json()
    }

    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

app.get('/categories', async function (req, res) {
  const response = await swapiWrapper()
  const categories = Object.keys(response)
  res.json({ success: true, data: { categories } })
})

app.get('/category/:name', async function (req, res) {
  const response = await swapiWrapper(req.params.name)
  res.json({ success: true, data: { category: response } })
})

app.get('/category/:categoryname/:name', async function (req, res) {
  const { categoryname, name } = req.params
  const language = req.get('language')

  const response = await swapiWrapper(
    `${categoryname}/?search=${name}${
      language === 'wo' ? '&format=wookiee' : ''
    }`,
    language
  )

  res.json({
    success: true,
    data: { details: response.results?.[0] ?? response.rcwochuanaoc[0] }
  })
})

app.listen(3000, function () {
  console.log('App started')
})

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
