#!/bin/bash

# Execute your script 10 times concurrently
for i in {1..100}; do
    ./test.sh &  # Execute your script in the background
done

# Wait for all background processes to finish
wait