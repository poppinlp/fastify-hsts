const fp = require('fastify-plugin');

const hsts = (app, opts, next) => {
	const maxAge = typeof opts.maxAge === 'number' && opts.maxAge >= 0 ? Math.round(opts.maxAge) : 180 * 24 * 60 * 60;
	const hasSetIf = opts.setIf !== undefined;
	const setIf = typeof opts.setIf === 'function' ? opts.setIf : () => true;
	const headerArr = [];

	headerArr.push(`max-age=${maxAge}`);
	opts.includeSubDomains !== false && opts.includeSubdomains !== false && headerArr.push('includeSubDomains');
	opts.preload && headerArr.push('preload');

	const headerStr = headerArr.join('; ');

	app.addHook('onSend', (request, reply, payload, next) => {
		(!hasSetIf || setIf(request, reply)) && reply.header('Strict-Transport-Security', headerStr);
		next();
	});

	next();
};

module.exports = fp(hsts, {
	fastify: '^1.0.0',
	name: 'fastify-hsts'
});
