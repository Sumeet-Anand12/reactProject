import React, { useEffect, useState, useContext } from 'react'
import './style.css'
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { MyContext } from '../../App';


const Product = (props) => {

  const [productData, setProductData] = useState();
  const [isAdded, setIsadded] = useState(false);

  const context  = useContext(MyContext);
  
  useEffect(() => {
    setProductData(props.item);
},[props.item])

const setProductCat=()=>{
    sessionStorage.setItem('parentCat', productData.parentCatName);
    sessionStorage.setItem('subCatName', productData.subCatName);
}

      const addToCart=(item)=>{
        // console.log(item);
        context.addToCart(item);
        setIsadded(true);
      }

  return (

                // <div className='productThumb'>
    //   {
    //             props.tag !== null && props.tag !== undefined &&
    //             <span className={`badge ${props.tag}`}>{props.tag}</span>
    //         }


    <div className='productThumb' onClick={setProductCat}>
        {
            props.tag !== null && props.tag !== undefined &&
            <span className={`badge ${props.tag}`}>{props.tag}</span>
        }

       {
                productData !== undefined &&
          
        <>

       <Link to={`/product/${productData.id}`}>
       <div className='imgWrapper'>
            {/* <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-1-1.jpg" className='w-100'/> */}
            <div className='p-3 wrapper mb-1'>
                  <img src={productData.catImg+'?im=Resize=(420,420)'} className='w-100' />
            </div>

            <div className='overlay transition'>
             <ul className='list list-inline mb-5'>
                <li className='list-inline-item'>
                      <a className='cursor' tooltip="Add to Wishlist">
                          <FavoriteBorderOutlinedIcon />
                      </a>
                  </li>
                  <li className='list-inline-item'>
                      <a className='cursor' tooltip="Compare">
                          <CompareArrowsOutlinedIcon />
                      </a>
                  </li>
                  <li className='list-inline-item'>
                      <a className='cursor' tooltip="Quick View">
                          <RemoveRedEyeOutlinedIcon />
                      </a>
                  </li>
             </ul>

            </div>
        </div>

       </Link>
        <div className='info'>
            <span className='d-block brand'>
              {/* <Link>Snack</Link> */}
              <Link>{productData.brand}</Link>
              </span>
            {/* <h4 className='title'> Seeds of Change & Rice</h4> */}
            <h4 className='title'> <Link>{productData.productName.substr(0,50)+'...'}</Link></h4>
            {/* <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readonly/> */}
            <Rating name="half-rating-read" value={parseFloat(productData.rating)} precision={0.5} readonly/>
           {/* <span className='brand d-block'>By <a className='text-g'><Link>NestFood</Link></a></span> */}
           <span className='brand d-block text-g'>By <Link className='text-g'>{productData.brand}</Link></span>

           <div className='d-flex align-items-center justify-content-between '>
              <div className='d-flex align-items-center'>
                {/* <span className='price text-g font-weight-bold'>$28.95</span> <span className='oldPrice'>$32.8</span> */}
                <span className='price text-g font-weight-bold'>Rs {productData.price}</span> <span className='oldPrice '>Rs {productData.oldPrice}</span>
              </div>
           </div>

           <Button className='w-100 transition mt-3' onClick={()=>addToCart(productData)}><ShoppingCartOutlinedIcon /> 
                        
                            {
                                isAdded===true ? 'Added' : 'Add'
                            }
            </Button>



           {/* <Button className='bg-g transition w-100 mt-2 mb-1'><ShoppingCartOutlinedIcon className='mr-2'/> Add</Button> */}


        </div>
        </>
   }
      
    </div>
  )
}

export default Product
