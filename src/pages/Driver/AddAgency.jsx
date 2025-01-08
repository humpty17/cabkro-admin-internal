// import React from 'react';

// // const AddAgency = () => {
// //   return (
// //     <div className="wrapper">
// //       <div className="main">
// //         <main className="content">
// //           <div className="container-fluid p-0">
// //             <h1 className="h3 mb-3">Agency Details</h1>

// //             <div className="row">
// //               {/* Agency Details Card */}
// //               <div className="col-6 col-xl-6">
// //                 <div className="card">
// //                   <div className="card-header">
// //                     <h5 className="card-title mb-0">Agency details</h5>
// //                   </div>
// //                   <div className="card-body">
// //                     <form>
// //                       <div className="mb-3 row">
// //                         <label className="col-form-label col-sm-3 text-sm-end">Agency Name</label>
// //                         <div className="col-sm-8">
// //                           <input type="text" className="form-control" placeholder="Your first name" />
// //                         </div>
// //                       </div>
// //                       <div className="mb-3 row">
// //                         <label className="col-form-label col-sm-3 text-sm-end">Owner Name</label>
// //                         <div className="col-sm-8">
// //                           <input type="text" className="form-control" placeholder="Your last name" />
// //                         </div>
// //                       </div>
// //                       <div className="mb-3 row">
// //                         <label className="col-form-label col-sm-3 text-sm-end">Phone No.</label>
// //                         <div className="col-sm-8">
// //                           <input type="number" className="form-control" placeholder="8957465342" />
// //                         </div>
// //                       </div>
// //                       <div className="mb-3 row">
// //                         <label className="col-form-label col-sm-3 text-sm-end">Email</label>
// //                         <div className="col-sm-8">
// //                           <input type="email" className="form-control" placeholder="Email" />
// //                         </div>
// //                       </div>
// //                       <div className="mb-3 row">
// //                         <label className="col-form-label col-sm-3 text-sm-end">Pan No</label>
// //                         <div className="col-sm-8">
// //                           <input type="text" className="form-control" placeholder="Pan no" />
// //                         </div>
// //                       </div>
// //                       <div className="mb-3 row">
// //                         <label className="col-form-label col-sm-3 text-sm-end">Password</label>
// //                         <div className="col-sm-8">
// //                           <input type="password" className="form-control" placeholder="Password" />
// //                         </div>
// //                       </div>
// //                     </form>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Owner Documents and Work Locations */}
// //               <div className="col-6 col-xl-6">
// //                 <div className="card">
// //                   <div className="card-header">
// //                     <h5 className="card-title mb-0">Owner documents and Work locations</h5>
// //                   </div>
// //                   <div className="card-body">
// //                     <form>
// //                       <div className="mb-3 row">
// //                         <label className="col-form-label col-sm-4 text-sm-end">Aadhar card front :</label>
// //                         <div className="col-sm-6 mt-2">
// //                           <a href="#">View</a>
// //                         </div>
// //                       </div>
// //                       <div className="mb-3 row">
// //                         <label className="col-form-label col-sm-4 text-sm-end">Aadhar card back :</label>
// //                         <div className="col-sm-6 mt-2">
// //                           <a href="#">View</a>
// //                         </div>
// //                       </div>
// //                       <div className="mb-3 row">
// //                         <label className="col-form-label col-sm-4 text-sm-end">Pan card :</label>
// //                         <div className="col-sm-6 mt-2">
// //                           <a href="#">View</a>
// //                         </div>
// //                       </div>
// //                       <div className="mb-3 row">
// //                         <label className="col-form-label col-sm-3 text-sm-end">Location 1</label>
// //                         <div className="col-sm-8">
// //                           <input type="text" className="form-control" placeholder="search location" />
// //                         </div>
// //                       </div>
// //                       <div className="mb-3 row">
// //                         <label className="col-form-label col-sm-3 text-sm-end">Location 2</label>
// //                         <div className="col-sm-8">
// //                           <input type="text" className="form-control" placeholder="search location" />
// //                         </div>
// //                       </div>
// //                       <div className="mb-3 row">
// //                         <label className="col-form-label col-sm-3 text-sm-end">Location 3</label>
// //                         <div className="col-sm-8">
// //                           <input type="text" className="form-control" placeholder="search location" />
// //                         </div>
// //                       </div>
// //                     </form>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="row">
// //               {/* Vehicle Details Cards */}
// //               {[1, 2, 3].map((vehicleNum) => (
// //                 <div className="col-6 col-xl-6" key={`vehicle-${vehicleNum}`}>
// //                   <div className="card">
// //                     <div className="card-header">
// //                       <h5 className="card-title mb-0">Vehicle details {vehicleNum}</h5>
// //                     </div>
// //                     <div className="card-body">
// //                       <form>
// //                         <div className="mb-3 row">
// //                           <label className="col-form-label col-sm-3 text-sm-end">Vehicle Name</label>
// //                           <div className="col-sm-8">
// //                             <input type="text" className="form-control" placeholder="Your first name" />
// //                           </div>
// //                         </div>
// //                         <div className="mb-3 row">
// //                           <label className="col-form-label col-sm-3 text-sm-end">Vehicle Type</label>
// //                           <div className="col-sm-8">
// //                             <input type="text" className="form-control" placeholder="Your last name" />
// //                           </div>
// //                         </div>
// //                         <div className="mb-3 row">
// //                           <label className="col-form-label col-sm-3 text-sm-end">Vehicle No.</label>
// //                           <div className="col-sm-8">
// //                             <input type="text" className="form-control" placeholder="8957465342" />
// //                           </div>
// //                         </div>
// //                         <div className="mb-3 row">
// //                           <label className="col-form-label col-sm-3 text-sm-end">Fuel Type</label>
// //                           <div className="col-sm-8">
// //                             <input type="email" className="form-control" placeholder="Email" />
// //                           </div>
// //                         </div>
// //                         <div className="mb-3 row">
// //                           <label className="col-form-label col-sm-3 text-sm-end">No of Seat</label>
// //                           <div className="col-sm-8">
// //                             <input type="text" className="form-control" placeholder="Pan no" />
// //                           </div>
// //                         </div>
// //                         <div className="mb-3 row">
// //                           <label className="col-form-label col-sm-3 text-sm-end">Approve Status</label>
// //                           <div className="col-sm-8">
// //                             <input type="text" className="form-control" placeholder="Pan no" />
// //                           </div>
// //                         </div>
// //                         <div className="mb-3 row">
// //                           <label className="col-form-label col-sm-6 text-sm-end">Reg. Certi. :</label>
// //                           <div className="col-sm-6 mt-2">
// //                             <a href="#">View</a>
// //                           </div>
// //                         </div>
// //                         <div className="mb-3 row">
// //                           <label className="col-form-label col-sm-6 text-sm-end">Insurance :</label>
// //                           <div className="col-sm-6 mt-2">
// //                             <a href="#">View</a>
// //                           </div>
// //                         </div>
// //                         <div className="mb-3 row">
// //                           <label className="col-form-label col-sm-6 text-sm-end">Permit :</label>
// //                           <div className="col-sm-6 mt-2">
// //                             <a href="#">View</a>
// //                           </div>
// //                         </div>
// //                         <div className="mb-3 row">
// //                           <label className="col-form-label col-sm-6 text-sm-end">Car with owner :</label>
// //                           <div className="col-sm-6 mt-2">
// //                             <a href="#">View</a>
// //                           </div>
// //                         </div>
// //                       </form>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>

