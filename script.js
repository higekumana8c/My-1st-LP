// スムーズスクロール機能
document.addEventListener('DOMContentLoaded', function() {
    // ナビゲーションリンクのスムーズスクロール
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
            }
        });
    });

    // ヘッダーのスクロール効果
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 下にスクロール時
            header.style.transform = 'translateY(-100%)';
        } else {
            // 上にスクロール時
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Xポスト表示機能
    loadTwitterPosts();
});

// Xポスト表示機能（模擬データを使用）
function loadTwitterPosts() {
    const twitterFeed = document.getElementById('twitter-feed');
    
    // 実際のX APIは認証が必要なため、模擬データを使用
    const mockTweets = [
        {
            id: 1,
            username: 'BeardBear',
            handle: '@VoxelMotors',
            content: '今朝は霧が深くて、山々が雲海に浮かんでいるように見えました。高知の山奥の朝は本当に美しいです。子どもたちも窓から見える景色に大興奮でした！ #田舎暮らし #高知 #自然',
            timestamp: '2時間前',
            likes: 24,
            retweets: 8
        },
        {
            id: 2,
            username: 'BeardBear',
            handle: '@VoxelMotors',
            content: '家庭菜園で育てたトマトが真っ赤に熟しました🍅 都会では味わえない、太陽をたっぷり浴びた野菜の味は格別です。今夜は家族でトマトパスタを作る予定です。',
            timestamp: '1日前',
            likes: 42,
            retweets: 15
        },
        {
            id: 3,
            username: 'BeardBear',
            handle: '@VoxelMotors',
            content: '地域の夏祭りに参加してきました。都会とは違う、温かいコミュニティの繋がりを感じます。子どもたちも地元の子どもたちとすっかり仲良しに。移住して本当に良かった。',
            timestamp: '3日前',
            likes: 67,
            retweets: 23
        },
        {
            id: 4,
            username: 'BeardBear',
            handle: '@VoxelMotors',
            content: '早朝の散歩で野生のシカに遭遇！子どもたちは大興奮でした。自然と共に暮らすということを、日々実感しています。都会では絶対に体験できない貴重な時間です。',
            timestamp: '5日前',
            likes: 89,
            retweets: 31
        }
    ];

    // ローディング表示を削除
    setTimeout(() => {
        twitterFeed.innerHTML = '';
        
        mockTweets.forEach(tweet => {
            const tweetElement = createTweetElement(tweet);
            twitterFeed.appendChild(tweetElement);
        });

        // 実際のXアカウントへのリンクを追加
        const morePostsLink = document.createElement('div');
        morePostsLink.className = 'more-posts';
        morePostsLink.innerHTML = `
            <a href="https://x.com/VoxelMotors" target="_blank" class="more-posts-link">
                <i class="fab fa-x-twitter"></i>
                Xで更多くの投稿を見る
            </a>
        `;
        twitterFeed.appendChild(morePostsLink);
        
    }, 1500); // 1.5秒後にロード完了
}

// ツイート要素を作成する関数
function createTweetElement(tweet) {
    const tweetDiv = document.createElement('div');
    tweetDiv.className = 'tweet';
    
    tweetDiv.innerHTML = `
        <div class="tweet-header">
            <div class="tweet-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="tweet-info">
                <h4>${tweet.username}</h4>
                <span>${tweet.handle}</span>
            </div>
        </div>
        <div class="tweet-content">
            ${tweet.content}
        </div>
        <div class="tweet-stats">
            <span class="tweet-date">${tweet.timestamp}</span>
            <div class="tweet-actions">
                <span><i class="fas fa-heart"></i> ${tweet.likes}</span>
                <span><i class="fas fa-retweet"></i> ${tweet.retweets}</span>
            </div>
        </div>
    `;
    
    return tweetDiv;
}

// ページ読み込み時のアニメーション
window.addEventListener('load', function() {
    // フェードインアニメーション
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// お問い合わせリンクのクリック追跡（分析用）
document.addEventListener('click', function(e) {
    if (e.target.closest('.contact-link')) {
        console.log('Contact link clicked:', e.target.closest('.contact-link').href);
        // ここで分析ツールにイベントを送信することができます
    }
});

// レスポンシブメニュー（モバイル対応）
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('mobile-active');
}

// モバイルメニューボタンを動的に追加
document.addEventListener('DOMContentLoaded', function() {
    const headerContent = document.querySelector('.header-content');
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'mobile-menu-button';
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuButton.onclick = toggleMobileMenu;
    
    // モバイルサイズでのみ表示
    if (window.innerWidth <= 768) {
        headerContent.appendChild(mobileMenuButton);
    }
    
    // ウィンドウリサイズ時の処理
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            const mobileButton = document.querySelector('.mobile-menu-button');
            if (mobileButton) {
                mobileButton.remove();
            }
            document.querySelector('.nav').classList.remove('mobile-active');
        } else if (!document.querySelector('.mobile-menu-button')) {
            headerContent.appendChild(mobileMenuButton);
        }
    });
});
