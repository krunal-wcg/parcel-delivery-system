import { MDBProgress, MDBProgressBar } from 'mdb-react-ui-kit';
import React from 'react'
import { percentage } from './HomePage';
import { toast } from 'react-toastify';
import { allTrucks } from './data';

const Main = ({truckData,func}) => {

    function drop(ev) {
        if (ev.dataTransfer.getData("id")) {
          ev.preventDefault();
    
          const truckType = ev.target.dataset.type; // set truck type from the HTML atribute data-type
    
          //set drag value to drop
          const dropValue = {
            name: ev.dataTransfer.getData("name"),
            id: ev.dataTransfer.getData("id"),
            weight: ev.dataTransfer.getData("weight"),
            pakageFor: ev.dataTransfer.getData("pin"),
          };

          console.log(dropValue);
        //   console.log(truck.parcel);
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
          func.addValue(truckType, dropValue);
          // })
        }
    
        // console.log(truck);
      }
      function allowDrop(ev) {
        ev.preventDefault();
      }
  return (
    <div>
        {/* <div style={{ height: "calc(100vh - 100px)" }}>
            {truck
              .map((oneVehicleTruck, index) => (
                <div
                  key={index}
                  onClick={() => {
                    func.handleClick(oneVehicleTruck.type);
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
                    height="296"
                    className="mb-4 border border-dark  border-4 rounded-6"
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
                  <div className="vehicle-number">{oneVehicleTruck.truckNumber}</div>
                </div>
              ))}
          </div> */}
              <div style={{ height: "calc(100vh - 100px)" ,display:'flex'}}>
            {truckData.sort(function (a, b) {
        return a.pincode - b.pincode;
      }).map((addressCode, index) => (

<div  key={index}  style={{display:'flex' ,flexDirection:'column',position: "relative", width: "325px", overflowY: 'scroll',
  transform: "rotate('-90deg')" , scrollDirection: 'horizontal',minWidth:'275px' ,margin:'0 25px'}}>

    <h1>{addressCode.pincode}</h1> 

                {addressCode.trucks.sort(function (a, b) {
        return b.maxWeight - a.maxWeight;
      }).map((oneVehicleTruck ,i)=>(

                <div
                  key={i}
                //   style={}
                  onClick={() => {
                      func.handleClick(oneVehicleTruck.truckNumber);
                    }}
                    id="1"
                    style={{position:'relative' }}
                    onDrop={(e) => {
                        drop(e);
                    }}
                    onDragOver={(e) => {
                        allowDrop(e);
                    }}
                    >
                  <MDBProgress
                    height="296"
                    className="mb-4 border border-dark  border-4 rounded-6"
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
                            // width={52}
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
                      data-pincode={addressCode.pincode}
                      style={{
                          width: "80%",
                          position: "absolute",
                          top: "0",
                          left: "10%",
                        }}
                        />{" "}
                  </div>
                  <div className="vehicle-number">{oneVehicleTruck.truckNumber}</div>
                </div>
                ))}
              </div>
              ))}
          </div>
    </div>
  )
}

export default Main