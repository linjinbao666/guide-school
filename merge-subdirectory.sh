#!/bin/bash

# 遍历一级目录
for directory in */; do
    if [ -d "$directory" ]; then
        echo "处理目录: $directory"
        # 进入一级目录
        cd "$directory"

        # 遍历二级目录
        for subdirectory in */; do
            if [ -d "$subdirectory" ]; then
                echo "处理二级目录: $subdirectory"
                # 移动二级目录中的文件到二级目录下
                find "$subdirectory" -mindepth 1 -exec mv -t . {} +
                # 删除二级目录
                rm -r "$subdirectory"
            fi
        done

        # 返回上一级目录
        cd ..
    fi
done

echo "处理完成！"

