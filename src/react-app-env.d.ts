/// <reference types="react-scripts" />

// import image from "./foo.png"
// image has type `sting` here
declare module "*.png" {
    const src: string
    export default src
}
