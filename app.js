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
        // Categorize projects
        const planned = projects.filter(p => !p.start && !p.end);
        const inProgress = projects.filter(p => p.start && !p.end);
        const completed = projects.filter(p => p.start && p.end);

        // Tab UI
        projectList.innerHTML = `
            <div class="tabs">
                <button class="tab-btn" data-tab="in-progress">In Progress</button>
                <button class="tab-btn" data-tab="completed">Completed</button>
                <button class="tab-btn" data-tab="planned">Planned</button>
            </div>
            <div class="tab-content" id="tab-in-progress"></div>
            <div class="tab-content" id="tab-completed" style="display:none;"></div>
            <div class="tab-content" id="tab-planned" style="display:none;"></div>
        `;
        // Render projects in each tab
        function renderTab(list, containerId) {
            const container = projectList.querySelector(containerId);
            if (list.length === 0) {
                container.innerHTML = '<li>No projects.</li>';
                return;
            }
            list.forEach(project => {
                const li = document.createElement('li');
                li.className = 'project-item';
                // Determine status
                let status = '';
                let statusText = '';
                if (!project.end && project.start) {
                    status = 'in-progress';
                    statusText = 'In Progress';
                } else if (project.start && project.end) {
                    status = 'complete';
                    statusText = 'Complete';
                } else if (!project.start && !project.end) {
                    status = 'planned';
                    statusText = 'Planned';
                }
                li.innerHTML = `
                    <div style="position:relative;">
                        <span style="position:absolute;top:0;right:0;">
                            <span class="status-circle ${status}" title="${statusText}"></span>
                            <span class="status-tooltip" style="display:none;">${status === 'in-progress' ? 'End time missing. Project is ongoing.' : (status === 'complete' ? 'Project has both start and end time. Marked complete.' : 'Project has no start or end time. Planned.')}</span>
                        </span>
                        <strong>${project.name}</strong>
                    </div>
                    <span>${project.desc}</span>
                    <span>Start: ${project.start ? new Date(project.start).toLocaleString() : '-'}</span>
                    <span>End: ${project.end ? new Date(project.end).toLocaleString() : '-'}</span>
                    <div class="project-actions">
                        <button data-edit="${project.id}">Edit</button>
                        <button data-delete="${project.id}">Delete</button>
                    </div>
                `;
                // Tooltip show/hide logic
                const statusCircle = li.querySelector('.status-circle');
                const tooltip = li.querySelector('.status-tooltip');
                if (statusCircle && tooltip) {
                    statusCircle.addEventListener('mouseenter', () => {
                        tooltip.style.display = 'block';
                    });
                    statusCircle.addEventListener('mouseleave', () => {
                        tooltip.style.display = 'none';
                    });
                }
                container.appendChild(li);
            });
        }
        renderTab(inProgress, '#tab-in-progress');
        renderTab(completed, '#tab-completed');
        renderTab(planned, '#tab-planned');
        // Tab switching logic
        const tabBtns = projectList.querySelectorAll('.tab-btn');
        const tabContents = projectList.querySelectorAll('.tab-content');
        tabBtns.forEach((btn, idx) => {
            btn.addEventListener('click', () => {
                tabContents.forEach(tc => tc.style.display = 'none');
                projectList.querySelector(`#tab-${btn.dataset.tab}`).style.display = 'block';
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
        // Show In Progress tab by default and highlight it
        projectList.querySelector('#tab-in-progress').style.display = 'block';
        tabBtns[0].classList.add('active');
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
        if (!name || !desc) return; // Only name and description are mandatory
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
