// import { getURLsInCurrentGroup } from "./utils.js";

async function getCurrentTabsGroupId() {
    let currentTab = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    return currentTab[0].groupId;
}

async function getAllTabGroupIds() {
    let browserTabGroupObject = await chrome.tabGroups.query({});
    let browserTabGroupIds = browserTabGroupObject.map((tabGroup) => tabGroup.id);
    return browserTabGroupIds;
}

async function getURLsInCurrentGroup(groupId) {
    let allTabs = await chrome.tabs.query({});
  
    const URLsInCurrentGroup = allTabs
      .filter((tab) => tab.groupId === groupId)
      .map((tab) => tab.url);
  
    return URLsInCurrentGroup;
}

async function getCurrentTabsGroupTitle(groupId) {
    let browserTabGroupObject = await chrome.tabGroups.query({});
    let currentTabGroupTitle = browserTabGroupObject
        .filter((tabGroup) => tabGroup.id === groupId)
        .map((tabGroup) => tabGroup.title);
    
    return currentTabGroupTitle[0];
}

async function getNamesInCurrentGroup(groupId) {
    let allTabs = await chrome.tabs.query({});
  
    const NamesInCurrentGroup = allTabs
      .filter((tab) => tab.groupId === groupId)
      .map((tab) => tab.title);
  
    return NamesInCurrentGroup;
}

const addNewTab = (tabsElement, name, idx) => {

    tabsElement.innerHTML += 
    '<input type="checkbox" id="website'+idx+'" name="website'+idx+'" value="'+name+'">\
    <label for="website'+idx+'">'+name+'</label><br>';
};

const viewTabs = async(currentNames = [], groupId) => {
    const bookmarksElement = document.getElementsByClassName("bookmarks")[0];
    console.log("we have the current names");
    
    if (currentNames.length > 0) {
        let tabGroupTitle = await getCurrentTabsGroupTitle(groupId);

        bookmarksElement.innerHTML = '<h2>'+tabGroupTitle+'<h2>';
        bookmarksElement.innerHTML += '<form action="/action_page.php">';
        for (let i = 0; i<currentNames.length; i++) {
            const name = currentNames[i];
            addNewTab(bookmarksElement, name, i);
        }
        bookmarksElement.innerHTML += '<input type="submit" value="Share!"><br></form>';
    } else {
        bookmarksElement.innerHTML = '<i>No tab groups found in window.</i>';
    }
};

const onPlay = e => {};

const onDelete = e => {};

const setBookmarkAttributes =  () => {};

document.addEventListener("DOMContentLoaded", async () => {

    // const urls = getURLsInCurrentGroup();
    const container = document.getElementsByClassName("container")[0];
    
    let tabgroups = await getAllTabGroupIds();
    if (tabgroups.length > 0) {
        let groupId = await getCurrentTabsGroupId();
        let names = await getNamesInCurrentGroup(groupId);
        let urls = await getURLsInCurrentGroup(groupId);
        // view bookmarks
        if (tabgroups.includes(groupId)) {
            viewTabs(names, groupId);
        } else {
            container.innerHTML = '<div class="title">Current tab is not in a group.</div>';
        }

    } else {
        container.innerHTML = '<div class="title">No tab groups in window found.</div>';
    }
});
