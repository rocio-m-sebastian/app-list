import { getData } from './http-service';

const saveListLocalStorage = async() => {
  const data = await getData();
  window.localStorage.setItem('list', JSON.stringify(data));
};

const getListLocalStorage = () => {
  const list = JSON.parse(localStorage.getItem('list'));
  console.log(list);
  return list;
};

export {
  saveListLocalStorage,
  getListLocalStorage,
};
