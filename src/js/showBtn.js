const tableInfo = document.getElementById('table');
const sticky = tableInfo.offsetTop;
const htmlBtnTop = document.querySelector('#js-btn-top');

const showBtn = () => {
  if (window.pageYOffset > sticky) {
    htmlBtnTop.classList.remove('u-hidden');
  } else {
    htmlBtnTop.classList.add('u-hidden');
  }
};

export {
  showBtn,
};
