// Global variables
let currentPage = 'home';

// Sample data for programming terms
const programmingTerms = [
    { title: "HTML", category: "frontend", description: "HyperText Markup Language - the standard markup language for creating web pages." },
    { title: "CSS", category: "frontend", description: "Cascading Style Sheets - used for describing the presentation of a document written in HTML." },
    { title: "JavaScript", category: "frontend", description: "A programming language that enables interactive web pages and is an essential part of web applications." },
    { title: "React", category: "frontend", description: "A JavaScript library for building user interfaces, particularly single-page applications." },
    { title: "Vue.js", category: "frontend", description: "A progressive JavaScript framework for building user interfaces and single-page applications." },
    { title: "Angular", category: "frontend", description: "A TypeScript-based open-source web application framework led by the Angular Team at Google." },
    { title: "Node.js", category: "backend", description: "A JavaScript runtime built on Chrome's V8 JavaScript engine for server-side development." },
    { title: "Express.js", category: "backend", description: "A minimal and flexible Node.js web application framework." },
    { title: "Python", category: "backend", description: "A high-level programming language known for its simplicity and versatility." },
    { title: "Django", category: "backend", description: "A high-level Python web framework that encourages rapid development." },
    { title: "Flask", category: "backend", description: "A lightweight WSGI web application framework in Python." },
    { title: "MySQL", category: "database", description: "An open-source relational database management system." },
    { title: "MongoDB", category: "database", description: "A document-oriented NoSQL database program." },
    { title: "PostgreSQL", category: "database", description: "An advanced open-source relational database system." },
    { title: "Redis", category: "database", description: "An in-memory data structure store, used as a database, cache, and message broker." },
    { title: "REST API", category: "apis", description: "Representational State Transfer - an architectural style for designing networked applications." },
    { title: "GraphQL", category: "apis", description: "A query language and runtime for APIs that allows clients to request specific data." },
    { title: "WebSocket", category: "apis", description: "A computer communications protocol providing full-duplex communication channels." },
    { title: "Docker", category: "devops", description: "A platform for developing, shipping, and running applications using containerization." },
    { title: "Kubernetes", category: "devops", description: "An open-source container orchestration platform." },
    { title: "Git", category: "devops", description: "A distributed version control system for tracking changes in source code." },
    { title: "Jenkins", category: "devops", description: "An open-source automation server for Continuous Integration and Continuous Deployment." },
    { title: "AWS", category: "cloud", description: "Amazon Web Services - a comprehensive cloud computing platform." },
    { title: "Azure", category: "cloud", description: "Microsoft's cloud computing platform and infrastructure." },
    { title: "Google Cloud", category: "cloud", description: "Google's suite of cloud computing services." },
    { title: "Machine Learning", category: "ai", description: "A subset of AI that enables computers to learn and improve from experience." },
    { title: "Neural Networks", category: "ai", description: "Computing systems inspired by biological neural networks." },
    { title: "Deep Learning", category: "ai", description: "A subset of machine learning with neural networks that have multiple layers." },
    { title: "OAuth", category: "security", description: "An open standard for access delegation and authorization." },
    { title: "JWT", category: "security", description: "JSON Web Tokens - a compact way to securely transmit information." },
    { title: "HTTPS", category: "security", description: "HTTP Secure - an extension of HTTP with encryption for secure communication." },
    { title: "SSL/TLS", category: "security", description: "Cryptographic protocols designed to provide communications security over a computer network." }
];

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    updateThemeButton(savedTheme);
    
    // Add loaded class for animations
    setTimeout(() => {
        body.classList.add('loaded');
    }, 100);
    
    // Theme toggle event
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeButton(newTheme);
    });
    
    function updateThemeButton(theme) {
        const icon = themeToggle.querySelector('i');
        
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        } else {
            icon.className = 'fas fa-moon';
            themeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
        }
    }
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize search functionality
    initializeSearch();
    
    // Load programming terms
    loadProgrammingTerms();
    
    // Initialize scroll to top button
    initializeScrollToTop();
});

