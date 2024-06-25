import React from 'react';

function CollectionsFilter() {
  const selectedTags = [];

  function editTags(val, target) {
    if (selectedTags.includes(val)) {
      selectedTags.pop(val);
      target.classList.remove('selectedTag');
      target.classList.add('tag');
    } else {
      selectedTags.push(val);
      target.classList.remove('tag');
      target.classList.add('selectedTag');
    }
  }

  return (
    <div className="tagsBar flex">
      <button
        type="button"
        className="tag"
        onClick={(e) => editTags(e.target.id, e.target)}
        onKeyDown={(e) => editTags(e.target.id, e.target)}
        id="painting"
      >
        Painting
      </button>
      <button
        type="button"
        className="tag"
        onClick={(e) => editTags(e.target.id, e.target)}
        onKeyDown={(e) => editTags(e.target.id, e.target)}
        id="photography"
      >
        Photography
      </button>
      <button
        type="button"
        className="tag"
        onClick={(e) => editTags(e.target.id, e.target)}
        onKeyDown={(e) => editTags(e.target.id, e.target)}
        id="sculpture"
      >
        Sculpture
      </button>
      <button
        type="button"
        className="tag"
        onClick={(e) => editTags(e.target.id, e.target)}
        onKeyDown={(e) => editTags(e.target.id, e.target)}
        id="mosaic"
      >
        Mosaic
      </button>
      <button
        type="button"
        className="tag"
        onClick={(e) => editTags(e.target.id, e.target)}
        onKeyDown={(e) => editTags(e.target.id, e.target)}
        id="others"
      >
        Others
      </button>
    </div>
  );
}

export default CollectionsFilter;
