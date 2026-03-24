// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 视频调试功能
    const debugDiv = document.getElementById('videoDebug');
    const statusSpan = document.getElementById('videoStatus');
    
    // 显示调试信息（仅开发时使用）
    if (debugDiv && window.location.hostname === 'localhost') {
        debugDiv.style.display = 'block';
    }
    
    function updateVideoStatus(status) {
        if (statusSpan) {
            statusSpan.textContent = status;
            console.log('视频状态:', status);
        }
    }
    
    // 视频背景加载控制
    const videoBg = document.querySelector('.video-bg');
    
    if (videoBg) {
        // 创建加载提示
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'video-loading';
        loadingDiv.textContent = '背景视频加载中...';
        videoBg.parentElement.appendChild(loadingDiv);
        
        const loadingElement = document.querySelector('.video-loading');
        
        // 视频可以播放时
        videoBg.addEventListener('canplay', function() {
            updateVideoStatus('可以播放，正在淡入');
            this.classList.add('loaded');
            if (loadingElement) {
                loadingElement.classList.add('hidden');
                setTimeout(() => {
                    if (loadingElement.parentElement) {
                        loadingElement.parentElement.removeChild(loadingElement);
                    }
                }, 500);
            }
        });
        
        // 视频加载错误时
        videoBg.addEventListener('error', function() {
            updateVideoStatus('加载错误: ' + this.error.code);
            if (loadingElement) {
                loadingElement.textContent = '视频加载失败，使用备用背景';
                loadingElement.classList.add('hidden');
                setTimeout(() => {
                    if (loadingElement.parentElement) {
                        loadingElement.parentElement.removeChild(loadingElement);
                    }
                }, 2000);
            }
            // 显示备用CSS背景
            const cssBg = document.createElement('div');
            cssBg.className = 'css-animation-bg';
            cssBg.innerHTML = `
                <div class="grid-pattern"></div>
                <div class="light-effect"></div>
                <div class="particles"></div>
                <div class="glass-mosaic"></div>
            `;
            this.parentElement.appendChild(cssBg);
        });
        
        // 如果视频已经可以播放（缓存情况）
        if (videoBg.readyState >= 3) {
            videoBg.classList.add('loaded');
            if (loadingElement) {
                loadingElement.classList.add('hidden');
                setTimeout(() => {
                    if (loadingElement.parentElement) {
                        loadingElement.parentElement.removeChild(loadingElement);
                    }
                }, 100);
            }
        }
        
        // 添加更多事件监听
        videoBg.addEventListener('loadstart', () => updateVideoStatus('开始加载'));
        videoBg.addEventListener('progress', () => updateVideoStatus('加载中...'));
        videoBg.addEventListener('loadedmetadata', () => updateVideoStatus('元数据加载完成'));
        videoBg.addEventListener('loadeddata', () => updateVideoStatus('数据加载完成'));
        videoBg.addEventListener('waiting', () => updateVideoStatus('等待数据'));
        videoBg.addEventListener('stalled', () => updateVideoStatus('网络停滞'));
        videoBg.addEventListener('suspend', () => updateVideoStatus('暂停加载'));
        
        // 添加视频预加载优化
        updateVideoStatus('开始预加载视频');
        videoBg.load();
    }
    // 移动端菜单切换
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // 点击菜单项后关闭移动端菜单
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            navbar.style.padding = '15px 0';
        } else {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            navbar.style.padding = '20px 0';
        }
    });
    
    // 联系表单提交处理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // 这里可以添加表单验证
            if (!data.name || !data.email || !data.phone || !data.message) {
                alert('请填写所有必填字段');
                return;
            }
            
            // 模拟表单提交
            alert('感谢您的咨询！我们会尽快与您联系。');
            contactForm.reset();
            
            // 在实际应用中，这里应该发送数据到服务器
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(data)
            // })
            // .then(response => response.json())
            // .then(data => {
            //     alert('感谢您的咨询！我们会尽快与您联系。');
            //     contactForm.reset();
            // })
            // .catch(error => {
            //     console.error('Error:', error);
            //     alert('提交失败，请稍后重试。');
            // });
        });
    }
    
    // 滚动动画效果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .team-member');
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // 添加CSS动画类
    const style = document.createElement('style');
    style.textContent = `
        .service-card,
        .portfolio-item,
        .team-member {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-card.animate-in,
        .portfolio-item.animate-in,
        .team-member.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .service-card:nth-child(1) { transition-delay: 0.1s; }
        .service-card:nth-child(2) { transition-delay: 0.2s; }
        .service-card:nth-child(3) { transition-delay: 0.3s; }
        .service-card:nth-child(4) { transition-delay: 0.4s; }
        .service-card:nth-child(5) { transition-delay: 0.5s; }
        .service-card:nth-child(6) { transition-delay: 0.6s; }
        
        .portfolio-item:nth-child(1) { transition-delay: 0.2s; }
        .portfolio-item:nth-child(2) { transition-delay: 0.4s; }
        .portfolio-item:nth-child(3) { transition-delay: 0.6s; }
        .portfolio-item:nth-child(4) { transition-delay: 0.8s; }
        
        .team-member:nth-child(1) { transition-delay: 0.1s; }
        .team-member:nth-child(2) { transition-delay: 0.2s; }
        .team-member:nth-child(3) { transition-delay: 0.3s; }
        .team-member:nth-child(4) { transition-delay: 0.4s; }
    `;
    document.head.appendChild(style);
    
    // 页面加载后立即触发一次滚动检查
    setTimeout(() => {
        animateElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                element.classList.add('animate-in');
            }
        });
    }, 100);
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 统计数字动画
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const observerOptions = {
            threshold: 0.5
        };
        
        const numberObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target;
                    const targetNumber = parseInt(statNumber.textContent);
                    let currentNumber = 0;
                    const increment = targetNumber / 50;
                    const timer = setInterval(() => {
                        currentNumber += increment;
                        if (currentNumber >= targetNumber) {
                            currentNumber = targetNumber;
                            clearInterval(timer);
                        }
                        statNumber.textContent = Math.floor(currentNumber) + (statNumber.textContent.includes('%') ? '%' : '+');
                    }, 30);
                    
                    numberObserver.unobserve(statNumber);
                }
            });
        }, observerOptions);
        
        statNumbers.forEach(number => {
            numberObserver.observe(number);
        });
    }
    
    // 视频播放功能
    initVideoPortfolio();
});

