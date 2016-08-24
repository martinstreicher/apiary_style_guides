let FileFetcher = {
  retrieve(target) {
    fetch(this.target)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        console.log(response);
        this._content = response.text();
      })
  }
}

let fetcher = function fileFetcherFactory() {
  return Object.assign(Object.create(FileFetcher), {});
}

export default fetcher;
