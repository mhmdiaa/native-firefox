function getCurrentURL(callback) {
    queryinfo = {
        active: true,
        currentWindow: true
    };
    browser.tabs.query(queryinfo, function(tabs) {
        var url = tabs[0].url;
        callback(url);
    });
};

function getLang(callback) {
    browser.tabs.detectLanguage(function(lang) {
        callback(lang);
    });
}

chrome.browserAction.onClicked.addListener(function(tab) {
    getCurrentURL(function(url) {
        var ref = url.replace(/^https?\:\/\/(www)?/i, "").replace(/\./g, "").split('/')[0];
        var url = encodeURIComponent(url);
        getLang(function(lang) {
            finalUrl = "https://dev.getnative.me?ref=" + ref + "&lang=" + lang + "&url=" + url;
            chrome.tabs.create({
                url: finalUrl
            });
        });
    });
});
