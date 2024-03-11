import json
import os

# Read JSON data from file
with open('test.json', 'r') as file:
    json_data = json.load(file)

# Loop through each element and save to individual files
for element in json_data:
    author = element.get('author')
    if author:
        filename = f"{author}.json"
        with open(filename, 'w') as author_file:
            json.dump(element, author_file)
