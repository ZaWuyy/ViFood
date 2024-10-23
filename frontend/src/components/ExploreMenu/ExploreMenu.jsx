import React from 'react'
import './ExploreMenu.css'
import {menu_list} from '../../assets/assets'


const ExploreMenu = ({category,setCategory}) => {

  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Khám phá ẩm thực</h1>
        <p className='explore-menu-text'>Hãy chọn cho mình những món ăn từ thực đơn đa dạng và phong phú những cũng không kém phần đặc sắn. Sứ mệnh của chúng tôi là mang đến những trải nghiệm tuyệt vời và sự hài lòng cho thực khách</p>
        <div className="explore-menu-list">
            {menu_list.map((item,index)=>{
                return(
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                        <img className={category===item.menu_name?"active":""}src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr/>
    </div>
  )
}

export default ExploreMenu