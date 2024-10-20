export function isDev(): boolean {

    console.info(process.env.NODE_ENV)
    return process.env.NODE_ENV === "dev";
}
