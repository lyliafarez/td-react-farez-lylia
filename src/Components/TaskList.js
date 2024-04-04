import { useState, useEffect } from "react";
function TaskList({tasks}) {

const [items, setItems] = useState(tasks)
const [filtered_items,setFilteredItems] = useState(() => {
    return JSON.parse(localStorage.getItem('tasks')) || []
  });

useEffect(() => {
    setFilteredItems(JSON.parse(localStorage.getItem("tasks")))
    localStorage.setItem("tasks", JSON.stringify(items));
    //userInfo = JSON.parse(localStorage.getItem("userInfo"));
  }, [items]);

 

const filterTasks = (filter)=>{
    if(filter === 'Completed'){
        let list = items.filter((item)=>item.state === 'completed')
       setFilteredItems(list)
    }else if(filter === 'NonCompleted'){
        let list = items.filter((item)=>item.state === 'nonCompleted')
       setFilteredItems(list)
    }else{
       setFilteredItems(items)
    }
 }
 const updateState = (index)=>{
    let item = filtered_items[index]
    if(item.state === 'completed'){
        item.state = 'nonCompleted'
    }else{
        item.state = 'completed'
    }
   
    setItems(filtered_items);
    window.location.reload();

 }

    return (
     <div data-cy="task-list" className="my-5">
         {/* filters */}
         <div className="flex flex-row gap-2">
         <button data-cy="filter-btn-all" className="px-2 py-1 rounded-md bg-blue-300" type="submit" onClick={(e)=>filterTasks('All')}>Tous</button>
        <button data-cy="filter-btn-done" className="px-2 py-1 rounded-md bg-green-300" type="submit" onClick={(e)=>filterTasks('Completed')}>Complétées</button>
        <button data-cy="filter-btn-undone" className="px-2 py-1 rounded-md bg-red-300" type="submit" onClick={(e)=>filterTasks('NonCompleted')}>Non complétées</button>
         </div>
         <div className="my-4 flex flex-col gap-3">
         { filtered_items.map((item,index)=>{
       return(
       
           
            <div data-cy="task-item" className="" key={index}>
               
                <button className="px-2 py-1 rounded-md w-full" style={{backgroundColor: item.state === 'completed' ? 'green':'red'}}  onClick={(e)=>{updateState(index)}}> {item.name}</button>
                </div>
      
        
       )
      })}
         </div>
      
        
     </div>
    );
  }
  
  export default TaskList;