// Navigation functionality
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn[data-page]');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            showPage(page);
        });
    });
    
    // Add home button functionality to title
    const mainTitle = document.querySelector('.main-title');
    mainTitle.addEventListener('click', () => showPage('home'));
    mainTitle.style.cursor = 'pointer';
}

// Show specific page
function showPage(page) {
    // Hide all content containers
    const containers = document.querySelectorAll('.content-container');
    containers.forEach(container => {
        container.style.display = 'none';
    });
    
    // Update navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn[data-page]');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected page and activate button
    switch(page) {
        case 'home':
            document.getElementById('homeContent').style.display = 'block';
            break;
        case 'about':
            document.getElementById('aboutContent').style.display = 'block';
            document.querySelector('[data-page="about"]').classList.add('active');
            break;
        case 'learn-html':
            document.getElementById('learnHtmlContent').style.display = 'block';
            document.querySelector('[data-page="learn-html"]').classList.add('active');
            initializeLearningPage('html');
            break;
        case 'learn-css':
            document.getElementById('learnCssContent').style.display = 'block';
            document.querySelector('[data-page="learn-css"]').classList.add('active');
            initializeLearningPage('css');
            break;
        case 'learn-js':
            document.getElementById('learnJsContent').style.display = 'block';
            document.querySelector('[data-page="learn-js"]').classList.add('active');
            initializeLearningPage('js');
            break;
    }
    
    currentPage = page;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const categorySelect = document.getElementById('categorySelect');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Real-time search
        searchInput.addEventListener('input', performSearch);
    }
    
    if (categorySelect) {
        categorySelect.addEventListener('change', filterByCategory);
    }
    
    function performSearch() {
        const query = searchInput.value.toLowerCase();
        const cards = document.querySelectorAll('.card');
        let visibleCount = 0;
        
        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const content = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(query) || content.includes(query) || query === '') {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show search results count
        updateSearchResults(visibleCount, query);
    }
    
    function filterByCategory() {
        const category = categorySelect.value;
        const cards = document.querySelectorAll('.card');
        let visibleCount = 0;
        
        cards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === '' || cardCategory === category) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Reset search input when filtering by category
        if (category !== '') {
            searchInput.value = '';
        }
        
        updateSearchResults(visibleCount, category ? `category: ${category}` : '');
    }
    
    function updateSearchResults(count, query) {
        let resultsElement = document.getElementById('searchResults');
        if (!resultsElement) {
            resultsElement = document.createElement('div');
            resultsElement.id = 'searchResults';
            resultsElement.className = 'search-results';
            document.querySelector('.search-section').appendChild(resultsElement);
        }
        
        if (query) {
            resultsElement.textContent = `Found ${count} result(s) for "${query}"`;
            resultsElement.style.display = 'block';
        } else {
            resultsElement.style.display = 'none';
        }
    }
}

// Load programming terms into cards
function loadProgrammingTerms() {
    const cardsGrid = document.getElementById('cardsGrid');
    if (!cardsGrid) return;
    
    // Clear existing cards
    cardsGrid.innerHTML = '';
    
    programmingTerms.forEach(term => {
        const card = createTermCard(term);
        cardsGrid.appendChild(card);
    });
}

// Create a term card
function createTermCard(term) {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-category', term.category);
    
    card.innerHTML = `
        <h3>${term.title}</h3>
        <p>${term.description}</p>
        <div class="card-category">${term.category.toUpperCase()}</div>
    `;
    
    // Add click event to show more details
    card.addEventListener('click', () => showTermDetails(term));
    
    return card;
}

// Show term details in modal
function showTermDetails(term) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <div class="term-details">
                <h2><i class="fas fa-code"></i> ${term.title}</h2>
                <div class="term-category">${term.category.toUpperCase()}</div>
                <p class="term-description">${term.description}</p>
                <div class="term-actions">
                    <button class="learn-more-btn" onclick="learnMore('${term.title}')">
                        <i class="fas fa-book"></i> Learn More
                    </button>
                    <button class="bookmark-btn" onclick="toggleBookmark('${term.title}')">
                        <i class="fas fa-bookmark"></i> Bookmark
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal events
    modal.querySelector('.close').addEventListener('click', () => closeModal());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

