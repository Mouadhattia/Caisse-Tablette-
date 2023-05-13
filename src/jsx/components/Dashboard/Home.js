import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { Dropdown, Modal, Nav, Pagination } from "react-bootstrap";
//Import Components
import { ThemeContext } from "../../../context/ThemeContext";
import BannerSlider from "./Dashboard/BannerSlider";
import CategorySlider from "./Dashboard/CategorySlider";
import PopularDishesSlider from "./Dashboard/PopularDishesSlider";

import { categoryAction } from "../../../store/actions/CategoryActions";
import { useDispatch, useSelector } from "react-redux";
import {
  ProductAction,
  ProductByCatAction,
} from "../../../store/actions/ProductActions";
import {
  addQuntityAction,
  deleteItemAction,
  removeQuntityAction,
} from "../../../store/actions/CartActions";
import { tableAction } from "../../../store/actions/TableActions";
import { orderAction } from "../../../store/actions/OrderActions";
import swal from "sweetalert";

const Home = () => {
  const dispatch = useDispatch();
  const [dropSelect, setDropSelect] = useState("Table");
  const { changeBackground } = useContext(ThemeContext);
  const [detailsModal, setDetailsModal] = useState(false);
  const [notesModal, setNotesModal] = useState(false);
  const [catId, setCatId] = useState(null);
  const [tableId, setTableId] = useState(null);
  const [note, setNote] = useState("");
  useEffect(() => {
    changeBackground({ value: "light", label: "Light" });
  }, []);

  useEffect(() => {
    dispatch(categoryAction());
  }, [dispatch]);
  useEffect(() => {
    if (catId) {
      dispatch(ProductByCatAction(catId));
    } else {
      dispatch(ProductAction());
    }
  }, [dispatch, catId]);
  useEffect(() => {
    dispatch(tableAction());
  }, [dispatch]);
  const { cart } = useSelector((state) => state.cart);
  const { categories } = useSelector((state) => state.categories);
  const { products } = useSelector((state) => state.products);
  const { tables } = useSelector((state) => state.tables);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const handleCountAdd = (id) => {
    dispatch(addQuntityAction(id));
  };
  const handleCountMinus = (id) => {
    dispatch(removeQuntityAction(id));
  };
  const handleDelteItem = (id) => {
    dispatch(deleteItemAction(id));
  };
  const handleCreateOrder = (e) => {
    e.preventDefault();

    const order = {
      totalPrice: totalPrice,
      orderItems: cart,
      tableId: tableId,
      note: note,
    };

    if (cart.length !== 0) {
      if (tableId != null) {
        dispatch(orderAction(order));
      } else {
        swal("Ops!", "Sélectionnez votre table svp", "error");
      }
    }
  };
  //pagination

  const productsPerPage = 6;
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return products.slice(startIndex, endIndex);
  }, [currentPage, products, productsPerPage]);

  const handlePrevClick = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    if (currentPage === totalPages) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  const pag = (size, gutter, variant, bg, circle) => (
    <>
      <Pagination
        size={size}
        className={`mt-4  ${gutter ? "pagination-gutter" : ""} ${
          variant && `pagination-${variant}`
        } ${!bg && "no-bg"} ${circle && "pagination-circle"}`}
      >
        <li className={`page-item ${currentPage === 1 && "disabled"}`}>
          <Link className="page-link" to="#" onClick={handlePrevClick}>
            <i className="la la-angle-left" />
          </Link>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={index + 1}
            className={`page-item ${currentPage === index + 1 && "active"}`}
          >
            <Link
              className="page-link"
              to="#"
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Link>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
          <Link className="page-link" to="#" onClick={handleNextClick}>
            <i className="la la-angle-right" />
          </Link>
        </li>
      </Pagination>
    </>
  );

  return (
    <>
      <div className="row">
        <div className="col-xl-8 col-xxl-7">
          <div className="row">
            <div className="col-xl-12">
              <BannerSlider />
            </div>

            <div className="col-xl-12">
              <div className="d-flex align-items-center justify-content-between mb-2 gap">
                <h4 className=" mb-0 cate-title">Nos categories</h4>
              </div>
              <CategorySlider
                categories={categories}
                setCatId={setCatId}
                catId={catId}
              />
            </div>
            <div className="col-xl-12">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h4 className=" mb-0 cate-title">Nos produits</h4>
              </div>
              <PopularDishesSlider products={paginatedProducts} />
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Nav>{pag("xs", true, "primary", true, false)}</Nav>
              </div>
            </div>
       
          </div>
        </div>
        <div className="col-xl-4 col-xxl-5">
          <div className="row">
            <div className="col-xl-12">
              <div className="card dlab-bg dlab-position">
                <div className="card-header border-0 pb-0">
                  <h4 className="cate-title">Votre Commande</h4>
                </div>
                <div className="card-body pt-0 pb-2">
                  <div className="bb-border">
                    <p>
                      Bienvenue dans notre café-restaurant où la fraîcheur et la
                      qualité sont notre priorité. Notre équipe de chefs
                      passionnés crée des plats délicieux et esthétiquement
                      plaisants pour tous les goûts. Venez profiter de notre
                      ambiance chaleureuse et accueillante tout en dégustant nos
                      délicieux plats. Bon appétit!
                    </p>
                    <div className="d-flex">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setDetailsModal(true)}
                      >
                        Sélectionnez une table
                      </button>
                      {/* <!-- Modal --> */}
                      <button
                        type="button"
                        className="btn btn-primary ms-2"
                        onClick={() => setNotesModal(true)}
                      >
                        Ajouter une note ?
                      </button>
                      {/* <!-- Modal --> */}
                    </div>
                  </div>
                  {cart.map((item, index) => (
                    <div
                      className="order-check d-flex align-items-center my-3"
                      key={index}
                    >
                      <h4
                        className="delte-table"
                        onClick={() => handleDelteItem(item.id)}
                      >
                        x
                      </h4>
                      <div className="dlab-media">
                        <img src={item.img} alt="" />
                      </div>
                      <div className="dlab-info">
                        <div className="d-flex align-items-center justify-content-between">
                          <h4 className="dlab-title">
                            <Link to={"#"}>{item.name}</Link>
                          </h4>
                          <h4 className="text-primary ms-2">
                            {item.price * item.qty} TND
                          </h4>
                        </div>

                        <div className="d-flex align-items-center justify-content-between">
                          {item.supplements.length === 0 ? (
                            <span></span>
                          ) : (
                            <div>
                              {item.supplements.map((supp, index) => (
                                <ul key={index}>
                                  <li>-{supp.name}</li>
                                </ul>
                              ))}
                            </div>
                          )}
                          <div className="quntity">
                            <button
                              data-decrease
                              onClick={() => handleCountMinus(item.id)}
                            >
                              -
                            </button>
                            <input readOnly type="text" value={item.qty} />
                            <button
                              data-increase
                              onClick={() => handleCountAdd(item.id)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <hr
                    className="my-2 text-primary"
                    style={{ opacity: "0.9" }}
                  />
                </div>
                <div className="card-footer  pt-0 border-0">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h4 className="font-w500">Total</h4>
                    <h3 className="font-w500 text-primary">{totalPrice} TND</h3>
                  </div>
                  <Link
                    onClick={(e) => handleCreateOrder(e)}
                    className="btn btn-primary btn-block"
                    style={{
                      backgroundColor: cart.length == 0 ? "gray" : "#98c62b",
                    }}
                  >
                    Commander
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        id="exampleModal"
        show={detailsModal}
        onHide={setDetailsModal}
        centered
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Sélectionnez votre table
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setDetailsModal(false)}
          ></button>
        </div>
        <div className="modal-body add-loaction">
          <div className="row">
            <div className="col-xl-12">
              <p className="mb-1">Table</p>

              <Dropdown className="drop-select-blog">
                <Dropdown.Toggle
                  as="div"
                  className="form-control default-select ms-0 py-4 wide i-false"
                >
                  {dropSelect}{" "}
                  <i className="fas fa-chevron-down drop-select-icon"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {tables?.map((table, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => {
                        setDropSelect(`Table ${table.number}`);
                        setTableId(table.id);
                      }}
                    >
                      Table {table.number}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setDetailsModal(false);
              setTableId(null);
              setDropSelect("Table");
            }}
          >
            Annuler
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setDetailsModal(false)}
          >
            Confirmer
          </button>
        </div>
      </Modal>
      <Modal
        className="modal fade"
        id="exampleModal2"
        show={notesModal}
        onHide={setNotesModal}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel2">
            Note
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setNotesModal(false)}
          ></button>
        </div>
        <div className="modal-body add-note">
          <div className="row align-items-center">
            <div className="col-xl-12">
              <div className="mb-3">
                <label className="form-label">Notes</label>
                <textarea
                  onChange={(e) => setNote(e.target.value)}
                  className="form-control"
                  placeholder="Ajouter votre note ..."
                  id="floatingTextarea"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setNotesModal(false);
              setNote("");
            }}
          >
            Annuler
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setNotesModal(false)}
          >
            Confirmer
          </button>
        </div>
      </Modal>
    </>
  );
};
export default Home;
