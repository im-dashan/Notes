# Windows下安装和配置Git

### 一、[下载Git](https://git-scm.com/downloads)



- 选择版本，这里以Windows版本为例

![2021-07-27_201226.png](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/Git/2021-07-27_201226.png)	

- 选择操作系统位数这里以`64-bit`为例，
  - 这里推荐`标准版`，也以`标准版`为例
  - ①`标准版`、②`精简版`

![2021-07-27_201611.png](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/Git/2021-07-27_201611.png)

<br>

<br>

### 二、安装`Git`

- 选择软件安装位置后一直点击下一步就好，直到安装完成
- `Git`安装完会自动配置环境变量

<br>

<br>

### 三、`Git`配置

- 注册`GitHub`账号

- 鼠标右键选择`Git Bash`

  - ```shell
    # 配置用户名
    git config --global user.name "username"    //（ "username"是自己的账户名，）
    # 配置邮箱
    git config --global user.email "username@email.com"     //("username@email.com"注册账号时用的邮箱)
    ```

  - ```shell
    # 查看配置是否OK
    git config --global --list
    ```

  - ```shell
    # 生成ssh
    ssh-keygen -t rsa
    ```

    - 一直点击`Enter`直到`.ssh`生成完毕
    - 生成的文件在`C:\Users\用户名\.ssh`下

  - 将`.ssh`文件夹中的公钥`id_rsa.pub`添加到`GitHub`管理平台中

    - 登录`GitHub`→`Settings`→`SSH and GPG keys`→`New SSH key`
    - 用`txt`打开`id_rsa.pub`全选复制，到`New SSH key`粘贴
      - ![](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/Git/2021-09-08_200305.png)

  - ```shell
    # 测试配置是否成功
    ssh -T git@github.com
    ```

  - ```shell
    # 如果提示以下内容输入yes即可
    $ ssh -T git@github.com
    The authenticity of host 'github.com (52.74.223.119)' can't be established.
    RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.
    This key is not known by any other names
    Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
    
    # 显示以下内容
    Warning: Permanently added 'github.com' (RSA) to the list of known hosts.
    Hi Dashan-IZ! You've successfully authenticated, but GitHub does not provide shell access.
    ```

  - ```shell
    # 继续测试配置是否成功
    大山@DASHAN MINGW64 ~/Desktop
    $ ssh -T git@github.com
    # 配置Git完成
    Hi Dashan-IZ! You've successfully authenticated, but GitHub does not provide shell access.
    ```

<br>

<br>

### 四、安装`Git`图形化界面[`TortoiseGit`](https://tortoisegit.org/download/)

![](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/Git/2021-09-08_201737.png)

![](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/Git/2021-09-08_201837.png)

- 安装步骤先安装`TortoiseGit`再安装`TortoiseGit汉化包`
  - `TortoiseGit`安装除了选择安装路径其他一概默认配置，一直往下点直到安装完毕
  - `TortoiseGit汉化包`，一直往下点直到安装完毕
  - 选择中文语言
    - 鼠标右键选择`TortoiseGit(T)`→`Settings`→`简体中文`
    - ![](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/Git/2021-09-08_202955.png)

<br>

<br>

### 五、配置`TortoiseGit`

- 鼠标右键选择`TortoiseGit(T)`→`Settings`→`网络`
  - 选择`Git`安装目录下的`Git\usr\bin\ssh.exe`
  - ![](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/Git/2021-09-08_203258.png)
- 创建版本库
  - 在你想要`Git`的文件夹创建版本库，你就可以同步&拉取远程仓库的文件代码了
    - 鼠标右键→`Git在这里创建版本库(Y)`
      - 完成版本库的创建
- 鼠标右键选择`TortoiseGit(T)`→`Settings`→`Git`→`远端`
  - `URL`和`推送URL`里填写你`GitHub`的仓库`SSH`路径
  - `Putty密匙`填写`Git`生成的密匙文件`id_rsa`
    - 路径`C:\Users\用户名\.ssh\id_rsa`
  - ![](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/Git/2021-09-08_204237.png)

***这样你就可以在这个文件夹中存放需要同步和拉取的文件了***





# Git提交代码命令



```sh
# 配置 Git 用户信息
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 初始化 Git 仓库
git init

# 添加远程仓库
git remote add origin https://github.com/yourusername/your-repository.git

# 添加所有
git add .
# 添加指定文件
git add README.md

# 添加文件修改说明
git commit -m "提交文件的修改说明"

# 推送到远程仓库
git push -u origin main

# 查看现有远程仓库链接
git remote -v

# 删除名为 origin 的远程仓库链接
git remote remove origin

# 添加新的远程仓库链接
git remote add origin https://new-url.com/yourusername/your-repository.git

# 确认新的远程仓库链接已添加
git remote -v

# 将名为 origin 的远程仓库的 URL 修改为新的 URL
git remote set-url origin https://new-url.com/yourusername/your-repository.git


```

