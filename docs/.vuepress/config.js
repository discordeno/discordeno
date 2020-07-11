const sidebar = require("./sidebar.js");
const nav = require("./navbar");
const head = require("./head");

const config = {
    title: "Discordeno",
    head,
    theme: "yuu",
    themeConfig: {
        yuu: { 
            disableThemeIgnore: true 
        },
        nav,
        sidebar,
        searchMaxSuggestions: 5,
        sidebarDepth: 2,
        searchPlaceholder: "Search Docs...",
        lastUpdated: "Last Updated",
        repo: "skillz4killz/discordeno",
        editLinks: true,
        docsBranch: "master",
        editLinkText: "Improve on Github!",
    }
};

module.exports = config;
