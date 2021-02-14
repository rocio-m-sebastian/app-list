const selectPlace = document.querySelector('#selectPlace');
// const selectSubject = document.querySelector('#selectSubject');
// const selectCenter = document.querySelector('#selectCenter');
const tagsContainerPlace = document.querySelector('.applied-filters-list--citie');
const tagsContainerSubject = document.querySelector('.applied-filters-list--subject');
const tagsContainerCenter = document.querySelector('.applied-filters-list--center');

const selectValue = (select) => {
  // console.log(select.value);
  return select.value;
};

const saveTagSesionStorage = (tag, arrTags) => {
  console.log(tag);
  arrTags.push(tag);
  window.sessionStorage.setItem('tags', arrTags);
};

const createHtmlTag = (selectVal, selectType) => {
  const tag = document.createElement('div');
  const tagContent = `
    <div class="applied-filter applied-filter--${selectType} u-flex">
      <div class="applied-filter--icon u-flex u-flex--center">
            <span class="wrapper-svg u-icon u-flex--inline u-close" {% if aria_title is empty %}aria-hidden="true"{% else %}aria-label="{{ aria_title }}"{% endif %}></span>
        </div>
        <div>
            <span class="p-small">${selectVal}</span>
            <span class="wrapper-svg u-icon u-flex--inline u-close" {% if aria_title is empty %}aria-hidden="true"{% else %}aria-label="{{ aria_title }}"{% endif %}></span>
        </div>
    </div>`;
  tag.innerHTML = tagContent;
  if (selectType === 'place') {
    tagsContainerPlace.appendChild(tag);
  } else if (selectType === 'subject') {
    tagsContainerSubject.appendChild(tag);
  } else {
    tagsContainerCenter.appendChild(tag);
  }
};

const tags = [];
const addTagPlace = selectPlace.addEventListener('change', (tags) => {
  createHtmlTag(selectValue(selectPlace), 'place');
  console.log('arr', tags);
  saveTagSesionStorage(selectValue(selectPlace), tags);
  console.log(tags);
});

// const deleteTag = () => {};

export {
  addTagPlace,
};

// sesion storage
