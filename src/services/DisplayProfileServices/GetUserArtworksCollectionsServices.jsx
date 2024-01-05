export const GetArtWorks = (id, lazyListed) => {
  const artWorksArray = [];
  if (lazyListed) {
    lazyListed.forEach((a) => {
      if (a.ownerId === id) {
        artWorksArray.push(a);
      }
    });
  }
  return artWorksArray;
};

export const GetCollections = (id, collections) => {
  const collectionsArray = [];
  if (collections) {
    collections.forEach((a) => {
      if (a.owner === id) {
        collectionsArray.push(a);
      }
    });
  }
  return collectionsArray;
};
