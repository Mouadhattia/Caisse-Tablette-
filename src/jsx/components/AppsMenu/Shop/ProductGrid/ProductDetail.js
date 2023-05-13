import React, { useEffect, useState } from "react";
import { Modal, Nav, Tab } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import classnames from "classnames";
import avater1 from "../../../../../images/avatar/1.jpg";
import check from "../../../../../icons/bootstrap-icons/icons/check-square-fill.svg";
import PageTitle from "../../../../layouts/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  ProductByIdAction,
  SupplmentsAction,
} from "../../../../../store/actions/ProductActions";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { addItemAction } from "../../../../../store/actions/CartActions";
import swal from "sweetalert";
//import StarRating from './../ProductList/StarRating';

const ProductDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { product } = useSelector((state) => state.products);
  const { supplments } = useSelector((state) => state.products);
  const [reviewToggle, setReviewToggle] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [price, setPrice] = useState(null);
  const [supp, setSupp] = useState([]);
  const [sizePrice, setSizePrice] = useState(0);
  const [qty, setQty] = useState(1);
  const suppPrices = supp.reduce(
    (acc, supplement) => acc + supplement.price,
    0
  );

  const handleSupplementClick = (supplement) => {
    const index = supp.findIndex((item) => item.id === supplement.id);
    if (index === -1) {
      setSupp([...supp, supplement]);
    } else {
      const newSupp = supp.filter((item) => item.id !== supplement.id);

      setSupp(newSupp);
    }
  };

  useEffect(() => {
    if (sizePrice !== 0) {
      setPrice(suppPrices + sizePrice);
    } else {
      setPrice(suppPrices + product.price);
    }
  }, [suppPrices, product.price]);

  const catName = categories?.filter((e) => (e.id = product?.catId))[0]?.name;
  const toggle = (tab) => {
    if (activeTab !== tab.size) {
      setActiveTab(tab.size);
      setPrice(tab.price + suppPrices);
      setSizePrice(tab.price);
    }
  };
  const { id } = useParams();
  useEffect(() => {
    dispatch(ProductByIdAction(id));
    dispatch(SupplmentsAction(id));
  }, [dispatch]);

  //:create item
  const handleAddItem = () => {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const item = {
      id: randomId,
      name: product?.name,
      img: product?.img1,
      price: price,
      qty: qty,
      supplements: supp,
      size: activeTab,
    };

    dispatch(addItemAction(item));
    swal("succès!", "Produit ajouter", "success").then((value) => {
      navigate("/");
    });
  };

  return (
    <>
      <PageTitle motherMenu="Accueil" activeMenu="Détails du produit" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-xl-3 col-lg-6  col-md-6 col-xxl-5 ">
                  {/* Tab panes */}
                  <Tab.Container defaultActiveKey="first">
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <img className="img-fluid" src={product.img1} alt="" />
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <img className="img-fluid" src={product.img2} alt="" />
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <img className="img-fluid" src={product.img3} alt="" />
                      </Tab.Pane>
                      <Tab.Pane eventKey="four">
                        <img className="img-fluid" src={product.img4} alt="" />
                      </Tab.Pane>
                    </Tab.Content>
                    <div className="tab-slide-content new-arrival-product mb-4 mb-xl-0">
                      {/* Nav tabs */}
                      <Nav
                        as="ul"
                        className="nav slide-item-list mt-3"
                        role="tablist"
                      >
                        <Nav.Item as="li">
                          <Nav.Link as="a" eventKey="first" to="#first">
                            <img
                              className="img-fluid"
                              src={product.img1}
                              alt=""
                              width={50}
                            />
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                          <Nav.Link as="a" eventKey="second" to="#second">
                            <img
                              className="img-fluid"
                              src={product.img2}
                              alt=""
                              width={50}
                            />
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                          <Nav.Link as="a" eventKey="third" to="#third">
                            <img
                              className="img-fluid"
                              src={product.img3}
                              alt=""
                              width={50}
                            />
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                          <Nav.Link as="a" to="#for" eventKey="four">
                            <img
                              className="img-fluid"
                              src={product.img4}
                              alt=""
                              width={50}
                            />
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </div>
                  </Tab.Container>
                </div>
                {/*Tab slider End*/}

                <div className="col-xl-9 col-lg-6  col-md-6 col-xxl-7 col-sm-12">
                  <div className="product-detail-content">
                    {/*Product details*/}
                    <div className="new-arrival-content pr">
                      <h4>{product?.name}</h4>

                      <div className="d-table mb-2">
                        <p className="price float-left d-block">
                          {price || product?.price}TND
                        </p>
                      </div>
                      <p>
                        {" "}
                        Availability:{" "}
                        <span className="item">
                          {" "}
                          In stock <i className="fa fa-shopping-basket" />
                        </span>
                      </p>
                      <p>
                        {" "}
                        Product code: <span className="item">
                          {product.id}
                        </span>{" "}
                      </p>
                      <p>
                        Brand: <span className="item">{catName}</span>
                      </p>

                      <p className="text-content">{product.desc}</p>
                      <div className="d-flex align-items-end flex-wrap mt-4">
                        <div className="filtaring-area me-3">
                          {product?.size?.length !== 0 && (
                            <div className="size-filter">
                              <h4 className="m-b-15">Select size</h4>
                              <div className="btn-group" data-toggle="buttons">
                                {product?.size?.map((data, index) => (
                                  <label
                                    key={index}
                                    className={
                                      classnames({
                                        active: activeTab === data.size,
                                      }) + " btn btn-outline-primary light "
                                    }
                                    onClick={() => {
                                      toggle(data);
                                    }}
                                  >
                                    <input
                                      type="radio"
                                      className="position-absolute invisible"
                                      name="options"
                                      id="option1"
                                      defaultChecked
                                    />
                                    {data.size}
                                  </label>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        {/*Quantity start*/}
                        <div className="col-2 px-0  mb-2 me-3">
                          <h4 className="m-b-15">Quantité</h4>
                          <input
                            type="number"
                            name="num"
                            className="form-control input-btn input-number"
                            defaultValue={qty}
                            onChange={(e) => setQty(e.target.value)}
                          />
                        </div>
                        {/*Quanatity End*/}
                        {/*Supplment start*/}
                        <h4 style={{ margin: "auto" }}>Supplement</h4>
                        <Swiper
                          className="mySwiper-2"
                          speed={1200}
                          slidesPerView={3}
                          spaceBetween={20}
                          loop={true}
                          autoplay={{
                            delay: 1200,
                          }}
                          modules={[Autoplay]}
                          breakpoints={{
                            360: {
                              slidesPerView: 2,
                              spaceBetween: 20,
                            },
                            600: {
                              slidesPerView: 3,
                              spaceBetween: 20,
                            },
                            768: {
                              slidesPerView: 4,
                              spaceBetween: 20,
                            },
                            1200: {
                              slidesPerView: 3,
                              spaceBetween: 20,
                            },
                            1920: {
                              slidesPerView: 5,
                              spaceBetween: 20,
                            },
                          }}
                        >
                          {supplments?.map((cat, index) => (
                            <SwiperSlide key={index}>
                              <div
                                className="cate-bx text-center"
                                onClick={() => handleSupplementClick(cat)}
                              >
                                <div className="card">
                                  <div className="card-body">
                                    <img
                                      height={70}
                                      width={100}
                                      src={cat.img}
                                    />

                                    <h6 className="mb-0 font-w500">
                                      {cat.name}
                                    </h6>
                                    <h4 className="font-w700 text-primary">
                                      {cat.price} TND
                                    </h4>

                                    {supp.findIndex(
                                      (item) => item.id === cat.id
                                    ) !== -1 && (
                                      <img
                                        src={check}
                                        alt="icon"
                                        width={20}
                                        style={{
                                          position: "absolute",
                                          right: "45%",
                                        }}
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </SwiperSlide>
                          ))}
                          <div className="swiper-pagination"></div>
                        </Swiper>
                        {/*Supplment End*/}
                        <div className="shopping-cart  mb-2 me-3">
                          <Link
                            className="btn btn-primary"
                            onClick={() => handleAddItem()}
                          >
                            <i className="fa fa-shopping-basket me-2" />
                            Add to cart
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* review */}
        <Modal
          show={reviewToggle}
          onHide={setReviewToggle}
          className="modal fade"
          id="reviewModal"
        >
          <>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Review</h5>
                <button
                  type="button"
                  onClick={() => setReviewToggle(false)}
                  className="btn-close"
                  data-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setReviewToggle(false);
                  }}
                >
                  <div className="text-center mb-4">
                    <img
                      className="img-fluid rounded"
                      width={78}
                      src={avater1}
                      alt="DexignZone"
                    />
                  </div>
                  <div className="form-group">
                    <div className="rating-widget mb-4 text-center">
                      {/* Rating Stars Box */}
                      <div className="rating-stars">
                        <ul
                          id="stars"
                          className="d-flex justify-content-center align-items-center"
                        >
                          <li>
                            <i className="fa fa-star me-1" />
                          </li>{" "}
                          <li>
                            <i className="fa fa-star me-1" />
                          </li>{" "}
                          <li>
                            <i className="fa fa-star me-1" />
                          </li>{" "}
                          <li>
                            <i className="fa fa-star me-1" />
                          </li>{" "}
                          <li>
                            <i className="fas fa-star-half-alt" />
                          </li>{" "}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <textarea
                      className="form-control"
                      placeholder="Comment"
                      rows={5}
                      defaultValue={""}
                    />
                  </div>
                  <button className="btn btn-success btn-block">RATE</button>
                </form>
              </div>
            </div>
          </>
        </Modal>
      </div>
    </>
  );
};

export default ProductDetail;
