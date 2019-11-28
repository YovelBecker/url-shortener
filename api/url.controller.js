const fs = require('fs')
const validUrl = require('valid-url');
const shortId = require('shortid')

// Get needed config data and json url map
const urlMap = require('../data/url-map.json')
const { BASE_URL } = require('../config')

function moveUrl(req, res) {
    
    // Try to get the long url by the short url id
    const { id } = req.params
    const longUrl = urlMap[id]

    // Check if gotten url
    if (!longUrl) {
        return res.status(404).json('Url not found')
    }

    // Respond with redirecting to the long url 
    res.redirect(longUrl)
}

function makeUrl(req, res) {

    // Check for valid url & existing url
    const { url: longUrl } = req.body
    if (!validUrl.isUri(longUrl)) {
        return res.status(401).json('Invalid Long Url')
    }
    const longUrls = Object.values(urlMap)
    if (longUrls.find(url => longUrl === url)) {
        return res.status(401).json('URL already exists')
    }

    // Make the shortened url
    const id = shortId.generate()
    const shortUrl = BASE_URL + '/' + id

    // Write the  url to the JSON file
    urlMap[id] = longUrl
    const urlJson = JSON.stringify(urlMap)
    fs.writeFileSync('./data/url-map.json', urlJson)

    // Respond with the short url
    res.json({ url: shortUrl })
}

module.exports = {
    moveUrl,
    makeUrl
}