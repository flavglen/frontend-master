
"use client";

import { useState } from "react";
import "./kanban-board.css";

export function KanbanBoard() {
    const [boards, setBoards] = useState<Record<string, string[]>>({
        todo: ['task-123', 'task-124', 'task-125'],
        progress: ['task-130', 'task-131', 'task-132'],
        done: ['task-140', 'task-141', 'task-142'],
    });

    const dragoverHandler = (ev)  => {
      ev.preventDefault();
    }
    const onDrop = (e, board: string) => {
      const prevBoard = e.dataTransfer.getData('board');
      const prevTask = e.dataTransfer.getData('task');

      setBoards(prev => {
        const prevCopy = {...prev};
        prevCopy[prevBoard] = prev[prevBoard].filter(x => x != prevTask);
        prevCopy[board] = [ ...prevCopy[board] , prevTask ]
        return prevCopy;
      }) 

      console.log(prevBoard,prevTask)
    }

    const onDragStart = (e,board: string, task: string) => {
      e.dataTransfer.setData('board', board)
      e.dataTransfer.setData('task', task)
    }

    return (
     <div className="flex-wrapper" style={{gap: 10}}>
          {
            Object.keys(boards).map( (board, index) => (
             <div key={index} className="board-wrapper flex-wrapper" style={{flexDirection: 'column', gap: 10, border: '1px solid red'}} onDragOver={dragoverHandler} onDrop={(e) =>onDrop(e, board)}>
              <h3>{board}</h3>
                {
                  boards[board].map((task, i) =>(
                    <div key={`task-${i}`} style={{width: '100px', border: '1px solid #fff'}} onDragStart={(e) => onDragStart(e, board, task)} draggable>
                      {task}
                    </div>
                  ))
                }
              </div>
            ))
          }
      </div>
    );
  }