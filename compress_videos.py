import os
import subprocess

def compress_videos():
    # 获取当前目录下所有文件和文件夹的列表
    file_list = os.listdir('.')
    
    for item in file_list:
        # 检查是否是文件
        if os.path.isfile(item):
            # 检查文件是否是视频文件
            if item.endswith('.mp4') or item.endswith('.avi') or item.endswith('.mkv'):
                # 构建输出文件路径和文件名
                output_file = 'compressed_' + item
                
                # 构建FFmpeg命令
                ffmpeg_cmd = [
                    'ffmpeg', '-i', item, '-vf', 'scale=-2:720,setsar=1', '-c:v', 'libx264', '-crf', '23', '-c:a', 'aac', '-b:a', '128k', output_file
                ]
                
                # 执行FFmpeg命令
                subprocess.run(ffmpeg_cmd)
                print('已压缩文件:', item)
                
        # 检查是否是文件夹
        elif os.path.isdir(item):
            # 进入子目录
            os.chdir(item)
            # 递归调用函数，压缩子目录中的视频文件
            compress_videos()
            # 返回上一级目录
            os.chdir('..')

# 调用函数进行视频压缩
compress_videos()
