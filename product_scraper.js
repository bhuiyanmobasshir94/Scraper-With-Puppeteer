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
      let allPosts = document.body.querySelectorAll(
        "div.campaign-product-list-view-wrapper"
      );
      scrapeItems = [];
      allPosts.forEach((item) => {
        let postTitle = item.querySelector("div.product-content.text-center h2")
          .innerText;
        let link = item.querySelector("div.simple-product a");
        let price = item.querySelector("div.product-price span.new-price")
          .innerText;
        let postDescription = "";
        try {
          postDescription = item.querySelector(
            "div.product-img small.out-of-stock"
          ).innerText;
        } catch (err) {}
        scrapeItems.push({
          title: postTitle,
          stock_status: postDescription,
          url: link.href,
          price: price,
        });
      });
      let items = {
        redditPosts: scrapeItems,
      };
      return items;
    });
    console.log(stock);
  });

  cluster.on("taskerror", (err, data) => {
    (async () => {
      await webhook.send({
        text: `  Error crawling ${data}: ${err.message}`,
      });
    })();
    console.log(`  Error crawling ${data}: ${err.message}`);
  });

  const csvFile = await fs.readFile(__dirname + "/pages.csv", "utf8");
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
