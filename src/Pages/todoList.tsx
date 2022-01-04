import React from 'react';
import Input from '@mui/material/Input';
import { Button,TableRow,TableHead,FormControl, InputLabel, Select, TextareaAutosize,Table, TableCell } from '@mui/material';
import { MenuItem } from '@mui/material';
import '../Style/style.css';


interface Prop{

}
interface State{
    title:string,
    description:string,
    status:string,
    data:any[],
    editIndex: number
}
class TodoList extends React.Component<Prop,State>{
    constructor(props:any){
        super(props);
        this.state={
            title:'',
            description:'',
            status:'',
            data:[],
            editIndex: -1
        };
    }
    componentDidMount(){
        const localStoreData: string = localStorage.getItem('data') || '';
        if(localStoreData){
            const localparsedStoreData: any[]=JSON.parse(localStoreData);
            if(localparsedStoreData){
                this.setState({
                    data:localparsedStoreData
                })
            }
        }
    }
    saveValue= ()=>{
        if(this.state.title.length>4 && this.state.description.length>0  && /[a-zA-Z0-9]/.test(this.state.title)){          
        if(this.state.editIndex > -1){
            const currentData: any[] = this.state.data;
            currentData[this.state.editIndex] = {
                title: this.state.title,
                description: this.state.description,
                status: this.state.status,
            }
            this.setState({
                data: currentData,
                editIndex: -1,
                title:'',
                description:'',
                status:''
            })
            
            localStorage.setItem('data',JSON.stringify(currentData));
        }else{
            this.setState({
                data:this.state.data.concat({title:this.state.title,description:this.state.description,status:this.state.status}),
                title:'',
                description:'',
                status:''
               });
               localStorage.setItem('data',JSON.stringify(this.state.data.concat({title:this.state.title,description:this.state.description,status:this.state.status})));
        }
        
        }
    }

    editValue=(index:number)=>{
        const originalValue:any=this.state.data[index];
        this.setState({
            title: originalValue.title,
            description: originalValue.description,
            status: originalValue.status,
            editIndex: index
        })
    }

    deleteValue=(index:number)=>{
    const originalValueOfdata=this.state.data;
    originalValueOfdata.splice(index,1);
    this.setState({
        data:originalValueOfdata
    });
    localStorage.setItem('data',JSON.stringify(originalValueOfdata));
     }
     retriveDataInTestFile=()=>{
         return this.state.data;
     }
    render(){
        return(
           <div className='parentDiv'>
                <div className='childDiv'>
            <Table>
                <TableRow>
                    <TableCell><InputLabel>Title:</InputLabel></TableCell>
                    <TableCell> <Input data-testid="input" name="title" type="text" value={this.state.title} onChange={(e)=>this.setState({
                        title:e.target.value
                    })}/></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><InputLabel>Description:</InputLabel></TableCell>
                    <TableCell><TextareaAutosize data-testid="textarea" minRows={6} name="description" value={this.state.description} onChange={(e)=>this.setState({
                       description:e.target.value 
                    })}/></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><InputLabel>Status:</InputLabel></TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                      <InputLabel data-testid="status-id">Status</InputLabel>
                        <Select label="status" data-testid="statusId" value={this.state.status} onChange={(e:any) =>this.setState({
                            status:e.target.value
                        })}>
                            <MenuItem value="ToDo" data-testid="second">ToDo</MenuItem>
                            <MenuItem value="InProcess">InProcess</MenuItem>
                            <MenuItem value="Complete">Complete</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2} align='center'>
                        <Button variant="contained" data-testid="save" color="primary" onClick={this.saveValue}>{this.state.editIndex > -1 ? 'Update' : 'Add'}</Button>
                    </TableCell>
                </TableRow>
            </Table>
            </div>
            <div className='childDiv'>
                <Table>
                   <TableHead>
                        <TableRow>
                                <TableCell> Title </TableCell>
                                <TableCell> Description </TableCell>
                                <TableCell> Status </TableCell>
                                <TableCell>Edit</TableCell>
                                <TableCell>Delete</TableCell>
                        </TableRow>
                   </TableHead>
             {
                 this.state.data.map((items:any,index:number)=>{
                     return(
                        <TableRow key={index}>
                            <TableCell>{items.title}</TableCell>
                            <TableCell>{items.description}</TableCell>
                            <TableCell>{items.status}</TableCell>
                            <TableCell>
                                <Button variant="contained" data-testid="edit" onClick={()=>this.editValue(index)}>
                                    Edit
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button variant="contained" data-testid="deleteData" onClick={()=>this.deleteValue(index)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                     );
                 })
             }
             </Table>
            </div>
           </div>
        );
    }
}
export default TodoList;