import { query } from 'refract-query';

let engine = { 
  validate(doc) { 
    result = doc.
      then(elements => { 
        return 5;
      });

    Promise.resolve(result, status => { return status; });
  }
}