// Close modal
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

// Learning page functionality
function initializeLearningPage(language) {
    const progressKey = `${language}_progress`;
    const progress = JSON.parse(localStorage.getItem(progressKey)) || {
        completedModules: [],
        currentModule: null,
        totalProgress: 0
    };
    
    updateProgressDisplay(language, progress);
    updateModuleStatus(language, progress);
}

// Update progress display
function updateProgressDisplay(language, progress) {
    const progressBar = document.querySelector(`#learn${language.charAt(0).toUpperCase() + language.slice(1)}Content .progress-fill`);
    const progressText = document.querySelector(`#learn${language.charAt(0).toUpperCase() + language.slice(1)}Content .progress-text`);
    
    if (progressBar && progressText) {
        progressBar.style.width = `${progress.totalProgress}%`;
        
        if (progress.totalProgress === 0) {
            progressText.textContent = `0% Complete - Start your ${language.toUpperCase()} journey!`;
        } else if (progress.totalProgress === 100) {
            progressText.textContent = `🎉 Congratulations! You've completed all ${language.toUpperCase()} modules!`;
        } else {
            progressText.textContent = `${progress.totalProgress}% Complete - Keep going!`;
        }
    }
}

// Update module status
function updateModuleStatus(language, progress) {
    const moduleCards = document.querySelectorAll(`#learn${language.charAt(0).toUpperCase() + language.slice(1)}Content .module-card`);
    
    moduleCards.forEach((card, index) => {
        const moduleId = getModuleId(card);
        
        // Remove existing status classes
        card.classList.remove('completed', 'in-progress');
        
        // Add completion indicator
        let indicator = card.querySelector('.completion-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'completion-indicator';
            card.appendChild(indicator);
        }
        
        if (progress.completedModules.includes(moduleId)) {
            card.classList.add('completed');
            indicator.className = 'completion-indicator completed';
            indicator.innerHTML = '<i class="fas fa-check"></i>';
        } else if (progress.currentModule === moduleId) {
            card.classList.add('in-progress');
            indicator.className = 'completion-indicator in-progress';
            indicator.textContent = '...';
        } else {
            indicator.className = 'completion-indicator not-started';
            indicator.textContent = index + 1;
        }
    });
}

// Get module ID from card
function getModuleId(card) {
    const title = card.querySelector('h3').textContent;
    return title.toLowerCase().replace(/[^a-z0-9]/g, '-');
}

// Start learning module
function startModule(moduleId) {
    const language = getCurrentLanguage();
    const progressKey = `${language}_progress`;
    let progress = JSON.parse(localStorage.getItem(progressKey)) || {
        completedModules: [],
        currentModule: null,
        totalProgress: 0
    };
    
    // Set current module
    progress.currentModule = moduleId;
    localStorage.setItem(progressKey, JSON.stringify(progress));
    
    // Show learning modal
    showLearningModal(moduleId, language);
    
    // Update display
    updateModuleStatus(language, progress);
}

// Get current language
function getCurrentLanguage() {
    if (document.getElementById('learnHtmlContent').style.display !== 'none') return 'html';
    if (document.getElementById('learnCssContent').style.display !== 'none') return 'css';
    if (document.getElementById('learnJsContent').style.display !== 'none') return 'js';
    return 'html';
}

