function handleImageError() {
    const img = document.getElementById('profile-img');
    const fallback = document.getElementById('profile-fallback');
    if (img && fallback) {
        img.style.display = 'none';
        fallback.style.display = 'flex';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const projects = [
        {
            id: 1,
            title: "LVS Bio - Página de alta conversão",
            category: "frontend",
            status: "completed",
            statusText: "Finalizado",
            desc: "Uma página de destino de alto desempenho, otimizada para dispositivos móveis, do tipo “link na biografia”, com um chatbot de qualificação integrado e transferência automatizada de leads para o WhatsApp.",
            tech: ["Html", "CSS", "Tailwind CSS", "JavaScript", "Node.js"],
            codeUrl: "https://github.com/lucasvini-eng/lvsbio-page",
            demoUrl: "https://lvsbio-page.vercel.app/"
        },
        {
            id: 2,
            title: "Gerenciador de Leads/Clientes",
            category: "software",
            status: "dev",
            statusText: "Em Desenvolvimento",
            desc: "a definir",
            tech: ["Java, Spring Boot, PostgreSQL"],
            codeUrl: "https://sites.google.com/view/emmanuteno-quote-monitor/em-manutencao",
            demoUrl: "https://sites.google.com/view/emmanuteno-quote-monitor/em-manutencao"
        },
        {
            id: 3,
            title: "Quote Monitor ($) API",
            category: "backend",
            status: "dev",
            statusText: "Em Manutenção",
            desc: "Automação Robótica de Processos (RPA) para o monitoramento contínuo de cotações de mercado, automatizando a coleta, o processamento e a divulgação de informações estratégicas",
            tech: ["Python", "Selenium", "Google Cloud", "Google Sheets API", "Web Scraping", "Streamlit", "Data Egineering", "FastAPI"],
            codeUrl: "https://github.com/LucasVini-eng/Project-003-quoteFinance-RPA",
            demoUrl: "https://sites.google.com/view/emmanuteno-quote-monitor/em-manutencao"
        },
        {
            id: 4,
            title: "Task Management API",
            category: "software",
            status: "completed",
            statusText: "Completed ✅",
            desc: "The project that was developed is an API for managing tasks, using Java and the Spring Boot framework. First, users are registered and validated, and their passwords are encrypted in the H2 database. Then, tasks are created and assigned to their respective users; they can be updated and organized into lists.",
            tech: ["Java", "Spring Boot", "API REST"],
            codeUrl: "https://github.com/LucasVini-eng/Project-005-TaskList-API",
            demoUrl: "https://www.linkedin.com/posts/lucas-vinicius-ds_projeto-gerenciamento-de-tarefas-por-api-ugcPost-7398842285439758336-AbWo/?utm_source=share&utm_medium=member_desktop&rcm=ACoAADQ9xY4Bq9hbYyIilymoH1vo69oq8gsEDaE"
        },
         {
            id: 5,
            title: "Dashboard Management (Power BI)",
            category: "dados",
            status: "completed",
            statusText: "Completed ✅",
            desc: "Orchestration of interactive analytical views integrated into a customized web interface, accelerating decisions based on operational metrics..",
            tech: ["Tailwind CSS", "JavaScript", "Power BI Embedded", "ETL", "Power Query"],
            codeUrl: "https://github.com/LucasVini-eng/lveProject-001-DashboardManager-PowerBI",
            demoUrl: "https://lucasvini-eng.github.io/Project-001-DashboardManager-PowerBI/"
        },
    ];

    const grid = document.getElementById('projects-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('project-search');
    function renderProjects(filterValue = 'all', searchQuery = '') {
        if (!grid) return;
        grid.innerHTML = '';
        const filtered = projects.filter(p => {
            const matchesCategory = filterValue === 'all' || p.category === filterValue;
            const q = searchQuery.toLowerCase();
            const matchesSearch = p.title.toLowerCase().includes(q) ||
                p.desc.toLowerCase().includes(q) ||
                p.tech.some(t => t.toLowerCase().includes(q));
            return matchesCategory && matchesSearch;
        });

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="col-span-full text-center py-16">
                    <p class="text-slate-400 text-lg mb-0">No projects were found matching the search terms.</p>
                </div>
            `;
            return;
        }

        filtered.forEach((p, index) => {
            const col = document.createElement('div');
            col.className = 'animate-slide-up';
            col.style.animationDelay = `${index * 0.08}s`;

            let statusClass = 'status-completed';
            if (p.status === 'producao') statusClass = 'status-producao';
            if (p.status === 'dev') statusClass = 'status-dev';

            const techSpans = p.tech.map(t =>
                `<span class="font-mono text-xs bg-white/5 text-slate-300 px-2 py-1 rounded-md">${t}</span>`
            ).join('');

            col.innerHTML = `
                <div class="project-card h-full rounded-2xl p-6 flex flex-col">
                    <div class="flex justify-between items-start mb-3">
                        <span class="status-badge ${statusClass}">
                            <span class="status-dot"></span> ${p.statusText}
                        </span>
                    </div>
                    <h3 class="font-display text-lg font-bold text-white mb-2">${p.title}</h3>
                    <p class="text-slate-400 text-sm leading-relaxed mb-5 flex-grow">${p.desc}</p>
                    <div class="flex gap-2 mb-5">
                        <a href="${p.codeUrl}" target="_blank" rel="noopener noreferrer" title="Código fonte no GitHub"
                           class="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 text-white text-sm font-medium py-2.5 hover:border-accent hover:bg-accent/10 hover:text-accent transition-all">
                            <i class="ph ph-github-logo"></i> Código
                        </a>
                        <a href="${p.demoUrl}" target="_blank" rel="noopener noreferrer" title="Visualizar Live Demo"
                           class="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-accent border border-accent text-white hover:text-darker text-sm font-semibold py-2.5 hover:bg-accent-hover hover:border-accent-hover transition-all">
                            <i class="ph ph-arrow-square-out"></i> Acessar
                        </a>
                    </div>
                    <div class="flex flex-wrap gap-1.5 pt-4 border-t border-white/10 mt-auto">
                        ${techSpans}
                    </div>
                </div>
            `;
            grid.appendChild(col);
        });
    }

    renderProjects('all');
    const projectCounts = {
        completed: projects.filter(p => p.status === 'completed').length,
        dev: projects.filter(p => p.status === 'dev').length,
    };

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            renderProjects(filter, searchInput ? searchInput.value.trim() : '');
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const activeFilterBtn = document.querySelector('.filter-btn.active');
            const activeFilter = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
            renderProjects(activeFilter, e.target.value.trim());
        });
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const form = this;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            const submitBtn = form.querySelector('button[type="submit"]');
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toast-message');
            const toastIcon = toast ? toast.querySelector('.toast-icon') : null;

            const fields = [nameInput, emailInput, messageInput];
            const isValid = form.checkValidity();
            fields.forEach(el => el.classList.toggle('is-invalid', !el.checkValidity()));
            if (!isValid) return;

            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-70', 'cursor-not-allowed');
            submitBtn.innerHTML = 'Enviando... <i class="ph ph-spinner animate-spin"></i>';

            try {
                const response = await fetch('https://formsubmit.co/ajax/vinidev.eng@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: nameInput.value,
                        email: emailInput.value,
                        message: messageInput.value,
                        _subject: `New contact from ${nameInput.value}`
                    })
                });

                if (!response.ok) throw new Error('Shipping error');

                toast.classList.remove('error');
                if (toastIcon) toastIcon.className = 'ph ph-check-circle toast-icon';
                toastMessage.textContent = 'Message sent successfully!';
                toast.classList.add('show');

                form.reset();
                fields.forEach(el => el.classList.remove('is-invalid'));

            } catch (error) {
                toast.classList.add('error');
                if (toastIcon) toastIcon.className = 'ph ph-x-circle toast-icon';
                toastMessage.textContent = 'Erro ao enviar. Tente novamente.';
                toast.classList.add('show');
                console.error(error);

            } finally {
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-70', 'cursor-not-allowed');
                submitBtn.innerHTML = originalBtnHtml;
                setTimeout(() => toast.classList.remove('show'), 4000);
            }
        });
    }

    const header = document.querySelector('header');
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const statusPath = document.getElementById('status-bar-path');
    const statusProgressBar = document.getElementById('status-bar-progress');

    const sectionLabels = {
        home: '~/portfolio/home.js',
        sobre: '~/portfolio/about-me.js',
        projetos: '~/portfolio/projects.js',
        contatos: '~/portfolio/contacts.js',
    };

    function onScroll() {
        if (window.scrollY > 50) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }

        let current = 'home';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 140;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-section');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active-section');
            }
        });

        if (statusPath) statusPath.textContent = sectionLabels[current] || '~/portfolio';

        if (statusProgressBar) {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? Math.min(100, (window.scrollY / docHeight) * 100) : 0;
            statusProgressBar.style.width = pct + '%';
        }
    }
    window.addEventListener('scroll', onScroll);
    onScroll();

    const backToTopBtn = document.getElementById('status-back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        });
    }

    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');

    function closeMobileMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.add('hidden');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        if (menuIconOpen) menuIconOpen.classList.remove('hidden');
        if (menuIconClose) menuIconClose.classList.add('hidden');
    }

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            menuToggle.setAttribute('aria-expanded', String(isHidden));
            if (menuIconOpen) menuIconOpen.classList.toggle('hidden');
            if (menuIconClose) menuIconClose.classList.toggle('hidden');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992) closeMobileMenu();
            });
        });
    }

    const revealEls = document.querySelectorAll('.reveal');
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        revealEls.forEach(el => el.classList.add('is-visible'));
    } else {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        revealEls.forEach(el => revealObserver.observe(el));
    }

    const statEls = document.querySelectorAll('[data-count-target]');
    function animateCount(el) {
        const target = parseInt(el.getAttribute('data-count-target'), 10) || 0;
        if (prefersReducedMotion || target === 0) {
            el.textContent = target;
            return;
        }
        const duration = 900;
        const start = performance.now();
        function step(now) {
            const progress = Math.min(1, (now - start) / duration);
            el.textContent = Math.round(progress * target);
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }
    const completedEl = document.getElementById('hero-completed-count');
    const activeEl = document.getElementById('hero-active-count');
    if (completedEl) completedEl.setAttribute('data-count-target', projectCounts.completed);
    if (activeEl) activeEl.setAttribute('data-count-target', projectCounts.dev);

    if ('IntersectionObserver' in window) {
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCount(entry.target);
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        document.querySelectorAll('[data-count-target]').forEach(el => statObserver.observe(el));
    } else {
        document.querySelectorAll('[data-count-target]').forEach(animateCount);
    }

    const typeTarget = document.getElementById('hero-typewriter');
    if (typeTarget && !prefersReducedMotion) {
        const phrases = [
            'P:\\> Bem vindos(as) ao meu portifólio!',
            'P:\\> Escalabilidade, Eficiença e Segurança',
            '"Nossas maiores realizações não podem ficar para trás, porque nosso destino está acima de nós. Cooper - Interesletar."'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function tick() {
            const current = phrases[phraseIndex];
            if (!deleting) {
                charIndex++;
                typeTarget.textContent = current.slice(0, charIndex);
                if (charIndex === current.length) {
                    deleting = true;
                    setTimeout(tick, 1800);
                    return;
                }
                setTimeout(tick, 55);
            } else {
                charIndex--;
                typeTarget.textContent = current.slice(0, charIndex);
                if (charIndex === 0) {
                    deleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    setTimeout(tick, 300);
                    return;
                }
                setTimeout(tick, 30);
            }
        }
        tick();
    } else if (typeTarget) {
        typeTarget.textContent = 'SOFTWARE ENGINEER';
    }

    function initAboutChatbot() {
        const chatMessages = document.getElementById('chat-messages');
        const chatForm = document.getElementById('chat-form');
        const chatInput = document.getElementById('chat-input');
        const quickRepliesContainer = document.getElementById('chat-quick-replies');
        const resetBtn = document.getElementById('chat-reset-btn');

        if (!chatMessages || !chatForm || !chatInput || !quickRepliesContainer) return;

        let chatState = 'START';
        let userName = '';
        let pendingQuestion = null;

        const sobreMimText = `Engenheiro de Software com 3 anos de experiência em dados e backend. Construo APIs, pipelines de dados (GCP/BigQuery) e automações que eliminam trabalho manual.\n\nNa Construtora R Pontes, modelei um Data Warehouse no BigQuery que reduziu em 70% o tempo de análise e manutenção. Como autônomo, criei um funil de vendas que cortou o atendimento de 30 para 10 minutos e captou 10x mais leads.\n\nStack: Python, Java, Spring Boot, FastAPI, SQL e GCP.\nEstudando testes automatizados e segurança de software. Bacharelando em Sistemas de Informação (12/2026).`;

        const chatbotData = {
            welcome: 'Olá! Sou o assistente virtual do Lucas. Diga algo para iniciarmos a conversa.',
            askName: 'Olá primeiro Informe seu nome:',
            greetUser: (name) => `Olá ${name}, como posso te ajudar hoje?`,
            flows: [
                {
                    id: 'sobre',
                    label: '🙋 Sobre mim',
                    query: 'Fale sobre você',
                    keywords: ['sobre', 'mim', 'voce', 'lucas', 'quem e', 'quem e voce', 'quem e o lucas', 'apresente', 'apresentacao', 'bio', 'experiencia', 'perfil', 'resumo', 'trajetoria'],
                    response: sobreMimText
                },
                {
                    id: 'idade',
                    label: '🎂 Idade',
                    query: 'Qual a sua idade?',
                    keywords: ['idade', 'quantos anos', 'ano', 'anos', 'idade tem', 'data de nascimento', 'nasceu'],
                    response: 'Tenho 25 anos.'
                },
                {
                    id: 'formacao',
                    label: '🎓 Formação',
                    query: 'Qual a sua formação?',
                    keywords: ['formacao', 'formado', 'graduacao', 'faculdade', 'sistemas de informacao', 'estudos', 'estudando', 'universidade', 'bacharelado', 'bacharel', 'curso'],
                    response: 'Formação: Bacharelando em Sistemas de Informação (12/2026).'
                },
                {
                    id: 'stack',
                    label: '🛠️ Stack & Tecnologias',
                    query: 'Quais tecnologias você usa?',
                    keywords: ['stack', 'tecnologia', 'tecnologias', 'ferramenta', 'ferramentas', 'python', 'java', 'spring', 'boot', 'fastapi', 'sql', 'gcp', 'bigquery'],
                    response: 'Stack: Python, Java, Spring Boot, FastAPI, SQL e GCP.\nEstudando testes automatizados e segurança de software. Bacharelando em Sistemas de Informação (12/2026).'
                },
                {
                    id: 'contact',
                    label: '💬 Contato',
                    query: 'Como posso entrar em contato com você?',
                    keywords: ['contato', 'contratar', 'trabalhar', 'reuniao', 'email', 'whatsapp', 'linkedin', 'conversar', 'parceria', 'vaga'],
                    response: `Estou sempre aberto a novas oportunidades profissionais, vagas e projetos!\n\nEntre em contato direto:\n• 💬 **WhatsApp:** [Conversar no WhatsApp](https://wa.me/558296402650?text=Ol%C3%A1%20Lucas,%20vi%20seu%20portf%C3%B3lio!)\n• 📧 **E-mail:** [vinidev.eng@gmail.com](mailto:vinidev.eng@gmail.com)\n• 💼 **LinkedIn:** [Perfil no LinkedIn](https://linkedin.com/in/lucas-vinicius-ds)\n• Ou preencha o formulário na seção [Contatos](#contatos)!`
                }
            ]
        };

        function escapeHTML(str) {
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        }

        function formatMarkdown(text) {
            let escaped = escapeHTML(text);
            escaped = escaped.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-accent underline hover:text-accent-hover font-medium">$1</a>');
            escaped = escaped.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
            const lines = escaped.split('\n');
            const formatted = lines.map(line => {
                if (line.startsWith('• ')) {
                    return `<div class="flex items-start gap-2 ml-1 my-0.5"><span class="text-accent">•</span><span>${line.substring(2)}</span></div>`;
                }
                return line;
            }).join('<br>');
            return formatted;
        }

        function appendMessage(role, text) {
            const wrapper = document.createElement('div');
            if (role === 'user') {
                wrapper.className = 'flex justify-end animate-slide-up';
                wrapper.innerHTML = `
                    <div class="chat-bubble-user p-3.5 max-w-[85%] text-sm font-medium leading-relaxed shadow-sm">
                        ${escapeHTML(text)}
                    </div>
                `;
            } else {
                wrapper.className = 'flex items-start gap-3 animate-slide-up';
                wrapper.innerHTML = `
                    <div class="w-7 h-7 rounded-full bg-accent/20 border border-accent flex items-center justify-center text-accent font-mono text-xs font-bold shrink-0 mt-0.5">
                        LV
                    </div>
                    <div class="chat-bubble-bot p-4 max-w-[88%] text-sm leading-relaxed space-y-1 shadow-sm">
                        ${formatMarkdown(text)}
                    </div>
                `;
            }
            chatMessages.appendChild(wrapper);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function showTypingIndicator() {
            const indicator = document.createElement('div');
            indicator.id = 'chat-typing-indicator';
            indicator.className = 'flex items-start gap-3';
            indicator.innerHTML = `
                <div class="w-7 h-7 rounded-full bg-accent/20 border border-accent flex items-center justify-center text-accent font-mono text-xs font-bold shrink-0 mt-0.5">
                    LV
                </div>
                <div class="chat-bubble-bot px-4 py-3 text-sm flex items-center gap-1.5">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            `;
            chatMessages.appendChild(indicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function removeTypingIndicator() {
            const indicator = document.getElementById('chat-typing-indicator');
            if (indicator) indicator.remove();
        }

        function renderQuickReplies() {
            quickRepliesContainer.innerHTML = '';
            chatbotData.flows.forEach(flow => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'quick-reply-btn';
                btn.innerHTML = `<span>${flow.label}</span>`;
                btn.addEventListener('click', () => {
                    handleIncomingMessage(flow.query, flow.response, true);
                });
                quickRepliesContainer.appendChild(btn);
            });
        }

        function normalizeText(str) {
            return str
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '');
        }

        function extractName(rawText) {
            let clean = rawText.trim()
                .replace(/^(ol[aá]|oi|opa|bom dia|boa tarde|boa noite)[,\.\s\!]*/i, '')
                .replace(/^(me chamo|meu nome [eé]|sou o|sou a|eu sou o|eu sou a|sou|eu sou|chamo|me chame de)\s+/i, '')
                .replace(/[,\.\!\?]+$/, '')
                .trim();
            if (!clean) clean = rawText.trim();
            const words = clean.split(/\s+/).filter(Boolean);
            if (words.length === 0) return 'Visitante';
            return words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
        }

        function updatePlaceholder() {
            if (chatState === 'START') {
                chatInput.placeholder = 'Envie uma mensagem para iniciar...';
            } else if (chatState === 'AWAITING_NAME') {
                chatInput.placeholder = 'Informe seu nome aqui...';
            } else {
                chatInput.placeholder = 'Pergunte sobre mim, idade, formação, stack...';
            }
        }

        function findBestResponse(userText) {
            const normalizedQuery = normalizeText(userText);

            const hasIdade = ['idade', 'quantos anos', 'anos'].some(k => normalizedQuery.includes(k));
            const hasFormacao = ['formacao', 'graduacao', 'faculdade', 'curso', 'sistemas de informacao'].some(k => normalizedQuery.includes(k));
            if (hasIdade && hasFormacao) {
                return 'Tenho 25 anos e sou Bacharelando em Sistemas de Informação (12/2026).';
            }

            let bestMatch = null;
            let highestScore = 0;

            chatbotData.flows.forEach(flow => {
                let score = 0;
                flow.keywords.forEach(kw => {
                    const normKw = normalizeText(kw);
                    if (normalizedQuery.includes(normKw)) {
                        score += 2;
                    }
                });
                if (normalizedQuery.includes(normalizeText(flow.query))) {
                    score += 5;
                }
                if (score > highestScore) {
                    highestScore = score;
                    bestMatch = flow;
                }
            });

            if (bestMatch && highestScore > 0) {
                return bestMatch.response;
            }

            return sobreMimText;
        }

        function handleIncomingMessage(text, forcedResponse = null, isQuickReply = false) {
            appendMessage('user', text);

            if (chatState === 'START') {
                chatState = 'AWAITING_NAME';
                updatePlaceholder();
                if (isQuickReply) {
                    pendingQuestion = { text, response: forcedResponse };
                }
                showTypingIndicator();
                setTimeout(() => {
                    removeTypingIndicator();
                    appendMessage('bot', chatbotData.askName);
                    chatInput.focus();
                }, 380);
                return;
            }

            if (chatState === 'AWAITING_NAME') {
                userName = extractName(text);
                chatState = 'READY';
                updatePlaceholder();
                showTypingIndicator();
                setTimeout(() => {
                    removeTypingIndicator();
                    appendMessage('bot', chatbotData.greetUser(userName));

                    if (pendingQuestion) {
                        const nextQuery = pendingQuestion;
                        pendingQuestion = null;
                        showTypingIndicator();
                        setTimeout(() => {
                            removeTypingIndicator();
                            const answer = nextQuery.response || findBestResponse(nextQuery.text);
                            appendMessage('bot', answer);
                        }, 500);
                    }
                }, 380);
                return;
            }

            showTypingIndicator();
            const response = forcedResponse || findBestResponse(text);
            setTimeout(() => {
                removeTypingIndicator();
                appendMessage('bot', response);
            }, 380);
        }

        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (!text) return;
            chatInput.value = '';
            handleIncomingMessage(text);
        });

        function resetChat() {
            chatState = 'START';
            userName = '';
            pendingQuestion = null;
            chatMessages.innerHTML = '';
            updatePlaceholder();
            appendMessage('bot', chatbotData.welcome);
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', resetChat);
        }

        resetChat();
        renderQuickReplies();
    }

    initAboutChatbot();
});

