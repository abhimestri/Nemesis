import React, { Component } from 'react'
import Classes from './userData.module.css'
import axios from 'axios'
import Aux from '../../HOC/Aux'
import {
    Button , 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    IconButton,
    Collapse,
    Box
} from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class UserData extends Component{



    // styling of the elements
    useStyle = makeStyles({
        table : {
            minWidth : 1350
        },
    });

    StyledTableCell = withStyles((theme) => ({
        head : {
            backgroundColor : theme.palette.common.black,
            color : theme.palette.common.white
        },
        body : {
            fontSize : 14,
        }
    }))(TableCell)

    StyledTableRow = withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
          },
        },
    }))(TableRow);




    // state declaration
    state = {
        data : [],
        open : false,
        userName : "",
        name : "",
        email : "",
        phoneNumber : null,
        website : ""
    }



    // component to fetch user data from API
    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                res.data.map(element => {
                    const result = {
                        id : element.id,
                        name : element.name,
                        userName : element.username,
                        phoneNumber : element.phone,
                        email : element.email,
                        website : element.website,
                        togglerOpen : false,
                        modalOpen : false
                    }
                    this.setState({
                        data : this.state.data.concat(result)
                    })
                    return null;
                })
            })
    }



    // delete user from the list
    deleteUser = (event) => {
        axios.delete(`https://jsonplaceholder.typicode.com/users/${event}`)
                .then(res => {
                    console.log(res)
                })
                .then(res => {
                    this.setState({
                        data : this.state.data.filter(element => element.id !== event)
                    })
                })
                .catch(err =>  console.log(err))
    }



    // open form filling modal
    openModal = (event) => {
        const foundElement = this.state.data.find(el => {
            if( el.id === event.id ){
                return el.id
            }
        })
        const dataModified = [...this.state.data]
        dataModified.forEach((el,i) => {
            if(el.id === foundElement.id){
                if(dataModified[i].modalOpen){
                    dataModified[i].modalOpen = false
                }else{
                    dataModified[i].modalOpen = true
                }
            }
        })
        this.setState({
            data : [...dataModified]
        })
    }



    // updating the users data 
    userUpdate = (e) => {
        this.setState({
            userName : e.target.value
        })
    }
    userNameUpdate = (e) => {
        this.setState({
            name : e.target.value
        })
    }
    userEmailUpdate = (e) => {
        this.setState({
            email : e.target.value
        })
    }
    userPhonenumberUpdate = (e) => {
        this.setState({
            phoneNumber : e.target.value
        })
    }
    userWebsiteUpdate = (e) => {
        this.setState({
            website : e.target.value
        })
    }



    // submitting the form 
    SubmitData = (event) => {
        const updatedObject = {
            userName : this.state.userName,
            name : this.state.name,
            emial : this.state.email,
            phoneNumber : this.state.email,
            website : this.state.website
        }
        axios.put(`https://jsonplaceholder.typicode.com/users/${event.id}`, updatedObject)
                .then(res => {
                    console.log(res)
                })
                .catch(err => console.log(err))

            const foundElement = this.state.data.find(el => {
                if( el.id === event.id ){
                    return el.id
                }
            })
            const dataModified = [...this.state.data]
            dataModified.forEach((el,i) => {
                if(el.id === foundElement.id){
                    if(dataModified[i].modalOpen){
                        dataModified[i].modalOpen = false
                    }else{
                        dataModified[i].modalOpen = true
                    }
                }
            })
            this.setState({
                data : [...dataModified]
            })
    }



    // closing the modal
    closeModal = (event) => {
        const foundElement = this.state.data.find(el => {
            if( el.id === event.id ){
                return el.id
            }
        })
        const dataModified = [...this.state.data]
        dataModified.forEach((el,i) => {
            if(el.id === foundElement.id){
                if(dataModified[i].modalOpen){
                    dataModified[i].modalOpen = false
                }else{
                    dataModified[i].modalOpen = true
                }
            }
        })
        this.setState({
            data : [...dataModified]
        })
    }



    // function to handle toggler to view the edit and delete option
    setOpen = (event) => {
        const foundElement = this.state.data.find(el => {
            if( el.id === event.id ){
                return el.id
            }
        })
        const dataModified = [...this.state.data]
        dataModified.forEach((el,i) => {
            if(el.id === foundElement.id){
                if(dataModified[i].togglerOpen){
                    dataModified[i].togglerOpen = false
                }else{
                    dataModified[i].togglerOpen = true
                }
            }
        })
        this.setState({
            data : [...dataModified]
        })
    }



    render(){

        // dynamic table row and cell rendering
        const result = this.state.data.map(elem => {
            return(
                <Aux>
                <this.StyledTableRow>
                        <this.StyledTableCell>
                            <IconButton aria-label="expand row" size="small" onClick={() => this.setOpen(elem)}>
                                {elem.togglerOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        </this.StyledTableCell>
                        <this.StyledTableCell component="th" scope="row">{elem.name}</this.StyledTableCell>
                        <this.StyledTableCell>{elem.userName}</this.StyledTableCell>
                        <this.StyledTableCell>{elem.email}</this.StyledTableCell>
                        <this.StyledTableCell>{elem.phoneNumber}</this.StyledTableCell>
                        <this.StyledTableCell>{elem.website}</this.StyledTableCell>
                </this.StyledTableRow>
                <this.StyledTableRow>
                    <this.StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>    
                        <Collapse in={elem.togglerOpen} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Table size="small" aria-label="purchases">
                                    <TableBody>
                                            <TableRow>
                                                <Button className={Classes.buttonDelete} onClick={() => this.deleteUser(elem.id)} color="secondary">Delete</Button>
                                                <Button className={Classes.buttonEdit} onClick={() => this.openModal(elem)} color="primary">Edit</Button>
                                            </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </this.StyledTableCell>
                </this.StyledTableRow>
                <Dialog open={elem.modalOpen} onClose={() => this.closeModal(elem)} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                    <DialogContent className={Classes.DialogContent}>
                        <DialogContentText>Edit User data</DialogContentText>
                        <TextField onChange={this.userUpdate} autoFocus value={elem.name} margin="dense" id="userName" label="User name" type="text" fullWidth/>
                        <TextField onChange={this.userNameUpdate} autoFocus value={elem.userName} margin="dense" id="name" label="Name" type="text" fullWidth/>
                        <TextField onChange={this.userPhonenumberUpdate} autoFocus value={elem.phoneNumber} margin="dense" id="phNumber" label="Phone number" type="number" fullWidth/>
                        <TextField onChange={this.userEmailUpdate} autoFocus value={elem.email} margin="dense" id="emailAddress" label="Email Address" type="email" fullWidth/>
                        <TextField onChange={this.userWebsiteUpdate} autoFocus value={elem.website} margin="dense" id="website" label="website" type="text" fullWidth/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.closeModal(elem)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.SubmitData(elem)} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
                </Aux>
            )
        })



        const classes = this.useStyle;
        return(
            <Aux>
                <div className={Classes.box}>
                    <TableContainer className={Classes.tableContainer} component={Paper}>
                        <Table aria-label="simple table" className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <this.StyledTableCell />
                                    <this.StyledTableCell>Name</this.StyledTableCell>
                                    <this.StyledTableCell>User Name</this.StyledTableCell>
                                    <this.StyledTableCell>Email</this.StyledTableCell>
                                    <this.StyledTableCell>Phone No.</this.StyledTableCell>
                                    <this.StyledTableCell>Website</this.StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {result}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Aux>
        )
    }
}

export default UserData