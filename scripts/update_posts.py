"""Refresh the embedded X posts on the homepage with the latest ones."""

import re
import subprocess
from pathlib import Path

HANDLE = "Dereck_Piche"
LIMIT = 5
PAGE = Path(__file__).resolve().parent.parent / "index.html"
START, END = "<!-- posts:start -->", "<!-- posts:end -->"
READER = f"https://r.jina.ai/https://x.com/{HANDLE}"
EMBED = (
    '<blockquote class="twitter-tweet" data-dnt="true"'
    ' data-conversation="none"><a href="https://twitter.com/{handle}/status/'
    '{id}">Post on X</a></blockquote>'
)


def latest_ids():
    """Return the newest post ids on the profile, newest first."""
    headers = ["-H", "X-With-Links-Summary: true"]
    command = ["curl", "-sfS", "--max-time", "90", *headers, READER]
    result = subprocess.run(command, capture_output=True, text=True)
    ids = set(re.findall(rf"{HANDLE}/status/(\d+)", result.stdout))
    return sorted(ids, key=int, reverse=True)[:LIMIT]


def main():
    """Rewrite the posts block, leaving it untouched if nothing was found."""
    ids = latest_ids()
    if not ids:
        print("no posts found; page left unchanged")
        return
    page = PAGE.read_text()
    head, rest = page.split(START)
    _, tail = rest.split(END)
    posts = "\n".join(EMBED.format(handle=HANDLE, id=i) for i in ids)
    PAGE.write_text(f"{head}{START}\n{posts}\n{END}{tail}")
    print(f"embedded {len(ids)} posts: {' '.join(ids)}")


if __name__ == "__main__":
    main()
