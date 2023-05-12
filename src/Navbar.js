import React from 'react'
import Logo from './images/logo.png'
import './navbar.css'
import { MDBProgress, MDBProgressBar } from 'mdb-react-ui-kit'
import { allTrucks, truckDetails } from './data'

const Navbar = () => {
  return (
    // <nav >
    //     <ul className='navbar-ul'>
    //         <li className='navbar-li' ><img className='nav-logo' src={Logo} alt='logo'/> <span className='logo-txt' >Deliver</span></li>
    //     </ul>
        
    // </nav>
    <>
    <h1>Hello</h1>

    <main className="right_bar">
          <div style={{ height: "calc(100vh - 100px)" ,display:'flex'}}>
            {allTrucks
              .map((onePin, index) => (

<div  key={index}  style={{display:'flex' ,flexDirection:'column',position: "relative", width: "325px", overflowY: 'scroll',
  transform: "rotate('-90deg')" , scrollDirection: 'horizontal',minWidth:'275px' ,margin:'0 25px'}}>

    <h1>{onePin.pincode}</h1> 

                {onePin.trucks.map((oneVehicleTruck)=>(

                <div
                  key={index}
                //   style={}
                  onClick={() => {
                      // handleClick(oneVehicleTruck.type);
                    }}
                    id="1"
                    style={{position:'relative' }}
                    onDrop={(e) => {
                        // drop(e);
                    }}
                    onDragOver={(e) => {
                        // allowDrop(e);
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
                          // background:
                          //   percentage(
                              //     oneVehicleTruck.load,
                              //     oneVehicleTruck.capacity
                              //   ) < 50
                              //     ? "#24b043"
                              //     : percentage(
                                  //       oneVehicleTruck.load,
                                  //       oneVehicleTruck.capacity
                                  //     ) < 90
                                  //       ? "#ffb74d"
                            //       : "#ff4949",
                        }}
                        // width={uploadProgress}
                        //   width={percentage(
                            //     oneVehicleTruck.load,
                            //     oneVehicleTruck.capacity
                            //   )}
                            width={52}
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
              </div>
              ))}
          </div>
        </main>
    {/* <Navbar/> */}
    </>
  )
}

export default Navbar   