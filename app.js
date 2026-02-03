// Step 7: Implementing app logic for QuiltMore
// Log: Vanilla JS, HTML, CSS stack

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('project-form');
    const projectList = document.getElementById('project-list');
    const cancelEditBtn = document.getElementById('cancel-edit');
    const showFormBtn = document.getElementById('show-form-btn');
    let editingId = null;

    function getProjects() {
        return JSON.parse(localStorage.getItem('quiltmore-projects') || '[]');
    }

    function saveProjects(projects) {
        localStorage.setItem('quiltmore-projects', JSON.stringify(projects));
    }

    function renderProjects() {
        const projects = getProjects();
        projectList.innerHTML = '';
        if (projects.length === 0) {
            projectList.innerHTML = '<li>No Quilts yet.</li>';
            return;
        }
        projects.forEach((project, idx) => {
            const li = document.createElement('li');
            li.className = 'project-item';
            li.innerHTML = `
                <strong>${project.name}</strong>
                <span>${project.desc}</span>
                <span>Start: ${new Date(project.start).toLocaleString()}</span>
                <span>End: ${new Date(project.end).toLocaleString()}</span>
                <div class="project-actions">
                    <button data-edit="${project.id}">Edit</button>
                    <button data-delete="${project.id}">Delete</button>
                </div>
            `;
            projectList.appendChild(li);
        });
    }

    function resetForm() {
        form.reset();
        editingId = null;
        document.getElementById('project-id').value = '';
        form.querySelector('button[type="submit"]').textContent = 'Add Project';
        cancelEditBtn.style.display = 'none';
        form.style.display = 'none';
        showFormBtn.style.display = 'inline-block';
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('project-id').value || Date.now().toString();
        const name = document.getElementById('project-name').value.trim();
        const desc = document.getElementById('project-desc').value.trim();
        const start = document.getElementById('project-start').value;
        const end = document.getElementById('project-end').value;
        if (!name || !desc || !start || !end) return;
        let projects = getProjects();
        if (editingId) {
            projects = projects.map(p => p.id === editingId ? { id, name, desc, start, end } : p);
        } else {
            projects.push({ id, name, desc, start, end });
        }
        saveProjects(projects);
        renderProjects();
        resetForm();
    });

    projectList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const id = e.target.getAttribute('data-edit') || e.target.getAttribute('data-delete');
            let projects = getProjects();
            if (e.target.hasAttribute('data-edit')) {
                const project = projects.find(p => p.id === id);
                if (project) {
                    document.getElementById('project-id').value = project.id;
                    document.getElementById('project-name').value = project.name;
                    document.getElementById('project-desc').value = project.desc;
                    document.getElementById('project-start').value = project.start;
                    document.getElementById('project-end').value = project.end;
                    editingId = id;
                    form.querySelector('button[type="submit"]').textContent = 'Update Project';
                    cancelEditBtn.style.display = 'inline-block';
                }
            } else if (e.target.hasAttribute('data-delete')) {
                projects = projects.filter(p => p.id !== id);
                saveProjects(projects);
                renderProjects();
                resetForm();
            }
        }
    });

    cancelEditBtn.addEventListener('click', resetForm);

    showFormBtn.addEventListener('click', () => {
        form.style.display = 'block';
        showFormBtn.style.display = 'none';
    });

    renderProjects();
});
