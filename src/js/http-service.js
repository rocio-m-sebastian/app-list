const url = 'https://rocio-m-sebastian.github.io/list/data.json';

const getData = () => {
  return fetch(url, { method: 'GET' })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then(({ list }) => {
      return list;
    })
    .catch((error) => {
      console.log(error);
      console.log('error');
    });
};

export {
  getData,
};
