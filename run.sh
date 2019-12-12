#!/bin/bash


CMDS="deploy todo_completed todo_uncompleted todo_created get_item todo_description todo_content"

if [[ ! $CMDS =~ (^|[[:space:]])$1($|[[:space:]]) ]]; then
    echo "Must especify deploy, todo_completed, todo_uncompleted, todo_created, get_item, todo_description or todo_content"
    exit 1
fi

if [ "$1" = 'deploy' ]; then
    serverless deploy

elif [ "$1" = 'todo_completed' ]; then
    serverless invoke local -f hello -p ./data-test/todo_completed.json --printOutput

elif [ "$1" = 'todo_completed' ]; then
    serverless invoke local -f hello -p ./data-test/todo_completed.json --printOutput

elif [ "$1" = 'todo_uncompleted' ]; then
    serverless invoke local -f hello -p ./data-test/todo_uncompleted.json --printOutput

elif [ "$1" = 'todo_created' ]; then
    serverless invoke local -f hello -p ./data-test/todo_created.json --printOutput

elif [ "$1" = 'todo_content' ]; then
    serverless invoke local -f hello -p ./data-test/todo_content_changed.json --printOutput

elif [ "$1" = 'todo_description' ]; then
    serverless invoke local -f hello -p ./data-test/todo_description_changed.json --printOutput

elif [ "$1" = 'get_item' ]; then
    serverless invoke local -f hello -p ./data-test/get_item.json --printOutput
fi