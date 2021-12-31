 import React from 'react';
 //import renderer from 'react-test-renderer'
import { render,fireEvent,screen} from '@testing-library/react';
import TodoList from './Pages/todoList';


 describe('Test Case For ToDo List',()=>{
   test('Title Test on edit button',()=>{
   render(<TodoList/>);
   const buttonElement=screen.getByText(/Edit/);
   //console.log(fireEvent.click(buttonElement));
   expect(buttonElement).toHaveTextContent("Edit");
   });
 });