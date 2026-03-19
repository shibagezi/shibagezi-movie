// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 水马青年路背景初始化
    const waterHorseBg = document.querySelector('.water-horse-background');
    
    if (waterHorseBg) {
        // 可以在这里添加交互效果
        // 例如：鼠标移动时背景微动
        waterHorseBg.addEventListener('mousemove', function(e) {
            const x = (e.clientX / window.innerWidth) * 10;
            const y = (e.clientY / window.innerHeight) * 10;
            
            const waterFlow = this.querySelector('.water-flow');
            const horseSilhouette = this.querySelector('.horse-silhouette');
            
            if (waterFlow) {
                waterFlow.style.transform = `translate(${x}px, ${y}px)`;
            }
            if (horseSilhouette) {
                horseSilhouette.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
            }
        });
        
        // 鼠标离开时恢复
        waterHorseBg.addEventListener('mouseleave', function() {
            const waterFlow = this.querySelector('.water-flow');
            const horseSilhouette = this.querySelector('.horse-silhouette');
            
            if (waterFlow) {
                waterFlow.style.transform = 'translate(0, 0)';
                waterFlow.style.transition = 'transform 1s ease';
            }
            if (horseSilhouette) {
                horseSilhouette.style.transform = 'translate(0, 0)';
                horseSilhouette.style.transition = 'transform 1s ease';
            }
        });
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
});