import os
import time
from slack_webhook import Slack

slack = Slack(
    url="https://hooks.slack.com/services/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"
)


while True:
    os.system("node scraper.js")
    slack.post(text="Ran scrapper...")
    time.sleep(10)