#!/usr/bin/env python3
"""
优化视频文件用于网页背景
"""

import subprocess
import os
import sys

def optimize_video(input_path, output_path):
    """
    优化视频文件
    """
    # 检查输入文件
    if not os.path.exists(input_path):
        print(f"错误：输入文件不存在 {input_path}")
        return False
    
    print(f"优化视频: {input_path} -> {output_path}")
    
    # 优化参数
    # 1. 分辨率：保持原始或降至1080p
    # 2. 帧率：30fps
    # 3. 码率：2Mbps（对于背景视频足够）
    # 4. 关键帧间隔：减少文件大小
    # 5. 预设：使用快速编码
    
    cmd = [
        'ffmpeg',
        '-i', input_path,
        '-vf', 'scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2',
        '-c:v', 'libx264',
        '-preset', 'medium',
        '-crf', '28',  # 质量参数，28是较好的平衡点
        '-maxrate', '2M',
        '-bufsize', '4M',
        '-r', '30',  # 帧率
        '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart',
        '-an',  # 移除音频（背景视频不需要）
        '-y',  # 覆盖输出文件
        output_path
    ]
    
    try:
        print("正在优化视频，这可能需要一些时间...")
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode == 0:
            # 检查输出文件大小
            input_size = os.path.getsize(input_path) / (1024*1024)
            output_size = os.path.getsize(output_path) / (1024*1024)
            
            print(f"优化完成！")
            print(f"原始大小: {input_size:.1f} MB")
            print(f"优化后: {output_size:.1f} MB")
            print(f"压缩率: {(1 - output_size/input_size)*100:.1f}%")
            return True
        else:
            print(f"优化失败: {result.stderr}")
            return False
            
    except FileNotFoundError:
        print("错误：ffmpeg未安装。请先安装ffmpeg：brew install ffmpeg")
        return False
    except Exception as e:
        print(f"错误: {e}")
        return False

def main():
    input_video = "videos/background-video.mp4"
    output_video = "videos/background-video-optimized.mp4"
    
    # 检查是否在正确目录
    if not os.path.exists(input_video):
        print(f"请确保在项目根目录运行此脚本")
        print(f"当前目录: {os.getcwd()}")
        return
    
    if optimize_video(input_video, output_video):
        print(f"\n优化后的视频已保存为: {output_video}")
        print("请更新HTML文件中的视频路径")
    else:
        print("视频优化失败")

if __name__ == "__main__":
    main()