如果你想要将本地的提交推送到远程仓库的 `main` 分支（或其他分支），确保你已经在本地分支上做了一些提交。

首先，你可以执行以下命令检查本地分支：

```sh
git branch
```

然后切换到你想要推送的分支，假设是 `main` 分支：

```sh
git checkout main
```

如果当前分支是空的（即没有提交历史），你需要先进行一些提交：

```sh
git add .   # 添加所有修改
git commit -m "Initial commit"  # 提交更改
```

接着，尝试推送到远程仓库：

```sh
git push origin main
```

如果远程仓库中不存在 `main` 分支，你可以通过添加 `-u` 参数来将当前分支关联到远程仓库的 `main` 分支：

```sh
git push -u origin main
```

这样就会创建一个新的 `main` 分支，并将本地的提交推送到远程仓库中。

### 完整的删除流程示例

假设你想删除本地和远程分支 `feature-branch`：

1. 切换到 `main` 分支：

   ```
   bash
   复制代码
   git checkout main
   ```

2. 删除本地分支 `feature-branch`：

   ```
   bash
   复制代码
   git branch -d feature-branch
   ```

   如果需要强制删除：

   ```
   bash
   复制代码
   git branch -D feature-branch
   ```

3. 删除远程分支 `feature-branch`：

   ```
   bash
   复制代码
   git push origin --delete feature-branch
   ```

按照上述步骤操作，就可以成功删除本地和远程的 Git 分支。

### 示例

假设你的项目目录是 `/path/to/your/repository`，你可以使用以下命令：

```
bash复制代码cd /path/to/your/repository
rm -rf .git
ls -a  # 确认 .git 目录已删除
```

在 Windows 上：

```
powershell复制代码cd /path/to/your/repository
Remove-Item -Recurse -Force .git
dir /a  # 确认 .git 目录已删除
```

这样操作后，该目录将不再是一个 Git 仓库，你也可以重新运行 `git init` 命令来重新初始化一个新的 Git 仓库。



创建并切换到 `main` 分支可以通过以下步骤完成：

### 1. 创建并切换到 `main` 分支

如果你的仓库还没有 `main` 分支，你可以使用以下命令来创建并切换到 `main` 分支：

```
bash
复制代码
git checkout -b main
```

这将创建一个新的 `main` 分支并切换到该分支。

### 2. 推送 `main` 分支到远程仓库

如果你希望将这个新创建的 `main` 分支推送到远程仓库并设置为默认分支，可以使用以下命令：

```
bash
复制代码
git push -u origin main
```

### 3. 将远程仓库的默认分支设置为 `main`

如果你在 GitHub 或其他 Git 托管平台上想将默认分支设置为 `main`，可以按照以下步骤操作：

- **GitHub**：
  1. 登录到 GitHub 并导航到你的仓库。
  2. 点击 `Settings`。
  3. 在左侧菜单中选择 `Branches`。
  4. 在 `Default branch` 部分，选择 `main` 作为默认分支。
  5. 保存更改。
- **GitLab**：
  1. 登录到 GitLab 并导航到你的项目。
  2. 点击 `Settings` -> `Repository`。
  3. 在 `Default branch` 部分，选择 `main` 作为默认分支。
  4. 保存更改。

### 4. 删除旧的默认分支（如果需要）

如果之前有其他默认分支（比如 `master`），并且你不再需要它，可以删除该分支：

首先切换到 `main` 分支（如果还没有切换）：

```
bash
复制代码
git checkout main
```

然后删除本地的旧分支：

```
bash
复制代码
git branch -d master
```

最后，删除远程的旧分支：

```
bash
复制代码
git push origin --delete master
```

### 完整示例

以下是一个完整的例子，假设你正在创建并切换到 `main` 分支，并推送到远程仓库：

```
bash复制代码# 创建并切换到 main 分支
git checkout -b main

# 添加更改（可选）
git add .
git commit -m "Initial commit on main branch"

# 推送 main 分支到远程仓库并设置 upstream
git push -u origin main

# （在 GitHub 或其他平台上设置 main 为默认分支，具体步骤见上文）

# 删除本地的 master 分支（如果需要）
git branch -d master

# 删除远程的 master 分支（如果需要）
git push origin --delete master
```

这样，你就成功创建并切换到了 `main` 分支，并可以将其设置为默认分支。
