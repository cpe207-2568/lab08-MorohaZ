import { useState } from 'react';
import { FaCheck, FaTrash } from 'react-icons/fa'; // Import icons for Done and Delete buttons

function App() {
  // Define the structure for a Task
  interface Task {
    id: number;
    title: string;
    description: string;
    isDone: boolean;
  }

  // State to manage the list of tasks
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'อ่านหนังสือ', description: 'Vite + React + Bootstrap + TS', isDone: false },
    { id: 2, title: 'เขียนโค้ด', description: 'ทำโปรเจกต์สำหรับชั้นเรียน', isDone: false },
    { id: 3, title: 'ปรับใช้แอป', description: 'อัปโหลดโปรเจกต์ไปที่ GitHub Pages', isDone: true }, // Example of a completed task
  ]);

  // State for the new task input fields
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newTaskDescription, setNewTaskDescription] = useState<string>('');

  // Function to add a new task
  const addTask = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    if (newTaskTitle.trim() === '') {
      // Basic validation: Don't add empty tasks
      alert('โปรดป้อนชื่อเรื่องสำหรับงาน'); // Using alert for simplicity, consider a custom modal for better UX
      return;
    }

    const newId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
    const newTask: Task = {
      id: newId,
      title: newTaskTitle.trim(),
      description: newTaskDescription.trim(),
      isDone: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle(''); // Clear input after adding
    setNewTaskDescription(''); // Clear description after adding
  };

  // Function to toggle the 'isDone' status of a task
  const toggleDone = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, isDone: !task.isDone } : task
    ));
  };

  // Function to delete a task
  const deleteTask = (id: number) => {
    // Confirmation dialog before deleting
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบงานนี้?')) { // Using window.confirm for simplicity
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  return (
    <div className="d-flex flex-column min-h-screen"> {/* Use min-h-screen for full height */}
      {/* Header ด้านบน */}
      <header className="bg-primary text-white p-3 shadow-md"> {/* Added padding and shadow */}
        <h4 className="text-xl font-semibold">แอปบันทึกย่อ</h4> {/* Increased font size */}
      </header>

      <div className="flex-grow-1 d-flex"> {/* Use flex-grow-1 for content to expand */}
        {/* Sidebar ด้านซ้าย */}
        <aside
          className="d-flex flex-column p-4 bg-gray-100 border-r border-gray-200" // Tailwind classes for background and border
          style={{ width: '250px' }} // Slightly wider sidebar
        >
          {/* เมนูด้านบน */}
          <nav className="nav flex-column gap-3"> {/* Increased gap */}
            <h5 className="text-lg font-medium text-gray-700">เมนู</h5> {/* Styled heading */}
            <a className="nav-link text-blue-600 hover:text-blue-800 active" href="#"> {/* Styled links */}
              หน้าแรก
            </a>
            <a className="nav-link text-blue-600 hover:text-blue-800" href="#">
              รายการ
            </a>
            <a className="nav-link text-blue-600 hover:text-blue-800" href="#">
              เกี่ยวกับ
            </a>
          </nav>

          {/* แสดงชื่อผู้ใช้ด้านล่าง */}
          <div className="mt-auto fw-bold text-muted text-sm"> {/* mt-auto pushes to bottom, text-sm for smaller text */}
            <p>chanadda : admin</p>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-grow-1 p-4 bg-gray-50"> {/* Added background color for main content */}
          <main className="container mx-auto"> {/* Centered container */}
            {/* Input form for new tasks */}
            <div className="mb-4 p-4 bg-white rounded-lg shadow-sm"> {/* Styled input area */}
              <form onSubmit={addTask} className="row g-3 align-items-end"> {/* Use g-3 for gutter */}
                <div className="col-md-5">
                  <label htmlFor="taskTitle" className="form-label text-gray-700">ชื่อเรื่องงาน</label>
                  <input
                    id="taskTitle"
                    className="form-control rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    type="text"
                    placeholder="ใส่ชื่อเรื่องงานที่นี่..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                  />
                </div>
                <div className="col-md-5">
                  <label htmlFor="taskDescription" className="form-label text-gray-700">รายละเอียด</label>
                  <input
                    id="taskDescription"
                    className="form-control rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    type="text"
                    placeholder="ใส่รายละเอียดงานที่นี่..."
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <button type="submit" className="btn btn-primary w-full rounded-md shadow-sm">
                    เพิ่มงาน
                  </button>
                </div>
              </form>
            </div>

            {/* Task List */}
            <div className="space-y-3"> {/* Added space between cards */}
              {tasks.map(task => (
                <div key={task.id} className={`card rounded-lg shadow-sm ${task.isDone ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
                  <div className="card-body p-4">
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <h5 className={`card-title text-lg font-medium ${task.isDone ? 'text-green-700 line-through' : 'text-gray-900'}`}>
                          {task.title}
                        </h5>
                      </div>
                      <div className="col-md-4">
                        <p className={`card-text text-gray-600 ${task.isDone ? 'line-through' : ''}`}>
                          {task.description}
                        </p>
                      </div>
                      <div className="col-md-4 d-flex justify-content-end gap-2"> {/* Right align buttons and add gap */}
                        <button
                          className={`btn btn-sm rounded-md shadow-sm ${task.isDone ? 'btn-warning' : 'btn-success'}`}
                          onClick={() => toggleDone(task.id)}
                        >
                          {task.isDone ? <FaCheck className="inline-block mr-1" /> : <FaCheck className="inline-block mr-1" />}
                          {task.isDone ? 'ยกเลิก' : 'เสร็จสิ้น'}
                        </button>
                        <button
                          className="btn btn-sm btn-danger rounded-md shadow-sm"
                          onClick={() => deleteTask(task.id)}
                        >
                          <FaTrash className="inline-block mr-1" />
                          ลบ
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Footer ด้านล่าง */}
      <footer className="text-secondary text-center p-3 bg-light border-t border-gray-200"> {/* Added padding, background, and border */}
        Copyright © 2026 chanadda thanyaratthanon 67062039
      </footer>
    </div>
  );
}

export default App;
