import { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface Task {
  id: string;
  name: string;
  points: number;
  description: string;
  completed: boolean;
  cooldown?: string;
}

export default function EarnPoints() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 'daily-login',
      name: 'Daily Login',
      points: 50,
      description: 'Login daily to earn points',
      completed: false,
    },
    {
      id: 'refer-friend',
      name: 'Refer a Friend',
      points: 200,
      description: 'Invite friends to join the platform',
      completed: false,
    },
    {
      id: 'social-share',
      name: 'Share on Social',
      points: 100,
      description: 'Share your achievements on social media',
      completed: false,
      cooldown: '24h',
    },
  ]);

  const completeTask = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: true } : task
    ));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map(task => (
          <div key={task.id} className="card p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">{task.name}</h3>
              <span className="text-green-500 font-bold">+{task.points} pts</span>
            </div>
            <p className="text-gray-400 mb-4">{task.description}</p>
            {task.cooldown && (
              <p className="text-sm text-gray-500 mb-4">Cooldown: {task.cooldown}</p>
            )}
            <button
              onClick={() => completeTask(task.id)}
              disabled={task.completed}
              className={`w-full py-2 px-4 rounded-lg ${
                task.completed
                  ? 'bg-green-500/20 text-green-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {task.completed ? (
                <span className="flex items-center justify-center">
                  <CheckCircleIcon className="h-5 w-5 mr-2" />
                  Completed
                </span>
              ) : (
                'Complete Task'
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 
