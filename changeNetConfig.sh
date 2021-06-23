filename="localsetting.json"
read -p "Version tag name": branchName
echo "$branchName."
tagName="dwc_"
branch3="branch3"
branch2="branch2"
branch1="branch1"
master="master"
if [ "$branchName" = "" ]; then
branchName=`git symbolic-ref --short -q HEAD`
echo "Input branch name is empty.Current branch name is ${branchName}"
if [ "$branchName" = "$branch2" ]; then
branchName="v2.5"
elif [ "$branchName" = "$branch3" ]; then
branchName="v2.5"
elif [ "$branchName" = "$branch1" ]; then
branchName="v2.0"
elif [ "$branchName" = "$master" ]; then
branchName="v1.0"
fi
fi
tagName="$tagName$branchName"
echo "Will use this label:${tagName}"
str="{\"cfgurl\": \"http://192.168.20.19\", \"logenable\": true,\"producttag\": \"${tagName}\"}"
if [ ! -d "./assets/config/" ];then
mkdir ./assets/config/
else
echo "文件夹已经存在"
fi
cd assets/config/
if [ ! -f "$filename" ]; then
touch localsetting.json
fi
echo "${str}" > localsetting.json;
echo "success!!"
echo 按任意键继续
read -n 1
