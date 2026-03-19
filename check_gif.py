#!/usr/bin/env python3
"""
检查GIF文件信息
"""

import os
from PIL import Image

def check_gif_info(gif_path):
    """检查GIF文件信息"""
    try:
        with Image.open(gif_path) as img:
            print(f"GIF文件: {gif_path}")
            print(f"大小: {os.path.getsize(gif_path) / (1024*1024):.1f} MB")
            print(f"尺寸: {img.size} (宽×高)")
            print(f"模式: {img.mode}")
            print(f"帧数: {getattr(img, 'n_frames', 1)}")
            
            # 如果是多帧GIF
            if hasattr(img, 'n_frames') and img.n_frames > 1:
                print(f"是否动画: 是 ({img.n_frames} 帧)")
                # 获取第一帧信息
                img.seek(0)
                print(f"第一帧格式: {img.format}")
            else:
                print("是否动画: 否")
                
    except Exception as e:
        print(f"错误: {e}")
        return False
    
    return True

def create_small_test_gif(input_path, output_path, max_size=1024):
    """创建测试用的小GIF"""
    try:
        with Image.open(input_path) as img:
            # 获取原始尺寸
            width, height = img.size
            
            # 计算新尺寸（保持比例）
            if width > height:
                new_width = min(width, max_size)
                new_height = int(height * (new_width / width))
            else:
                new_height = min(height, max_size)
                new_width = int(width * (new_height / height))
            
            print(f"原始尺寸: {width}x{height}")
            print(f"新尺寸: {new_width}x{new_height}")
            
            # 如果是动画GIF
            if hasattr(img, 'n_frames') and img.n_frames > 1:
                frames = []
                durations = []
                
                for i in range(img.n_frames):
                    img.seek(i)
                    frame = img.copy()
                    
                    # 调整大小
                    frame = frame.resize((new_width, new_height), Image.Resampling.LANCZOS)
                    
                    # 转换为RGB（如果必要）
                    if frame.mode != 'RGB':
                        frame = frame.convert('RGB')
                    
                    frames.append(frame)
                    
                    # 获取帧延迟时间
                    try:
                        duration = img.info.get('duration', 100)
                        durations.append(duration)
                    except:
                        durations.append(100)
                
                # 只取前10帧用于测试（减少文件大小）
                test_frames = frames[:10] if len(frames) > 10 else frames
                test_durations = durations[:10] if len(durations) > 10 else durations
                
                # 保存为GIF
                test_frames[0].save(
                    output_path,
                    save_all=True,
                    append_images=test_frames[1:],
                    duration=test_durations,
                    loop=0,
                    optimize=True
                )
                
                print(f"测试GIF已创建: {output_path}")
                print(f"使用帧数: {len(test_frames)}/{img.n_frames}")
                
            else:
                # 静态图片，直接调整大小
                img_resized = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                img_resized.save(output_path)
                print(f"静态图片已调整大小: {output_path}")
            
            # 检查输出文件大小
            output_size = os.path.getsize(output_path) / 1024
            print(f"输出文件大小: {output_size:.1f} KB")
            
            return True
            
    except Exception as e:
        print(f"错误: {e}")
        return False

if __name__ == "__main__":
    input_gif = "images/water-horse-bg.gif"
    output_test = "images/water-horse-test.gif"
    
    if os.path.exists(input_gif):
        print("=== GIF文件信息 ===")
        check_gif_info(input_gif)
        
        print("\n=== 创建测试GIF ===")
        create_small_test_gif(input_gif, output_test, max_size=800)
    else:
        print(f"文件不存在: {input_gif}")
        print("当前目录:", os.getcwd())