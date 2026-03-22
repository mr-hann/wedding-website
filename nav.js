 // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    mobileMenu.classList.add('hidden');
                }
            });
        });

        // RSVP form logic
        const attendanceSelect = document.getElementById('attendance');
        const guestCountDiv = document.getElementById('guestCount');
        const dietaryDiv = document.getElementById('dietaryRestrictions');
        
        attendanceSelect.addEventListener('change', function() {
            if (this.value === 'yes') {
                guestCountDiv.classList.remove('hidden');
                dietaryDiv.classList.remove('hidden');
            } else {
                guestCountDiv.classList.add('hidden');
                dietaryDiv.classList.add('hidden');
            }
        });

        // RSVP form submission
        document.querySelector('.rsvp-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your RSVP! We have received your response and are so excited to celebrate with you.');
            this.reset();
            guestCountDiv.classList.add('hidden');
            dietaryDiv.classList.add('hidden');
        });

        // Registry button functions
        function openRegistry(type) {
            let message = '';
            switch(type) {
                case 'target':
                    message = 'Opening Target registry...';
                    break;
                case 'williams-sonoma':
                    message = 'Opening Williams Sonoma registry...';
                    break;
                case 'cash':
                    message = 'Opening cash gift options...';
                    break;
            }
            alert(message);
        }

        // Navigation scroll effect
        window.addEventListener('scroll', function() {
            const nav = document.querySelector('nav');
            if (window.scrollY > 100) {
                nav.classList.add('bg-white/95');
                nav.classList.remove('bg-white/90');
            } else {
                nav.classList.add('bg-white/90');
                nav.classList.remove('bg-white/95');
            }
        });

        // Section entrance animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(section);
        });

        document.querySelector('#home').style.opacity = '1';
        document.querySelector('#home').style.transform = 'translateY(0)';

        // ========================================
        // MESSAGES SECTION - DUAL MODE FUNCTIONALITY
        // ========================================

        // Get all message cards HTML
        const messageCardsHTML = document.querySelector('#messagesScrollContainer .flex').innerHTML;
        const messageCards = document.querySelectorAll('#messagesScrollContainer .w-80');
        
        // Mode toggle
        const scrollModeBtn = document.getElementById('scrollModeBtn');
        const sliderModeBtn = document.getElementById('sliderModeBtn');
        const scrollMode = document.getElementById('scrollMode');
        const sliderMode = document.getElementById('sliderMode');
        
        let currentMode = 'scroll';
        
        scrollModeBtn.addEventListener('click', () => {
            if (currentMode !== 'scroll') {
                currentMode = 'scroll';
                scrollMode.classList.remove('hidden');
                sliderMode.classList.add('hidden');
                scrollModeBtn.classList.remove('bg-gray-300', 'text-gray-700');
                scrollModeBtn.classList.add('bg-wine', 'text-white');
                sliderModeBtn.classList.remove('bg-wine', 'text-white');
                sliderModeBtn.classList.add('bg-gray-300', 'text-gray-700');
            }
        });
        
        sliderModeBtn.addEventListener('click', () => {
            if (currentMode !== 'slider') {
                currentMode = 'slider';
                scrollMode.classList.add('hidden');
                sliderMode.classList.remove('hidden');
                sliderModeBtn.classList.remove('bg-gray-300', 'text-gray-700');
                sliderModeBtn.classList.add('bg-wine', 'text-white');
                scrollModeBtn.classList.remove('bg-wine', 'text-white');
                scrollModeBtn.classList.add('bg-gray-300', 'text-gray-700');
                initializeSlider();
            }
        });

        // ========================================
        // HORIZONTAL SCROLL FUNCTIONALITY
        // ========================================
        
        const messagesContainer = document.getElementById('messagesScrollContainer');
        const scrollLeftBtn = document.getElementById('scrollLeft');
        const scrollRightBtn = document.getElementById('scrollRight');

        const scrollAmount = 400;

        scrollLeftBtn.addEventListener('click', () => {
            messagesContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        scrollRightBtn.addEventListener('click', () => {
            messagesContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        messagesContainer.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                messagesContainer.scrollBy({
                    left: e.deltaY < 0 ? -100 : 100,
                    behavior: 'smooth'
                });
            }
        });

        let isDown = false;
        let startX;
        let scrollLeft;

        messagesContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            messagesContainer.style.cursor = 'grabbing';
            startX = e.pageX - messagesContainer.offsetLeft;
            scrollLeft = messagesContainer.scrollLeft;
        });

        messagesContainer.addEventListener('mouseleave', () => {
            isDown = false;
            messagesContainer.style.cursor = 'grab';
        });

        messagesContainer.addEventListener('mouseup', () => {
            isDown = false;
            messagesContainer.style.cursor = 'grab';
        });

        messagesContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - messagesContainer.offsetLeft;
            const walk = (x - startX) * 2;
            messagesContainer.scrollLeft = scrollLeft - walk;
        });

        function updateScrollButtons() {
            const maxScroll = messagesContainer.scrollWidth - messagesContainer.clientWidth;
            
            if (messagesContainer.scrollLeft <= 0) {
                scrollLeftBtn.style.opacity = '0.3';
                scrollLeftBtn.style.pointerEvents = 'none';
            } else {
                scrollLeftBtn.style.opacity = '1';
                scrollLeftBtn.style.pointerEvents = 'auto';
            }

            if (messagesContainer.scrollLeft >= maxScroll - 10) {
                scrollRightBtn.style.opacity = '0.3';
                scrollRightBtn.style.pointerEvents = 'none';
            } else {
                scrollRightBtn.style.opacity = '1';
                scrollRightBtn.style.pointerEvents = 'auto';
            }
        }

        messagesContainer.addEventListener('scroll', updateScrollButtons);
        updateScrollButtons();

        document.addEventListener('keydown', (e) => {
            if (messagesContainer.matches(':hover') && currentMode === 'scroll') {
                if (e.key === 'ArrowLeft') {
                    messagesContainer.scrollBy({
                        left: -scrollAmount,
                        behavior: 'smooth'
                    });
                } else if (e.key === 'ArrowRight') {
                    messagesContainer.scrollBy({
                        left: scrollAmount,
                        behavior: 'smooth'
                    });
                }
            }
        });

        // ========================================
        // SLIDER FUNCTIONALITY
        // ========================================
        
        const slider = document.getElementById('messagesSlider');
        const sliderPrevBtn = document.getElementById('sliderPrevBtn');
        const sliderNextBtn = document.getElementById('sliderNextBtn');
        const sliderPrevBtnMobile = document.getElementById('sliderPrevBtnMobile');
        const sliderNextBtnMobile = document.getElementById('sliderNextBtnMobile');
        const dotsContainer = document.getElementById('dotsContainer');

        let currentIndex = 0;
        let cardsPerView = getCardsPerView();
        let totalCards = 8;
        let totalPages = Math.ceil(totalCards / cardsPerView);
        let autoPlayInterval;

        function getCardsPerView() {
            if (window.innerWidth >= 1024) return 3;
            if (window.innerWidth >= 768) return 2;
            return 1;
        }

        function initializeSlider() {
            // Copy cards to slider
            slider.innerHTML = messageCardsHTML;
            
            // Recalculate
            cardsPerView = getCardsPerView();
            totalPages = Math.ceil(totalCards / cardsPerView);
            
            createDots();
            updateSlider();
            startAutoPlay();
        }

        window.addEventListener('resize', () => {
            if (currentMode === 'slider') {
                cardsPerView = getCardsPerView();
                totalPages = Math.ceil(totalCards / cardsPerView);
                updateSlider();
                createDots();
            }
        });

        function createDots() {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < totalPages; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
        }

        function updateSlider() {
            const offset = currentIndex * -100;
            slider.style.transform = `translateX(${offset}%)`;
            
            document.querySelectorAll('.dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function goToSlide(index) {
            currentIndex = index;
            updateSlider();
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalPages;
            updateSlider();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalPages) % totalPages;
            updateSlider();
        }

        sliderPrevBtn.addEventListener('click', prevSlide);
        sliderNextBtn.addEventListener('click', nextSlide);
        sliderPrevBtnMobile.addEventListener('click', prevSlide);
        sliderNextBtnMobile.addEventListener('click', nextSlide);

        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        slider.addEventListener('mouseenter', stopAutoPlay);
        slider.addEventListener('mouseleave', () => {
            if (currentMode === 'slider') {
                startAutoPlay();
            }
        });
         // ========================================
        // READ MORE FUNCTIONALITY FOR STORY SECTION
        // ========================================
        
        const readMoreBtn = document.getElementById('readMoreBtn');
        const readMoreText = document.getElementById('readMoreText');
        const readMoreIcon = document.getElementById('readMoreIcon');
        const storyText = document.getElementById('storyText');
        
        let isExpanded = false;
        
        readMoreBtn.addEventListener('click', () => {
            isExpanded = !isExpanded;
            
            if (isExpanded) {
                storyText.classList.add('expanded');
                readMoreText.textContent = 'Read Less';
                readMoreIcon.style.transform = 'rotate(180deg)';
            } else {
                storyText.classList.remove('expanded');
                readMoreText.textContent = 'Read More';
                readMoreIcon.style.transform = 'rotate(0deg)';
            }
        });