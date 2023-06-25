@echo off
setlocal

rem 遍历当前目录下的文件夹
for /D %%i in (*) do (
    rem 复制 data.json 文件到每个文件夹
    copy .\1\data.json "%%i"\data.json
)

echo 复制完成。

endlocal
