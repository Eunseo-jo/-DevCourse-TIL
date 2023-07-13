export default function TaskManager() {
    const tasks = [];

    this.addTask = (task) => {
        tasks.push(task);
    };

    this.run = async () => {
        if (tasks.length > 0) {
            const task = tasks.shift();
            await task();
            this.run();
        }
    };
}
