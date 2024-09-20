    
//     const URL = require("../models/url");



//     async function getEjs (req, res) {
//     try {
//         const allUrls = await URL.find({});
//         return res.render('home', {
//             urls: allUrls 
//         });
//     } catch (error) {
//         console.error(error); 
//         return res.render('home', { error: "An error occurred while fetching URLs." });
//     }
// };


// module.exports = {
//     getEjs
// }