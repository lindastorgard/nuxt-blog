export default function (context) {
    if(!context.store.getters.isAuthenticated) {
        console.log('[Middleware] Just Auth');
        context.redirect('/admin/auth')
    }
};