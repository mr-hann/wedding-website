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
                    // Close mobile menu if open
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
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show success message (in real implementation, you'd send this to a server)
            alert('Thank you for your RSVP! We have received your response and are so excited to celebrate with you.');
            
            // Reset form
            this.reset();
            guestCountDiv.classList.add('hidden');
            dietaryDiv.classList.add('hidden');
        });

        // Registry button functions
        function openRegistry(type) {
            let message = '';
            
            switch(type) {
                case 'target':
                    message = 'Opening Target registry... (In a real website, this would redirect to your Target registry)';
                    break;
                case 'williams-sonoma':
                    message = 'Opening Williams Sonoma registry... (In a real website, this would redirect to your Williams Sonoma registry)';
                    break;
                case 'cash':
                    message = 'Opening cash gift options... (In a real website, this would show payment options like Zelle, Venmo, etc.)';
                    break;
            }
            
            alert(message);
        }

        // Add scroll effect to navigation
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

        // Parallax effect for hero section
        window.addEventListener('scroll', function() {
            const hero = document.querySelector('#home');
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (hero) {
                hero.style.transform = `translate3d(0, ${rate}px, 0)`;
            }
        });

        // Add entrance animations
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

        // Observe sections for animation
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(section);
        });

        // Make hero section immediately visible
        document.querySelector('#home').style.opacity = '1';
        document.querySelector('#home').style.transform = 'translateY(0)';