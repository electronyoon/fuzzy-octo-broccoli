#!/bin/bash

# Replace these variables with your actual values
export ACCESS_TOKEN=$(gcloud auth application-default print-access-token)
PROJECT="broccoli-pubsub-project"
TOPIC="broccoli-topic"

# Get a random JSON file from the directory (macOS alternative)
JSON_FILE=$(ls *.json | awk 'BEGIN {srand()} {print rand() "\t" $0}' | sort -n | cut -f2- | head -n 1)

# Check if a JSON file was found
if [ -z "$JSON_FILE" ]; then
    echo "No JSON file found in the directory."
    exit 1
fi

# Read the entire contents of the randomly selected JSON file into a variable
JSON_CONTENTS=$(<"$JSON_FILE")

# Encode the JSON contents to base64
BASE64_ENCODED=$(echo -n "$JSON_CONTENTS" | base64)

# Create a temporary file with the base64-encoded data
echo "{\"messages\": [{\"data\": \"$BASE64_ENCODED\"}]}" > /tmp/data

# Sending POST request using ab
ab -n 10 -c 10 -T 'application/json' -p /tmp/data -H "Authorization: Bearer $ACCESS_TOKEN" "https://pubsub.googleapis.com/v1/projects/$PROJECT/topics/$TOPIC:publish"
