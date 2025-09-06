// DOM読み込み完了後に実行
document.addEventListener('DOMContentLoaded', function() {
    // スムーズスクロール機能
    initSmoothScroll();
    
    // ヘッダーのスクロール効果
    initHeaderScroll();
    
    // セクションのフェードインアニメーション
    initScrollAnimations();
    
    // カードのホバーエフェクト強化
    initCardEffects();
    
    // モバイルメニュー
    initMobileMenu();
});

// スムーズスクロール機能
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // モバイルメニューを閉じる
                const nav = document.querySelector('.nav');
                nav.classList.remove('mobile-active');
            }
        });
    });
}

// ヘッダーのスクロール効果
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    let ticking = false;

    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 下にスクロール時 - ヘッダーを隠す
            header.style.transform = 'translateY(-100%)';
        } else {
            // 上にスクロール時 - ヘッダーを表示
            header.style.transform = 'translateY(0)';
        }
        
        // スクロール位置に応じて背景の透明度を調整
        if (scrollTop > 50) {
            header.style.backgroundColor = 'rgba(30, 60, 114, 0.95)';
        } else {
            header.style.backgroundColor = 'rgba(30, 60, 114, 1)';
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

// スクロールアニメーション
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // アニメーション対象の要素を設定
    const animateElements = document.querySelectorAll(
        '.region-item, .attraction-card, .culture-item, .gourmet-item, .access-method, .contact-item'
    );
    
    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });

    // CSSクラスを追加
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// カードエフェクトの強化
function initCardEffects() {
    const cards = document.querySelectorAll('.attraction-card, .culture-item, .gourmet-item, .region-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// モバイルメニュー
function initMobileMenu() {
    // モバイルメニューボタンを作成
    const headerContent = document.querySelector('.header-content');
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'mobile-menu-button';
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuButton.style.display = 'none';
    
    // スタイルを追加
    const mobileStyles = document.createElement('style');
    mobileStyles.textContent = `
        .mobile-menu-button {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            display: none;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-button {
                display: block !important;
            }
            
            .header-content {
                flex-direction: row !important;
                justify-content: space-between !important;
            }
            
            .nav {
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
                flex-direction: column;
                padding: 1rem;
                gap: 1rem;
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .nav.mobile-active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
        }
    `;
    document.head.appendChild(mobileStyles);
    
    // ボタンクリックイベント
    mobileMenuButton.addEventListener('click', function() {
        const nav = document.querySelector('.nav');
        nav.classList.toggle('mobile-active');
        
        // アイコンの切り替え
        const icon = this.querySelector('i');
        if (nav.classList.contains('mobile-active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });
    
    // ウィンドウサイズに応じてボタンの表示/非表示を制御
    function checkWindowSize() {
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-menu-button')) {
                headerContent.appendChild(mobileMenuButton);
            }
        } else {
            const existingButton = document.querySelector('.mobile-menu-button');
            if (existingButton) {
                existingButton.remove();
            }
            document.querySelector('.nav').classList.remove('mobile-active');
        }
    }
    
    checkWindowSize();
    window.addEventListener('resize', checkWindowSize);
}

// パフォーマンス最適化：画像の遅延読み込み（将来の画像追加時用）
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ページトップへ戻るボタン
function initScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    
    const buttonStyles = document.createElement('style');
    buttonStyles.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #4a90e2, #1e3c72);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
        }
        
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-to-top:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(74, 144, 226, 0.4);
        }
    `;
    document.head.appendChild(buttonStyles);
    
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });
    
    document.body.appendChild(scrollButton);
}

// ページ読み込み完了後の追加初期化
window.addEventListener('load', function() {
    initLazyLoading();
    initScrollToTop();
    
    // ヒーローセクションのアニメーション
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// エラーハンドリング
window.addEventListener('error', function(e) {
    console.log('JavaScript error:', e.error);
});

// パフォーマンス監視（開発用）
if (window.performance) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page load time:', loadTime + 'ms');
        }, 0);
    });
}
