class TodoController {
    constructor() {
        this.tasks = []; // This array acts as your database
        this.currentId = 1;
    }

    addTask(req, res) {
        const taskDescription = req.body.ele1;
        const priority = req.body.priority || 'medium';
        if (!taskDescription || taskDescription.trim() === "") {
            return res.redirect('/');
        }
        this.tasks.push({
            id: this.currentId++,
            description: taskDescription,
            priority: priority,
            completed: false
        });
        res.redirect('/');
    }

    showAllTasks(req, res) {
        res.render('index', { ejes: this.tasks });
    }

    editTask(req, res) {
        const taskId = parseInt(req.params.id);
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return res.status(404).send('Task not found');
        res.render('edit', { task });
    }

    updateTask(req, res) {
        const taskId = parseInt(req.params.id);
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return res.status(404).send('Task not found');
        task.description = req.body.ele1 || task.description;
        task.priority = req.body.priority || task.priority;
        res.redirect('/');
    }

    deleteTask(req, res) {
        const taskId = parseInt(req.params.id);
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        res.redirect('/');
    }

    showFilterPage(req, res) {
        res.render('filter', { filteredTasks: this.tasks });
    }

    filterTasks(req, res) {
        const priority = req.body.priority;
        let filteredTasks;
        if (priority === "all") {
            filteredTasks = this.tasks;
        } else {
            filteredTasks = this.tasks.filter(t => t.priority === priority);
        }
        res.render('filter', { filteredTasks });
    }
}

module.exports = new TodoController();