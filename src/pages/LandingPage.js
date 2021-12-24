import React, { Component } from 'react'
import rotateImage from '../assets/images/1024.png'
import Right from "../assets/images/right.png"
import "react-activity/dist/Bounce.css";
import {
    BrowserRouter as Router,
    Redirect
  } from "react-router-dom";






export default class LandingPage extends Component {

    
    constructor(){
        super()
        this.state={
            isLoading: true,
            
        }
    }

    componentDidMount(){
        setTimeout(()=> {
            this.setState({
                isLoading: false
            })
        },5000)
    }
    
    render() {
        const Loading = this.state.isLoading? <div className="circl"/>:
       

        <Redirect
            to={{
              pathname: "/home",
            }}
          />
        
        
        return (
            <div className= "container">

            <div className="circle">
            <img className='image' src = {rotateImage} style={{width:"90%"}} alt='ntetsia-logo'/>              
            </div>
            <text className="welcomeTxt"   >NTETSIA</text>
            <text className="welcomeTxt2" style={{fontFamily:""}}>Possible together</text>
            {Loading}
            <img className='' src = {Right} style={{width:"12%",height:"8%", position:"absolute", bottom:10}} alt='ntetsia-logo' />    

            </div>
        )
    }
}
 