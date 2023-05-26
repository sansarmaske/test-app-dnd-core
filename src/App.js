import React, { useState } from 'react';
import { DndContext, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

import { Droppable } from './Droppable';

function Draggable({ id, content }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    touchAction: 'none',
    userSelect: 'none',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {content}
    </div>
  );
}

function App() {
  const [dragItems, setDragItems] = useState([{ id: 'draggable', content: 'Drag me' }]);
  const [dropItems, setDropItems] = useState([]);
  const containers = ['A', 'B', 'C'];
  const [parent, setParent] = useState(null);

  const draggableMarkup = (id, content) => (
    <Draggable key={id} id={id} content={content} />
  );

  const handleAddDraggable = () => {
    const newDragItemId = `draggable-${dragItems.length + 1}`;
    const newDragItem = { id: newDragItemId, content: `Draggable ${dragItems.length + 1}` };
    setDragItems((prevItems) => [...prevItems, newDragItem]);
  };

  const handleAddDroppable = () => {
    const newDropItemId = `droppable-${dropItems.length + 1}`;
    const newDropItem = { id: newDropItemId, content: `Droppable ${dropItems.length + 1}` };
    setDropItems((prevItems) => [...prevItems, newDropItem]);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <button onClick={handleAddDraggable}>Add Draggable</button>
      <button onClick={handleAddDroppable}>Add Droppable</button>

      {dragItems.map((dragItem) => draggableMarkup(dragItem.id, dragItem.content))}

      {containers.map((id) => (
        <Droppable key={id} id={id}>
          {parent === id ? draggableMarkup(dragItems[dragItems.length - 1].id, dragItems[dragItems.length - 1].content) : 'Drop here'}
        </Droppable>
      ))}

      {dropItems.map((dropItem) => (
        <Droppable key={dropItem.id} id={dropItem.id}>
          {dropItem.content}
        </Droppable>
      ))}
    </DndContext>
  );

  function handleDragEnd(event) {
    const { over } = event;
    setParent(over ? over.id : null);
  }
}

export default App;
