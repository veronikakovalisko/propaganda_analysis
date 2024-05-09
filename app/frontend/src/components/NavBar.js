import {HomeOutlined} from "@ant-design/icons";
import {Menu} from "antd";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";


const NavBar = () => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState("");
   
    const items = [
        {
            label: "Home",
            key: "home",
            icon: <HomeOutlined/>,
        },
    ];

    const onClick = (e) => {
        console.log("click ", e.key);
        setCurrent(e.key);
        navigate(`/${e.key}`);
    };
    
    return (
        <>
            <Menu onMouseEnter={handleMouseEnter} onClick={onClick} selectedKeys={[current]} 
                mode="horizontal" items={items} style={{position: 'fixed', backgroundColor: "white", zIndex: '1000',  width: '100%',}}/>
        </>
    );
};

export default NavBar;
