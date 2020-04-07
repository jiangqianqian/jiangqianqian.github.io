# 之后用于编写上传、发布脚本的文件
# 确保脚本抛出遇到的错误
# 你写的每个脚本都应该在文件开头加上set -e,这句语句告诉 bash 如果任何语句的执行结果不是 true 则应该退出。
set -e

# 打包生成静态文件
npm run build

# 进入打包好的文件夹
cd docs/.vuepress/dist

# 创建git的本地仓库，提交修改
git init
git add -A
git commit -m 'deploy'

# 覆盖式地将本地仓库发布至github，因为发布不需要保留历史记录
# 格式为：git push -f git@github.com:'用户名'/'仓库名'.git master
# git push -f git@github.com:jiangqianqian/jiangqianqian.github.io.git master
git push -f "https://${GH_TOKEN}@${GH_REF}" master:${P_BRANCH}

cd -

rm -rf docs/.vuepress/dist
