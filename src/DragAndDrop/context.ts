export const Parent: any[] = [
    {
        id: 1,
        text: 'Card 1',
    },
    {
        id: 2,
        text: 'Card 2',
    },
    {
        id: 3,
        text: 'Card 3',
    },
]

export const Children: any[] = [
    {
        id: 1,
        text: 'Write a cool JS library',
        parent: 1
    },
    {
        id: 2,
        text: 'Make it generic enough',
        parent: 1
    },
    {
        id: 3,
        text: 'Write README',
        parent: 2
    },
    {
        id: 4,
        text: 'Create some examples',
        parent: 2
    },
    {
        id: 5,
        text: 'Spam in Twitter and IRC to promote it',
        parent: 3
    },
    {
        id: 6,
        text: '???',
        parent: 3
    },
    {
        id: 7,
        text: 'PROFIT',
        parent: 3
    },
]