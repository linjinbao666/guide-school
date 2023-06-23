import os
import json

directory = "public/assets"

# 遍历指定目录下的所有文件夹
for folder in os.listdir(directory):
    folder_path = os.path.join(directory, folder)
    if os.path.isdir(folder_path):
        # 获取data.json文件路径
        data_file = os.path.join(folder_path, "data.json")

        if os.path.isfile(data_file):
            images = []

            # 遍历当前文件夹中的图片文件
            for image_file in os.listdir(folder_path):
                if os.path.isfile(os.path.join(folder_path, image_file)) and image_file != "data.json":
                    # 添加前缀
                    image_name = f"/assets/{folder}/{image_file}"
                    images.append(image_name)

            # 读取原始data.json内容
            with open(data_file, "r") as file:
                data = json.load(file)

            # 更新data.json文件中的"images"字段
            data["images"] = images

            # 将更新后的内容写入data.json文件
            with open(data_file, "w") as file:
                json.dump(data, file, indent=4, ensure_ascii=False)

            print(f"已更新文件夹 {folder} 的data.json")
