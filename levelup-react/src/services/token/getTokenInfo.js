// export function getTokenInfo(token) {
//     if (!token || typeof token !== "string") {
//         return null;
//     }

//     let payloadString;

//     try {
//         const tokenParts = token.split(".");
//         console.log(tokenParts);
//         const payloadBase64 = tokenParts[1];
//         console.log(payloadBase64);
//         payloadString = atob(payloadBase64);
//     } catch (error) {
//         console.log(error);
//         return null;
//     }
//     return JSON.parse(payloadString);
// }
