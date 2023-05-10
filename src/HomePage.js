import React, { useEffect } from "react";
import "./home.css";
import { parcels, truckDetails } from "./data";
// import { Button, - } from "react-bootstrap";
import { MDBBtn, MDBIcon, MDBProgress, MDBProgressBar, MDBSpinner } from "mdb-react-ui-kit";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";


const percentage = (load, capacity) => (load * 100) / capacity;
const HomePage = () => {
  const tmpParcels = useRef(parcels);
  const [click, setclick] = useState("");
  const [truck, setTruck] = useState(
    truckDetails
      .slice(0)
      .reverse(0)
      .map((oneTruck) => {
        return { ...oneTruck, parcel: [], load: 0 };
      })
  );
  // const loadSpin=useRef(false)
  const [loadSpin, setLoadSpin] = useState(false)
  let state = { loading: false, progress: 0 }
  function drag(ev, item) {
    /* set the value that we drag   */
    ev.dataTransfer.setData("name", item.name);
    ev.dataTransfer.setData("id", item.id);
    ev.dataTransfer.setData("weight", item.weight);
  }

  const addValue = (truckType, dropValue) => {
    console.log("funtion called", dropValue);
    /*
     *  check truck type and if it is full or not
     *   set the truck parcel and load
     */

    setTruck((truck) =>
      truck.map((vehicle) => {
        if (
          vehicle.truckNumber === truckType &&
          vehicle.load + dropValue.weight * 1 <= vehicle.capacity
        ) {
          tmpParcels.current = tmpParcels.current.filter(
            (item) => item.id != dropValue.id
          );

          // console.log('dropValue', dropValue);
          return {
            ...vehicle,
            parcel: [...vehicle.parcel, dropValue],
            load: vehicle.load + dropValue.weight * 1,
          };
        }
        console.log("--------------------------------------------------");
        return vehicle;
      })
    );

    //  }

    // });
  };
  console.log(truck, "truvk");

  function drop(ev) {
    if (ev.dataTransfer.getData("id")) {
      ev.preventDefault();

      const truckType = ev.target.dataset.type; // set truck type from the HTML atribute data-type

      //set drag value to drop
      const dropValue = {
        name: ev.dataTransfer.getData("name"),
        id: ev.dataTransfer.getData("id"),
        weight: ev.dataTransfer.getData("weight"),
      };
      console.log(truck[0].parcel);
      // truck.map((oneTruck)=>{
      // if(oneTruck.load+dropValue.weight >= oneTruck.capacity)
      toast.success("Your Item add in " + truckType, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      addValue(truckType, dropValue);
      // })
    }

    // console.log(truck);
  }
  function allowDrop(ev) {
    ev.preventDefault();
  }

  // console.log(click);
  const handleClick = (name) => {
    setclick(name);
  };

  const handleRemoveTruck = (thisPackage, number) => {
    console.log(thisPackage, number);
    setTruck(
      truck.map((oneVehicle) => {
        if (oneVehicle.truckNumber === number) {
          console.log(oneVehicle);
          toast.warning("item remove from " + oneVehicle.truckNumber, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          return {
            ...oneVehicle,
            parcel: oneVehicle.parcel.filter(
              (item) => item.id != thisPackage.id
            ),
            load: oneVehicle.load - thisPackage.weight,
          };
        }
        return oneVehicle;
      })
    );
    // setPakageList([...packageList, thisPackage])
    tmpParcels.current = [...tmpParcels.current, thisPackage];
  };

  const addAll = () => {
    // state={ loading: true,
    //   progress: 0.5,}
    toast.success("All Possible Parcel Set", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    var boxes = tmpParcels.current.sort(function (a, b) {
      return a.weight - b.weight;
    });
    var vehicles = truck.sort(function (a, b) {
      return a.maxWeight - b.maxWeight;
    });

    console.log(vehicles);

    vehicles.map((vehicle) => {
      boxes.map((onePkg) => {

        if (
          vehicle.load + onePkg.weight <= vehicle.capacity &&
          vehicle.maxWeight >= onePkg.weight * 1
        ) {
          vehicle = {
            ...vehicle,
            parcel: [...vehicle.parcel, onePkg],
            load: vehicle.load + onePkg.weight,
          };
          boxes = boxes.filter((item) => item.id != onePkg.id);
        }
        console.log(vehicle);
        console.log(boxes);

        setTruck((truck) =>
          truck.map((one) =>
            one.truckNumber === vehicle.truckNumber ? vehicle : one
          )
        );
        tmpParcels.current = boxes;
      });
      return vehicle;
    });
  };
  return (
    <>
      <div className="home_container">
        <aside className="left_bar">
          <div className="d-grid ">

            {/* <MDBBtn
              onClick={(e) => {
                addAll();
              }}
            >
              {" "}
              ADD ALL ...
            </MDBBtn> */}

            <MDBBtn disabled={false} onClick={(e) => {
              // e.target.disabled=true
              // loadSpin.current=true
              setLoadSpin(true)
              setTimeout(() => { setLoadSpin(false); addAll() }, 2000);
              // addAll();
            }} >
              {loadSpin && <MDBSpinner size='sm' role='status' tag='span' className='me-2' />}
              ADD ALL ...
            </MDBBtn>
          </div>
          {tmpParcels.current.map((item) => (
            <div
              key={item.id}
              className="pakeges_aside"
              style={{
                background:
                  item.weight <= 1
                    ? "#0dcaf0"
                    : item.weight <= 10
                      ? "#fff561"
                      : "#6deb64",
              }}
              draggable="true"
              onDragStart={(e) => {
                drag(e, item);
              }}
            >
              name:{item.name} <br />
              weight:{item.weight}
            </div>
          ))}
        </aside>
        <main className="right_bar">
          <div style={{ height: "calc(100vh - 100px)" }}>
            {truck
              .slice(0)
              .reverse(0)
              .map((oneVehicleTruck, index) => (
                <div
                  key={index}
                  onClick={() => {
                    handleClick(oneVehicleTruck.type);
                  }}
                  id="1"
                  style={{ position: "relative", width: "325px" }}
                  onDrop={(e) => {
                    drop(e);
                  }}
                  onDragOver={(e) => {
                    allowDrop(e);
                  }}
                >
                  <MDBProgress
                    height="275"
                    className="mb-5 border border-dark  border-4 rounded-6"
                  >
                    <MDBProgressBar
                      striped
                      animated
                      // bgColor="danger"
                      style={{
                        background:
                          percentage(
                            oneVehicleTruck.load,
                            oneVehicleTruck.capacity
                          ) < 50
                            ? "#24b043"
                            : percentage(
                              oneVehicleTruck.load,
                              oneVehicleTruck.capacity
                            ) < 90
                              ? "#ffb74d"
                              : "#ff4949",
                      }}
                      // width={uploadProgress}
                      width={percentage(
                        oneVehicleTruck.load,
                        oneVehicleTruck.capacity
                      )}
                      valuemin={0}
                      valuemax={100}
                    >
                      {" "}
                    </MDBProgressBar>
                  </MDBProgress>
                  <div
                    style={{
                      position: "absolute",
                      zIndex: "1",
                      top: "0",
                      right: "10% ",
                      fontSize: "28px",
                    }}
                  >
                    {Math.round((oneVehicleTruck.load) * 100) / 100}KG
                  </div>
                  <div>
                    {" "}
                    <img
                      src={oneVehicleTruck.img}
                      alt={oneVehicleTruck.type}
                      data-type={oneVehicleTruck.truckNumber}
                      style={{
                        width: "80%",
                        position: "absolute",
                        top: "0",
                        left: "10%",
                      }}
                    />{" "}
                  </div>
                </div>
              ))}
          </div>
        </main>
        <div className="details_bar">
          {/* <h1>hello</h1> */}

          {click &&
            truck.map(
              (item, i) =>
                item.type === click && (
                  <div key={i}>
                    {/* <div style={{width:'100%'}}> */}

                    <img
                      src={item.img}
                      className="details-image "
                      alt={item.type}
                    />
                    {/* </div> */}
                    <h2>{item.truckNumber}</h2>

                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "separate",
                        borderSpacing: "0 1em",
                        border: "0px solid white",
                      }}
                    >
                      <thead className="details-head">
                        <tr>
                          <th className="list-td">Parcel-Id</th>
                          <th className="list-td">Name</th>
                          <th className="list-td">Parcel weight</th>
                          <th className="list-td">Remove </th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.parcel.map((thisPackage) => (
                          <tr key={thisPackage.id} className=" details-list">
                            <td
                              className="list-td"
                              style={{
                                background:
                                  thisPackage.weight <= 1
                                    ? "#0dcaf0"
                                    : thisPackage.weight <= 10
                                      ? "#fff561"
                                      : "#6deb64",
                              }}
                            >
                              {thisPackage.id}
                            </td>
                            <td
                              className="list-td"
                              style={{
                                background:
                                  thisPackage.weight <= 1
                                    ? "#0dcaf0"
                                    : thisPackage.weight <= 10
                                      ? "#fff561"
                                      : "#6deb64",
                              }}
                            >
                              {thisPackage.name}
                            </td>
                            <td
                              className="list-td"
                              style={{
                                background:
                                  thisPackage.weight <= 1
                                    ? "#0dcaf0"
                                    : thisPackage.weight <= 10
                                      ? "#fff561"
                                      : "#6deb64",
                              }}
                            >
                              {thisPackage.weight}{" "}
                            </td>
                            <td
                              className="list-td"
                              style={{
                                background:
                                  thisPackage.weight <= 1
                                    ? "#0dcaf0"
                                    : thisPackage.weight <= 10
                                      ? "#fff561"
                                      : "#6deb64",
                              }}
                            >
                              <MDBBtn
                                className="bg-danger"
                                onClick={() =>
                                  handleRemoveTruck(
                                    thisPackage,
                                    item.truckNumber
                                  )
                                }
                              >
                                {" "}
                                <MDBIcon fas icon="trash" />
                              </MDBBtn>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
            )}
        </div>
      </div>
      {/* </DragDropContext> */}
    </>
  );
};

export default HomePage;
