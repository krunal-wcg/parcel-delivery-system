import React, { useReducer } from "react";
import "./home.css";
import { parcels, truckDetails } from "./data";
// import { Button, - } from "react-bootstrap";
import {
  MDBBtn,
  MDBSpinner,
} from "mdb-react-ui-kit";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";
import { useRef } from "react";
import {  toast } from "react-toastify";
import Parcel from "./Parcel";
import Main from "./Main";
import TruckDetails from "./TruckDetails";

export const percentage = (load, capacity) => (load * 100) / capacity;
const HomePage = () => {
  const tmpParcels = useRef(parcels);
  const [click, setclick] = useState("");
  const [truck, setTruck] = useState(
    truckDetails
      .map((oneTruck) => {
        return { ...oneTruck, parcel: [], load: 0 };
      })
  );

  const [loadSpin, setLoadSpin] = useState(false);


  const reducer = (state,action)=>{
    switch (action.type){
      case 'addOne':
    return  state.map((vehicle) => {
        if (
          vehicle.truckNumber === action.truckType &&
          vehicle.load + action.dropValue.weight * 1 <= vehicle.capacity
        ) {
          tmpParcels.current = tmpParcels.current.filter(
            (item) => item.id !== action.dropValue.id*1
          );
            
            
                  
              return {
            ...vehicle,
            parcel: [...vehicle.parcel, action.dropValue],
            load: vehicle.load + action.dropValue.weight * 1,
          };
        }
        return vehicle;
      })

      case 'removeOne':
     return state.map((oneVehicle) => {
        if (oneVehicle.truckNumber === action.number) {
      
          
          return {
            ...oneVehicle,
            parcel: oneVehicle.parcel.filter(
              (item) => item.id !== action.thisPackage.id
            ),
            load: oneVehicle.load - action.thisPackage.weight,
          };
        }
        return oneVehicle;
      })

      case 'addAll':
        return state.slice(0).reverse().map((one) =>
        one.truckNumber === action.vehicle.truckNumber ? action.vehicle : one
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
    dispatch({type:'addOne',truckType:truckType ,dropValue:dropValue })
  };
  const handleClick = (name) => {
    setclick(name);
  };

  const handleRemoveTruck = (thisPackage, number) => {
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
    dispatch({type:'removeOne',number:number,thisPackage:thisPackage})
    
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
    var boxes = [
      ...tmpParcels.current.sort(function (a, b) {
        return a.weight - b.weight;
      }),
    ];
    var vehicles = [
      ...state.sort(function (a, b) {
        return a.maxWeight - b.maxWeight;
      }),
    ];


    vehicles.map((vehicle) => {
      boxes.map((onePkg) => {
        if (
          vehicle.load + onePkg.weight <= vehicle.capacity &&
          vehicle.maxWeight >= onePkg.weight * 1
        ) {
          vehicle = {
            ...vehicle,
            parcel: [onePkg, ...vehicle.parcel],
            load: vehicle.load + onePkg.weight,
          };
          boxes = boxes.filter((item) => item.id !== onePkg.id);
        }

        dispatch({type:'addAll', vehicle:vehicle })
       
        tmpParcels.current = boxes;
        return onePkg
      });
      return vehicle;
    });
    
  };
  const [state, dispatch] = useReducer(reducer, truckDetails)

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
                  <Main truck={state} func={{ addValue, handleClick }} />
        </main>
        <div className="details_bar">
                  <TruckDetails
                    truck={state}
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
