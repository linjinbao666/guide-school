#!/bin/bash

# 执行 npm run build
npm run build

cp -r build dist

# 打包 build 目录为 tar.gz 文件
tar -czf dist.tar.gz dist

rm -rf dist
