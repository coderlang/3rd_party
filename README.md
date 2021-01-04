# 3rd_party
## 初始化submodule命令

git submodule add -b master https://github.com/coderlang/3rd_party.git 3rd_party

## 更新submodule命令

git submodule init
git submodule update
cd 3rd_party && git checkout master && git pull && cd ..