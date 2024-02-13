import React, { useContext, useEffect, useRef, useState, } from 'react'
import './style.css';
import Rating from '@mui/material/Rating';
import { Link, useParams } from 'react-router-dom'
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import Slider from "react-slick";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
// import Sidebar from '../../components/Sidebar/index';
import Product from '../../components/product';
import axios from 'axios';
import { MyContext } from '../../App';


const DetailsPage = (props) => {

    const [zoomInage, setZoomImage] = useState('https://www.jiomart.com/images/product/original/490000363/maggi-2-minute-masala-noodles-70-g-product-images-o490000363-p490000363-0-202305292130.jpg');

    const [bigImageSize, setBigImageSize] = useState([1500, 1500]);
    const [smlImageSize, setSmlImageSize] = useState([150, 150]);
    const [activeSize, setActiveSize] = useState(0);
    const [inputValue, setinputValue] = useState(1);
    const [activeTabs, setActiveTabs] = useState(0);
    const [currentProduct, setCurrentProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [reviewsArr, setReviewsArr] = useState([]);
    const [rating, setRating] = useState(0.0);
    const [isAlreadyAddedInCart, setisAlreadyAddedInCart] = useState(false);

    const [isAdded, setIsadded] = useState(false);

    const context = useContext(MyContext);

    const [reviewFields, setReviewFields] = useState({
        review: '',
        userName: '',
        rating: 0.0,
        productId: 0,
        date: ''
    })

    const [prodCat, setProdCat] = useState({
        parentCat: sessionStorage.getItem('parentCat'),
        subCatName: sessionStorage.getItem('subCatName')
    })


    const zoomSlider = useRef();
    const zoomSliderBig = useRef();


    let { id } = useParams();

    var settings2 = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: false,
        arrows: false,
        // autoplay:true
    };




    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        fade: false,
        arrows:true,
        // autoplay:true
    };


    var related = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        fade: false,
        arrows: true
    };

  

    const goto = (index) => {

        zoomSlider.current.slickGoTo(index);
        zoomSliderBig.current.slickGoTo(index);
    }

    const isActive = (index) => {
        setActiveSize(index);
    }

    const plus = () => {
        setinputValue(inputValue + 1)
    }

    const minus = () => {
        if (inputValue !== 1) {
            setinputValue(inputValue - 1)
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)

        props.data.length !== 0 &&
            props.data.map((item) => {
                item.items.length !== 0 &&
                    item.items.map((item_) => {
                        item_.products.length !== 0 &&
                            item_.products.map((product) => {
                                if (parseInt(product.id) === parseInt(id)) {
                                    setCurrentProduct(product);
                                }
                            })
                    })
            })


 //related products code

            const related_products = [];

            props.data.length !== 0 &&
                props.data.map((item) => {
                    if (prodCat.parentCat === item.cat_name) {
                        item.items.length !== 0 &&
                            item.items.map((item_) => {
                                if (prodCat.subCatName === item_.cat_name) {
                                    item_.products.length !== 0 &&
                                        item_.products.map((product, index) => {
                                            if (product.id !== parseInt(id)) {
                                                related_products.push(product)
                                            }

                                        })
                                }
                            })
                    }

                })
                
                if (related_products.length !== 0) {
                    setRelatedProducts(related_products)
                }
             showReviews();
         },[id]);



                    const changeInput = (name, value) => {
                        if (name === "rating") {
                            setRating(value);
                        }
                        setReviewFields(() => ({
                            ...reviewFields,
                            [name]: value,
                            productId: id,
                            date: new Date().toLocaleString()
                        }))
                
                
                
                    }
                

                    const reviews_Arr = [];

                    const submitReview = async (e) => {
                        // console.log('hero')
                        e.preventDefault();
        
                        try {
                
                            await axios.post("http://localhost:2000/productReviews", reviewFields).then((response) => {
                                // console.log(response.data)
                                reviews_Arr.push(response.data);

                                setReviewFields(() => ({
                                    review: '',
                                    userName: '',
                                    rating: 0.0,
                                    productId: 0,
                                    date: ''
                                }))
                            })
                
                        } catch (error) {
                            console.log(error.message);
                        }
                
                        showReviews();
                    }

                    var reviews_Arr2 = [];
                    const showReviews = async () => {
                        try {
                            await axios.get("http://localhost:2000/productReviews").then((response) => {
                                // console.log(response.data.length);

                                if (response.data.length !== 0) {
                                    // console.log(response.data);
                                     response.data.map((item) => {
                                        if (parseInt(item.productId) === parseInt(id)) {                                           
                                            reviews_Arr2.push(item)
                                        }
                
                                    })
                
                                }
                            })
                        } catch (error) {
                            console.log(error.message);
                        }
                
                        if (reviews_Arr2.length !== 0) {
                
                            setReviewsArr(reviews_Arr2);
                        }
                        // console.log(reviewsArr);
                
                    }

                    const addToCart = (item) => {
                        // console.log(item)

                        context.addToCart(item);
                        setIsadded(true);
                    }


                    const getCartData = async (url) => {
                        try {
                            await axios.get(url).then((response) => {
                            
                
                                response.data.length!==0 && response.data.map((item)=>{
                                    
                                    if(parseInt(item.id)===parseInt(id)){
                                        setisAlreadyAddedInCart(true);
                                    }
                                })
                            })
                
                        } catch (error) {
                            console.log(error.message);
                        }
                    }  


  return (

    <>  
    {
        context.windowWidth < 992 && <Button className={`btn-g btn-lg w-100 filterBtn {isAlreadyAddedInCart===true && 'no-click'}`} onClick={() => addToCart(currentProduct)}><ShoppingCartOutlinedIcon />
            {
                isAdded === true || isAlreadyAddedInCart===true  ? 'Added' : 'Add To Cart'
            }
        </Button>

    }


    <section className="detailsPage mb-5">
                                 
            <div className='breadcrumbWrapper mb-4'>
                <div className='container-fluid detailsContainer'>
                    <ul className="breadcrumb breadcrumb2 mb-0">
                        <li><Link>Home</Link>  </li>
                        <li><Link to={`/cat/${prodCat.parentCat.split(' ').join('-').toLowerCase()}`}
                                    onClick={() => sessionStorage.setItem('cat', prodCat.parentCat.split(' ').join('-').toLowerCase())} className='text-capitalize'>{prodCat.parentCat}</Link> </li>

                                <li><Link to={`/cat/${prodCat.parentCat.toLowerCase()}/${prodCat.subCatName.replace(/\s/g, '-').toLowerCase()}`}
                                    onClick={() => sessionStorage.setItem('cat', prodCat.subCatName.toLowerCase())} className='text-capitalize'>{prodCat.subCatName}</Link> </li>
                                <li>{currentProduct.productName}</li>
                        
                    </ul>
                </div>

            </div>
            

                <div className='container-fluid'>
                   <div className='row pt-3 pb-3'>
                   <div className='row'>

                                {/* Product Zoom code Start here */}

                                <div className='col-md-5 '>
                                    <div className='productZoom'>
                                            <Slider {...settings2} className='zoomSliderBig' ref={zoomSliderBig}>

                                            {
                                                currentProduct.productImages !== undefined &&
                                                currentProduct.productImages.map((imgUrl, index) => {
                                                    return (
                                                        <div className='item'>
                                                            <InnerImageZoom
                                                                zoomType="hover" zoomScale={1}
                                                                src={`${imgUrl}?im=Resize=(${bigImageSize[0]},${bigImageSize[1]})`} />

                                                        </div>
                                                    )
                                                })
                                            }
                                            
                                        </Slider>
                                    </div>

                                    <Slider {...settings} className='zoomSlider' ref={zoomSlider}>

                                    {
                                    currentProduct.productImages !== undefined &&
                                    currentProduct.productImages.map((imgUrl, index) => {
                                        return (
                                            <div className='item'>
                                                <img src={`${imgUrl}?im=Resize=(${smlImageSize[0]},${smlImageSize[1]})`} className='w-100'
                                                    onClick={() => goto(index)} />
                                            </div>
                                        )
                                    })
                                }

                                    </Slider>



                                </div>

                                {/* Product Zoom code Start here */}


                 {/* ProductInfo code Start here */}

                    <div className='col-md-7 productInfo'>

                        <h1>{currentProduct.productName}</h1>
                        <div className='d-flex align-items-center'>
                        <Rating name="half-rating-read" value={parseFloat(currentProduct.rating)} precision={0.5} readOnly />
                         <span className='text-dark'>(32 reviews)</span>

                        </div>
                        <div className='priceSec d-flex align-items-center'>
                            <span className='text-g priceLarge'>Rs {currentProduct.price}</span>
                            <div className='Margin d-flex flex-column'>
                            <span className='text-org'>{currentProduct.discount}% Off</span>
                            <span className='text-light oldPrice'>Rs {currentProduct.oldPrice}</span>

                            </div>

                        </div>
                        <p>{currentProduct.description}</p>

                        {
                                currentProduct.weight !== undefined && currentProduct.weight.length !== 0 &&
                                <div className='productSize d-flex align-items-center'>
                                    <span>Size / Weight:</span>
                                    <ul className='list list-inline mb-0 pl-4 marginLeft'>
                                        {
                                            currentProduct.weight.map((item, index) => {
                                                return (
                                                    <li className='list-inline-item'><a className={`tag ${activeSize === index ? 'active' : ''}`} onClick={() => isActive(index)}>{item}g</a></li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            }

                        {
                                currentProduct.RAM !== undefined && currentProduct.RAM.length !== 0 &&
                                <div className='productSize d-flex align-items-center'>
                                    <span>RAM:</span>
                                    <ul className='list list-inline mb-0 pl-4'>
                                        {
                                            currentProduct.RAM.map((RAM, index) => {
                                                return (
                                                    <li className='list-inline-item'><a className={`tag ${activeSize === index ? 'active' : ''}`} onClick={() => isActive(index)}>{RAM} GB</a></li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            }

                           {
                                currentProduct.SIZE !== undefined && currentProduct.SIZE.length !== 0 &&
                                <div className='productSize d-flex align-items-center'>
                                    <span>SIZE:</span>
                                    <ul className='list list-inline mb-0 pl-4'>
                                        {
                                            currentProduct.SIZE.map((SIZE, index) => {
                                                return (
                                                    <li className='list-inline-item'><a className={`tag ${activeSize === index ? 'active' : ''}`} onClick={() => isActive(index)}>{SIZE}</a></li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            }

                           <div className='addCartSection pt-4 pb-4 d-flex align-items-center'>

                            <div className='counterSec Margin'>
                                <input type='number' value={inputValue}></input>
                                <span className='arrow plus' onClick={plus}><KeyboardArrowUpIcon /></span>
                                <span className='arrow minus' onClick={minus}><KeyboardArrowDownIcon /></span>
                                
                            </div>
                            <div className='d-flex align-items-center'>

                            {
                                        context.windowWidth > 992 && <Button className={`btn-g btn-lg addtocartbtn ${isAlreadyAddedInCart===true && 'no-click'}`} onClick={() => addToCart(currentProduct)}><ShoppingCartOutlinedIcon />
                                            {
                                                isAdded === true || isAlreadyAddedInCart===true ? 'Added' : 'Add To Cart'
                                            }
                                        </Button>

                                    }


                            {/* <Button className='btn-g btn-lg Margin addtocartbtn'><ShoppingCartOutlinedIcon /> Add to Cart</Button> */}

                            <Button className=' btn-lg addtocartbtn  Margin  wishlist btn-border'><FavoriteBorderOutlinedIcon /> </Button>
                                    <Button className=' btn-lg addtocartbtn Margin btn-border'><CompareArrowsIcon /></Button>
                         </div>
                     </div>

                    </div>
                    
                            {/* ProductInfo code end here */}

                      </div>

                   </div>

                   <div className='card mt-5 p-5 detailsPageTabs'>
                        <div className='customTabs'>

                            <ul className='list list-inline'>
                                 <li className='list list-inline-item'>
                                    
                                        <Button className={`${activeTabs ===0 && 'active'}`} onClick={()=>setActiveTabs(0)}>
                                            Description
                                        </Button>
                                   </li>
                                    <li className='list list-inline-item'>
                                        <Button className={`${activeTabs ===1 && 'active'}`} onClick={()=>setActiveTabs(1)}>
                                        Additional info
                                        </Button>
                                    </li>
                                    <li className='list list-inline-item'>
                                        <Button className={`${activeTabs ===2 && 'active'}`} onClick={()=>setActiveTabs(2)}>
                                        Reviews (3)
                                        </Button>
                                    </li>                            

                            </ul>
                            <br/>

                            {
                                activeTabs === 0 &&
                                <div className='tabContent'>

                                 <p>{currentProduct.description}</p>

                                <ul>
                                    <li className='d-flex align-items-center marginRight'>
                                      Type Of Packing
                                      <span className='marginRight'>Bottle</span>
                                    </li>
                                    <li className='d-flex align-items-center marginRight'>
                                      Type Of Packing
                                      <span className='marginRight'>Bottle</span>
                                    </li>
                                    <li className='d-flex align-items-center marginRight'>
                                      Type Of Packing
                                      <span className='marginRight'>Bottle</span>
                                    </li>
                                    <li className='d-flex align-items-center marginRight'>
                                      Type Of Packing
                                      <span className='marginRight'>Bottle</span>
                                    </li>
                                    
                                </ul>

                                <br/>

                                <h2>Packaging & Delivery</h2>
                                <hr className=''/>
                                <p>
                                Less lion goodness that euphemistically robin expeditiously bluebird smugly scratched far while thus cackled sheepishly rigid after due one assenting regarding censorious while occasional or this more crane went more as this less much amid overhung anathematic because much held one exuberantly sheep goodness so where rat wry well concomitantly.
                                </p>
                                <p>
                                Less lion goodness that euphemistically robin expeditiously bluebird smugly scratched far while thus cackled sheepishly rigid after due one assenting regarding censorious while occasional or this more crane went more as this less much amid overhung anathematic because much held one exuberantly sheep goodness so where rat wry well concomitantly.
                                </p>


                                <br/>

                                <h2>Suggested Use</h2>
                                <hr className=''/>
                                <p>
                                    Refrigeration not necessary.
                                </p>
                                <p>
                                    Stir before serving                                
                                </p>

                            </div>
                               

                            }


                        {
                             activeTabs === 1 &&
                             <div className='tabContent'>
                                <div className='table-responsive'>
                                    <table className='table table-bordered'>
                                    <tbody>
                                                        <tr class="stand-up">
                                                            <th>Stand Up</th>
                                                            <td>
                                                                <p>35″L x 24″W x 37-45″H(front to back wheel)</p>
                                                            </td>
                                                        </tr>
                                                        <tr class="folded-wo-wheels">
                                                            <th>Folded (w/o wheels)</th>
                                                            <td>
                                                                <p>32.5″L x 18.5″W x 16.5″H</p>
                                                            </td>
                                                        </tr>
                                                        <tr class="folded-w-wheels">
                                                            <th>Folded (w/ wheels)</th>
                                                            <td>
                                                                <p>32.5″L x 24″W x 18.5″H</p>
                                                            </td>
                                                        </tr>
                                                        <tr class="door-pass-through">
                                                            <th>Door Pass Through</th>
                                                            <td>
                                                                <p>24</p>
                                                            </td>
                                                        </tr>
                                                        <tr class="frame">
                                                            <th>Frame</th>
                                                            <td>
                                                                <p>Aluminum</p>
                                                            </td>
                                                        </tr>
                                                        <tr class="weight-wo-wheels">
                                                            <th>Weight (w/o wheels)</th>
                                                            <td>
                                                                <p>20 LBS</p>
                                                            </td>
                                                        </tr>
                                                        <tr class="weight-capacity">
                                                            <th>Weight Capacity</th>
                                                            <td>
                                                                <p>60 LBS</p>
                                                            </td>
                                                        </tr>
                                                        <tr class="width">
                                                            <th>Width</th>
                                                            <td>
                                                                <p>24″</p>
                                                            </td>
                                                        </tr>
                                                        <tr class="handle-height-ground-to-handle">
                                                            <th>Handle height (ground to handle)</th>
                                                            <td>
                                                                <p>37-45″</p>
                                                            </td>
                                                        </tr>
                                                        <tr class="wheels">
                                                            <th>Wheels</th>
                                                            <td>
                                                                <p>12″ air / wide track slick tread</p>
                                                            </td>
                                                        </tr>
                                                        <tr class="seat-back-height">
                                                            <th>Seat back height</th>
                                                            <td>
                                                                <p>21.5″</p>
                                                            </td>
                                                        </tr>
                                                        <tr class="head-room-inside-canopy">
                                                            <th>Head room (inside canopy)</th>
                                                            <td>
                                                                <p>25″</p>
                                                            </td>
                                                        </tr>
                                                        <tr class="pa_color">
                                                            <th>Color</th>
                                                            <td>
                                                                <p>Black, Blue, Red, White</p>
                                                            </td>
                                                        </tr>
                                                        <tr class="pa_size">
                                                            <th>Size</th>
                                                            <td>
                                                                <p>M, S</p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                        
                                    </table>

                                </div>

                            </div>
                           

                        }

                       {
                                activeTabs === 2 &&
                            <div className='tabContent'>                       
                                <div className='row'>
                                    <div className='col-md-8'>
                                        <h3>Customer questions & answers</h3>

                                        <br/>
                                        {/* {console.log( reviewsArr.length)} */}
                                                           

                                        {
                                                reviewsArr.length !== 0 && 
                                                reviewsArr.map((item, index) => {

                                                    return (
                                                       
                                                        <div className='card p-4 reviewsCard flex-row' key={index}>
                                                            
                                                            <div className='image'>
                                                                <div className='rounded-circle'>
                                                                    <img src='https://wp.alithemes.com/html/nest/demo/assets/imgs/blog/author-2.png' />
                                                                </div>
                                                                <span className='text-g d-block text-center font-weight-bold'>{item.userName}</span>
                                                            </div>


                                                            <div className='info pl-5'>
                                                                <div className='d-flex align-items-center w-100'>
                                                                    <h5 className='text-light Margin'>{item.date}</h5>
                                                                    <div className='marginReview'>
                                                                        <Rating name="half-rating-read"
                                                                            value={parseFloat(item.rating)} precision={0.5} readOnly />
                                                                    </div>
                                                                </div>

                                                                <p className='marginLeft'>{item.review} </p>
                                                            </div>

                                                        </div>
                                                    )


                                                })
                                            }
                     
                                <br/>
                                <br/>

                                <form className='reviewForm' onSubmit={submitReview}>
                                    <h4>Add a review</h4>
                                    <div className='form-group'>
                                        <textarea className='form-control' placeholder='Write Comment' name="review" value={reviewFields.review} onChange={(e) => changeInput(e.target.name, e.target.value)}>

                                        </textarea>

                                    </div>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                            <input type='text' value={reviewFields.userName} className='form-control' placeholder='Name' name='userName' onChange={(e) => changeInput(e.target.name, e.target.value)} />

                                            </div>

                                        </div>

                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                            <Rating name="rating" value={rating} precision={0.5} onChange={(e) => changeInput(e.target.name, e.target.value)} />
                                            </div>

                                        </div>

                                        {/* <div className='form-group'>
                                                <input type='text' className='form-control' placeholder='Website' />

                                            </div> */}
                                           <div className='form-group'>
                                                <Button type='submit' className='btn-g btn-lg'>Submit Review</Button>

                                            </div>

                                    </div>
                                </form>

                            </div>
                           
                            <div className='col-md-3 marginLeft'>

                                <h4>Customer reviews</h4>
                                <div className='d-flex align-items-center mt-3'>

                                <Rating name="half-rating-read" defaultValue={4.8} precision={0.5} readonly/>
                                    <strong className='marginLeft'>4.8 out of 5</strong>

                                </div>

                                <div className='progressBarBox d-flex align-items-center'>
                                    <span style={{marginRight:'20px'}}>5 Star</span>
                                    <div className='progress' style={{width:'80%',height:'25px'}}>
                                        <div className='progress-bar bg-success' style={{width:'70%',height:'25px'}}>70%

                                        </div>

                                    </div>

                                </div>
                                <div className='progressBarBox d-flex align-items-center'>
                                    <span style={{marginRight:'20px'}}>4 Star</span>
                                    <div className='progress' style={{width:'80%',height:'25px'}}>
                                        <div className='progress-bar bg-success' style={{width:'25%',height:'25px'}}>25%

                                        </div>

                                    </div>

                                </div>
                                <div className='progressBarBox d-flex align-items-center'>
                                    <span style={{marginRight:'20px'}}>3 Star</span>
                                    <div className='progress' style={{width:'80%',height:'25px'}}>
                                        <div className='progress-bar bg-success' style={{width:'45%',height:'25px'}}>45%

                                        </div>

                                    </div>

                                </div>
                                <div className='progressBarBox d-flex align-items-center'>
                                    <span style={{marginRight:'20px'}}>2 Star</span>
                                    <div className='progress' style={{width:'80%',height:'25px'}}>
                                        <div className='progress-bar bg-success' style={{width:'65%',height:'25px'}}>65%

                                        </div>

                                    </div>

                                </div>
                                <div className='progressBarBox d-flex align-items-center'>
                                    <span style={{marginRight:'20px'}}>1 Star</span>
                                    <div className='progress' style={{width:'80%',height:'25px'}}>
                                        <div className='progress-bar bg-success' style={{width:'85%',height:'25px'}}>85%

                                        </div>

                                    </div>

                                </div>

                               

                            </div>


                        </div>

                     </div>

                       }
                        
                        </div>
                  </div>

                  <div className='relatedProducts pt-5 pb-4'>
                  <h2 className='hd mb-0 mt-0 res-full'>Related Product</h2>
                  <br/>

                 
                            <Slider {...related} className='prodSlider'>   


                            {

                                    relatedProducts.length !== 0 &&
                                    relatedProducts.map((product, index) => {

                                        return (
                                            <div className='item' key={index}>
                                                <Product tag={product.type} item={product} />
                                            </div>
                                        )
                                    })
                            }
                                                    
                            {/* <div className='item'>
                             <Product tag="sale"/>
                            </div>
                            <div className='item'>
                             <Product tag="hot"/>
                            </div>
                            <div className='item'>
                             <Product tag="new"/>
                            </div>
                            <div className='item'>
                             <Product tag="hot"/>
                            </div>
                            <div className='item'>
                             <Product tag="sale"/>
                            </div>
                            <div className='item'>
                             <Product tag="best"/>
                            </div>
                            <div className='item'>
                             <Product tag="new"/>
                            </div>
                            <div className='item'>
                             <Product tag="sale"/>
                            </div> */}
                
                          </Slider>

                            </div>

                  </div>              

               
                </section>
    </>
  )
}

export default DetailsPage;
