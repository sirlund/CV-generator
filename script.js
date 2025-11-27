// Global state
let currentLanguage = 'es';
let currentVersion = 'specialist';

// Helper: Render job items
function renderJobs(jobs) {
    return jobs.map(job => `
        <div class="job-item">
            <div class="job-title">${job.company} | ${job.role}</div>
            <div class="job-meta">${job.date}</div>
            <ul class="job-details">
                ${job.details.map(detail => `<li>${detail}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

// Helper: Render main content
function renderMainContent(lang, version) {
    const data = content[lang][version];
    const profileTitle = lang === 'es' ? 'Perfil Profesional' : 'Professional Profile';
    const sectionTitle = data.sectionTitle || 'Professional Experience';

    return `
        <h3>${profileTitle}</h3>
        <p class="profile-intro">${data.profile}</p>
        <h3>${sectionTitle}</h3>
        ${renderJobs(data.jobs)}
    `;
}

// Helper: Update sidebar
function updateSidebar(lang, version) {
    const sidebarData = content[lang].sidebar;

    // Update Projects
    const projectsContainer = document.querySelector('.sidebar > div:nth-child(2)');
    projectsContainer.innerHTML = `
        <h3>${sidebarData.projects.title}</h3>
        ${sidebarData.projects.items.map(item => `
            <div class="side-project-item">
                <span class="sp-title">${item.title}</span>
                <span class="sp-meta">${item.meta}</span>
                <div class="sp-desc">${item.desc}</div>
            </div>
        `).join('')}
    `;

    // Update Skills
    const skillsSpec = document.getElementById('skills-specialist');
    const skillsProduct = document.getElementById('skills-product');
    const skillsLead = document.getElementById('skills-lead');

    skillsSpec.innerHTML = `
        <h3>${sidebarData.skills.specialist.title}</h3>
        <div>
            ${sidebarData.skills.specialist.tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
        </div>
    `;

    skillsProduct.innerHTML = `
        <h3>${sidebarData.skills.product.title}</h3>
        <div>
            ${sidebarData.skills.product.tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
        </div>
    `;

    skillsLead.innerHTML = `
        <h3>${sidebarData.skills.lead.title}</h3>
        <div>
            ${sidebarData.skills.lead.tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
        </div>
    `;

    // Update Languages
    const languagesContainer = document.querySelector('.sidebar > div:nth-child(6)');
    languagesContainer.innerHTML = `
        <h3>${sidebarData.languages.title}</h3>
        ${sidebarData.languages.items.map(item => `<div class="contact-item">${item}</div>`).join('')}
    `;
}

// Switch language (ES / EN)
function switchLanguage(lang) {
    const bgLang = document.getElementById('toggleBgLang');
    const btnEs = document.getElementById('btn-es');
    const btnEn = document.getElementById('btn-en');

    currentLanguage = lang;

    if (lang === 'en') {
        // Update toggle UI
        bgLang.style.left = btnEs.offsetWidth + 3 + 'px';
        bgLang.style.width = btnEn.offsetWidth + 'px';
        btnEs.classList.remove('active');
        btnEn.classList.add('active');
    } else {
        // Update toggle UI
        bgLang.style.left = '3px';
        bgLang.style.width = btnEs.offsetWidth + 'px';
        btnEn.classList.remove('active');
        btnEs.classList.add('active');
    }

    // Update all content
    updateContent(lang, currentVersion);
}

// Update content for given language and version
function updateContent(lang, version) {
    const data = content[lang][version];

    // Update role title
    const roleTitle = document.getElementById('dynamicRole');
    roleTitle.innerHTML = data.role;

    // Update main content
    const contentSpecialist = document.getElementById('content-specialist');
    const contentProduct = document.getElementById('content-product');
    const contentLead = document.getElementById('content-lead');

    contentSpecialist.innerHTML = renderMainContent(lang, 'specialist');
    contentProduct.innerHTML = renderMainContent(lang, 'product');
    contentLead.innerHTML = renderMainContent(lang, 'lead');

    // Update sidebar
    updateSidebar(lang, version);

    // Show correct content section
    contentSpecialist.classList.remove('active');
    contentProduct.classList.remove('active');
    contentLead.classList.remove('active');
    document.getElementById('content-' + version).classList.add('active');
}

// Switch between CV versions (Specialist / Product / Lead)
function switchVersion(type) {
    const bg = document.getElementById('toggleBg');
    const btnSpecialist = document.getElementById('btn-specialist');
    const btnProduct = document.getElementById('btn-product');
    const btnLead = document.getElementById('btn-lead');
    const skillsSpec = document.getElementById('skills-specialist');
    const skillsProduct = document.getElementById('skills-product');
    const skillsLead = document.getElementById('skills-lead');

    currentVersion = type;

    // Remove active from all buttons
    btnSpecialist.classList.remove('active');
    btnProduct.classList.remove('active');
    btnLead.classList.remove('active');

    // Hide all skills by default
    skillsSpec.style.display = 'none';
    skillsProduct.style.display = 'none';
    skillsLead.style.display = 'none';

    // Calculate position and update toggle
    if (type === 'specialist') {
        bg.style.left = '4px';
        bg.style.width = btnSpecialist.offsetWidth + 'px';
        btnSpecialist.classList.add('active');
        skillsSpec.style.display = 'block';
    } else if (type === 'product') {
        bg.style.left = (btnSpecialist.offsetWidth + 4) + 'px';
        bg.style.width = btnProduct.offsetWidth + 'px';
        btnProduct.classList.add('active');
        skillsProduct.style.display = 'block';
    } else if (type === 'lead') {
        bg.style.left = (btnSpecialist.offsetWidth + btnProduct.offsetWidth + 8) + 'px';
        bg.style.width = btnLead.offsetWidth + 'px';
        btnLead.classList.add('active');
        skillsLead.style.display = 'block';
    }

    // Update content for current language
    updateContent(currentLanguage, type);
}

// Generate PDF using browser's native print
function generatePDF() {
    // Update document title for PDF filename
    const variant = currentVersion.charAt(0).toUpperCase() + currentVersion.slice(1);
    const lang = currentLanguage.toUpperCase();
    const originalTitle = document.title;

    // Only add language if not Spanish (native language)
    const langSuffix = currentLanguage === 'es' ? '' : ` (${lang})`;
    document.title = `Nicolas Lundin CV - ${variant}${langSuffix}`;

    // Trigger print dialog
    window.print();

    // Restore original title after a brief delay
    setTimeout(() => {
        document.title = originalTitle;
    }, 100);
}

// Initialize on page load
window.onload = function () {
    // Initialize version toggle
    const btnSpecialist = document.getElementById('btn-specialist');
    document.getElementById('toggleBg').style.width = btnSpecialist.offsetWidth + 'px';

    // Initialize language toggle
    const btnEs = document.getElementById('btn-es');
    document.getElementById('toggleBgLang').style.width = btnEs.offsetWidth + 'px';
}
