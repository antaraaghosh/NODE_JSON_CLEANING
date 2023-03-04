const https = require('https');

const url = 'https://coderbyte.com/api/challenges/json/json-cleaning';

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    // Parse the JSON data
    const obj = JSON.parse(data);
    
    // Clean the object
    const cleanedObj = cleanObject(obj);
    
    // Log the modified object as a string
    console.log(JSON.stringify(cleanedObj));
  });
}).on('error', (err) => {
  console.log('Error:', err.message);
});

function cleanObject(obj) {
  for (let key in obj) {
    let value = obj[key];
    if (Array.isArray(value)) {
      obj[key] = value.filter(item => item !== 'N/A' && item !== '-' && item !== '');
      if (obj[key].length === 0) {
        delete obj[key];
      }
    } else if (typeof value === 'object' && value !== null) {
      cleanObject(value);
      if (Object.keys(value).length === 0) {
        delete obj[key];
      }
    } else if (value === 'N/A' || value === '-' || value === '') {
      delete obj[key];
    }
  }
  console.log(JSON.stringify(obj));
}
