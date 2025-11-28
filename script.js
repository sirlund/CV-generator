// Global state
let currentLanguage = 'es';
let currentVersion = 'specialist';

// Helper: Get nested property from object using dot notation
function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}

// Helper: Update all elements with data-i18n attributes
function updateTranslations(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    const data = content[lang];

    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const value = getNestedValue(data, key);

        if (value !== undefined) {
            el.innerHTML = value;
        }
    });
}

// Helper: Render job items for main content
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

// Helper: Render main content (this still needs to generate HTML due to variable number of jobs)
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

// Update role dynamically (since it changes per version)
function updateRole(lang, version) {
    const roleElement = document.getElementById('dynamicRole');
    const versionData = content[lang][version];
    roleElement.innerHTML = versionData.role;
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
    // Update all sidebar translations
    updateTranslations(lang);

    // Update role (version-specific)
    updateRole(lang, version);

    // Update main content (still dynamic HTML due to variable job lists)
    const contentSpecialist = document.getElementById('content-specialist');
    const contentProduct = document.getElementById('content-product');
    const contentLead = document.getElementById('content-lead');

    contentSpecialist.innerHTML = renderMainContent(lang, 'specialist');
    contentProduct.innerHTML = renderMainContent(lang, 'product');
    contentLead.innerHTML = renderMainContent(lang, 'lead');

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

    // Update role and main content for current language and version
    updateRole(currentLanguage, type);

    // Show correct content section
    const contentSpecialist = document.getElementById('content-specialist');
    const contentProduct = document.getElementById('content-product');
    const contentLead = document.getElementById('content-lead');

    contentSpecialist.classList.remove('active');
    contentProduct.classList.remove('active');
    contentLead.classList.remove('active');
    document.getElementById('content-' + type).classList.add('active');
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

    // Load initial content (ES, Specialist)
    updateContent(currentLanguage, currentVersion);

    // Show specialist skills by default
    document.getElementById('skills-specialist').style.display = 'block';
}
