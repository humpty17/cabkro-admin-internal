import { ONEWAY } from "../../General/ConstStates";
import { convertDatetoReadFormat } from "../../General/GeneralMethod";

const BookingCard = ({ data, handleManageBooking }) => {
  return (
    <>
      {/* Card header */}
      <div className="card-header border-bottom d-md-flex justify-content-md-between align-items-center">
        <div className="d-flex align-items-center">
          <div className="ms-2">
            <h6 className="card-title mb-0 w-100">
              {data.pickupLocation + " to " + data.dropOffLocation}
            </h6>
            <ul className="nav nav-divider small">
              <li className="nav-item">{"Booking ID: " + data.other2}</li>
            </ul>
          </div>
        </div>
        <div className="mt-2 mt-md-0 w-50">
          <button
            className="btn-primary-soft mb-0 float-end"
            style={{ cursor: "pointer" }}
            onClick={() => handleManageBooking(data)}
          >
            Manage Booking
          </button>
        </div>
      </div>
      {/* Card body */}
      {data.bookingStatus.toUpperCase() === "CANCEL" ? 
         <div className="card-body">
         <div className="row g-3">
           <div className="col-sm-6 col-md-3">
             <span>Cancel Time</span>
             <h6 className="mb-0">{convertDatetoReadFormat(data.modifyDate)}</h6>
           </div>
           
           <div className="col-md-3">
             <span>Cancel by</span>
             <h6 className="mb-0">{""}</h6>
           </div>
 
           <div className="col-md-3">
             <span>Booking Status</span>
             <h6 className="mb-0">{data.bookingStatus.toUpperCase()}</h6>
           </div>
         </div>
       </div>
      : 
      <div className="card-body">
      <div className="row g-3">
        <div className="col-sm-6 col-md-3">
          <span>Pickup Time</span>
          <h6 className="mb-0">{convertDatetoReadFormat(data.pickupTime)}</h6>
        </div>
        <div className="col-sm-6 col-md-3">
          <span>Drop Time</span>
          <h6 className="mb-0">
            {data.bookingType === ONEWAY
              ? "Not Applicable"
              : convertDatetoReadFormat(data.dropOffTime)}
          </h6>
        </div>
        <div className="col-md-3">
          <span>Booked by</span>
          <h6 className="mb-0">{data.userName}</h6>
        </div>

        <div className="col-md-3">
          <span>Booking Status</span>
          <h6 className="mb-0">{data.bookingStatus.toUpperCase()}</h6>
        </div>
      </div>
    </div>
      }
   
    </>
  );
};


export default BookingCard