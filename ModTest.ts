import Hello from "./ModB";

export * as B from "./ModB";
export {H,Hello}  from "./ModB.js";
export {Hello as exp}  from "./ModB.js";
console.log(Hello);