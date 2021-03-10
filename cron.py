import os
import time
from slack_webhook import Slack
from dotenv import load_dotenv

from pathlib import Path

env_path = Path(".") / ".env"
load_dotenv(dotenv_path=env_path)

slack = Slack(url=os.getenv("NOTIFICATION_SLACK"))


while True:
    os.system("node product_scraper.js")
    slack.post(text="Ran scrapper...")
    time.sleep(20)