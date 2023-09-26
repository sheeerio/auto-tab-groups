async function getAllTabGroupIds() {
  let browserTabGroupObject = await chrome.tabGroups.query({});
  let browserTabGroupIds = browserTabGroupObject.map((tabGroup) => tabGroup.id);
  return browserTabGroupIds;
}

async function getCurrentTabsGroupId() {
  let currentTab = await chrome.tabs.query({active: true, lastFocusedWindow: true});
  return currentTab[0].groupId;
}  

async function getURLsInCurrentGroup(groupId) {
  allTabs = await chrome.tabs.query({});

  const URLsInCurrentGroup = allTabs
    .filter((tab) => tab.groupId === groupId)
    .map((tab) => tab.url);

  return URLsInCurrentGroup;
}

async function getNamesInCurrentGroup(groupId) {
  allTabs = await chrome.tabs.query({});

  const NamesInCurrentGroup = allTabs
    .filter((tab) => tab.groupId === groupId)
    .map((tab) => tab.title);

  return NamesInCurrentGroup;
}


chrome.tabs.onActivated.addListener(async(tabId, tab) => {

  let allGroupIds = await getAllTabGroupIds();

  let currentTabsGroupId = await getCurrentTabsGroupId();

  let tabURLsInCurrentGroup = await getURLsInCurrentGroup(currentTabsGroupId);

  let tabNamesInCurrentGroup = await getNamesInCurrentGroup(currentTabsGroupId);
});