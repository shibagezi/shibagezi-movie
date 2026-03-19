#!/usr/bin/env python3
"""
创建备用背景方案
"""

from PIL import Image, ImageDraw, ImageFilter
import os

def create_gradient_background():
    """创建渐变背景图片"""
    width, height = 1920, 1080
    
    # 创建新图片
    img = Image.new('RGB', (width, height), color='#0a0a2a')
    draw = ImageDraw.Draw(img)
    
    # 绘制径向渐变
    for i in range(height):
        # 计算渐变颜色
        r = int(10 + (i / height) * 20)
        g = int(10 + (i / height) * 30)
        b = int(42 + (i / height) * 40)
        color = (r, g, b)
        
        # 绘制水平线
        draw.line([(0, i), (width, i)], fill=color)
    
    # 添加光晕效果
    for _ in range(3):
        img = img.filter(ImageFilter.GaussianBlur(radius=2))
    
    # 保存图片
    output_path = "images/fallback-bg.jpg"
    img.save(output_path, "JPEG", quality=85, optimize=True)
    
    size_kb = os.path.getsize(output_path) / 1024
    print(f"✅ 创建渐变背景: {output_path}")
    print(f"大小: {size_kb:.1f} KB")
    print(f"尺寸: {width}x{height}")
    
    return output_path

def create_water_horse_text_bg():
    """创建文字水印背景"""
    width, height = 1920, 1080
    
    # 创建深色背景
    img = Image.new('RGB', (width, height), color='#1a1a3a')
    draw = ImageDraw.Draw(img)
    
    # 添加网格线
    grid_color = (255, 255, 255, 30)
    for x in range(0, width, 80):
        draw.line([(x, 0), (x, height)], fill=grid_color, width=1)
    for y in range(0, height, 80):
        draw.line([(0, y), (width, y)], fill=grid_color, width=1)
    
    # 添加文字水印
    try:
        # 尝试使用系统字体
        from PIL import ImageFont
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 120)
        
        # 绘制"水马青年路"文字
        text = "水马 · 青年路"
        text_bbox = draw.textbbox((0, 0), text, font=font)
        text_width = text_bbox[2] - text_bbox[0]
        text_height = text_bbox[3] - text_bbox[1]
        
        # 在多个位置绘制半透明文字
        positions = [
            (width//4, height//4),
            (width//2, height//3),
            (width*3//4, height//2),
            (width//3, height*2//3),
            (width*2//3, height*3//4)
        ]
        
        for pos in positions:
            draw.text(pos, text, font=font, fill=(255, 255, 255, 40))
            
    except:
        # 如果字体加载失败，使用默认字体
        print("使用默认字体")
    
    # 保存图片
    output_path = "images/water-horse-text-bg.jpg"
    img.save(output_path, "JPEG", quality=80, optimize=True, progressive=True)
    
    size_kb = os.path.getsize(output_path) / 1024
    print(f"\n✅ 创建文字背景: {output_path}")
    print(f"大小: {size_kb:.1f} KB")
    
    return output_path

def main():
    print("=== 创建备用背景方案 ===")
    
    # 创建输出目录
    os.makedirs("images", exist_ok=True)
    
    # 创建渐变背景
    bg1 = create_gradient_background()
    
    # 创建文字背景
    bg2 = create_water_horse_text_bg()
    
    print("\n✅ 备用背景创建完成！")
    print(f"1. 渐变背景: {bg1}")
    print(f"2. 文字背景: {bg2}")
    print("\n可以在HTML中使用: <img src='{路径}' class='fallback-bg'>")

if __name__ == "__main__":
    main()