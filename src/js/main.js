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
            title: "Quote Monitor ($) API",
            category: "backend",
            status: "dev",
            statusText: "Em Manutenção",
            desc: "Sistema de API e automação para o monitoramento contínuo de cotações de mercado, automatizando a coleta, o processamento e a divulgação de informações das principais moedas e criptomoedas.",
            tech: ["Python", "Selenium", "Google Cloud", "Google Sheets API", "Web Scraping", "Streamlit", "Data Egineering", "FastAPI"],
            codeUrl: "https://github.com/LucasVini-eng/Project-001-QuoteMonitor",
            demoUrl: "https://sites.google.com/view/emmanuteno-quote-monitor/em-manutencao"
        },
        {
            id: 2,
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
            id: 3,
            title: "Dashboard Management (Power BI)",
            category: "dados",
            status: "completed",
            statusText: "Finalizado",
            desc: "Pipeline de ETL no BigQuery integrando lançamentos fiscais e contábeis, automação de conciliação bancária e geração de demonstrativos contábeis dinâmicos.",
            tech: ["GCP BigQuery", "Python", "SQL", "Power BI Embedded"],
            codeUrl: "https://github.com/LucasVini-eng/lveProject-001-DashboardManager-PowerBI",
            systemDesignUrl: "https://github.com/LucasVini-eng/lveProject-001-DashboardManager-PowerBI#system-design",
            demoUrl: "https://lucasvini-eng.github.io/Project-001-DashboardManager-PowerBI/"
        },
        {
            id: 6,
            title: "LVS Bio - Página de Alta Conversão",
            category: "comercial",
            categoryLabel: "Comercial",
            status: "completed",
            statusText: "Finalizado",
            desc: "Landing page de alta conversão para o setor comercial, otimizada para tráfego pago, com qualificação automática e direcionamento direto de leads para o WhatsApp comercial.",
            tech: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript", "Node.js"],
            codeUrl: "https://github.com/lucasvini-eng/lvsbio-page",
            systemDesignUrl: "https://github.com/lucasvini-eng/lvsbio-page#system-design",
            demoUrl: "https://lvsbio-page.vercel.app/"
        },
        {
            id: 7,
            title: "Gerenciador de Leads & CRM Comercial",
            category: "comercial",
            categoryLabel: "Comercial",
            status: "dev",
            statusText: "Em Desenvolvimento",
            desc: "Sistema centralizado de gestão comercial com funil de vendas, acompanhamento de oportunidades, registro de interações com clientes e cálculo de conversão.",
            tech: ["Java", "Spring Boot", "PostgreSQL", "Docker", "REST API"],
            codeUrl: "https://github.com/LucasVini-eng",
            systemDesignUrl: "https://github.com/LucasVini-eng",
            demoUrl: "https://sites.google.com/view/emmanuteno-quote-monitor/em-manutencao"
        },
        {
            id: 8,
            title: "Task & Workflow Management API",
            category: "administrativo",
            categoryLabel: "Administrativo",
            status: "completed",
            statusText: "Finalizado",
            desc: "API corporativa para gestão de tarefas, processos internos administrativos e controle de permissões por perfil (RBAC), com autenticação criptografada e histórico de ações.",
            tech: ["Java", "Spring Boot", "Spring Security", "H2 Database", "API REST"],
            codeUrl: "https://github.com/LucasVini-eng/Project-005-TaskList-API",
            systemDesignUrl: "https://github.com/LucasVini-eng/Project-005-TaskList-API#system-design",
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
                p.categoryLabel.toLowerCase().includes(q) ||
                p.tech.some(t => t.toLowerCase().includes(q));
            return matchesCategory && matchesSearch;
        });

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="col-span-full text-center py-16">
                    <p class="text-slate-400 text-lg mb-0">Nenhum projeto encontrado para os critérios pesquisados.</p>
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
                    <div class="flex justify-between items-start gap-2 mb-3">
                        <span class="font-mono text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                            ${p.categoryLabel}
                        </span>
                        <span class="status-badge ${statusClass}">
                            <span class="status-dot"></span> ${p.statusText}
                        </span>
                    </div>
                    <h3 class="font-display text-lg font-bold text-white mb-2">${p.title}</h3>
                    <p class="text-slate-400 text-sm leading-relaxed mb-5 flex-grow">${p.desc}</p>
                    <div class="grid grid-cols-3 gap-2 mb-5">
                        <a href="${p.codeUrl}" target="_blank" rel="noopener noreferrer" title="Código fonte no GitHub"
                           class="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/10 text-white text-xs font-medium py-2.5 px-2 hover:border-accent hover:bg-accent/10 hover:text-accent transition-all text-center">
                            <i class="ph ph-github-logo text-base shrink-0"></i> <span class="truncate">Código</span>
                        </a>
                        <a href="${p.systemDesignUrl}" target="_blank" rel="noopener noreferrer" title="System Design"
                           class="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/10 text-white text-xs font-medium py-2.5 px-2 hover:border-accent hover:bg-accent/10 hover:text-accent transition-all text-center">
                            <i class="ph ph-tree-structure text-base shrink-0"></i> <span class="truncate">System Design</span>
                        </a>
                        <a href="${p.demoUrl}" target="_blank" rel="noopener noreferrer" title="Acessar projeto"
                           class="inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent border border-accent text-white hover:text-darker text-xs font-semibold py-2.5 px-2 hover:bg-accent-hover hover:border-accent-hover transition-all text-center">
                            <i class="ph ph-arrow-square-out text-base shrink-0"></i> <span class="truncate">Acessar</span>
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
        const roleRadios = contactForm.querySelectorAll('input[name="user_role"]');
        const roleOptions = contactForm.querySelectorAll('.role-option');
        const roleError = document.getElementById('role-error');
        const messageInput = document.getElementById('message');

        roleRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                roleOptions.forEach(opt => opt.classList.remove('active', 'is-invalid'));
                if (roleError) roleError.classList.add('hidden');
                const parentLabel = radio.closest('.role-option');
                if (parentLabel) parentLabel.classList.add('active');

                if (messageInput) {
                    switch (radio.value) {
                        case 'CEO':
                            messageInput.placeholder = 'Descreva seu projeto, desafio de negócio ou parceria estratégica...';
                            break;
                        case 'Tech Recruiter':
                            messageInput.placeholder = 'Descreva a oportunidade, empresa e requisitos da vaga...';
                            break;
                        case 'Desenvolvedor':
                            messageInput.placeholder = 'Compartilhe uma ideia técnica, dúvida ou colaboração...';
                            break;
                        default:
                            messageInput.placeholder = 'Descreva resumidamente o projeto ou a necessidade...';
                            break;
                    }
                }
            });
        });

        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const form = this;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const submitBtn = form.querySelector('button[type="submit"]');
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toast-message');
            const toastIcon = toast ? toast.querySelector('.toast-icon') : null;

            const roleSelected = form.querySelector('input[name="user_role"]:checked');
            const isRoleValid = Boolean(roleSelected);

            if (!isRoleValid) {
                roleOptions.forEach(opt => opt.classList.add('is-invalid'));
                if (roleError) roleError.classList.remove('hidden');
            } else {
                roleOptions.forEach(opt => opt.classList.remove('is-invalid'));
                if (roleError) roleError.classList.add('hidden');
            }

            const fields = [nameInput, emailInput, messageInput];
            const isFormValid = form.checkValidity() && isRoleValid;
            fields.forEach(el => el && el.classList.toggle('is-invalid', !el.checkValidity()));
            if (!isFormValid) return;

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
                        sou: roleSelected.value,
                        perfil: roleSelected.value,
                        message: messageInput.value,
                        _subject: `[${roleSelected.value.toUpperCase()}] Novo contato de ${nameInput.value}`
                    })
                });

                if (!response.ok) throw new Error('Shipping error');

                toast.classList.remove('error');
                if (toastIcon) toastIcon.className = 'ph ph-check-circle toast-icon';
                toastMessage.textContent = 'Mensagem enviada com sucesso! ✅';
                toast.classList.add('show');

                form.reset();
                fields.forEach(el => el && el.classList.remove('is-invalid'));
                roleOptions.forEach(opt => opt.classList.remove('active', 'is-invalid'));
                if (roleError) roleError.classList.add('hidden');
                if (messageInput) {
                    messageInput.placeholder = 'Descreva resumidamente o projeto ou a necessidade...';
                }

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
});