// 视频作品展示功能
function initVideoPortfolio() {
    const videoItems = document.querySelectorAll('.video-portfolio-item');
    const videoModal = document.getElementById('videoModal');
    const modalVideoPlayer = document.getElementById('modalVideoPlayer');
    const modalCloseBtn = document.querySelector('.video-modal-close');
    const modalOverlay = document.querySelector('.video-modal-overlay');
    
    if (!videoModal || !modalVideoPlayer) return;
    
    // 为每个视频项添加点击事件
    videoItems.forEach(item => {
        item.addEventListener('click', function() {
            const videoSrc = this.getAttribute('data-video');
            
            if (videoSrc && videoSrc !== '#') {
                // 显示加载提示
                showVideoLoading();
                
                // 显示模态框
                videoModal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // 防止背景滚动
                
                // 设置视频源
                modalVideoPlayer.src = videoSrc;
                
                // 预加载视频
                modalVideoPlayer.preload = 'auto';
                
                // 监听视频可以播放事件
                modalVideoPlayer.addEventListener('canplay', function onCanPlay() {
                    // 移除监听器，避免重复触发
                    modalVideoPlayer.removeEventListener('canplay', onCanPlay);
                    
                    // 隐藏加载提示
                    hideVideoLoading();
                    
                    // 播放视频
                    modalVideoPlayer.play().catch(e => {
                        console.log('自动播放失败，需要用户交互:', e);
                        // 显示播放按钮让用户点击
                        showPlayButton();
                    });
                }, { once: true });
                
                // 设置超时，避免长时间等待
                setTimeout(() => {
                    if (modalVideoPlayer.readyState < 2) { // 还没有足够数据
                        hideVideoLoading();
                        showBufferingMessage();
                    }
                }, 5000);
                
            } else {
                alert('此视频暂未上传，敬请期待！');
            }
        });
        
        // 添加键盘导航支持
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // 设置可访问性属性
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', '播放视频');
    });
    
    // 关闭模态框功能
    function closeVideoModal() {
        // 暂停视频
        modalVideoPlayer.pause();
        modalVideoPlayer.currentTime = 0;
        modalVideoPlayer.src = '';
        
        // 隐藏模态框
        videoModal.style.display = 'none';
        document.body.style.overflow = ''; // 恢复滚动
    }
    
    // 关闭按钮点击事件
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeVideoModal);
    }
    
    // 点击遮罩层关闭
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeVideoModal);
    }
    
    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.style.display === 'block') {
            closeVideoModal();
        }
    });
    
    // 模态框内点击不关闭
    const modalContent = document.querySelector('.video-modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // 视频播放器事件处理
    modalVideoPlayer.addEventListener('ended', function() {
        // 视频播放结束后可以添加一些效果
        console.log('视频播放结束');
    });
    
    // 视频错误处理
    modalVideoPlayer.addEventListener('error', function() {
        console.error('视频播放错误:', this.error);
        alert('视频加载失败，请检查网络连接或视频文件。');
    });
    
    // 预加载第一个视频的预览
    const firstVideoItem = document.querySelector('.video-portfolio-item[data-video="videos/政府宣传片.mp4"]');
    if (firstVideoItem) {
        const previewVideo = firstVideoItem.querySelector('.preview-video');
        if (previewVideo) {
            // 设置预览视频静音播放几秒
            previewVideo.currentTime = 5; // 从第5秒开始预览
            previewVideo.play().then(() => {
                setTimeout(() => {
                    previewVideo.pause();
                    previewVideo.currentTime = 0;
                }, 3000); // 播放3秒后暂停
            }).catch(e => {
                console.log('预览视频自动播放失败:', e);
            });
        }
    }
    
    // 视频加载相关函数
    function showVideoLoading() {
        // 创建或获取加载覆盖层
        let loadingOverlay = document.getElementById('videoLoadingOverlay');
        if (!loadingOverlay) {
            loadingOverlay = document.createElement('div');
            loadingOverlay.id = 'videoLoadingOverlay';
            loadingOverlay.className = 'video-loading-overlay';
            loadingOverlay.innerHTML = `
                <div class="video-loading-spinner"></div>
                <div class="video-loading-text">视频加载中...</div>
            `;
            document.querySelector('.video-modal-content').appendChild(loadingOverlay);
        }
        loadingOverlay.classList.remove('hidden');
    }
    
    function hideVideoLoading() {
        const loadingOverlay = document.getElementById('videoLoadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
        }
    }
    
    function showBufferingMessage() {
        const loadingOverlay = document.getElementById('videoLoadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.innerHTML = `
                <div class="video-buffering-message">
                    <div class="video-loading-text">视频加载较慢，请稍候...</div>
                    <div style="font-size: 14px; opacity: 0.8; margin-top: 5px;">
                        建议：检查网络连接或使用WiFi
                    </div>
                </div>
            `;
        }
    }
    
    function showPlayButton() {
        const loadingOverlay = document.getElementById('videoLoadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.innerHTML = `
                <div class="video-buffering-message">
                    <div class="video-loading-text">点击播放按钮开始播放</div>
                    <button class="video-play-button" onclick="document.getElementById('modalVideoPlayer').play()">
                        <i class="fas fa-play" style="margin-right: 8px;"></i>播放视频
                    </button>
                </div>
            `;
        }
    }
}