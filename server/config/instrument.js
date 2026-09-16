import * as Sentry from "@sentry/node"
// const Sentry = require("@sentry/node");
// const {nodeProfilingIntegration} = require('@sentry/profiling-node')
Sentry.init({
  dsn: "https://91a713491aa6c8f289fc5b06f786163f@o4512098219589632.ingest.us.sentry.io/4512098227781632",
    // integrations: [
    // nodeProfilingIntegration()
    // ],
    // tracesSampleRate:1.0,
    integrations: [
        Sentry.mongooseIntegration()
    ],
    dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/node/configuration/options/#dataCollection
    // userInfo: false,
    // httpBodies: [],
  },
});
// Sentry.profiler.startProfiler()
// Sentry.startSpan({
//     name:'my first transaction'
// }, () => { })
// Sentry.profiler.stopProfiler()