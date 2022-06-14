import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div
      style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}
    >
      <CDBSidebar textColor='#fff' backgroundColor='#333'>
        {/* <CDBSidebarHeader prefix={<i className='fa fa-bars fa-large'></i>}>
          <a
            href='/'
            className='text-decoration-none'
            style={{ color: 'inherit' }}
          >
            Hombres
          </a>
        </CDBSidebarHeader> */}

        <CDBSidebarContent className='sidebar-content'>
          <CDBSidebarMenu>
            <NavLink exact to='/WomenClothes' activeClassName='activeClicked'>
              <CDBSidebarMenuItem icon='columns'>Camisetas</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to='/MenClothes' activeClassName='activeClicked'>
              <CDBSidebarMenuItem icon='table'>Pantalonetas</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to='/MenClothes' activeClassName='activeClicked'>
              <CDBSidebarMenuItem icon='user'>Conjuntos</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
}
