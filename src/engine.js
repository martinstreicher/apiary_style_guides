import { query } from 'refract-query';

let Engine = { 
  validate(doc) { 
    doc.
      then(elements => { 
        let results = query(elements, { element: 'httpResponse' });
        console.log(results);
      });
  }
}

let validator = function newEngine() { 
  return({
    ...Engine
  })
}

export default validator;
