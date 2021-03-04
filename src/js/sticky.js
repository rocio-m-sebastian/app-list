const header = document.getElementById('js-table');
const sticky = header.offsetTop;

const setSticky = () => {
  if (window.pageYOffset > sticky) {
    header.classList.add('u-sticky');
  } else {
    header.classList.remove('u-sticky');
  }
};

export {
  setSticky,
};
