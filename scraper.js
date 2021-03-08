// const puppeteer = require("puppeteer");
const { IncomingWebhook } = require("@slack/webhook");
const { Cluster } = require("puppeteer-cluster");
const fs = require("fs").promises;
const webhookurl =
  "https://hooks.slack.com/services/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";
const webhook = new IncomingWebhook(webhookurl);

(async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 1,
    monitor: true,
  });

  await cluster.task(async ({ page, data: url }) => {
    await page.goto(url, {
      waitUntil: "networkidle2",
    });
    await page.waitForSelector("body");
    const stock = await page.evaluate(() => {
      let stock = "";
      try {
        stock = document.body.querySelector(
          "div.attr-wrapper div.highlighted-txt"
        ).innerText;
      } catch (err) {
        (async () => {
          await webhook.send({
            text: `Url: ${url}, Error: ${err}, Title: ${title}`,
          });
        })();
      }
      return stock;
    });
    const title = await page.evaluate(() => {
      let title = document.body.querySelector(
        "div.product-view-single-product-area-r h3.small-title.mb-10"
      ).innerText;
      return title;
    });
    if (stock == "Out of stock") {
    } else {
      (async () => {
        await webhook.send({
          text: `Url: ${url}, Stock: ${stock}, Title: ${title}`,
        });
      })();
    }
    console.log(`Stock status of ${title} is ${stock}`);
  });

  cluster.on("taskerror", (err, data) => {
    (async () => {
      await webhook.send({
        text: `  Error crawling ${data}: ${err.message}`,
      });
    })();
    console.log(`  Error crawling ${data}: ${err.message}`);
  });

  const csvFile = await fs.readFile(__dirname + "/urls.csv", "utf8");
  const lines = csvFile.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const splitterIndex = line.indexOf(",");
    if (splitterIndex !== -1) {
      const domain = line.substr(splitterIndex + 1);
      cluster.queue(domain);
    }
  }

  await cluster.idle();
  await cluster.close();
})();

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
