const Router = require('@koa/router');
const router = new Router();
router.prefix('/user');

router.get('/', async (ctx, next) => {
    ctx.redirect('/user/list');
    // ctx.body = '用户列表';
});
router.get('/list', async (ctx, next) => {
    // ctx.cookies.set('username', 'youngs');
    // ctx.cookies.set('username', 'youngs', {
    //     maxAge: 1000 * 60 * 60 * 24 * 7,
    //     // path: '/user',
    //     // httpOnly: false,
    // });
    let username = ctx.cookies.get('username');
    ctx.cookies.set('username', 'youngs', {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        // path: '/user',
        // httpOnly: false,
    });
    if (username) {
        ctx.body = '用户列表' + username;
    } else {
        ctx.body = '用户列表';
    }

});
router.post('/add', async (ctx, next) => {
    console.log(ctx.request.body);
    console.log('-------');
    ctx.body = '创建用户';
    // next();
});
router.put('/update', async (ctx, next) => {
    ctx.body = '更新用户';
});
router.delete('/delete', async (ctx, next) => {
    ctx.body = '删除用户';
});
router.get('/detail/:id', async (ctx, next) => {
    console.log(ctx.params);
    console.log(ctx.query);
    let count = ctx.session.count || 0;
    ctx.session.count = ++count;
    ctx.body = '用户详情' + count;
});
module.exports = router;