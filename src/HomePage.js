import React, { useReducer } from "react";
import "./home.css";
import { allTrucks, parcels, truckDetails } from "./data";
// import { Button, - } from "react-bootstrap";
import {
  MDBBtn,
  MDBSpinner,
} from "mdb-react-ui-kit";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";
import { useRef } from "react";
import { toast } from "react-toastify";
import Parcel from "./Parcel";
import Main from "./Main";
import TruckDetails from "./TruckDetails";


export const percentage = (load, capacity) => (load * 100) / capacity;
const HomePage = () => {
  const tmpParcels = useRef(parcels);
  const [click, setclick] = useState("");

  const [loadSpin, setLoadSpin] = useState(false);


  const reducer = (state, action) => {
    switch (action.type) {
      case 'addOne':
        return state.map((_location) => {
          if (_location.pincode == action.dropValue.pakageFor) {
            let trucksForLocation = _location.trucks;
            let thisTrucks = trucksForLocation.filter((single) => {
              return single.truckNumber === action.truckNumber &&
                single.load + action.dropValue.weight * 1 <= single.capacity;
            });
            if(thisTrucks.length < 1){
              return _location;
            }
            let thisTruck = thisTrucks[0];
            if (thisTruck.parcel.filter(x => x.id === action.dropValue.id)[0]?.id !== action.dropValue.id) {
              thisTruck = {
                ...thisTruck,
                parcel: [...thisTruck.parcel, action.dropValue],
                load: thisTruck.load + action.dropValue.weight * 1,
              };

              tmpParcels.current = tmpParcels.current.filter(
                (item) => item.id !== action.dropValue.id * 1
              );
              _location.trucks = _location.trucks.map(update => {
                if(thisTruck.truckNumber === update.truckNumber){
                  return thisTruck;
                }else{
                  return update;
                }
              })
            }
          }
          return _location;

        })

      case 'removeOne':
        return state.map((areaTruck) => {
          // console.log(areaTruck,'beforeeeee');
          areaTruck.trucks.map((oneVehicle, i) => {
            if (oneVehicle.truckNumber === action.number) {
              var cuurentTruck = {
                ...oneVehicle,
                parcel: oneVehicle.parcel.filter(
                  (item) => item.id !== action.thisPackage.id
                ),
                load: oneVehicle.load - action.thisPackage.weight,
              };
            }
            console.log("Current", cuurentTruck);
            console.log(areaTruck.pincode, 'zsdxfcgvhbnjk');

            if (oneVehicle.truckNumber == action.number) {
              oneVehicle = cuurentTruck
              console.log('oneeeeeeeeeeeeeee', oneVehicle);
            }

            areaTruck.trucks[i] = oneVehicle


          })

          return areaTruck;
        }
        )

      case 'addAll':
        console.log(action.vehicle);

        return state.sort(function (a, b) {
          return a.pincode - b.pincode;
        }).map((area) => {
          console.log(area, '77777');
          area.trucks.map((one, i) =>
            area.trucks[i] = one.truckNumber === action.vehicle.truckNumber ? action.vehicle : one
          )

          return area;
        }
        )
      default:
      // {return null}
    }

  }

  const addValue = (truckType, dropValue) => {
    /*
     *  check truck type and if it is full or not
     *   set the truck parcel and load
     */
    dispatch({ type: 'addOne', truckNumber: truckType, dropValue: dropValue })
  };
  const handleClick = (number) => {
    console.log(number);
    setclick(number);
  };

  const handleRemoveTruck = (thisPackage, number) => {
    console.log(thisPackage);
    toast.warning("item remove from " + number, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    dispatch({ type: 'removeOne', number: number, thisPackage: thisPackage })

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


    var weightParcel = [
      ...tmpParcels.current.sort(function (a, b) {
        return a.weight - b.weight;
      }),
    ];



    var boxes = [
      ...weightParcel.sort(function (a, b) {
        return a.pakageFor - b.pakageFor;
      }),
    ];


    console.log(boxes);

    var areaTrucks = [
      ...state.sort(function (a, b) {
        return a.pincode - b.pincode;
      }),
    ];
    areaTrucks.map((singlearea) => {

      var vehicles = [
        ...singlearea.trucks.sort(function (a, b) {
          return a.maxWeight - b.maxWeight;
        }),
      ];
      console.log(vehicles, 'kessy');

      vehicles.map((vehicle) => {

        boxes.map((onePkg) => {

          if (
            vehicle.load + onePkg.weight <= vehicle.capacity &&
            vehicle.maxWeight >= onePkg.weight * 1 && vehicle.pincode === onePkg.pakageFor
          ) {
            vehicle = {
              ...vehicle,
              parcel: [onePkg, ...vehicle.parcel],
              load: vehicle.load + onePkg.weight,
            };
            boxes = boxes.filter((item) => item.id !== onePkg.id);
          }

          dispatch({ type: 'addAll', vehicle: vehicle })

          tmpParcels.current = boxes;
          return onePkg
        });
        return vehicle;
      });

    })
  };
  const [state, dispatch] = useReducer(reducer, allTrucks)
  console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", state, "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
  return (
    <>
      <div className="home_container">
        <div className="addAll-btn">
          <MDBBtn
            disabled={false}
            className="gap-2 col-12 mx-2 my-4 addAll-btn"
            onClick={(e) => {
              // e.target.disabled=true
              // loadSpin.current=true
              toast.success("Adding ", {
                position: "top-right",
                autoClose: 1450,
                hideProgressBar: false,
                closeOnClick: true,
                // pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              setLoadSpin(true);

              setTimeout(() => {
                setLoadSpin(false);
                addAll();
              }, 2000);
              // addAll();
            }}
          >
            {loadSpin && (
              <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
            )}
            ADD ALL ...
          </MDBBtn>
        </div>
        <aside className="left_bar">
          <Parcel tmpParcels={tmpParcels} />
        </aside>
        <main className="right_bar">
          <Main truckData={state} func={{ addValue, handleClick }} />
        </main>
        <div className="details_bar">
          {console.log("00000000000000000000000000000", state)}
          <TruckDetails
            truckData={state}
            handleRemoveTruck={handleRemoveTruck}
            click={click}
          />
        </div>
      </div>
      {/* </DragDropContext> */}
    </>
  );
};

export default HomePage;
