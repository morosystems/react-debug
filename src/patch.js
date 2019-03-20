import debug from "./debug";

if(process.env.NODE_ENV === "development"){
    global.debug = debug;
}
