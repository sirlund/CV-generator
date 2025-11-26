function switchVersion(type) {
    // Animar el fondo del toggle
    const bg = document.getElementById('toggleBg');
    const btnSpecialist = document.getElementById('btn-specialist');
    const btnLead = document.getElementById('btn-lead');

    // Title & Skills Logic
    const roleTitle = document.getElementById('dynamicRole');
    const skillsSpec = document.getElementById('skills-specialist');
    const skillsLead = document.getElementById('skills-lead');

    if (type === 'lead') {
        bg.style.left = btnSpecialist.offsetWidth + 4 + 'px';
        bg.style.width = btnLead.offsetWidth + 'px';
        btnSpecialist.classList.remove('active');
        btnLead.classList.add('active');

        roleTitle.innerHTML = 'Product Design Lead &<br>SaaS Strategy';
        skillsSpec.style.display = 'none';
        skillsLead.style.display = 'block';
    } else {
        bg.style.left = '4px';
        bg.style.width = btnSpecialist.offsetWidth + 'px';
        btnLead.classList.remove('active');
        btnSpecialist.classList.add('active');

        roleTitle.innerHTML = 'Senior Product Designer &<br>Design Systems Specialist';
        skillsSpec.style.display = 'block';
        skillsLead.style.display = 'none';
    }

    // Switch Content
    document.querySelectorAll('.cv-content').forEach(div => div.classList.remove('active'));
    document.getElementById('content-' + type).classList.add('active');
}

function generatePDF() {
    const element = document.querySelector('.paper');
    const opt = {
        margin: 0,
        filename: 'Nicolas_Lundin_CV.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // New Promise-based usage:
    html2pdf().set(opt).from(element).save();
}

// Set initial state
window.onload = function () {
    const btnSpecialist = document.getElementById('btn-specialist');
    document.getElementById('toggleBg').style.width = btnSpecialist.offsetWidth + 'px';
}
