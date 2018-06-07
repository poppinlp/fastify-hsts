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

const testHandler = (t, opts, expectedHeader) => {
	const { app } = t.context;

	t.plan(3);
	app.register(plugin, opts);
	app.inject(
		{
			method: 'GET',
			url: '/'
		},
		(err, res) => {
			const expected = {
				payload: 'hello world',
				header: expectedHeader
			};
			const target = {
				payload: res.payload,
				header: res.headers['strict-transport-security']
			};

			t.is(err, null, 'should throw no error');
			t.is(target.payload, expected.payload, 'should have expected response payload');
			t.is(target.header, expected.header, 'should have expected response header');
			t.end();
		}
	);
};

test.cb('default option', t => {
	testHandler(t, {}, 'max-age=15552000; includeSubDomains');
});

test.cb('set maxAge to 12345', t => {
	testHandler(t, { maxAge: 12345 }, 'max-age=12345; includeSubDomains');
});

test.cb('set includeSubdomains to false', t => {
	testHandler(t, { includeSubDomains: false }, 'max-age=15552000');
});

test.cb('set preload to true', t => {
	testHandler(t, { preload: true }, 'max-age=15552000; includeSubDomains; preload');
});

test.cb('set setIf and match it', t => {
	testHandler(
		t,
		{
			setIf: () => true
		},
		'max-age=15552000; includeSubDomains'
	);
});

test.cb('set setIf but dont match', t => {
	testHandler(
		t,
		{
			setIf: () => false
		},
		undefined
	);
});
