import test from 'ava';
import fastify from 'fastify';
import plugin from '../src/index';

test.beforeEach(t => {
	const app = fastify();

	app.get('/', (request, reply) => {
		reply.send('hello world');
	});

	t.context.app = app;
});

const mock = async (t, opts, expected) => {
	const rsp = await t.context.app.register(plugin, opts).inject({
		method: 'get',
		url: '/'
	});
	const header = rsp.headers['strict-transport-security'];

	t.is(header, expected);
};

[
	{ maxAge: -123 },
	{ maxAge: '123' },
	{ maxAge: true },
	{ maxAge: false },
	{ maxAge: {} },
	{ maxAge: [] },
	{ maxAge: [] },
	{ setIf: 123 },
	{ setIf: true },
	{ setIf: false },
	{ setIf: null },
	{ maxage: false },
	{ maxage: 1234 }
].forEach(opts => {
	test(`should get default value for invalid params: ${JSON.stringify(opts)}`, async t => {
		await mock(t, opts, 'max-age=15552000; includeSubDomains');
	});
});

['includeSubDomains', 'includeSubdomains'].forEach(key => {
	test(`can disable subdomains with ${key}`, async t => {
		const opts = {};
		opts[key] = false;

		await mock(t, opts, 'max-age=15552000');
	});
});

test('can set maxAge to positive integer', async t => {
	await mock(t, { maxAge: 1234 }, 'max-age=1234; includeSubDomains');
});

test('can round maxAge', async t => {
	await mock(t, { maxAge: 1234.123 }, 'max-age=1234; includeSubDomains');
});

test('can enable preloading', async t => {
	await mock(
		t,
		{
			preload: true
		},
		'max-age=15552000; includeSubDomains; preload'
	);
});

test('set setIf and match it', async t => {
	await mock(
		t,
		{
			setIf: () => true
		},
		'max-age=15552000; includeSubDomains'
	);
});

test('set setIf but dont match', async t => {
	await mock(
		t,
		{
			setIf: () => false
		},
		undefined
	);
});
