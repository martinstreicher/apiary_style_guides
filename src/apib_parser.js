import fetch from 'isomorphic-fetch';

let ApibSender = {
  parse(text_file_promise) { 
    return text_file_promise
      .then(text => {
        return fetch('https://api.apiblueprint.org/parser', {
          body:   text, 
          headers: {
            'Accept':       'application/vnd.refract.parse-result+json',
            'Content-Type': 'text/vnd.apiblueprint'
          }, 
          method: 'post',
        })
      })
      .then(response => { 
        return response.json();
      }).catch(error => { 
        console.log(error);
      })
  }
}

let apib_parser = function newApibSender() { 
  return({
    ...ApibSender
  })
}

export default apib_parser;
