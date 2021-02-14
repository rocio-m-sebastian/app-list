const tagsContainerPlace = document.querySelector('.applied-filters-list--citie');
const tagsContainerSubject = document.querySelector('.applied-filters-list--subject');
const tagsContainerCenter = document.querySelector('.applied-filters-list--center');

const createHtmlTag = (tag, selectType) => {
  const tagContent = `
    <div class="applied-filter applied-filter--x u-flex">
      <div class="applied-filter--icon u-flex u-flex--center">
            <span class="wrapper-svg u-icon u-flex--inline u-close" {% if aria_title is empty %}aria-hidden="true"{% else %}aria-label="{{ aria_title }}"{% endif %}></span>
        </div>
        <div>
            <span class="p-small">${tag.val}</span>
            <span class="wrapper-svg u-icon u-flex--inline u-close" id="js-delete-tag" data-id="${tag.id}" {% if aria_title is empty %}aria-hidden="true"{% else %}aria-label="{{ aria_title }}"{% endif %}>x</span>
        </div>
    </div>`;
  const tagHtml = document.createElement('div');
  tagHtml.innerHTML = tagContent;
  tagHtml.firstElementChild.setAttribute('id', tag.id);

  if (selectType === 'place') {
    tagsContainerPlace.appendChild(tagHtml.firstElementChild);
  } else if (selectType === 'subject') {
    tagsContainerSubject.appendChild(tagHtml.firstElementChild);
  } else {
    tagsContainerCenter.appendChild(tagHtml.firstElementChild);
  }

  return tagHtml.firstElementChild;
};

export {
  createHtmlTag,
};
