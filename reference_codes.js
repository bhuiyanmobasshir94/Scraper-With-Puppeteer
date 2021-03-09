// const puppeteer = require("puppeteer");

// //initiating Puppeteer
// puppeteer
//   .launch()
//   .then(async (browser) => {
//     //opening a new page and navigating to Reddit
//     const page = await browser.newPage();
//     await page.goto(
//       "https://dhamakashopping.com/campaigns/603b432e349904000715d630?page=2",
//       {
//         waitUntil: "networkidle2",
//       }
//     );
//     await page.waitForSelector("body");

//     //manipulating the page's content
//     let grabPosts = await page.evaluate(() => {
//       let allPosts = document.body.querySelectorAll(
//         "div.campaign-product-list-view-wrapper"
//       );

//       //storing the post items in an array then selecting for retrieving content
//       scrapeItems = [];
//       allPosts.forEach((item) => {
//         let postTitle = item.querySelector("div.product-content.text-center h2")
//           .innerText;
//         let link = item.querySelector("div.simple-product a");
//         let postDescription = "";
//         try {
//           postDescription = item.querySelector(
//             "div.product-img small.out-of-stock"
//           ).innerText;
//         } catch (err) {}
//         scrapeItems.push({
//           //   Item: item.innerHTML,
//           Title: postTitle,
//           Stock: postDescription,
//           Link: link.href,
//         });
//       });
//       let items = {
//         redditPosts: scrapeItems,
//       };
//       return items;
//     });
//     //outputting the scraped data
//     console.log(grabPosts);
//     //closing the browser
//     await browser.close();
//   })
//   //handling any errors
//   .catch(function (err) {
//     console.error(err);
//   });





// const puppeteer = require("puppeteer");
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(
//     "https://dhamakashopping.com/products/infinix-smart-5-64gb-rom-3gb-ram-mar21-qysfkZUjWh"
//   );

//   await page.screenshot({ path: "example.png" });

//   await browser.close();
// })();

// const puppeteer = require("puppeteer");
// puppeteer
//   .launch()
//   .then(async (browser) => {
//     const page = await browser.newPage();
//     await page.goto(
//       "https://dhamakashopping.com/products/infinix-smart-5-64gb-rom-3gb-ram-mar21-qysfkZUjWh"
//     );
//     await page.waitForSelector("body");

//     let grabPosts = await page.evaluate(() => {
//       let stock = document.body.querySelector(
//         "div.attr-wrapper div.highlighted-txt"
//       ).innerText;
//       let title = document.body.querySelector(
//         "div.product-view-single-product-area-r h3.small-title.mb-10"
//       ).innerText;
//       let price = document.body.querySelector(
//         "div.product-view-single-product-area-r-price.mb-20 span.new-price"
//       ).innerText;

//       let items = {
//         Title: title,
//         Stock: stock,
//         Price: price,
//       };
//       return items;
//     });
//     console.log(grabPosts);
//     await browser.close();
//   })
//   .catch(function (err) {
//     console.error(err);
//   });

// (async () => {
//   const cluster = await Cluster.launch({
//     concurrency: Cluster.CONCURRENCY_CONTEXT,
//     maxConcurrency: 2,
//   });
//   await cluster.task(async ({ page, data: url }) => {
//     await page.goto(url);
//     // await page.waitForSelector("body");
//     await page.evaluate(() => {
//       let stock = document.body.querySelector(
//         "div.attr-wrapper div.highlighted-txt"
//       ).innerText;
//       console.log(`Screenshot of ${url} saved: ${stock}`);
//     });

//     // const path = url.replace(/[^a-zA-Z]/g, "_") + ".png";
//     // await page.screenshot({ path });
//     // console.log(`Screenshot of ${url} saved: ${path}`);
//   });

//   //   await cluster.task(async ({ page, data: url }) => {
//   //     await page.goto(url);
//   //     let i = 1;
//   //     number = i++;
//   //     const screen = await page.screenshot({ path: `${number}.png` });
//   //     // Store screenshot, do something else
//   //     // await page.waitForSelector("body");
//   //     // await page.evaluate(() => {
//   //     //   let stock = document.body.querySelector(
//   //     //     "div.attr-wrapper div.highlighted-txt"
//   //     //   ).innerText;
//   //     //   let title = document.body.querySelector(
//   //     //     "div.product-view-single-product-area-r h3.small-title.mb-10"
//   //     //   ).innerText;
//   //     //   let price = document.body.querySelector(
//   //     //     "div.product-view-single-product-area-r-price.mb-20 span.new-price"
//   //     //   ).innerText;
//   //     //   if (stock == "Out of stock") {
//   //     //     let item = {
//   //     //       Title: title,
//   //     //       Stock: stock,
//   //     //       Price: price,
//   //     //     };
//   //     //     // Send the notification
//   //     //     (async () => {
//   //     //       await webhook.send({
//   //     //         text: "Hello",
//   //     //       });
//   //     //     })();
//   //     //   }
//   //     // });
//   //   });

//   cluster.queue(
//     "https://dhamakashopping.com/products/xiaomi-redmi-9-ram-3gb-rom32gb-mar21"
//   );
//   cluster.queue(
//     "https://dhamakashopping.com/products/xiaomi-poco-c3-ram-4gb-rom-64gb-mar21"
//   );
//   cluster.queue(
//     "https://dhamakashopping.com/products/xiaomi-poco-m2-ram-6gb-rom64gb-mar21"
//   );
//   cluster.queue(
//     "https://dhamakashopping.com/products/xiaomi-poco-m2-ram-6gb-rom-128gb-h4JJDNbMK"
//   );
//   cluster.queue(
//     "https://dhamakashopping.com/products/infinix-smart-5-64gb-rom-3gb-ram-mar21"
//   );
//   cluster.queue(
//     "https://dhamakashopping.com/products/infinix-smart-5-64gb-rom-3gb-ram-mar21-qysfkZUjWh"
//   );
//   // many more pages

//   await cluster.idle();
//   await cluster.close();
// })();

// // Send the notification
// (async () => {
// await webhook.send({
//   text: "Hello",
// });
// })();

// const { Cluster } = require('../dist');
