const Koa = require('koa');
const app = new Koa();
// const open = import('open'); // 引入 open 模块
// import open, {openApp, apps} from 'open';
// import open, {openApp, apps} from 'open';
const { open } = require('open')
// import open, { openApp, apps } from 'open';





// logger

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

app.use(async ctx => {
    console.log('3');
    ctx.body = 'Hello World';
    console.log('4');
});

// app.listen(3003);
app.listen(3003, async () => {
    console.log('Server is running on http://localhost:3003');
    // const { default: open } = await import('open'); // 动态导入 open 模块
    await open('http://localhost:3003'); // 启动后自动打开浏览器
});