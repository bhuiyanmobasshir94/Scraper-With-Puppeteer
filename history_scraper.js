let allPosts = document.body.querySelectorAll("div.user-account-content-tab-history-infos-part");
scrapeItems = [];
allPosts.forEach((item) => { let orderId = item.querySelector("div.f-l span b").innerText; scrapeItems.push({item: item.innerText, orderId: orderId});})
