import fetch from 'isomorphic-fetch';

let HttpGetter = {
  retrieve(target) {
    return fetch(target)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }

        return response.text();
      }).catch(error => {
        console.log(`Error: #{error}`);
      });
  }
}

let http_getter = function newHttpGetter() { 
  return({
    ...HttpGetter
  })
}

export default http_getter;
