async function getAllTabGroupIdsInList() {
  let browserTabGroupObject = await chrome.tabGroups.query({});
  let browserTabGroupIds = [];
  if (Object.keys(browserTabGroupObject).length !== 0) {
    for (let i=0; i<browserTabGroupObject.length; i++) {
      browserTabGroupIds.push(browserTabGroupObject[i].id);
    }
  }
  return browserTabGroupIds;
}

chrome.tabs.onActivated.addListener(async(tabId, tab) => {

  console.log(getAllTabGroupIdsInList());
  currentGroupIds = getAllTabGroupIdsInList();
  // for (let i=0; i<currentGroupIds.length; i++) {
  //   if (tab.groupId==currentGroupIds[i]) {
  //     currentTabsGroupId.push(currentGroupIds[i]);
  //     break;
  //   }
  // }

  let currentTabsGroupId = [];
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    currentTabsGroupId.push(tabs[0].groupId);
    console.log(currentTabsGroupId);
  });
  
  
  // now go through all opened tabs that are loaded to check which ones 
  // are in the currentTab's Group and add their (tabIds) to the list of 
  // currentTab's Group's Tabs
  let tabIdsInCurrentGroup = [];

  let browserTabs = await chrome.tabs.query({});

  for (let i=0; i<browserTabs.length; i++) {
    // browser's i-th tab's groupId matches the current tab's GroupId
    if (browserTabs[i].groupId == currentTabsGroupId[0]) {
      tabIdsInCurrentGroup.push(browserTabs[i].id);
    }
  }

  console.log(tabIdsInCurrentGroup.length);

});