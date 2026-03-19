#!/bin/bash

# 十八格子影视官网部署脚本
# 使用方法：bash deploy.sh [选项]

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 函数：打印带颜色的消息
print_message() {
    echo -e "${2}${1}${NC}"
}

# 函数：检查命令是否存在
check_command() {
    if ! command -v $1 &> /dev/null; then
        print_message "错误：未找到 $1 命令" $RED
        exit 1
    fi
}

# 函数：创建目录结构
create_structure() {
    print_message "创建网站目录结构..." $BLUE
    
    # 检查必要目录
    if [ ! -d "css" ]; then
        mkdir -p css
        print_message "创建 css 目录" $GREEN
    fi
    
    if [ ! -d "js" ]; then
        mkdir -p js
        print_message "创建 js 目录" $GREEN
    fi
    
    if [ ! -d "images" ]; then
        mkdir -p images
        print_message "创建 images 目录" $GREEN
        print_message "提示：请将公司图片放入 images 目录" $YELLOW
    fi
    
    if [ ! -d "uploads" ]; then
        mkdir -p uploads
        print_message "创建 uploads 目录" $GREEN
    fi
}

# 函数：检查文件完整性
check_files() {
    print_message "检查必要文件..." $BLUE
    
    local required_files=("index.html" "css/style.css" "js/script.js")
    local missing_files=()
    
    for file in "${required_files[@]}"; do
        if [ ! -f "$file" ]; then
            missing_files+=("$file")
        fi
    done
    
    if [ ${#missing_files[@]} -eq 0 ]; then
        print_message "所有必要文件都存在" $GREEN
    else
        print_message "缺少以下文件：" $RED
        for file in "${missing_files[@]}"; do
            print_message "  - $file" $RED
        done
        exit 1
    fi
}

# 函数：启动本地服务器
start_local_server() {
    local port=${1:-8000}
    
    print_message "在端口 $port 启动本地服务器..." $BLUE
    print_message "访问地址：http://localhost:$port" $GREEN
    print_message "按 Ctrl+C 停止服务器" $YELLOW
    
    # 尝试不同的服务器命令
    if command -v python3 &> /dev/null; then
        python3 -m http.server $port
    elif command -v python &> /dev/null; then
        python -m SimpleHTTPServer $port
    elif command -v php &> /dev/null; then
        php -S localhost:$port
    elif command -v node &> /dev/null; then
        npx serve . -l $port
    else
        print_message "错误：未找到可用的服务器命令" $RED
        print_message "请安装 Python、PHP 或 Node.js" $YELLOW
        exit 1
    fi
}

# 函数：压缩网站文件
compress_site() {
    local output_file="十八格子影视官网_$(date +%Y%m%d_%H%M%S).zip"
    
    print_message "压缩网站文件为 $output_file ..." $BLUE
    
    # 排除不必要的文件
    zip -r $output_file . \
        -x "*.git*" \
        -x "*.DS_Store" \
        -x "deploy.sh" \
        -x "*.zip" \
        -x "*.bak" \
        -x "node_modules/*" \
        -x ".vscode/*"
    
    if [ $? -eq 0 ]; then
        print_message "压缩完成：$output_file" $GREEN
        print_message "文件大小：$(du -h $output_file | cut -f1)" $GREEN
    else
        print_message "压缩失败" $RED
        exit 1
    fi
}

# 函数：显示帮助信息
show_help() {
    echo "十八格子影视官网部署脚本"
    echo ""
    echo "使用方法：bash deploy.sh [选项]"
    echo ""
    echo "选项："
    echo "  setup       创建目录结构"
    echo "  check       检查文件完整性"
    echo "  serve [端口] 启动本地服务器（默认8000）"
    echo "  compress    压缩网站文件"
    echo "  all         执行所有步骤"
    echo "  help        显示此帮助信息"
    echo ""
    echo "示例："
    echo "  bash deploy.sh setup"
    echo "  bash deploy.sh serve 8080"
    echo "  bash deploy.sh all"
}

# 主函数
main() {
    case $1 in
        "setup")
            create_structure
            ;;
        "check")
            check_files
            ;;
        "serve")
            start_local_server $2
            ;;
        "compress")
            compress_site
            ;;
        "all")
            print_message "执行所有部署步骤..." $BLUE
            create_structure
            check_files
            compress_site
            print_message "所有步骤完成！" $GREEN
            print_message "下一步："
            print_message "1. 将压缩包上传到服务器" $YELLOW
            print_message "2. 解压到网站根目录" $YELLOW
            print_message "3. 配置域名和SSL证书" $YELLOW
            ;;
        "help"|"-h"|"--help")
            show_help
            ;;
        *)
            print_message "错误：未知选项 '$1'" $RED
            echo ""
            show_help
            exit 1
            ;;
    esac
}

# 执行主函数
main "$@"