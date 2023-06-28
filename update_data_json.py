import os
import json

# 遍历每个文件夹
for folder_name in os.listdir("public/assets"):
    folder_path = os.path.join("public/assets", folder_name)
    if os.path.isdir(folder_path):
        data_file = os.path.join(folder_path, "data.json")
        if os.path.isfile(data_file):
            with open(data_file, "r+", encoding="utf-8") as f:
                data = json.load(f)

                # 处理文字.txt文件
                text_file = os.path.join(folder_path, "文字.txt")
                if os.path.isfile(text_file):
                    with open(text_file, "r", encoding="utf-8") as text_f:
                        text_content = text_f.read().strip()
                        data["text"] = text_content

                # 处理音频文件
                audio_files = [f for f in os.listdir(folder_path) if f.endswith(".mp3")]
                if audio_files:
                    data["audio"] = os.path.join("/assets", folder_name, audio_files[0])

                # 处理视频文件
                video_files = [f for f in os.listdir(folder_path) if f.endswith(".mp4")]
                if video_files:
                    data["video"] = os.path.join("/assets", folder_name, video_files[0])

                # 更新data.json文件
                f.seek(0)
                json.dump(data, f, indent=4, ensure_ascii=False)
                f.truncate()

print("资源信息更新完成！")
