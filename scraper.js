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
