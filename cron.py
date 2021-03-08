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