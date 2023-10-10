// import dotenv from "dotenv"
// dotenv.config();
const settings = {
    "app-protocol": "http",
    "app-url": "localhost:8000",
    "api-path": "api",
}

export default function (str: string): string {
    const regexp = /{{(.*?)}}/g;
    const match = str.match(regexp);
    let res = str;
    match.every(element => {
        const elementOnly = element.replace(/[{}]/g, '') as "app-protocol" | "app-url" | "api-path";
        let elm = settings[elementOnly];
        if (elm === undefined) {
            throw new Error(`Could not find ${elementOnly} environment variable`);
        }
        res = res.replace(element, elm);
        return true;
    });
    return res;
}

// let log = exports.default('{{app-protocol}}://{{app-url}}/{{api-path}}/items')
// console.log(log);