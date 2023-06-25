#!/bin/bash

# 遍历当前目录下的文件夹
for directory in */; do
    if [ -d "$directory" ]; then
        # 提取文件夹名中的数字部分
        new_directory=$(echo "$directory" | grep -o '^[0-9]\+')
        
        # 重命名文件夹
        mv "$directory" "$new_directory"
    fi
done

echo "重命名完成！"

