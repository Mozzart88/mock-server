import express from 'express'
import morgan from 'morgan';

const PORT = process.env.PORT ?? 8080

const app = express()
const states = {
	"continue": {
		"code": 100,
		"msg": {message: "continue"}

	},
	"switchingProtocols": {
		"code": 101,
		"msg": {message: "switching protocols"}
	},
	"processing": {
		"code": 102,
		"msg": {message: "processing"}
	},
	"earlyHints": {
		"code": 103,
		"msg": {message: "early hints"}
	},
	"ok": {
		"code": 200,
		"msg": {message: "ok"}
	},
	"created": {
		"code": 201,
		"msg": {message: "created"}
	},
	"accepted": {
		"code": 202,
		"msg": {message: "accepted"}
	},
	"nonAuthoritativeInformation": {
		"code": 203,
		"msg": {message: "non-authoritative information"}
	},
	"noContent": {
		"code": 204,
		"msg": {message: "no content"}
	},
	"resetContent": {
		"code": 205,
		"msg": {message: "reset content"}

	},
	"partialContent": {
		"code": 206,
		"msg": {message: "partial content"}
	},
	"multiStatus": {
		"code": 207,
		"msg": {message: "multi-status"}
	},
	"alreadyReported": {
		"code": 208,
		"msg": {message: "already reported"}
	},
	"imUsed": {
		"code": 226,
		"msg": {message: "im used"}
	},
	"multipleChoices": {
		"code": 300,
		"msg": {error: "multiple choices"}
	},
	"movedPermanently": {
		"code": 301,
		"msg": {error: "moved permanently"}
	},
	"found": {
		"code": 302,
		"msg": {error: "found"}
	},
	"seeOther": {
		"code": 303,
		"msg": {error: "see other"}
	},
	"notModified": {
		"code": 304,
		"msg": {error: "not modified"}
	},
	"useProxy": {
		"code": 305,
		"msg": {error: "use proxy"}
	},
	"temporaryRedirect": {
		"code": 307,
		"msg": {error: "temporary redirect"}
	},
	"permanentRedirect": {
		"code": 308,
		"msg": {error: "permanent redirect"}
	},
	"badRequest": {
		"code": 400,
		"msg": {error: "bad request"}
	},
	"unauthorized": {
		"code": 401,
		"msg": {error: "unauthorized"}
	},
	"paymentRequired": {
		"code": 402,
		"msg": {error: "payment required"}
	},
	"forbidden": {
		"code": 403,
		"msg": {error: "forbidden"}
	},
	"notFound": {
		"code": 404,
		"msg": {error: "not found"}
	},
	"methodNotAllowed": {
		"code": 405,
		"msg": {error: "method not allowed"}
	},
	"notAcceptable": {
		"code": 406,
		"msg": {error: "not acceptable"}
	},
	"proxyAuthenticationRequired": {
		"code": 407,
		"msg": {error: "proxy authentication required"}
	},
	"requestTimeout": {
		"code": 408,
		"msg": {error: "request timeout"}
	},
	"conflict": {
		"code": 409,
		"msg": {error: "conflict"}
	},
	"gone": {
		"code": 410,
		"msg": {error: "gone"}
	},
	"lengthRequired": {
		"code": 411,
		"msg": {error: "length required"}
	},
	"preconditionFailed": {
		"code": 412,
		"msg": {error: "precondition failed"}
	},
	"contentTooLarge": {
		"code": 413,
		"msg": {error: "content too large"}
	},
	"uriTooLong": {
		"code": 414,
		"msg": {error: "uri too long"}
	},
	"unsupportedMediaType": {
		"code": 415,
		"msg": {error: "unsupported media type"}
	},
	"rangeNotSatisfiable": {
		"code": 416,
		"msg": {error: "range not satisfiable"}
	},
	"expectationFailed": {
		"code": 417,
		"msg": {error: "expectation failed"}
	},
	"teapod": {
		"code": 418,
		"msg": {error: "(unused)"}
	},
	"misdirectedRequest": {
		"code": 421,
		"msg": {error: "misdirected request"}
	},
	"unprocessableContent": {
		"code": 422,
		"msg": {error: "unprocessable content"}
	},
	"locked": {
		"code": 423,
		"msg": {error: "locked"}
	},
	"failedDependency": {
		"code": 424,
		"msg": {error: "failed dependency"}
	},
	"tooEarly": {
		"code": 425,
		"msg": {error: "too early"}
	},
	"upgradeRequired": {
		"code": 426,
		"msg": {error: "upgrade required"}
	},
	"preconditionRequired": {
		"code": 428,
		"msg": {error: "precondition required"}
	},
	"tooManyRequests": {
		"code": 429,
		"msg": {error: "too many requests"}
	},
	"requestHeaderFieldsTooLarge": {
		"code": 431,
		"msg": {error: "request header fields too large"}
	},
	"unavailableForLegalReasons": {
		"code": 451,
		"msg": {error: "unavailable for legal reasons"}
	},
	"internalServerError": {
		"code": 500,
		"msg": {error: "internal server error"}
	},
	"notImplemented": {
		"code": 501,
		"msg": {error: "not implemented"}
	},
	"badGateway": {
		"code": 502,
		"msg": {error: "bad gateway"}
	},
	"serviceUnavailable": {
		"code": 503,
		"msg": {error: "service unavailable"}
	},
	"gatewayTimeout": {
		"code": 504,
		"msg": {error: "gateway timeout"}
	},
	"httpVersionNotSupported": {
		"code": 505,
		"msg": {error: "http version not supported"}
	},
	"variantAlsoNegotiates": {
		"code": 506,
		"msg": {error: "variant also negotiates"}
	},
	"insufficientStorage": {
		"code": 507,
		"msg": {error: "insufficient storage"}
	},
	"loopDetected": {
		"code": 508,
		"msg": {error: "loop detected"}
	},
	"notExtended": {
		"code": 510,
		"msg": {error: "not extended (obsoleted)"}
	},
	"networkAuthenticationRequired": {
		"code": 511,
		"msg": {error: "network authentication required"}
	}
}
app.use((_, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
  });

app.use(morgan('dev'))
for (const state in states) {
	app.get(`/${state}`, (_, res) => {
		res.status(states[state].code).send(states[state].msg)
	})
	app.post(`/${state}`, (_, res) => {
		res.status(states[state].code).send(states[state].msg)
	})
	app.put(`/${state}`, (_, res) => {
		res.status(states[state].code).send(states[state].msg)
	})
	app.patch(`/${state}`, (_, res) => {
		res.status(states[state].code).send(states[state].msg)
	})
	app.delete(`/${state}`, (_, res) => {
		res.status(states[state].code).send(states[state].msg)
	})
}
app.listen(
	PORT,
	() => {
		console.log(`Server listen on port: ${PORT}`)
	}
)