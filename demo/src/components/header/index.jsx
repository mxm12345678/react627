
import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import {formateDate} from '../../utils/dateUtils'
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

import {reqWeather} from '../../api'
import './index.less'
import { Modal, Button } from 'antd';



class Header extends Component{
    state={
        currentTime:formateDate(Date.now()),
        dayPictureUrl:'',
        weather:'',
    }

    getTime=()=>{
        this.intervalId=setInterval(()=>{
            const currentTime=formateDate(Date.now())
            this.setState({currentTime})

        },1000)
    }
    getWeather=async()=>{
        const {dayPictureUrl,weather}=await reqWeather('武汉')
        this.setState({dayPictureUrl,weather})
        
    }
    getTitle=()=>{
        const path=this.props.location.pathname
        let title
        menuList.forEach(item=>{
            if(item.key===path){
                title=item.title
            }else if(item.children){
              const cItem=item.children.find(cItem=>cItem.key===path)
              if(cItem){
                  title=cItem.title

              }
            }
        })
        return title

    }
    logout=()=>{
        Modal.confirm(
            {
              
                content: '确定退出吗?',
                onOk:()=>{
                    console.log('ok',this);
                    //删除user,调到登录页面
                    storageUtils.removeUser()
                    memoryUtils.user={}
                    this.props.history.push("/login")
                },
                onCancel() {
                  console.log('Cancel');
                },
              }
        )
    }

   componentDidMount(){
       this.getTime()
       this.getWeather()
   }

   componentWillUnmount(){
       clearInterval(this.intervalId)
   }

    render(){
        const{currentTime,dayPictureUrl,weather}=this.state
        const username=memoryUtils.user.username
        const title=this.getTitle()
        return(
            <div className="header">
                <div className="header-top">
                    <span>欢迎  {username}</span>  
                    <a href="javascript:" onClick={this.logout}>
                        退出
                    </a>                 
                </div>
               
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        {title}
                    </div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt=""/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter (Header)
