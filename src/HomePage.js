import React, { useEffect } from "react";
import "./home.css";
import { pakages, truckDetails } from "./data";
// import { Button, - } from "react-bootstrap";
import { MDBBtn, MDBIcon, MDBProgress, MDBProgressBar } from "mdb-react-ui-kit";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";

const percentage = (load, capacity) => (load * 100) / capacity;
const HomePage = () => {
  const [pakageList, setPakageList] = useState(pakages);
  const first = useRef(pakages)
  const [click, setclick] = useState("");
  const [truck, setTruck] = useState(
    truckDetails.slice(0).reverse(0).map((oneTruck) => {
      return { ...oneTruck, parcel: [], load: 0 };
    })
  );

  function drag(ev, item) {
    /* set the value that we drag   */
    ev.dataTransfer.setData("name", item.name);
    ev.dataTransfer.setData("id", item.id);
    ev.dataTransfer.setData("weight", item.weight);
  }

  // truck.map((el)=>{
  //   percentage(el.load,el.capacity)>95 &&toast.info('truck '+el.truckNumber +' is ready to go', {
  //     position: "top-center",
  //     autoClose: 10000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "dark",
  //     });
  // })

  const addValue = (truckType, dropValue) => {
    console.log('funtion called',dropValue);
    // truck.map((el) => {
      /*
      *  check truck type and if it is full or not
      *   set the truck parcel and load
      */

      // if (el.type === truckType && ((el.load + dropValue.weight * 1) <= el.capacity)) {
        // console.log((el.load + dropValue.weight * 1) <= el.capacity);
        // console.log('++++++++++==============')
      //  
        setTruck(
          truck => truck.map((vehicle) => {
            if (vehicle.type === truckType && (vehicle.load + (dropValue.weight * 1) <= vehicle.capacity)) {
             
              return {
                ...vehicle,
                parcel: [...vehicle.parcel, dropValue],
                load: vehicle.load + dropValue.weight*1,
              };
            }
            setPakageList(pakageList => pakageList.filter((item) => item.id != dropValue.id));

            first.current = first.current.filter((item) => item.id != dropValue.id)
   
            return vehicle;
          })
        );
        //remove the data which one is drop
       
      // }
    
    // });
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
      // truck.map((oneTruck)=>{
        // if(oneTruck.load+dropValue.weight >= oneTruck.capacity)
        // toast.success('Your Item add in '+oneTruck.truckNumber, {
        //   position: "top-right",
        //   autoClose: 2000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "dark",
        // });
      addValue(truckType, dropValue)
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


  const handleRemoveTruck = (pakage, number) => {
    console.log(pakage, number);
    setTruck(truck.map((single) => {
      if (single.truckNumber === number) {
        console.log(single);
        toast.warning('item remove from '+single.truckNumber, {
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
          ...single,
          parcel: single.parcel.filter((item) => item.id != pakage.id),
          load: single.load - pakage.weight
        }
      }
      return single
    }))
    setPakageList([...pakageList, pakage])
    first.current = [...first.current, pakage]
  }


  // useEffect(() => {
  // }, [truck, pakageList])


  const pakageloops = (single) => {
    console.log(single);
    console.log('==============================,', first.current);
    let dummy = [...first.current]

    dummy.map((box) => {
      // console.log('---------------');
      if ((single.maxWeight >= box.weight * 1) && (single.load + box.weight * 1 <= single.capacity)/*  && (box.weight>single.minWeight) */) {

        // console.log('in if');
        addValue(single.type, box)
      }

    }
    )
  }
  const handleAll = () => {
    let value = truck.slice(0).reverse()
    toast.success('all parcel added ', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    // console.log(box.id);
    truck.map((single) => {
      console.log('is it 3 times');
      // setInterval(pakageloops(single), 1000);
      pakageloops(single)
      
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
              style={{ background: item.weight <= 1 ? '#0dcaf0' : item.weight <= 10 ? '#fff561' : '#6deb64' }}
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
        <main className="right_bar" >
          <div style={{ height: 'calc(100vh - 100px)' }}>

            {truck.slice(0).reverse(0).map((singleTruck, index) => (
              <>

                <div
                  key={index}
                  onClick={() => {
                    handleClick(singleTruck.type);
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
                 
                  <MDBProgress height="275" className="mb-5 border border-dark  border-4 rounded-6"  >
                    <MDBProgressBar
                      striped
                      animated
                      // bgColor="danger"
                      style={{background:percentage(singleTruck.load, singleTruck.capacity) <33 ?'#24b043':percentage(singleTruck.load, singleTruck.capacity) <66? '#ffb74d':'#ff4949'}}
                      // width={uploadProgress}
                      width={percentage(singleTruck.load, singleTruck.capacity)}
                      valuemin={0}
                      valuemax={100}
                    >
                      {" "}
                    </MDBProgressBar>
                  </MDBProgress>
                  <div style={{ position: 'absolute', zIndex: '1', top: '0', right: '10% ', fontSize: '28px' }}>{Math.trunc(singleTruck.load)}KG</div>
                  <div  >

                    {" "}
                    <img
                      src={singleTruck.img}
                      alt={singleTruck.type}
                      data-type={singleTruck.type}
                      style={{ width: "80%", position: "absolute", top: "0", left: '10%' }}
                    />{" "}
                  </div>
                </div>
              </>
            ))}
          </div>
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

                    <table style={{
                      width: '100%', borderCollapse: 'separate', borderSpacing: '0 1em', border: '0px solid white'
                    }}>
                      <thead className="details-head" >
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

                            <td className="list-td" style={{ background: pakage.weight <= 1 ? '#0dcaf0' : pakage.weight <= 10 ? '#fff561' : '#6deb64' }}>{pakage.id}</td>
                            <td className="list-td" style={{ background: pakage.weight <= 1 ? '#0dcaf0' : pakage.weight <= 10 ? '#fff561' : '#6deb64' }}>{pakage.name}</td>
                            <td className="list-td" style={{ background: pakage.weight <= 1 ? '#0dcaf0' : pakage.weight <= 10 ? '#fff561' : '#6deb64' }}>{pakage.weight} </td>
                            <td className="list-td" style={{ background: pakage.weight <= 1 ? '#0dcaf0' : pakage.weight <= 10 ? '#fff561' : '#6deb64' }}>
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
