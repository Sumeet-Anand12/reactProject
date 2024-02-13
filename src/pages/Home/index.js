import React, { useState,useEffect,useRef } from 'react'
import './style.css';
import SliderBanner from './Slider/index';
import CatSlider from '../../components/catSlider';
import Banners from '../../components/banners';
import Product from '../../components/product';
import Banner4 from '../../assets/images/banner4.jpg';
import Slider from "react-slick";
import TopProducts from './TopProducts/index';
import NewsletterImg from '../../assets/images/newsletter.png';
import Newsletter from '../../components/newsletter';






const Home  =(props) => {

  const [prodData, setprodData] = useState(props.data)
  const [catArray, setcatArray] = useState([])
  const [activeTab, setactiveTab] = useState();
  const [activeTabIndex, setactiveTabIndex] = useState(0);
  const [activeTabData, setActiveTabData] = useState([]);

  const [bestSells, setBestSells] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  const productRow=useRef();


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    fade: false,
    arrows:true,
    autoplay:3000,
};


const catArr = [];

useEffect(() => {

    prodData.length !== 0 &&
        prodData.map((item) => {
            item.items.length !== 0 &&
                item.items.map((item_) => {
                    catArr.push(item_.cat_name);
                })
        })

    const list2 = catArr.filter((item, index) => catArr.indexOf(item) === index);
    setcatArray(list2)

    setactiveTab(list2[0])

    window.scrollTo(0,0);

}, [])





useEffect(() => {
    var arr = [];
    setActiveTabData(arr);
    prodData.length !== 0 &&
        prodData.map((item, index) => {
            item.items.map((item_, index_) => {
                if (item_.cat_name === activeTab) {
                    {
                        item_.products.length !== 0 &&
                            item_.products.map((product) => {
                                arr.push({ ...product, parentCatName: item.cat_name, subCatName: item_.cat_name })
                            })

                        setActiveTabData(arr)
                        setTimeout(()=>{
                            setIsLoadingProducts(false);
                        },[1000]);
                    }
                }
            })

        })
        // console.log(arr)

}, [activeTab, activeTabData])





const bestSellsArr = [];

useEffect(() => {
    prodData.length !== 0 &&
        prodData.map((item) => {
            if (item.cat_name === "Electronics") {
                item.items.length !== 0 &&
                    item.items.map((item_) => {
                        item_.products.length !== 0 &&
                            item_.products.map((product, index) => {
                                bestSellsArr.push(product);
                            })
                    })
            }

        });


    setBestSells(bestSellsArr);

}, [])





  return (
    <>
      <SliderBanner style={{display:'block'}}/>
      <CatSlider data={prodData} />
      <Banners/>
      
      <section className='homeProducts homeProductWrapper '>
                <div className='container-fluid'>
                    <div className='d-flex align-items-center justify-content-between '>
                        <h2 className='hd mb-0 mt-0 res-full'>Popular Products</h2>
                            <ul className='list list-inline ml-auto filterTab mb-0 res-full'>

                            {
                                catArray.length !== 0 &&
                                catArray.map((cat, index) => {
                                    return (
                                        <li className="list list-inline-item">
                                            <a className={`cursor text-capitalize 
                                                ${activeTabIndex === index ? 'act' : ''}`}
                                                onClick={() => {
                                                    setactiveTab(cat)
                                                    setactiveTabIndex(index);
                                                    productRow.current.scrollLeft=0;
                                                    setIsLoadingProducts(true);
                                                }}
                                            >
                                                {cat}
                                            </a>
                                        </li>
                                    )
                                })
                            }
                       
                              
                              {/* <li className='list-inline-item'>
                                <a className='cursor'>All</a>
                              </li>
                              <li className='list list-inline-item'>
                                <a className='cursor'>Milks & Diaries</a>
                              </li>
                              <li className='list list-inline-item'>
                                <a className='cursor'>Cofees & Teas</a>
                              </li>
                              <li className='list list-inline-item'>
                                <a className='cursor'>Pet Foods</a>
                              </li>
                              <li className='list list-inline-item'>
                                <a className='cursor'>Meats</a>
                              </li>
                              <li className='list list-inline-item'>
                                <a className='cursor'>Vegetables</a>
                              </li> */}
                            </ul>
                      </div>

                        {/* <div className='row productRow'> */}
                        
                      <div className={`productRow ${isLoadingProducts===true && 'loading'}`} ref={productRow}>

                        {
                            activeTabData.length !== 0 &&
                            activeTabData.map((item, index) => {
                                return (
                                    <div className='item' key={index}>

                                        <Product tag={item.type} item={item} />
                                    </div>
                                )
                            })
                        }

                          {/* <div className='item'>
                            <Product tag="sale"/>
                          </div>
                          <div className='item'>
                            <Product tag="hot" />
                          </div>
                          <div className='item'>
                            <Product tag="new" />
                          </div>
                          <div className='item'>
                            <Product tag="best" />
                          </div>
                          <div className='item'>
                            <Product tag="new" />
                          </div>
                          <div className='item'>
                            <Product tag="best" />
                          </div>
                          <div className='item'>
                            <Product tag="new" />
                          </div>
                          <div className='item'>
                            <Product tag="best" />
                          </div>
                          <div className='item'>
                            <Product tag="new" />
                          </div>
                          <div className='item'>
                            <Product tag="best" />
                          </div>
                          <div className='item'>
                            <Product tag="Sale" />
                          </div>
                          <div className='item'>
                            <Product />
                          </div>*/}
                       </div> 
                </div>

      </section>


      <section className='homeProducts homeProductsRow2 mt-0'>

                <div className='container-fluid'>
                    <div className='d-flex align-items-center justify-content-between '>
                        <h2 className='hd mb-0 mt-0 res-full'>Daily best Sells</h2>
                            <ul className='list list-inline ml-auto filterTab mb-0 res-full'>
                              
                              <li className='list-inline-item'>
                                <a className='cursor'>Featured</a>
                              </li>
                              <li className='list list-inline-item'>
                                <a className='cursor'>Popular</a>
                              </li>
                              <li className='list list-inline-item'>
                                <a className='cursor'>New Added</a>
                              </li>
                            </ul>
                      </div>
                      <br/>

                      <div className='row'>
                            <div className='col-md-3 pr-3 res-hide'>
                                <img src={Banner4} className='w-100' />
                            </div>

                            <div className='col-md-9 homeSlider'>
                            <Slider {...settings} className='prodSlider'>  

                             {
                                    bestSells.length !== 0 &&
                                    bestSells.map((item, index) => {
                                        return (
                                            <div className='item' key={index}>
                                                <Product tag={item.type} item={item} />
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
                       
                </div>

      </section>

      <section className='topProductsSection'>
        <div className='container-fluid'>
          <div className='row'>
          <div className='col'>
               <TopProducts title="Top Selling" />
          </div>

            <div className='col'>
                <TopProducts title="Trending Products" />
            </div>

            <div className='col'>
                <TopProducts title="Recently added" />
            </div>

            <div className='col'>
                <TopProducts title="Top Rated" />
            </div>

          </div>
        </div>
      </section>

     



    </>
  )
}

export default Home;
