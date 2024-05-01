#!/usr/bin/env python3
import sys
import json
from pathlib import Path
import re

def convert(file_path):
    file = open(file_path, 'r', encoding='utf-8')
    file_contents = file.read()
    dict = []
    # English files.
    # pattern = re.compile("^([a-zA-Z\d]+)			(.+)$")
    # Danish file.
    # pattern = re.compile("^([a-zA-ZÆæØøÅå\d]+)	/(.+)/	wiki$")
    # German file.
    pattern = re.compile("^([a-zA-ZäöüßÄÖÜ\d]+)	/(.+)/	wiki$")

    for line in file_contents.splitlines():
        parts = pattern.match(line)

        if not parts:
            continue

        dict.append({'original': parts.group(1), 'ipa': parts.group(2)})

    return {'dict': dict}


textFilePath = sys.argv[1]

converted = convert(textFilePath)

fileName = Path(textFilePath).stem
fileName = fileName.split('.')[0]

with open("src/data/" + fileName + ".json", "w") as outfile:
    json.dump(converted, outfile)

green_color = "\033[1;32;48m"
print(green_color + "Successfully converted the data to JSON 🎉")
