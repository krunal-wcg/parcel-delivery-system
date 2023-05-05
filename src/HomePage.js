import React, { useEffect } from "react";
import "./home.css";
import { pakages } from "./data";
// import { Button, - } from "react-bootstrap";
import { MDBProgress, MDBProgressBar } from "mdb-react-ui-kit";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";


const percentage = (x,y)=> (x*100 /y)
  


const HomePage = () => {
  const [pakageList, setPakageList] = useState(pakages);  

  /*TODO :
  * change truck from static to dynamic 
  * for that set image location to the truck
  * get a map function in the it    
  */
  const [truck, setTruck] = useState([
    { type: "cargo", parcel: [], capacity:1000,load:0},
    { type: "delivery", parcel: [] , capacity:750,load:0},
    { type: "vehicle", parcel: [] , capacity:500,load:0},
  ]);

  function drag(ev, item) {
    /* set the value that we drag   */
    ev.dataTransfer.setData("name", item.name);
    ev.dataTransfer.setData("id", item.id);
    ev.dataTransfer.setData("weight", item.weight);
  }


  function drop(ev) {

    const truckType = ev.target.dataset.type;  // set truck type from the HTML atribute data-type

      //set drag value to drop
    const dropValue = {
      name: ev.dataTransfer.getData("name"),
      id: ev.dataTransfer.getData("id"),
      weight: ev.dataTransfer.getData("weight")
    };
    console.log(truck[0].parcel);
    truck.map((el)=>{
      /*
      *  check truck type and if it is full or not
      *   set the truck parcel and load
      */
      if(el.type===truckType && el.load+(dropValue.weight*1) < el.capacity ){
        setTruck(
          truck.map((vehicle) => {
            if (vehicle.type === truckType) {
              return {
                ...vehicle,
                parcel: [...vehicle.parcel, dropValue],
                load:vehicle.load+(dropValue.weight*1)
              }
            }
            return vehicle
          })
        );
          //remove the data which one is drop
         setPakageList(pakageList.filter((item) => item.id != dropValue.id));

      }

    })
 


    ev.preventDefault();
  }
  function allowDrop(ev) {
    ev.preventDefault();
  }



  return (
    <>
      <div className="home_container">
        <aside className="left_bar">
          {pakageList.map((item, index) => (
            <div
              key={item.id}
              className="pakeges_aside"
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
          <div
            id="1"
            style={{ position: "relative", width: "350px" }}
            onDrop={(e) => {
              drop(e);
            }}
            onDragOver={(e) => {
              allowDrop(e);
            }} 
          >
            <MDBProgress height="275" className="mb-5">
              <MDBProgressBar
                striped
                animated
                bgColor="danger"
                // width={uploadProgress}
                width={percentage(truck[0].load,truck[0].capacity)}
                valuemin={0}
                valuemax={100}
              >
                {" "}
              </MDBProgressBar>
            </MDBProgress>
            <div>
              {" "}
              <img
                src="https://www.svgrepo.com/show/25233/delivery-truck.svg"
                alt="cargo"
                data-type="cargo"
                style={{ width: "100%", position: "absolute", top: "0" }}
              />{" "}
            </div>
          </div>

          <div
            style={{
              position: "relative",
              width: "350px",
            }} /* ref={drop} data-testid="dustbin" */
            onDrop={(e) => {
              drop(e);
            }}
            onDragOver={(e) => {
              allowDrop(e);
            }}
          >
            <MDBProgress height="275" className="mb-5">
              <MDBProgressBar
                striped
                animated
                bgColor="danger"
                // width={uploadProgress}
                width={percentage(truck[1].load,truck[2].capacity)}
                valuemin={0}
                valuemax={100}
              >
                {" "}
              </MDBProgressBar>
            </MDBProgress>
            <div>
              {" "}
              <img
                src="https://cdn.onlinewebfonts.com/svg/img_10551.png"
                data-type="delivery"
                alt="delivery"
                style={{ width: "100%", position: "absolute", top: "0" }}
              />{" "}
            </div>
          </div>

          <div
            style={{
              position: "relative",
              width: "350px",
            }} /*  ref={drop} data-testid="dustbin" */
            onDrop={(e) => {
              drop(e);
            }}
            onDragOver={(e) => {
              allowDrop(e);
            }}
          >
            <MDBProgress height="275" className="mb-5">
              <MDBProgressBar
                striped
                animated
                bgColor="danger"
                // width={uploadProgress}
                width={percentage(truck[2].load,truck[2].capacity)}
                valuemin={0}
                valuemax={100}
              >
                {" "}
              </MDBProgressBar>
            </MDBProgress>
            <div>
              {" "}
              <img
                src="https://www.iconpacks.net/icons/1/free-truck-icon-1058-thumb.png"
                alt="vehicle"
                data-type="vehicle"
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: "0",
                }}
              />{" "}
            </div>
          </div>
        </main>
      </div>
      {/* </DragDropContext> */}
    </>
  );
};

export default HomePage;
