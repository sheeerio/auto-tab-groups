import { getCurrentTabsGroupId, getAllTabGroupIds, getURLsInCurrentGroup, getNamesInCurrentGroup, getCurrentTabsGroupTitle } from "./utils.js";


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