// Show learning modal
function showLearningModal(moduleId, language) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    
    modal.innerHTML = `
        <div class="modal-content learning-modal">
            <span class="close">&times;</span>
            <div class="learning-header">
                <h2>📚 ${moduleId.replace(/-/g, ' ').toUpperCase()}</h2>
                <p>Interactive learning module for ${language.toUpperCase()}</p>
            </div>
            <div class="learning-content">
                <div class="lesson-section">
                    <h3>🎯 Learning Objectives</h3>
                    <ul class="objectives-list">
                        <li>Understand the fundamentals</li>
                        <li>Practice with examples</li>
                        <li>Apply knowledge in exercises</li>
                        <li>Master the concepts</li>
                    </ul>
                </div>
                <div class="practice-section">
                    <h3>💻 Practice Exercise</h3>
                    <p>Complete this simple exercise to test your understanding:</p>
                    <div class="exercise-box">
                        <p><strong>Exercise:</strong> Write a simple ${language.toUpperCase()} example that demonstrates the concepts learned in this module.</p>
                    </div>
                </div>
                <div class="quiz-section">
                    <h3>🧠 Quick Quiz</h3>
                    <div class="quiz-question">
                        <p><strong>Question:</strong> What is the main purpose of ${language.toUpperCase()}?</p>
                        <div class="quiz-options">
                            <button class="quiz-option" onclick="selectAnswer(this, true)">
                                ${getCorrectAnswer(language)}
                            </button>
                            <button class="quiz-option" onclick="selectAnswer(this, false)">
                                To make coffee
                            </button>
                            <button class="quiz-option" onclick="selectAnswer(this, false)">
                                To play games
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button class="complete-btn" onclick="completeModule('${moduleId}', '${language}')">
                    <i class="fas fa-check"></i> Complete Module
                </button>
                <button class="close-btn" onclick="closeModal()">
                    <i class="fas fa-times"></i> Close
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal events
    modal.querySelector('.close').addEventListener('click', () => closeModal());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

// Get correct answer for quiz
function getCorrectAnswer(language) {
    const answers = {
        'html': 'To structure web content',
        'css': 'To style web pages',
        'js': 'To add interactivity to web pages'
    };
    return answers[language] || 'To build web applications';
}

// Select quiz answer
function selectAnswer(button, isCorrect) {
    const options = button.parentElement.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.disabled = true;
        option.classList.remove('correct', 'incorrect');
    });
    
    if (isCorrect) {
        button.classList.add('correct');
        showMessage('Correct! Well done! 🎉', 'success');
    } else {
        button.classList.add('incorrect');
        // Highlight correct answer
        options.forEach(option => {
            if (option.textContent.includes('structure') || 
                option.textContent.includes('style') || 
                option.textContent.includes('interactivity')) {
                option.classList.add('correct');
            }
        });
        showMessage('Not quite right. Try again!', 'error');
    }
}

// Complete module
function completeModule(moduleId, language) {
    const progressKey = `${language}_progress`;
    let progress = JSON.parse(localStorage.getItem(progressKey)) || {
        completedModules: [],
        currentModule: null,
        totalProgress: 0
    };
    
    // Add to completed modules
    if (!progress.completedModules.includes(moduleId)) {
        progress.completedModules.push(moduleId);
    }
    
    // Calculate progress (assuming 5 modules per language)
    const totalModules = 5;
    progress.totalProgress = Math.round((progress.completedModules.length / totalModules) * 100);
    
    // Clear current module
    progress.currentModule = null;
    
    // Save progress
    localStorage.setItem(progressKey, JSON.stringify(progress));
    
    // Update display
    updateProgressDisplay(language, progress);
    updateModuleStatus(language, progress);
    
    // Close modal and show success
    closeModal();
    showMessage(`🎉 Module completed! Progress: ${progress.totalProgress}%`, 'success');
}

// Show message
function showMessage(message, type = 'info') {
    // Remove existing message
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageEl = document.createElement('div');
    messageEl.className = `message message-${type}`;
    messageEl.textContent = message;
    
    document.body.appendChild(messageEl);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (messageEl.parentElement) {
            messageEl.remove();
        }
    }, 3000);
}

// Utility functions
function learnMore(term) {
    showMessage(`Opening learning resources for ${term}...`, 'info');
    closeModal();
}

function toggleBookmark(term) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    
    if (bookmarks.includes(term)) {
        bookmarks = bookmarks.filter(bookmark => bookmark !== term);
        showMessage(`Removed ${term} from bookmarks`, 'info');
    } else {
        bookmarks.push(term);
        showMessage(`Added ${term} to bookmarks`, 'success');
    }
    
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

// Initialize scroll to top button
function initializeScrollToTop() {
    // Add scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(scrollBtn);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Ctrl/Cmd + H for home
    if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault();
        showPage('home');
    }
});
