import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit'
import React from 'react'

const TruckDetails = ({truck,handleRemoveTruck ,click}) => {

  
  return (
    <div>
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
                    <h2>{item.truckNumber} <span style={{ fontSize: '28px', color: 'black' }}>number of Parcel:{item.parcel.length}</span> </h2>
                    {item.parcel.length > 0 &&
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
                    }

                  </div>
                )
            )}
    </div>
  )
}

export default TruckDetails