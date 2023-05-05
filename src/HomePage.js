import React, { useEffect } from "react";
import "./home.css";
import { pakages, truckDetails } from "./data";
// import { Button, - } from "react-bootstrap";
import { MDBBtn, MDBIcon, MDBProgress, MDBProgressBar } from "mdb-react-ui-kit";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";


const percentage = (x, y) => (x * 100) / y;
const HomePage = () => {
  const [pakageList, setPakageList] = useState(pakages);
  const [click, setclick] = useState("");
  const [truck, setTruck] = useState(
    truckDetails.map((oneTruck) => {
      return { ...oneTruck, parcel: [], load: 0 };
    })
  );

  function drag(ev, item) {
    /* set the value that we drag   */
    ev.dataTransfer.setData("name", item.name);
    ev.dataTransfer.setData("id", item.id);
    ev.dataTransfer.setData("weight", item.weight);
  }

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
      truck.map((el) => {
        /*
        *  check truck type and if it is full or not
        *   set the truck parcel and load
        */
        if (
          el.type === truckType &&
          el.load + dropValue.weight * 1 <= el.capacity
        ) {
          setTruck(
            truck.map((vehicle) => {
              if (vehicle.type === truckType) {
                return {
                  ...vehicle,
                  parcel: [...vehicle.parcel, dropValue],
                  load: vehicle.load + dropValue.weight * 1,
                };
              }
              return vehicle;
            })
          );
          //remove the data which one is drop
          setPakageList(pakageList.filter((item) => item.id != dropValue.id));
        }
      });
    }

    console.log(truck);
  }
  function allowDrop(ev) {
    ev.preventDefault();
  }

  // console.log(click);
  const handleClick = (name) => {
    setclick(name);
  };


  const handleRemoveTruck = (pakage, number) => {
    console.log(pakage, number);
    setTruck(truck.map((single) => {
      if (single.truckNumber === number) {
        console.log(single);
        return {
          ...single,
          parcel: single.parcel.filter((item) => item.id != pakage.id),
          load: single.load - pakage.weight
        }
      }
      return single
    }))
    setPakageList([...pakageList, pakage])
  }

  // const remove = (item,box)=>{
  //   setPakageList(pakageList =>pakageList.filter((item) => item.id != box.id));
  // }

  useEffect(() => {
    
   
  }, [truck])
  

  const handleAll = () => {
    let value = truck.slice(0).reverse()
    // console.log(box.id);
    value.map((single) =>{
      pakageList.map((box) => {
        // box.weight < single.minWeight && setTruck(truck=>truck.map((one)=>one.truckNumber===single.truckNumber ? {...one,minWeight:0}:one))
        setTruck(truck => truck.map((item) => {
          if (single.truckNumber === item.truckNumber) {
            
            if ((item.maxWeight >= box.weight * 1) && (item.load + box.weight * 1 <= item.capacity)/*  && (box.weight>item.minWeight) */) {
              setPakageList(pakageList =>pakageList.filter((item) => item.id != box.id));
              // console.log(pakageList,'================');
              return {
                ...item,
                parcel: [...item.parcel, box],
                load: item.load + (box.weight * 1)
              }
            }
          }
          return item;
          
        }))
        // console.log(">>>>>>>>>>>>>>>>>>>>>.",pakageList);

      }
      )
    })
  }
  console.log(truck);

  return (
    <>
      <div className="home_container">
        <aside className="left_bar">
          <div className="d-grid ">
            <MDBBtn onClick={handleAll}> ADD ALL ...</MDBBtn>
          </div>
          {pakageList.map((item) => (
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
          {truck.map((singleTruck, index) => (
            <>
              <div
                key={index}
                onClick={() => {
                  handleClick(singleTruck.type);
                }}
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
                    width={percentage(singleTruck.load, singleTruck.capacity)}
                    valuemin={0}
                    valuemax={100}
                  >
                    {" "}
                  </MDBProgressBar>
                </MDBProgress>
                <div>
                  {" "}
                  <img
                    src={singleTruck.img}
                    alt={singleTruck.type}
                    data-type={singleTruck.type}
                    style={{ width: "100%", position: "absolute", top: "0" }}
                  />{" "}
                </div>
              </div>
            </>
          ))}
        </main>
        <div className="details_bar">
          {/* <h1>hello</h1> */}

          {click &&
            truck.map(
              (item) =>
                item.type === click && (
                  <>
                    {/* <div style={{width:'100%'}}> */}

                    <img src={item.img} className="details-image " alt={item.type} />
                    {/* </div> */}
                    <h2>{item.truckNumber}</h2>

                    <table style={{ width: '100%' }}>
                      <thead>
                        <tr>
                          <th className="list-td" >Parcel-Id</th>
                          <th className="list-td" >Name</th>
                          <th className="list-td" >Parcel weight</th>
                          <th className="list-td" >Remove </th>
                        </tr>
                      </thead>
                      <tbody>

                        {item.parcel.map((pakage) => (
                          <tr className=" details-list">

                            <td className="list-td">{pakage.id}</td>
                            <td className="list-td">{pakage.name}</td>
                            <td className="list-td">{pakage.weight} </td>
                            <td className="list-td">
                              <MDBBtn className="bg-danger" onClick={() => handleRemoveTruck(pakage, item.truckNumber)}> <MDBIcon fas icon="trash" /></MDBBtn>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                  </>
                )
            )}
        </div>
      </div>
      {/* </DragDropContext> */}
    </>
  );
};

export default HomePage;
