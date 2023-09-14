export const GetArtWorks = (id, lazyListed) => {
    let artWorksArray = [];
    if (lazyListed) {
        for (const a of lazyListed) {
            if (a.ownerId === id) {
                artWorksArray.push(a);
            }
        }
    }
    return artWorksArray;
};
export const GetCollections = (id, collections) => {
    let collectionsArray = [];
    if (collections) {
        for (const a of collections) {
            if (a.owner === id) {
                collectionsArray.push(a);
            }
        }
    }
    return collectionsArray;
};