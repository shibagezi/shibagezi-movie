#!/bin/bash

# 十八格子影视官网 - 使用域名启动
# 启动后可通过 www.shibageziyingshi.com:9999 访问

echo "========================================"
echo "  十八格子影视官网启动脚本"
echo "  域名：www.shibageziyingshi.com"
echo "========================================"
echo ""

# 检查Python3
if ! command -v python3 &> /dev/null; then
    echo "错误：需要Python3"
    exit 1
fi

# 杀死占用9999端口的进程
echo "清理端口9999..."
lsof -ti:9999 | xargs kill -9 2>/dev/null || true

# 启动服务器
echo "启动网站服务器..."
cd "$(dirname "$0")"
python3 -m http.server 9999 &
SERVER_PID=$!

echo "✅ 服务器启动成功！PID: $SERVER_PID"
echo ""
echo "🌐 访问方式："
echo "1. http://localhost:9999"
echo "2. http://127.0.0.1:9999"
echo ""
echo "📱 手机访问（同一WiFi）："
echo "1. 查看电脑IP：ifconfig | grep 'inet '"
echo "2. 手机访问：http://[电脑IP]:9999"
echo ""
echo "🔧 配置本地域名访问："
echo "如需使用 www.shibageziyingshi.com 访问，需要："
echo "1. 编辑 /etc/hosts 文件（需要sudo权限）"
echo "2. 添加：127.0.0.1 www.shibageziyingshi.com"
echo ""
echo "🛑 停止服务器：按 Ctrl+C"
echo ""

# 等待用户中断
wait $SERVER_PID