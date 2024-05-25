'use strict';


const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const lambda = new AWS.Lambda({ region: process.env.CB_REGION});

const fetch = require('node-fetch');

const MOVIESHOP = require('movieshop-libutils')

const VISUAL_PRODUCTION_PREFIX = 'MVP-'

async function getData(movieName) {
  try {
    console.log('llll_https://image.tmdb.org/t/p/w300_and_h450_bestv2/6semdExLMptwAnqMyHkngQwGqOq.jpg')
    const url = `https://api.themoviedb.org/3/search/movie?api_key=0f0e77ff476f91320f71356b9332ac03&query=${movieName}&include_adult=false&language=en-US&page=1`
    console.log(url)
    const response = await fetch(url);
    const data = await response.json();
    console.log('lkkkkkkk')
    return data;
  } catch (error) {
    console.log("c")
    console.error('error in execution', error);
    const probs_context = MOVIESHOP.create_context(lambda,dynamoDb,process.env.CB_STAGE, 'en', 'generic_error', 500,event.path);
    console.log(probs_context)
    const error_lam = await MOVIESHOP.create_error_message(probs_context)
    callback(null, error_lam);
    return;
  }
}

function createUniqueCode(name, id) {
  // Remove all whitespace from the name
  let cleanedName = name.replace(/\s+/g, '');

  // Concatenate the cleaned name with the ID
  let combined = cleanedName + id;

  // Convert the combined string to uppercase
  return combined.toUpperCase();
}

module.exports.search = async (event, context, callback) => {

  console.log(event)
  const movieName  = event.multiValueQueryStringParameters.movieName[0];
  const data = await getData(movieName);
  var movies = []

  for (const record of data.results) {
    const visualProductionId = createUniqueCode(record.title, record.id)
    let visualProduction = {
        id: VISUAL_PRODUCTION_PREFIX + visualProductionId,
        apiId: record.id,
        name: record.title,
        photo: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + record.poster_path
      }
      movies.push(visualProduction)
  }

  console.log('gggg')
  console.log(data)
  console.log("b")
  console.log(data);
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(movies),
  };
  callback(null, response);
};


    

    
