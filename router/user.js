const Router = require('@koa/router');
const router = new Router();
router.prefix('/user');

router.get('/', async (ctx, next) => {
    ctx.body = '用户列表';
});
router.post('/add', async (ctx, next) => {
    ctx.body = '创建用户';
    next();
});
router.put('/update', async (ctx, next) => {
    ctx.body = '更新用户';
});
router.delete('/delete', async (ctx, next) => {
    ctx.body = '删除用户';
});
router.get('/:id', async (ctx, next) => {
    console.log(ctx.params);
    console.log(ctx.query);
    ctx.body = '用户详情';
});
module.exports = router;