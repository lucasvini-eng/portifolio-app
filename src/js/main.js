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
            title: "Dashboard Management (Power BI)",
            category: "dados",
            status: "completed",
            statusText: "Completed ✅",
            desc: "Orchestration of interactive analytical views integrated into a customized web interface, accelerating decisions based on operational metrics..",
            tech: ["Tailwind CSS", "JavaScript", "Power BI Embedded", "ETL", "Power Query"],
            codeUrl: "https://github.com/LucasVini-eng/lveProject-001-DashboardManager-PowerBI",
            demoUrl: "https://lucasvini-eng.github.io/Project-001-DashboardManager-PowerBI/"
        },
        {
            id: 2,
            title: "Link Shortening System (LSS)",
            category: "software",
            status: "completed",
            statusText: "Completed ✅",
            desc: "A web-based URL shortening system that generates short, secure links, with a focus on simplicity, security, and traceability.",
            tech: ["Python", "Streamlit", "Validators", "Pyshorteners", "Streamlit Community Cloud"],
            codeUrl: "https://github.com/LucasVini-eng/Project-002-LinkShorteningSystem-LSS",
            demoUrl: "https://project-002-linkshorteningsystem-lss.streamlit.app/"
        },
        {
            id: 3,
            title: "Quote Monitor ($)",
            category: "automacao",
            status: "completed",
            statusText: "Completed ✅",
            desc: "Robotic Process Automation (RPA) for continuous monitoring of market quotes, automating the collection, processing, and dissemination of strategic information",
            tech: ["Python", "Selenium", "Google Cloud", "Google Sheets API", "Web Scraping", "Streamlit", "Data Egineering", "ETL"],
            codeUrl: "https://github.com/LucasVini-eng/Project-003-quoteFinance-RPA",
            demoUrl: "https://project-003-quotefinance-rpa-btxecz6b27dmwymtsnruyd.streamlit.app/"
        },
        {
            id: 4,
            title: "Absence Tracking (HR)",
            category: "software",
            status: "dev",
            statusText: "In Development ⛏️",
            desc: "An internal platform for automating requests, approvals, and tracking of vacation and leave, featuring a calendar, notifications, and dashboards for HR.",
            tech: ["Python", "Django", "AWS RSD", "PostgreSQL", "Streamlit"],
            codeUrl: "https://lucasvini-eng.github.io/project-announcement-2/",
            demoUrl: "https://lucasvini-eng.github.io/project-announcement-2/"
        },
        {
            id: 6,
            title: "Task Management API",
            category: "software",
            status: "completed",
            statusText: "Completed ✅",
            desc: "The project that was developed is an API for managing tasks, using Java and the Spring Boot framework. First, users are registered and validated, and their passwords are encrypted in the H2 database. Then, tasks are created and assigned to their respective users; they can be updated and organized into lists.",
            tech: ["Java", "Spring Boot", "API REST"],
            codeUrl: "https://github.com/LucasVini-eng/Project-005-TaskList-API",
            demoUrl: "https://www.linkedin.com/posts/lucas-vinicius-ds_projeto-gerenciamento-de-tarefas-por-api-ugcPost-7398842285439758336-AbWo/?utm_source=share&utm_medium=member_desktop&rcm=ACoAADQ9xY4Bq9hbYyIilymoH1vo69oq8gsEDaE"
        }
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
                           class="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-accent border border-accent text-white text-sm font-semibold py-2.5 hover:bg-accent-hover hover:border-accent-hover transition-all">
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
            'Software engineer & QA / Security Testing',
            '👋🏾Welcome my to projects!',
            'Scalability, Efficiency & Security'
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

    // --- About Chatbot Implementation ---
    function initAboutChatbot() {
        const chatMessages = document.getElementById('chat-messages');
        const chatForm = document.getElementById('chat-form');
        const chatInput = document.getElementById('chat-input');
        const quickRepliesContainer = document.getElementById('chat-quick-replies');
        const resetBtn = document.getElementById('chat-reset-btn');

        if (!chatMessages || !chatForm || !chatInput || !quickRepliesContainer) return;

        const chatbotData = {
            welcome: `Olá! Sou o assistente virtual do **Lucas Vinicius**.`,
            flows: [
                {
                    id: 'qa',
                    label: '🎯 Especialidade & QA',
                    query: 'Qual é a sua especialidade e atuação em QA?',
                    keywords: ['qa', 'qualidade', 'teste', 'test', 'segurança', 'security', 'especialidade', 'vulnerabilidade', 'bug', 'bugs', 'assurance', 'unit'],
                    response: `Sou **Engenheiro de Software especializado em Software Security Testing / QA** e bacharel em Sistemas de Informação.\n\n• **Foco:** Garantir alta confiabilidade, segurança e maturidade de código antes que chegue a produção.\n• **Prática:** Desenvolvimento orientado a testes, testes unitários, testes de integração e automação com **Selenium**.\n• **Segurança:** Testes de segurança em aplicações e APIs para mitigação preventiva de vulnerabilidades e regras de negócio críticas.`
                },
                {
                    id: 'stack',
                    label: '🛠️ Tecnologias & Stack',
                    query: 'Quais tecnologias você usa no dia a dia?',
                    keywords: ['stack', 'tecnologia', 'tecnologias', 'ferramenta', 'ferramentas', 'python', 'java', 'spring', 'fastapi', 'selenium', 'django', 'gcp', 'aws', 'infra', 'nuvem', 'cloud'],
                    response: `No meu dia a dia de trabalho, utilizo:\n\n• **Linguagens & Frameworks:** Python, Java, Spring Boot, FastAPI e Django\n• **Qualidade & Testes:** Selenium, testes unitários e automação de testes\n• **Bancos de Dados:** PostgreSQL, modelagem relacional, SQL e NoSQL\n• **Cloud & Infraestrutura:** Google Cloud Platform (GCP) e Amazon Web Services (AWS)\n• **Automação & Integração:** N8N, RPA, Web Scraping e pipelines de CI/CD.`
                },
                {
                    id: 'problems',
                    label: '🧩 Resolução de Problemas',
                    query: 'Qual é a sua abordagem para resolver problemas complexos?',
                    keywords: ['problema', 'problemas', 'complexo', 'complexos', 'negocio', 'impacto', 'business', 'solucao', 'valor', 'decisao'],
                    response: `Gosto muito de **resolver problemas complexos que muitas vezes parecem simples, mas têm um impacto direto no negócio**.\n\n• Muitos gargalos técnicos ou vulnerabilidades parecem triviais, mas geram custos altos ou riscos operacionais se ignorados.\n• Minha abordagem une análise de requisitos de negócio, testes rigorosos e código limpo para construir soluções sustentáveis que geram valor real.`
                },
                {
                    id: 'transition',
                    label: '🔄 Transição de Dados para Dev',
                    query: 'Como foi sua transição de Ciência de Dados para Software?',
                    keywords: ['dado', 'dados', 'data', 'ciencia', 'transicao', 'migracao', 'trajetoria', 'carreira', 'historico', 'power bi'],
                    response: `Iniciei meus estudos e graduação na área de **Ciência de Dados**, mas migrei completamente para o **desenvolvimento de software**.\n\nO principal diferencial é que **trouxe comigo todo o conhecimento relevante**:\n• Visão analítica para modelagem de banco de dados e arquitetura de dados;\n• Facilidade com pipelines de dados (ETL/ELT), scripts e automação de processos;\n• Domínio de métricas para suporte à tomada de decisões em projetos de software.`
                },
                {
                    id: 'apis',
                    label: '⚡ APIs, Testes & Automação',
                    query: 'Qual sua experiência com desenvolvimento de APIs e automação?',
                    keywords: ['api', 'apis', 'rest', 'backend', 'automacao', 'rpa', 'selenium', 'scraping', 'unitarios', 'banco', 'database'],
                    response: `Tenho ampla experiência com:\n\n• **Desenvolvimento de APIs:** Criação de APIs REST robustas, rápidas e seguras com **FastAPI, Spring Boot e Django**;\n• **Qualidade & Testes Unitários:** Implementação de suítes de testes unitários para garantir regras estáveis;\n• **Bancos de Dados & Automação:** Gestão de bancos de dados relacionais e automação de processos com **Selenium** e RPA.`
                },
                {
                    id: 'contact',
                    label: '💼 Contato & Parceria',
                    query: 'Como podemos trabalhar juntos ou marcar uma conversa?',
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
            // Links [title](url)
            escaped = escaped.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-accent underline hover:text-accent-hover font-medium">$1</a>');
            // Bold **text**
            escaped = escaped.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
            // Bullets • text
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
                    handleUserQuestion(flow.query, flow.response);
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

        function findBestResponse(userText) {
            const normalizedQuery = normalizeText(userText);
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

            return `Sou **Engenheiro de Software especializado em Software Security Testing / QA** e bacharel em Sistemas de Informação. Trabalho com **Python, Java, Spring Boot, FastAPI, Selenium, Django, bancos de dados e GCP/AWS**.\n\nGosto de resolver problemas complexos com impacto direto no negócio e trouxe toda a minha bagagem de Ciência de Dados para o desenvolvimento de software.\n\nSe quiser explorar detalhes específicos, clique nas perguntas frequentes abaixo ou pergunte sobre minha atuação em QA, stack, resolução de problemas ou formas de contato!`;
        }

        function handleUserQuestion(question, forcedResponse = null) {
            appendMessage('user', question);
            showTypingIndicator();

            const response = forcedResponse || findBestResponse(question);

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
            handleUserQuestion(text);
        });

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                chatMessages.innerHTML = '';
                appendMessage('bot', chatbotData.welcome);
            });
        }

        // Initialize chat
        appendMessage('bot', chatbotData.welcome);
        renderQuickReplies();
    }

    initAboutChatbot();
});

