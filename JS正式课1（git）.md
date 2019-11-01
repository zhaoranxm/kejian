[toc]

##JS正式课1（git）
### git和github
+ git：版本控制工具
	+ 需求：之前有个老项目运行还不错，但是觉得技术比较陈旧，设计的风格也比较古老，所以公司决定更新迭代，当程序员开发完成后，测试的也是没问题，但是上线的时候网站挂了，问你怎么办

      新的挂了，老的正常运行，那么就先让老版本回滚，等新版本的网站确认没问题再次上线即可

      版本的时光穿梭
+ github：网站、远程代码管理仓库，贵圈基友平台（交流、学习）
	+ 集中式  vs  分布式
     
	     - 集中式缺点：必须联网，都使用一个中央服务器，有可能会造成数据丢失
	     - 分布式：不用联网就能进行版本控制，速度快

### git
+ 设置用户名  git  config  --global user.name "zhaoran"
+ 设置邮箱   git config --global user.email "bzh2lf163@163.com"  能够收到   邮件的邮箱
+  查看设置信息 git config -l
#### 初始化版本控制状态
+ 找到要控制的文件目录，鼠标右键，找到git bash here  点击
+ 打开控制台，输入git  init
+ 版本控制都是基于.git这个隐藏文件的，如果不小心把git文件删除，那么就不能进行版本控制了
+ 查看git状态  git  status
+ git add 文件名  将工作区目录下文件放到暂存区
+ git add .   将工作区目录下所有文件放到暂存区
+ 通过Tab键补全文件名
+ 通过ll或者ls查看目录的文件或者文件的修改信息
+ 通过上下键查看刚才输入命令记录
+ 查看输入命令历史：history
+ 查看git版本：git --version
+ 查看当前目录路径：pwd
+ git  commit -m '备注'   从暂存区到版本区 （能直接识别的注释即可）
+ git commit -a -m '备注'  快速把工作的代码放到版本区（已经管理过的文件）
    注意：上面这个命令，前提条件是文件已经提交过一次才可以使用，如果是新文件则需要用git  add重新添加
+ git rm -r --cache  .   清理缓存
+ 查看每个区域的不同点
   - 工作区跟暂存区的区别
      - git diff
   - 工作区跟版本区的区别
      - git diff master
   - 暂存区跟版本区的区别
      - git diff catched

#####过滤指定文件
+ 创建一个.gitignore文件   touch  .gitignore
+ 配置过滤项：
	+ 规则：https://www.cnblogs.com/zhihang/p/10611475.html 

	+ /create.txt   过滤文件
	+ node_modeules/  过滤文件夹及文件夹里面的内容
	
+ 如果配置不起作用，可以先把之前的操作清除一下，再进行过滤操作
  清除命令    git rm -r --cache  . 
+ 警告：gitignore 的忽略规则只适用还没管理的文件，假如你有忽略规则在你添加之前被git 管理，那添加的忽略规则将无法适用已经管理的文件
+ 撤销回滚：
    git reset -- hard 版本id


####github
- 把代码放到远程托管平台

- 1、在githu上创建一个项目
- 2、绑定秘钥
      - ssh-keygen -t rsa -C "237089003@qq.com"
3、确定版本库是最新的
4、查看远程仓库：
         git remote -v  （使用git init的时候是查不出来东西的）
5、添加远程仓库：
         git remote add origin（这个名字是可以改变的）git@github.com
6、git pull  origin master （保证能够上传成功，进行远程和本地相结合）
7、git push origin master 上传（第一次会出现让输入用户名和密码）


- 方式二
1.先在远程仓库创建一个项目
2.git clone 项目的地址
3.git add . 
4.git commit -m ""
5.git push origin master

- 下载课件
git clone git@github.com:nizp/2019-10-8.git



####node
- npm 是目前世界上最大的资源管理平台
- 创建项目：npm init -y 会
- 如何下载资源：
   - npm install 资源名
       - -g 全局资源
       - -s项目依赖
    下载下来的时候会自动生成一个node_modules 的文件，文件夹中放的就是你需要的资源