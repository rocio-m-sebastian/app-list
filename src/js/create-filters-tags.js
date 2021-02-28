const tagsContainer = document.querySelector('.applied-filters-list__tags');
const htmlClearTags = document.querySelector('#js-clearall');

const createHtmlTag = (tag, selectType) => {
  const tagContent = `
    <div class="applied-filter u-flex ${tag.type}" id="${tag.id}">
      <div class="applied-filter__icon">

      </div>
      <div class="u-flex">
          <span class="p-small">${tag.val}</span>
          <span class="u-flex u-close" id="js-delete-tag" data-id="${tag.id}" {% if aria_title is empty %}aria-hidden="true"{% else %}aria-label="{{ aria_title }}"{% endif %}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"/></svg>
          </span>
      </div>
    </div>`;
  const tagHtml = document.createElement('div');
  tagHtml.innerHTML = tagContent;
  tagHtml.firstElementChild.setAttribute('id', tag.id);

  const svgIconPlace = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path fill="#88C9F9" d="M32 0H4C1.791 0 0 1.791 0 4v22h36V4c0-2.209-1.791-4-4-4z"/><path fill="#66757F" d="M10 36V7l4-4h2l4 4v29zm23-25c0-1-1-1-1-1h-7s-1 0-1 1v25h9V11z"/><path fill="#292F33" d="M28 17c0-1-1-1-1-1h-8c-1 0-1 1-1 1v19h10V17zm-17 2H6v-5s0-1-1-1H0v19c0 2.209 1.791 4 4 4h8V20s0-1-1-1zm21 6c-1 0-1 1-1 1v10h1c2.209 0 4-1.791 4-4v-7h-4z"/><path d="M8 29h2v2H8zm0-8h2v2H8zm-2 4h2v2H6zM16 9h2v2h-2zm0 4h2v2h-2zm-2 4h2v2h-2zm10 1h2v2h-2zm-2 4h2v2h-2zm-2 6h2v2h-2zm9-16h2v2h-2zm0 4h2v2h-2z" fill="#FFCC4D"/></svg>
  `;

  const svgIconNumber = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path fill="#CCD6DD" d="M31 2H5C3.343 2 2 3.343 2 5v26c0 1.657 1.343 3 3 3h26c1.657 0 3-1.343 3-3V5c0-1.657-1.343-3-3-3z"/><path fill="#E1E8ED" d="M31 1H5C2.791 1 1 2.791 1 5v26c0 2.209 1.791 4 4 4h26c2.209 0 4-1.791 4-4V5c0-2.209-1.791-4-4-4zm0 2c1.103 0 2 .897 2 2v4h-6V3h4zm-4 16h6v6h-6v-6zm0-2v-6h6v6h-6zM25 3v6h-6V3h6zm-6 8h6v6h-6v-6zm0 8h6v6h-6v-6zM17 3v6h-6V3h6zm-6 8h6v6h-6v-6zm0 8h6v6h-6v-6zM3 5c0-1.103.897-2 2-2h4v6H3V5zm0 6h6v6H3v-6zm0 8h6v6H3v-6zm2 14c-1.103 0-2-.897-2-2v-4h6v6H5zm6 0v-6h6v6h-6zm8 0v-6h6v6h-6zm12 0h-4v-6h6v4c0 1.103-.897 2-2 2z"/><path fill="#5C913B" d="M13 33H7V16c0-1.104.896-2 2-2h2c1.104 0 2 .896 2 2v17z"/><path fill="#3B94D9" d="M29 33h-6V9c0-1.104.896-2 2-2h2c1.104 0 2 .896 2 2v24z"/><path fill="#DD2E44" d="M21 33h-6V23c0-1.104.896-2 2-2h2c1.104 0 2 .896 2 2v10z"/></svg>
  `;

  const svgIconSubject = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path fill="#3B88C3" d="M32 36v-4c0-3.314-2.685-6-6-6H10c-3.313 0-6 2.686-6 6v4h28z"/><path fill="#D4AB88" d="M14 26l4 5.001L22 26v-4h-8z"/><path fill="#CC9B7A" d="M14 24c1.216 1.374 2.355 1.719 3.996 1.719 1.639 0 2.787-.346 4.004-1.719v-4h-8v4z"/><path fill="#963B22" d="M21.597 1.368c-1.925-.623-6.455-.453-7.588 1.019-2.944.057-6.398 2.718-6.851 6.228-.448 3.475.551 5.088.906 7.701.403 2.96 2.067 3.907 3.397 4.303 1.914 2.529 3.949 2.421 7.366 2.421 6.672 0 9.85-4.464 10.131-12.047.17-4.586-2.521-8.059-7.361-9.625z"/><path fill="#D4AB88" d="M25.413 11.318c-.646-.894-1.472-1.614-3.284-1.868.68.311 1.331 1.387 1.416 1.982.085.595.17 1.076-.368.481-2.155-2.382-4.502-1.444-6.827-2.899-1.624-1.016-2.119-2.141-2.119-2.141s-.198 1.5-2.661 3.029c-.714.443-1.566 1.43-2.038 2.888-.34 1.048-.234 1.982-.234 3.578 0 4.66 3.841 8.578 8.578 8.578s8.578-3.953 8.578-8.578c-.001-2.899-.305-4.031-1.041-5.05z"/><path fill="#C1694F" d="M18.827 18.751h-1.906c-.263 0-.477-.213-.477-.477s.213-.477.477-.477h1.906c.263 0 .477.213.477.477s-.213.477-.477.477z"/><path fill="#662113" d="M14.062 15.415c-.526 0-.953-.427-.953-.953v-.953c0-.526.427-.953.953-.953s.953.427.953.953v.953c0 .526-.427.953-.953.953zm7.625 0c-.526 0-.953-.427-.953-.953v-.953c0-.526.427-.953.953-.953s.953.427.953.953v.953c0 .526-.427.953-.953.953z"/><path fill="#C1694F" d="M18 22.731c-2.754 0-3.6-.705-3.741-.848-.256-.256-.256-.671 0-.927.248-.248.645-.255.902-.023.052.037.721.487 2.839.487 2.2 0 2.836-.485 2.842-.49.256-.255.657-.243.913.015.256.256.242.683-.014.938-.141.143-.987.848-3.741.848"/><path fill="#292F33" d="M10 32.5H8c0-4.094 1.877-8.5 6-8.5v2c-3.164 0-4 4.252-4 6.5zm17-4h-2c0-.411-.521-2.5-3-2.5v-2c3.533 0 5 2.931 5 4.5z"/><circle fill="#CCD6DD" cx="9" cy="32.5" r="3"/><circle fill="#F5F8FA" cx="9" cy="32.5" r="2"/><path fill="#292F33" d="M30 34h-2c0-.835-.108-5-2.25-5s-2.25 4.165-2.25 5h-2c0-4.383 1.589-7 4.25-7S30 29.617 30 34z"/><circle fill="#CCD6DD" cx="22.5" cy="34" r="1"/><circle fill="#CCD6DD" cx="29" cy="34" r="1"/></svg>
  `;

  const svgIconCenter = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path fill="#CCD6DD" d="M24 10c0 1.104-.896 2-2 2h-8c-1.104 0-2-.896-2-2V2c0-1.104.896-2 2-2h8c1.104 0 2 .896 2 2v8zM0 14v20c0 1.104.896 2 2 2h32c1.104 0 2-.896 2-2V14H0z"/><path fill="#99AAB5" d="M18 12H2c-1.104 0-2 .896-2 2h20c0-1.104-.896-2-2-2z"/><path fill="#99AAB5" d="M34 12H18c-1.104 0-2 .896-2 2h20c0-1.104-.896-2-2-2z"/><path fill="#55ACEE" d="M2 22h32v4H2zm0-6h32v4H2zm0 12h32v4H2z"/><path fill="#E1E8ED" d="M8 12h20v24H8z"/><path fill="#55ACEE" d="M10 20h16v4H10zm0-6h16v4H10zm0 12h16v4H10z"/><path fill="#3B88C3" d="M13 32h10v4H13z"/><path fill="#DD2E44" d="M22 4h-3V1h-2v3h-3v2h3v3h2V6h3z"/><path fill="#99AAB5" d="M26 10H10c-1.104 0-2 .896-2 2h20c0-1.104-.896-2-2-2z"/></svg>
  `;

  const svgWrapperHtml = document.createElement('span');

  if (selectType === 'place' || tag.type === 'place') {
    tagsContainer.insertBefore(tagHtml.firstElementChild, htmlClearTags);
    svgWrapperHtml.innerHTML = svgIconPlace;
    document.getElementById(`${tag.id}`).firstElementChild.appendChild(svgWrapperHtml);
  } else if (selectType === 'subject' || tag.type === 'subject') {
    tagsContainer.insertBefore(tagHtml.firstElementChild, htmlClearTags);
    svgWrapperHtml.innerHTML = svgIconSubject;
    document.getElementById(`${tag.id}`).firstElementChild.appendChild(svgWrapperHtml);
  } else if (selectType === 'center' || tag.type === 'center') {
    tagsContainer.insertBefore(tagHtml.firstElementChild, htmlClearTags);
    svgWrapperHtml.innerHTML = svgIconCenter;
    document.getElementById(`${tag.id}`).firstElementChild.appendChild(svgWrapperHtml);
  } else if (selectType === 'number' || tag.type === 'number') {
    tagsContainer.insertBefore(tagHtml.firstElementChild, htmlClearTags);
    svgWrapperHtml.innerHTML = svgIconNumber;
    document.getElementById(`${tag.id}`).firstElementChild.appendChild(svgWrapperHtml);
  }

  return tagHtml.firstElementChild;
};

export {
  createHtmlTag,
};
