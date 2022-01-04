 import React from 'react';
import { render,fireEvent,screen } from '@testing-library/react';
import TodoList from './Pages/todoList';
import userEvent from '@testing-library/user-event';

jest.useFakeTimers();
 describe('Test Case For ToDo List',()=>{
   test('Title Test on Add button',()=>{
   render(<TodoList/>);
   const buttonElement=screen.getByText(/Edit/);
   expect(buttonElement).toHaveTextContent("Edit");
   });
   test('data test for add or edit Button',()=>{
    jest.useFakeTimers();
    let title = "Hello Title";
    let desc = "Test Description";
    const screen=render(<TodoList/>);
    const id:any=screen.getByTestId("save");
    const inputId:any=screen.getByTestId("input");
    userEvent.type(inputId, title)
    const textArea:any=screen.getByTestId("textarea");
    userEvent.type(textArea,desc);
    fireEvent.click(id);
    setTimeout(function () {
    const localData:any=localStorage.getItem('data');
    const data:any[]=JSON.parse(localData);
    expect(data).toEqual([{"title":title,"description":desc,"status":""}])
    }, 3500);
   
    jest.runAllTimers();  
   });
   test('Test On Delete Button',()=>{
   const screen=render(<TodoList/>);
   const deleteId:any=screen.getByTestId("deleteData");
   fireEvent.click(deleteId);
   setTimeout(function (){
   const localData:any=localStorage.getItem('data');
   const updateData:any[]=JSON.parse(localData);
   expect(updateData).toEqual([]);
   },5990);
   });
 });