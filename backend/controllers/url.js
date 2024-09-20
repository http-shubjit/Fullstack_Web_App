const URL = require("../models/url");

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "URL is required" });
  }
  const shortId = Math.floor(100000 + Math.random() * 900000);
  try {
    await URL.create({
      shortId: shortId,
      redirectUrl: body.url,
      visitHistory: [],
      createdBy:req.user._id
    });
return res.redirect(`/?id=${shortId}`);
  } catch (error) {
    
    return res.status(500).json({ error: "An error occurred while creating the short URL" });
  }
}


async function handleRedirectUrl(req, res) {
  try {
     const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      { shortId: shortId },
      { $push: { visitHistory:{ timeStamp:Date.now()} } },
      { new: true } 
    );
    if (!entry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.redirect(entry.redirectUrl);
  } catch (error) {
    console.error("Error during URL redirection:", error);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
}

async function handleGetAllUrls(req, res) {
  try {
   
    const urls = await URL.find(); 
    if (urls.length === 0) {
      return res.status(404).json({ message: "No short URLs found." });
    }

    // Respond with the list of URLs
    return res.render('home', {
      urls:urls
    })
     
  } catch (error) {
    console.error("Error retrieving URLs:", error);
    return res.status(500).json({ error: "An error occurred while retrieving the URLs." });
  }
}


async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId; 
  try {
    // Find the URL entry by shortId
    const result = await URL.findOne({ shortId });

    // Check if the URL entry exists
    if (!result) {
      return res.status(404).json({ error: "Short URL not found." });
    }

    // Prepare analytics data
    const analyticsData = {
      totalClicks: result.visitHistory.length, // Total number of clicks
      analytics: result.visitHistory.map(entry => ({
        timeStamp: entry.timeStamp, // Assuming visitHistory contains an object with timeStamp
        // You can add more fields if necessary
      })),
    };

    // Respond with the analytics data
    return res.status(200).json({
      message: "Analytics retrieved successfully.",
      data: analyticsData,
    });
  } catch (error) {
    console.error("Error retrieving analytics:", error);
    return res.status(500).json({ error: "An error occurred while retrieving analytics." });
  }
}

module.exports = {
  handleGenerateNewShortUrl,
  handleRedirectUrl,
  handleGetAllUrls,
  handleGetAnalytics, 
};