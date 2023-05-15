import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit'
import React from 'react'

const TruckDetails = ({truckData,handleRemoveTruck ,click}) => {

  console.log(truckData);
  return (
    <div>
         {click &&
        truckData.map((areaTruck )=>
          
        
          areaTruck.trucks.map(
            (currentTruck, i) =>
              currentTruck.truckNumber === click && (
                <div key={i}>
                  {/* <div style={{width:'100%'}}> */}

                  <img
                    src={currentTruck.img}
                    className="details-image "
                    alt={currentTruck.type}
                  />
                  {/* </div> */}
                  <h2>{currentTruck.truckNumber} <span style={{ fontSize: '28px', color: 'black' }}>number of Parcel:{currentTruck.parcel.length}</span> </h2>
                  {currentTruck.parcel.length > 0 &&
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
                        {currentTruck.parcel.map((thisPackage) => (
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
                                    currentTruck.truckNumber
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
                  }

                </div>
              )
          
              )
                )
            }
    </div>
  )
}

export default TruckDetails