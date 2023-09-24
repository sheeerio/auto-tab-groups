// import { getURLsInCurrentGroup } from "./utils.js";

async function getCurrentTabsGroupId() {
    let currentTab = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    return currentTab[0].groupId;
}

async function getNamesInCurrentGroup(groupId) {
    let allTabs = await chrome.tabs.query({});
  
    const NamesInCurrentGroup = allTabs
      .filter((tab) => tab.groupId === groupId)
      .map((tab) => tab.title);
  
    return NamesInCurrentGroup;
}

const addNewBookmark = (bookmarksElement, name) => {
    const bookmarkTitleElement = document.createElement("div");

    bookmarkTitleElement.textContent = name;
    bookmarkTitleElement.className = "bookmark-title";

    bookmarksElement.appendChild(bookmarkTitleElement);
};

const viewBookmarks = (currentNames = []) => {
    const bookmarksElement = document.getElementsByClassName("bookmarks")[0];
    console.log("we have the current names");

    if (currentNames.length > 0) {
        for (let i = 0; i<currentNames.length; i++) {
            const name = currentNames[i];
            addNewBookmark(bookmarksElement, name);
        }
    } else {
        bookmarksElement.innerHTML = '<i>No tab groups found in window.</i>';
    }
};

const onPlay = e => {};

const onDelete = e => {};

const setBookmarkAttributes =  () => {};

document.addEventListener("DOMContentLoaded", async () => {

    // const urls = getURLsInCurrentGroup();
    let groupId = await getCurrentTabsGroupId();

    const names = await getNamesInCurrentGroup(groupId);
    
    if (names.length > 0) {
        // view bookmarks
        viewBookmarks(names);

    } else {
        const container = document.getElementsByClassName("container")[0];

        container.innerHTML = '<div class="title">This is not a youtube video page.</div>';
    
    }
});
