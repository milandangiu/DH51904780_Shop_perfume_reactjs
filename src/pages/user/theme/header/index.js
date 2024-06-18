import React from 'react';
import './style.scss'
import { AiOutlineUser,AiOutlineShoppingCart,AiTwotonePhone, AiOutlineMail  } from "react-icons/ai";

const Header = () => {
    return (
        <div className='header_top'>
            <div className='container'>
                <div className='row'>
                    <div className='col-6 header_top_left'>
                    <ul>
                        <li>
                        <AiOutlineMail />
                            admin@gmail.com
                        </li>
                        <li>
                        <AiTwotonePhone />
                            123456789
                        </li>
                    </ul>
                    </div>
                    <div className='col-6 header_top_right'>
                        <ul>
                            <li>
                                <a href="#"><AiOutlineShoppingCart /><span> Giỏ Hàng</span></a>
                                    
                            </li>
                            <li>
                                <a href="#"><AiOutlineUser/><span> Đăng Nhập</span></a>
                                    
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Header;