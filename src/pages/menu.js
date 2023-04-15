const menus = [
    {
        id: 1,
        name: 'Home',
        links: '/home-01',
    },
    {
        id: 2,
        name: 'Explore',
        links: '/explore-01',
        namesub: [
            {
                id: 1,
                sub: 'Artists',
                links: '/authors-01'
            },
            {
                id: 2,
                sub: 'Collections',
                links: '/collections'
            },
            {
                id: 3,
                sub: 'Artworks',
                links: '/explore-01'
            },
            {
                id: 4,
                sub: 'Browse',
                links: '/home-08'
            },
        ]
    },
    {
        id: 3,
        name: 'Drops',
        links: '/drops',
    },
    {
        id: 4,
        name: 'Profile',
        links: '/Profile'
    }
    
]

export default menus;