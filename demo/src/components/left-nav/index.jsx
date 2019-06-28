import React,{Component} from 'react'
import logo from '../../assets/images/log.jpg'
import './index.less'
import { Menu, Icon } from 'antd';
import {Link} from 'react-router-dom'
import menuList from "../../config/menuConfig.js"
const { SubMenu } = Menu;

export default class LeftNav extends Component{
  getMenuNodes_map=(menuList)=>{
    return menuList.map(item=>{
     if(!item.children){
      return <Menu.Item key={item.key}>
           <Link to={item.key}>
               <Icon type={item.icon}/>
               <span>{item.title}</span>
           </Link>
         </Menu.Item>
     }else{
     return <SubMenu
      key={item.key}
      title={
        <span>
          <Icon type={item.icon} />
          <span>{item.title}</span>
        </span>
      }
    >
      {this.getMenuNodes(item.children)}
    </SubMenu>
     }
    })
  }
  getMenuNodes=(menuList)=>{
     return menuList.reduce((pre,item)=>{
       if(!item.children){
         pre.push((
          <Menu.Item key={item.key}>
          <Link to={item.key}>
          <Icon type={item.icon}/>
          <span>{item.title}</span>
          </Link>
          </Menu.Item>
         ))
       }else{
         pre.push((
          <SubMenu
          key={item.key}
          title={
          <span>
          <Icon type={item.icon}/>
          <span>{item.title}</span>
          </span>
          }
          >
          {this.getMenuNodes(item.children)}
          </SubMenu>
         ))
       }
       return pre
     },[])
  }
       render(){
        //  const path=this.props.location.pathname
        return(
          <div>
           <div className="left-nav">
              <Link  to="/" className="left-nav-header">
                  <img src={logo} alt=""/>
                  <h1>后台管理系统</h1>
              </Link>
           </div>



         


           <Menu
         mode="inline"
         theme="dark"
         defaultOpenKeys={['/home']}
       >

         {/* <Menu.Item key='/home'>
           <Link to='/home'>
               <Icon type="pie-chart" />
               <span>首页</span>
           </Link>
         </Menu.Item>
        

         <SubMenu
           key="sub1"
           title={
             <span>
               <Icon type="mail" />
               <span>商品</span>
             </span>
           }
         >
           <Menu.Item key="/category">
             <Link to="/category">
                   <Icon type="mail" />
                   <span>品类管理</span>
             </Link>
           </Menu.Item>
           
           <Menu.Item key="/product">
               <Link to="/product">
                   <Icon type="mail" />
                   <span>商品管理</span>
               </Link>
           </Menu.Item>
         </SubMenu>
         <Menu.Item key="/user">
               <Link to="/user">
                   <Icon type="mail" />
                   <span>用户管理</span>
               </Link>
           </Menu.Item>


           <Menu.Item key="/role">
               <Link to="/role">
                   <Icon type="mail" />
                   <span>角色管理</span>
               </Link>
           </Menu.Item>
           

         */}
      
      {
        this.getMenuNodes(menuList)
      }
       </Menu>
           </div>
       )
       }
    }
