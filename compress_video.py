#!/usr/bin/env python3
"""
压缩视频文件用于网页背景
"""

import subprocess
import os
import sys

def compress_video(input_path, output_path, target_size_mb=10):
    """
    压缩视频到指定大小
    target_size_mb: 目标大小（MB）
    """
    if not os.path.exists(input_path):
        print(f"错误：输入文件不存在 {input_path}")
        return False
    
    input_size = os.path.getsize(input_path) / (1024*1024)
    print(f"原始视频: {input_path}")
    print(f"原始大小: {input_size:.1f} MB")
    print(f"目标大小: {target_size_mb} MB")
    
    # 计算目标比特率（粗略估算）
    # 假设视频时长60秒，音频忽略（静音）
    duration = 60  # 默认60秒，实际会检测
    target_bitrate_kbps = int((target_size_mb * 8192) / duration)  # 粗略计算
    
    # 限制比特率范围
    target_bitrate_kbps = max(500, min(target_bitrate_kbps, 2000))  # 500-2000 kbps
    
    print(f"目标比特率: {target_bitrate_kbps} kbps")
    
    # 使用ffmpeg压缩
    cmd = [
        'ffmpeg',
        '-i', input_path,
        '-vf', 'scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2',
        '-c:v', 'libx264',
        '-preset', 'medium',
        '-crf', '28',  # 质量参数
        '-maxrate', f'{target_bitrate_kbps}k',
        '-bufsize', f'{target_bitrate_kbps*2}k',
        '-r', '24',  # 帧率24fps
        '-pix_fmt', 'yuv420p',
        '-an',  # 移除音频
        '-movflags', '+faststart',
        '-y',  # 覆盖输出
        output_path
    ]
    
    try:
        print("正在压缩视频，这可能需要一些时间...")
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode == 0:
            output_size = os.path.getsize(output_path) / (1024*1024)
            print(f"\n✅ 压缩完成！")
            print(f"输出文件: {output_path}")
            print(f"输出大小: {output_size:.1f} MB")
            print(f"压缩率: {(1 - output_size/input_size)*100:.1f}%")
            return True
        else:
            print(f"❌ 压缩失败")
            print(f"错误: {result.stderr[:500]}...")
            return False
            
    except FileNotFoundError:
        print("❌ 错误：ffmpeg未安装")
        print("请安装ffmpeg: brew install ffmpeg")
        return False
    except Exception as e:
        print(f"❌ 错误: {e}")
        return False

def create_short_version(input_path, output_path, duration_seconds=15):
    """
    创建短视频版本（只取前N秒）
    """
    if not os.path.exists(input_path):
        print(f"错误：输入文件不存在 {input_path}")
        return False
    
    print(f"创建短视频版本: 前{duration_seconds}秒")
    
    cmd = [
        'ffmpeg',
        '-i', input_path,
        '-t', str(duration_seconds),  # 时长
        '-vf', 'scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2',
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '30',
        '-an',  # 移除音频
        '-movflags', '+faststart',
        '-y',
        output_path
    ]
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode == 0:
            output_size = os.path.getsize(output_path) / 1024
            print(f"✅ 短视频创建完成: {output_path}")
            print(f"大小: {output_size:.1f} KB")
            return True
        else:
            print(f"错误: {result.stderr[:500]}...")
            return False
    except Exception as e:
        print(f"错误: {e}")
        return False

def main():
    # 源视频文件
    source_video = "/Users/yingshi/Desktop/2026年水马青年路.mp4"
    
    if not os.path.exists(source_video):
        print(f"源视频不存在: {source_video}")
        print("请确保视频文件在桌面上")
        return
    
    # 创建输出目录
    os.makedirs("videos", exist_ok=True)
    
    print("=== 视频压缩选项 ===")
    print("1. 完整压缩（保持完整时长，高质量）")
    print("2. 短视频版本（15秒，文件更小）")
    print("3. 两者都创建")
    
    choice = input("请选择 (1/2/3): ").strip()
    
    success = False
    
    if choice in ['1', '3']:
        output_full = "videos/water-horse-compressed.mp4"
        print(f"\n=== 完整压缩 ===")
        success = compress_video(source_video, output_full, target_size_mb=15) or success
    
    if choice in ['2', '3']:
        output_short = "videos/water-horse-short.mp4"
        print(f"\n=== 短视频版本 ===")
        success = create_short_version(source_video, output_short, 15) or success
    
    if success:
        print("\n✅ 操作完成！")
        print("请更新HTML中的视频路径")
    else:
        print("\n❌ 操作失败")

if __name__ == "__main__":
    main()