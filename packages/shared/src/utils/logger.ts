import pino from "pino";

const token = process.env.AXIOM_TOKEN as string;
const dataset = process.env.AXIOM_DATASET as string;

const createLoggerConfig = (name: string): pino.LoggerOptions => {
    const config: pino.LoggerOptions = {
        level: "debug",
        name,
    };

    if (token && dataset) {
        try {
            config.transport = {
                target: "@axiomhq/pino",
                options: {
                    token,
                    dataset,
                },
            };
        } catch {
            // Transport not available, fallback to default logger
        }
    }

    return config;
};

export const logger = pino(createLoggerConfig("databuddy"));

export function createLogger(name: string) {
    return pino(createLoggerConfig(name));
}