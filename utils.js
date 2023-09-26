export async function getCurrentTabsGroupId() {
    let currentTab = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    return currentTab[0].groupId;
}

export async function getAllTabGroupIds() {
    let browserTabGroupObject = await chrome.tabGroups.query({});
    let browserTabGroupIds = browserTabGroupObject.map((tabGroup) => tabGroup.id);
    return browserTabGroupIds;
}

export async function getURLsInCurrentGroup(groupId) {
    let allTabs = await chrome.tabs.query({});
  
    const URLsInCurrentGroup = allTabs
      .filter((tab) => tab.groupId === groupId)
      .map((tab) => tab.url);
  
    return URLsInCurrentGroup;
}

export async function getCurrentTabsGroupTitle(groupId) {
    let browserTabGroupObject = await chrome.tabGroups.query({});
    let currentTabGroupTitle = browserTabGroupObject
        .filter((tabGroup) => tabGroup.id === groupId)
        .map((tabGroup) => tabGroup.title);
    
    return currentTabGroupTitle[0];
}

export async function getNamesInCurrentGroup(groupId) {
    let allTabs = await chrome.tabs.query({});
  
    const NamesInCurrentGroup = allTabs
      .filter((tab) => tab.groupId === groupId)
      .map((tab) => tab.title);
  
    return NamesInCurrentGroup;
}