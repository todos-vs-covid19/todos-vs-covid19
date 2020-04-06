import React from "react";
import './home.css'
import Header from "./header/Header";
import Main from "./main/Main";
import SideBar from "./side_bar/SideBar";


function Home() {
    return (
        <div className={'home-container'}>
            <Header/>
            <SideBar/>
            <Main/>
            {/*<Main/>

            <Footer/>*/}
        </div>
    )
}

export default Home
