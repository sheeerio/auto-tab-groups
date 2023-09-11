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


chrome.tabs.onActivated.addListener(async(tabId, tab) => {

  let allGroupIds = await getAllTabGroupIds();
  console.log("All Tab Group IDs:", allGroupIds);

  let currentTabsGroupId = await getCurrentTabsGroupId();
  console.log("Current Tab's Group ID:", currentTabsGroupId);

  let tabIdsInCurrentGroup = await getURLsInCurrentGroup(currentTabsGroupId);
  console.log("Tab IDs in Current Group:", tabIdsInCurrentGroup);

});