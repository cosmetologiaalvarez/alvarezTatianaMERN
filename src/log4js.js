import log4js from 'log4js';

export default log4js.configure({
    appenders: {
        console: {type: "console"},
        debugWarnFile: {type: "file", filename: "./warn.log"},
        debugErrorFile: {type: "file", filename: "./error.log"},
        debugInfo: {
            type: "console",
            level: "info",
        },
        errorLvlFilter: {
            type: "logLevelFilter",
            level: "error",
            appenders: "debugErrorFile"
        },
        warnLvlFilter: {
            type: "logLevelFilter",
            level: "warn",
            appenders: "debugWarnFile"
        }
    },
    categories: {
        default: {
            appenders: ["console", "warnLvlFilter", "errorLvlFilter", "debugInfo"],
            level: "all"
        },
        DEV: {
            appenders: ["console", "debugInfo"],
            level: "all"
        },
        PROD: {
            appenders: ["console", "errorLvlFilter", "debugInfo"],
            level: "all"
        }
    }
})

