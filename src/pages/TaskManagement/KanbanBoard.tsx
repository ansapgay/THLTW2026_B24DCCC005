import { Button, Card, Col, Modal, Row, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useModel } from 'umi';
import { useEffect } from 'react';
import TaskCard from '@/components/TaskManagement/TaskCard';
import TaskForm from '@/components/TaskManagement/TaskForm';
import type { Task } from '@/models/taskManagement';

const KanbanBoard: React.FC = () => {
  const {
    loadTasks,
    getTasksByStatus,
    moveTask,
    deleteTask,
    setEditingTask,
    setIsModalVisible,
    isModalVisible,
  } = useModel('taskManagement');

  useEffect(() => {
    loadTasks();
  }, []);

  const todoTasks = getTasksByStatus('todo');
  const inProgressTasks = getTasksByStatus('inprogress');
  const doneTasks = getTasksByStatus('done');

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const taskId = draggableId.replace('task_', '');
    const newStatus = destination.droppableId as 'todo' | 'inprogress' | 'done';

    moveTask(taskId, newStatus);
  };

  const handleCreateTask = () => {
    setEditingTask(undefined);
    setIsModalVisible(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalVisible(true);
  };

  const renderColumn = (
    title: string,
    status: 'todo' | 'inprogress' | 'done',
    tasks: Task[]
  ) => {
    return (
      <Col xs={24} sm={24} md={8} key={status}>
        <Card
          title={`${title} (${tasks.length})`}
          extra={
            <Button
              type="primary"
              size="small"
              icon={<PlusOutlined />}
              onClick={handleCreateTask}
            >
              Add
            </Button>
          }
          style={{ height: '100%', minHeight: '600px' }}
        >
          <Droppable droppableId={status}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  backgroundColor: snapshot.isDraggingOver ? '#f0f2f5' : 'transparent',
                  padding: '8px',
                  minHeight: '500px',
                  borderRadius: '4px',
                  transition: 'background-color 0.2s',
                }}
              >
                {tasks.length === 0 ? (
                  <Empty
                    description="No tasks"
                    style={{ marginTop: '20px' }}
                  />
                ) : (
                  tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={`task_${task.id}`} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard
                            task={task}
                            onEdit={handleEditTask}
                            onDelete={deleteTask}
                            isDragging={snapshot.isDragging}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Card>
      </Col>
    );
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1>Kanban Board</h1>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Row gutter={[16, 16]}>
          {renderColumn('To Do', 'todo', todoTasks)}
          {renderColumn('In Progress', 'inprogress', inProgressTasks)}
          {renderColumn('Done', 'done', doneTasks)}
        </Row>
      </DragDropContext>

      <Modal
        title="Add/Edit Task"
        open={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        destroyOnClose
      >
        <TaskForm />
      </Modal>
    </div>
  );
};

export default KanbanBoard;
