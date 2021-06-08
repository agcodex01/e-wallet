const routes = [{
        path: "/accounts/",
        component: () =>
            import ("layouts/MainLayout.vue"),
        children: [{
            path: "dashboard",
            name: "dashboard",
            component: () =>
                import ("pages/Dashboard.vue")
        }, {
            path: "profile",
            name: "profile",
            component: () =>
                import ("pages/Profile.vue")
        }]
    }, {
        path: "/",
        name: "main_page",
        component: () =>
            import ("pages/Index.vue")
    }, {
        path: "/auth/login",
        name: "login",
        component: () =>
            import ("pages/Login.vue")
    }, {
        path: "/auth/register",
        name: "register",
        component: () =>
            import ("pages/Register.vue")
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: "*",
        component: () =>
            import ("pages/Error404.vue")
    }
]

export default routes