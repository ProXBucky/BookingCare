export const adminMenu = [
    { //Users systems
        name: 'menu.admin.user',
        menus: [
            {
                name: 'menu.admin.doctor-manage', link: '/',
            },
            {
                name: 'menu.admin.admin-manage', link: '/',

            },
            {
                name: 'menu.admin.crud', link: '/system/user-manage',

            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux',

            }
        ]
    },
    { //Clinic
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.clinic-manage', link: '/',
            },
        ]
    },
    { //Specialty
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.specialty-manage', link: '/',
            },
        ]
    },
    { //Handbook
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.handbook-manage', link: '/',
            },
        ]
    },
];