// //             <div className="row">
// //               {/* Driver Details Cards */}
// //               {[1, 2].map((driverNum) => (
// //                 <div className="col-6 col-xl-6" key={`driver-${driverNum}`}>
// //                   <div className="card">
// //                     <div className="card-header">
// //                       <h5 className="card-title mb-0">Driver details {driverNum}</h5>
// //                     </div>
// //                     <div className="card-body">
// //                       <form>
// //                         <div className="mb-3 row">
// //                           <label className="col-form-label col-sm-3 text-sm-end">Driver Name</label>
// //                           <div className="col-sm-8">
// //                             <input type="text" className="form-control" placeholder="Your first name" />
// //                           </div>
// //                         </div>
// //                         <div className="mb-3 row">
// //                           <label className="col-form-label col-sm-3 text-sm-end">Phone No.</label>
// //                           <div className="col-sm-8">
// //                             <input type="number" className="form-control" placeholder="8957465342" />
// //                           </div>
// //                         </div>
// //                         <div className="mb-3 row">
// //                           <label className="col-form-label col-sm-3 text-sm-end">License No.</label>
// //                           <div className="col-sm-8">
// //                             <input type="text" className="form-control" placeholder="8957465342" />
// //                           </div>
// //                         </div>
// //                         <div className="mb-3 row">
// //                           <label className="col-form-label col-sm-3 text-sm-end">License Expiry</label>
// //                           <div className="col-sm-8">
// //                             <input type="date" className="form-control" />
// //                           </div>
// //                         </div>
// //                         <div className="mb-3 row">
// //                           <label className="col-form-label col-sm-3 text-sm-end">Driver Aadhar</label>
// //                           <div className="col-sm-8">
// //                             <input type="text" className="form-control" placeholder="Pan no" />
// //                           </div>
// //                         </div>
// //                         <div className="mb-3 row">
// //                           <label className="col-form-label col-sm-6 text-sm-end">Aadhar card front :</label>
// //                           <div className="col-sm-6 mt-2">
// //                             <a href="#">View</a>
// //                           </div>
// //                         </div>
// //                         <div className="mb-3 row">
// //                           <label className="col-form-label col-sm-6 text-sm-end">Aadhar card back :</label>
// //                           <div className="col-sm-6 mt-2">
// //                             <a href="#">View</a>
// //                           </div>
// //                         </div>
// //                       </form>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>

// //           </div>
// //         </main>
// //       </div>
// //     </div>
// //   );
// // };

// export default AddAgency;
