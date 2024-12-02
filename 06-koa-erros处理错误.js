const Koa = require('koa');
const logger = require('koa-logger')
const onerror = require('koa-onerror');
const app = new Koa();
onerror(app);


// logger
app.use(logger())


app.use(async (ctx, next) => {
    console.log('1');
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log('6');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);

});

// x-response-time

app.use(async (ctx, next) => {
    const start = Date.now();
    console.log('2');
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
    console.log('5');
});

// response

app.use(async (ctx, next) => {
    console.log('3');
    ctx.body = 'Hello World';
    console.log('4');
    await next();
});
// // 错误中间件
// app.use(async (ctx, next) => {
//     try {
//         await next();
//     } catch (err) {
//         console.log('错误信息----', err);
//         ctx.status = err.statusCode || err.status || 500;
//         ctx.type = 'json';
//         ctx.body = {
//             ok: 0,
//             message: err.message
//         };
//         // 手动释放错误
//         ctx.app.emit('error', err, ctx);
//     }
// });
app.use(async (ctx, next) => {
    // let err = new Error('未授权，不能访问');
    // err.status = 401;
    // throw err;
    ctx.throw(401, '未授权，不能访问', {
        data: '你需要登录后才能访问～'
    });
});
app.on('error', (err, ctx) => {
    console.log('错误信息', err);
});
app.listen(3003);
