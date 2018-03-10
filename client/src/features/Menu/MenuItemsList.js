const MenuItemsList = [
    {
        title: 'Войти',
        path: '/login',
        is_loggedIn: false
    },
    {
        title: 'Профиль',
        path: '/profile',
        is_loggedIn: true
    },
    {
        title: 'Калькулятор',
        rootPath: '/calculator',
        items: [
            {
                title: 'Общий',
                path: '/calculator/general'
            },
            {
                title: 'Войска (тренировка)',
                path: '/calculator/training'
            }
        ],
        is_loggedIn: true,
        has_dropdown: true
    }
];

export default MenuItemsList;
