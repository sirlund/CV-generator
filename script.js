// Switch between CV versions (Specialist / Lead)
function switchVersion(type) {
    const bg = document.getElementById('toggleBg');
    const btnSpecialist = document.getElementById('btn-specialist');
    const btnLead = document.getElementById('btn-lead');
    const roleTitle = document.getElementById('dynamicRole');
    const skillsSpec = document.getElementById('skills-specialist');
    const skillsLead = document.getElementById('skills-lead');

    if (type === 'lead') {
        // Update toggle UI
        bg.style.left = btnSpecialist.offsetWidth + 4 + 'px';
        bg.style.width = btnLead.offsetWidth + 'px';
        btnSpecialist.classList.remove('active');
        btnLead.classList.add('active');

        // Update content
        roleTitle.innerHTML = 'Product Design Lead &<br>SaaS Strategy';
        skillsSpec.style.display = 'none';
        skillsLead.style.display = 'block';
    } else {
        // Update toggle UI
        bg.style.left = '4px';
        bg.style.width = btnSpecialist.offsetWidth + 'px';
        btnLead.classList.remove('active');
        btnSpecialist.classList.add('active');

        // Update content
        roleTitle.innerHTML = 'Senior Product Designer &<br>Design Systems Specialist';
        skillsSpec.style.display = 'block';
        skillsLead.style.display = 'none';
    }

    // Switch CV content sections
    document.querySelectorAll('.cv-content').forEach(div => div.classList.remove('active'));
    document.getElementById('content-' + type).classList.add('active');
}

// Generate PDF using browser's native print
function generatePDF() {
    window.print();
}

// Initialize on page load
window.onload = function () {
    const btnSpecialist = document.getElementById('btn-specialist');
    document.getElementById('toggleBg').style.width = btnSpecialist.offsetWidth + 'px';
}
