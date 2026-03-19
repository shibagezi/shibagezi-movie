# GitHub Pages 部署指南

## 📍 最终访问网址
```
https://[你的GitHub用户名].github.io/shibageziyingshi/
```

如果配置了自定义域名：
```
https://www.shibageziyingshi.com
```

## 🚀 部署步骤

### 第一步：准备GitHub账号
1. 访问 https://github.com
2. 注册新账号（如果还没有）
3. 验证邮箱

### 第二步：创建仓库
1. 登录GitHub
2. 点击右上角 "+" → "New repository"
3. 填写：
   - Repository name: `shibageziyingshi`
   - Description: 十八格子影视官网
   - Public: ✅ 选中
   - Initialize with README: ✅ 选中
4. 点击 "Create repository"

### 第三步：上传文件
#### 方法A：网页上传（最简单）
1. 进入刚创建的仓库
2. 点击 "Add file" → "Upload files"
3. 拖拽或选择所有网站文件：
   - `index.html`
   - `css/` 文件夹
   - `js/` 文件夹
   - `CNAME` 文件
   - `.nojekyll` 文件
   - `README.md`
4. 点击 "Commit changes"

#### 方法B：使用Git命令
```bash
# 克隆仓库到本地
git clone https://github.com/[你的用户名]/shibageziyingshi.git

# 进入仓库
cd shibageziyingshi

# 复制网站文件到仓库
cp -r /Users/yingshi/.openclaw/workspace/十八格子影视官网/* .

# 提交更改
git add .
git commit -m "部署十八格子影视官网"
git push origin main
```

### 第四步：启用GitHub Pages
1. 进入仓库页面
2. 点击 "Settings"（设置）
3. 左侧菜单选择 "Pages"
4. 在 "Source" 部分：
   - Branch: `main`
   - Folder: `/ (root)`
5. 点击 "Save"
6. 等待1-2分钟，刷新页面
7. 看到绿色提示："Your site is published at https://..."

### 第五步：访问网站
1. 访问：`https://[你的用户名].github.io/shibageziyingshi/`
2. 如果显示404，等待几分钟再试

## 🌐 配置自定义域名（可选）

### 购买域名
1. 去阿里云、腾讯云等购买 `shibageziyingshi.com`
2. 价格：约50-100元/年

### 配置DNS
1. 登录域名管理后台
2. 添加DNS记录：
   - 类型：CNAME
   - 主机：www
   - 值：[你的用户名].github.io
   - TTL：自动

### 在GitHub配置
1. 回到仓库 Settings → Pages
2. 在 "Custom domain" 输入：`www.shibageziyingshi.com`
3. 勾选 "Enforce HTTPS"
4. 点击 "Save"

### 等待生效
- DNS生效：几小时到48小时
- 然后访问：`https://www.shibageziyingshi.com`

## 🔧 更新网站

### 网页更新
1. 进入仓库
2. 编辑文件
3. 提交更改
4. 自动部署（约1分钟）

### 本地更新后上传
```bash
# 进入仓库目录
cd shibageziyingshi

# 更新文件
cp -r /path/to/updated/files/* .

# 提交
git add .
git commit -m "更新网站内容"
git push
```

## 📱 测试访问

### 测试网址
1. GitHub Pages：`https://[用户名].github.io/shibageziyingshi/`
2. 自定义域名：`https://www.shibageziyingshi.com`

### 测试设备
- 电脑浏览器
- 手机浏览器
- 平板电脑

## ⚠️ 注意事项

1. **文件大小限制**：单个文件≤100MB，仓库≤1GB
2. **流量限制**：每月100GB流量（足够用）
3. **构建限制**：每月10次构建（足够用）
4. **自定义域名**：需要购买并配置DNS
5. **HTTPS**：GitHub Pages自动提供免费SSL证书

## 🆘 常见问题

### Q: 网站显示404？
A: 等待几分钟，或检查仓库名称是否正确

### Q: 样式不显示？
A: 检查CSS文件路径，确保在`css/`文件夹内

### Q: 自定义域名不生效？
A: 等待DNS生效，最长48小时

### Q: 如何更新内容？
A: 直接编辑文件并提交，自动部署

## 📞 技术支持

如有问题：
1. 查看GitHub Pages文档
2. 检查浏览器控制台错误
3. 联系GitHub支持

---

**部署时间**：约10-30分钟  
**费用**：完全免费（除非购买自定义域名）  
**访问范围**：全球可访问  
**速度**：GitHub全球CDN加速