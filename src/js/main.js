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
            status: "concluido",
            statusText: "Concluído",
            desc: "Orquestração de visões analíticas interativas integradas a uma interface web personalizada, acelerando decisões baseadas em indicadores operacionais.",
            tech: ["Tailwind CSS", "JavaScript", "Power BI Embedded", "ETL", "Power Query"],
            codeUrl: "https://github.com/LucasVini-eng/lveProject-001-DashboardManager-PowerBI",
            demoUrl: "https://lucasvini-eng.github.io/Project-001-DashboardManager-PowerBI/"
        },
        {
            id: 2,
            title: "Fluxo de Ausências (RH)",
            category: "software",
            status: "desenvolvimento",
            statusText: "Em Desenvolvimento",
            desc: "Plataforma interna para automatizar solicitações, aprovações e controle de férias e afastamentos, com calendário, notificações e dashboards para o RH",
            tech: ["Python", "Django", "AWS RSD", "PostgreSQL", "React"],
            codeUrl: "https://lucasvini-eng.github.io/project-announcement-2/",
            demoUrl: "https://lucasvini-eng.github.io/project-announcement-2/"
        },
        {
            id: 3,
            title: "Financial Control ($)",
            category: "software",
            status: "desenvolvimento",
            statusText: "Em desenvolvimento",
            desc: "Aplicação desktop desenvolvida em Java para gerenciamento de finanças, permitindo cadastrar e acompanhar receitas, despesas e categorias, além de consultar o saldo financeiro.",
            tech: ["Java", "PostgreSQL"],
            codeUrl: "https://lucasvini-eng.github.io/project-announcement-1/",
            demoUrl: "https://lucasvini-eng.github.io/project-announcement-1/"
        },
        {
            id: 4,
            title: "Quote Monitor ($)",
            category: "automacao",
            status: "concluido",
            statusText: "Concluído",
            desc: "Robô de automação (RPA) para monitoramento contínuo de cotações, automatizando a coleta, processamento e disponibilização de informações estratégicas",
            tech: ["Python", "Selenium", "Google Cloud", "Google Sheets API", "Web Scraping", "Streamlit", "Streamlit Community Cloud"],
            codeUrl: "https://github.com/LucasVini-eng/Project-003-quoteFinance-RPA",
            demoUrl: "https://project-003-quotefinance-rpa-btxecz6b27dmwymtsnruyd.streamlit.app/"
        },

        {
            id: 5,
            title: "Link Shortening System (LSS)",
            category: "software",
            status: "concluido",
            statusText: "Concluído",
            desc: "Sistema web de encurtamento de URLs gerando links curtos e seguros, com foco em simplicidade, segurança e rastreabilidade.",
            tech: ["Python", "Streamlit", "Validators", "Pyshorteners", "Streamlit Community Cloud"],
            codeUrl: "https://github.com/LucasVini-eng/Project-002-LinkShorteningSystem-LSS",
            demoUrl: "https://project-002-linkshorteningsystem-lss.streamlit.app/"
        },
        {
            id: 6,
            title: "Task Management API",
            category: "software",
            status: "concluido",
            statusText: "Concluído",
            desc: "O projeto que foi desenvolvido é uma API para gerenciar tarefas, utilizando Java e o framework Spring Boot. Primeiro, realiza-se o cadastro e a validação dos usuários e criptografia de senha no banco de dados H2. Depois, as tarefas são criadas e associadas aos seus respectivos usuários, podendo ser atualizadas e organizadas em listas.",
            tech: ["Java", "Spring Boot", "API REST"],
            codeUrl: "https://github.com/LucasVini-eng/Project-005-TaskList-API",
            demoUrl: "https://www.linkedin.com/posts/lucas-vinicius-ds_projeto-gerenciamento-de-tarefas-por-api-ugcPost-7398842285439758336-AbWo/?utm_source=share&utm_medium=member_desktop&rcm=ACoAADQ9xY4Bq9hbYyIilymoH1vo69oq8gsEDaE"
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
                    <p class="text-slate-400 text-lg mb-0">Nenhum projeto encontrado com os termos pesquisados.</p>
                </div>
            `;
            return;
        }

        filtered.forEach((p, index) => {
            const col = document.createElement('div');
            col.className = 'animate-slide-up';
            col.style.animationDelay = `${index * 0.08}s`;

            let statusClass = 'status-concluido';
            if (p.status === 'producao') statusClass = 'status-producao';
            if (p.status === 'desenvolvimento') statusClass = 'status-desenvolvimento';

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
        concluido: projects.filter(p => p.status === 'concluido').length,
        desenvolvimento: projects.filter(p => p.status === 'desenvolvimento').length,
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
                        _subject: `Novo contato de ${nameInput.value}`
                    })
                });

                if (!response.ok) throw new Error('Falha no envio');

                toast.classList.remove('error');
                if (toastIcon) toastIcon.className = 'ph ph-check-circle toast-icon';
                toastMessage.textContent = 'Mensagem enviada com sucesso!';
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
        sobre: '~/portfolio/sobre.js',
        projetos: '~/portfolio/projetos.js',
        contatos: '~/portfolio/contatos.js',
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

    // Mobile menu (no Bootstrap dependency)
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

    // Scroll reveal for sections
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

    // Count-up hero stats when they enter view
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
    if (completedEl) completedEl.setAttribute('data-count-target', projectCounts.concluido);
    if (activeEl) activeEl.setAttribute('data-count-target', projectCounts.desenvolvimento);

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

    // Hero typewriter — cycles real skill taglines, respects reduced motion
    const typeTarget = document.getElementById('hero-typewriter');
    if (typeTarget && !prefersReducedMotion) {
        const phrases = [
            'ENGENHEIRO DE SOFTWARE',
            'ENGENHARIA DE DADOS',
            'ANÁLISE DE SISTEMAS'
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
        typeTarget.textContent = 'ENGENHEIRO DE SOFTWARE';
    }
});
