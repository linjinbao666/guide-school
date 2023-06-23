#!/bin/bash

DIRECTORY="public/assets"

# 遍历指定目录下的所有文件夹
for folder in "$DIRECTORY"/*/; do
    folder=${folder%*/}

    # 获取data.json文件路径
    data_file="$folder/data.json"

    if [ -f "$data_file" ]; then
        images=()

        # 遍历当前文件夹中的图片文件
        for image_file in "$folder"/*; do
            if [ ! -d "$image_file" ] && [ "$image_file" != "$data_file" ]; then
                image_name=$(basename "$image_file")
                images+=("$image_name")
            fi
        done

        # 更新data.json文件中的"images"字段
        jq --argjson new_images '["'$(IFS='","'; echo "${images[*]}")'"]' \
            '.images = $new_images' "$data_file" > tmp_file && mv tmp_file "$data_file"

        echo "已更新文件夹 ${folder##*/} 的data.json"
    fi
done
