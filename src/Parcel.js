import React from 'react'

function drag(ev, item) {
    /* set the value that we drag   */
    ev.dataTransfer.setData("name", item.name);
    ev.dataTransfer.setData("id", item.id);
    ev.dataTransfer.setData("weight", item.weight);
    ev.dataTransfer.setData("pin", item.pakageFor);
  }

const Parcel = ({tmpParcels}) => {
  return (
    <div>  
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
      weight:{item.weight} <br/>
        Deliver to :{ item.pakageFor}
    </div>
  ))}</div>
  )
}

export default Parcel