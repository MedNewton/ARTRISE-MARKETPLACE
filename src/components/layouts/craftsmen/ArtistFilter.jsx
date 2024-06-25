import React from 'react';

function ArtistFilter() {
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
        id="painter"
      >
        Painter
      </button>
      <button
        type="button"
        className="tag"
        onClick={(e) => editTags(e.target.id, e.target)}
        onKeyDown={(e) => editTags(e.target.id, e.target)}
        id="photographer"
      >
        Photographer
      </button>
      <button
        type="button"
        className="tag"
        onClick={(e) => editTags(e.target.id, e.target)}
        onKeyDown={(e) => editTags(e.target.id, e.target)}
        id="sculpturer"
      >
        Sculpturer
      </button>
      <button
        type="button"
        className="tag"
        onClick={(e) => editTags(e.target.id, e.target)}
        onKeyDown={(e) => editTags(e.target.id, e.target)}
        id="ceramic_artist"
      >
        Ceramic artist
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

export default ArtistFilter;
