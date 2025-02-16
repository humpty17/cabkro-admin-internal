import { useContext, useEffect, useState } from "react";
import { APICALLFAIL, APINULLERROR } from "../../General/ConstStates";
import { callApi } from "../../General/GeneralMethod";
import { LoadingContext } from "../../store/loading-context";
import { NotificationManager } from "react-notifications";
import SubmitButton from "../../General/Buttons/SubmitButton";
import Swal from "sweetalert2";

const UserAuth = () => {
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [selectedUserId, setSelectedUserId] = useState("");

  const [getUser, setGetUser] = useState([]);
  const [allPages, setAllPages] = useState([]);

  useEffect(() => {
    handleUserList();
  }, []);
  const handleUserList = async () => {
    startLoading();
    try {
      const response = await callApi(
        "get",
        `${process.env.REACT_APP_API_URL_ADMIN}Auth/GetAdminUserList`,
        {},
        {}
      );

      if (response) {
        if (response.data.code === 200) {
          setGetUser(response.data.data);
        } else {
          NotificationManager.error(response.data.message);
        }
      } else {
        console.error("API returned an invalid response:", response);
        NotificationManager.warning(APINULLERROR);
      }
    } catch (error) {
      console.error("API call failed:", error);
      NotificationManager.error(APICALLFAIL);
    } finally {
      stopLoading();
    }
  };

  const handleSelect = (e) => {
    setSelectedUserId(e.target.value);
  };

  useEffect(() => {
    if (selectedUserId !== "") {
      getUserPages(selectedUserId);
    }
  }, [selectedUserId]);

  const getUserPages = async (selectedUser) => {
    startLoading();
    try {
      const response = await callApi(
        "get",
        `${process.env.REACT_APP_API_URL_ADMIN}Auth/GetPages/GetPages?UserId=${selectedUser}`,
        {},
        {}
      );

      if (response) {
        if (response.data.code === 200) {
          setAllPages([...response.data.data]);
        } else {
          NotificationManager.error(response.data.message);
          setAllPages([]);
        }
      } else {
        NotificationManager.error(APINULLERROR);
      }
    } catch (err) {
      console.log(err);
      NotificationManager.error(APICALLFAIL);
    } finally {
      stopLoading();
    }
  };

  const handleCheckBoxChange = (e, pageId) => {
    //debugger
    //console.log(e)
    const arr = [...allPages];
    arr.forEach((data, index) => {
      if (data.pageId === pageId) {
        data.isAuth = e.target.checked;
        return;
      }
    });
    // console.log(arr);
    setAllPages([...arr]);
  };

  const setMinDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    // Set the min attribute in the format "YYYY-MM-DDTHH:MM"
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const InitialUserAuthPage = (selectedUserId) => ({
    pid: 0,
    pageId: 0,
    pageName: "",
    userId: selectedUserId,
    createdDate: setMinDateTime(),
    companyId: "1",
    createdBy: selectedUserId,
    isAuth: true,
    pageHead: 0,
    parent: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault()
    debugger
    const tempArr = allPages.filter((data, index) => data.isAuth === true);
    const submitArr = [];
    tempArr.forEach((data, index) => {
      debugger;
      if (data.parent !== 0) {
        const obj = InitialUserAuthPage(selectedUserId);
        obj.pageId = data.pageId;
        obj.pageName = data.pageName;
        obj.pageHead = data.pageHead;
        obj.parent = data.parent;
        submitArr.push(obj);

        if (
          submitArr.filter((data1, index) => data1.pageId === data.parent)
            .length <= 0
        ) {
          const parentObj = allPages.find(
            (data1, index) => data1.pageId === data.parent
          );
          if (parentObj) {
            const obj = InitialUserAuthPage(selectedUserId);
            obj.pageId = parentObj.pageId;
            obj.pageName = parentObj.pageName;
            obj.pageHead = parentObj.pageHead;
            obj.parent = parentObj.parent;
            submitArr.push(obj);
          }
        }
      } else {
        const obj = InitialUserAuthPage(selectedUserId);
        obj.pageId = data.pageId;
        obj.pageName = data.pageName;
        obj.pageHead = data.pageHead;
        obj.parent = data.parent;
        submitArr.push(obj);
      }
    });

    try {
      startLoading();
      const response = await callApi(
        "post",
        `${process.env.REACT_APP_API_URL_ADMIN}Auth/InsertUserAuth/InsertUserAuth`,
        {
          UserId: selectedUserId,
          data: [...submitArr],
        },
        {}
      );
      if(response){
        if (response.data.code === 200) {
          NotificationManager.success(response?.data?.message || "User auth updated successfully")
          // setParentPages([])
          setAllPages([]);
          // setChildPages([])
          // setSelectedUserId(0)
          setSelectedUserId("");
          // setUserList([])
          // setAuthPages([])
        } else {
          NotificationManager.error(response?.data?.message)
        }
      }
      else{
        NotificationManager.error(APINULLERROR)
      }
      
      //console.log(response.data.data);
    } catch (error) {
     console.log(error)
     NotificationManager.error(APICALLFAIL)
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="wrapper">
      <div className="main">
        <main className="content">
          <div className="container-fluid p-0">
            <h1 className="h3 mb-3">Auth Auth</h1>
            <div className="row">
              <div className="col-12">
                <div className="card-body">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-body">
                        <form onSubmit={handleSubmit}>
                          <div className="mb-3 row">
                            <label className="col-form-label col-sm-2">
                              Select User
                            </label>
                            <div className="col-sm-4">
                              <select
                                className="form-select"
                                name="userId"
                                onChange={handleSelect}
                                value={selectedUserId}
                              >
                                <option value={""}>Select</option>
                                {getUser.map((item, index) => (
                                  <option key={item.userId} value={item.userId}>
                                    {item.userFirstName}
                                  </option>
                                ))}
                                {/* Add options dynamically as needed */}
                              </select>
                            </div>
                            <div className="col-sm-2">
                              <SubmitButton buttonName={"Submit"} />
                            </div>
                          </div>

                          {/* user pages */}
                          <div>
                            {allPages.map((data, index) => {
                              if (data.parent === 0) {
                                return (
                                  <div className="my-1" key={index}>
                                    <>
                                      <h2 className="fs-5 fw-bold">
                                        {data.pageName}
                                      </h2>{" "}
                                      <hr className="hrline mt-0 mb-1"></hr>
                                    </>
                                    <div className="row">
                                      {allPages.map((child, index) => {
                                        return child.parent === data.pageId ? (
                                          <div
                                            className="form-check border col-md-3 m-1 text-start rounded"
                                            key={index}
                                          >
                                            <label key={child.pageId}>
                                              <input
                                                type="checkbox"
                                                checked={child.isAuth}
                                                onChange={(e) =>
                                                  handleCheckBoxChange(
                                                    e,
                                                    child.pageId
                                                  )
                                                }
                                              />
                                              {child.pageName}
                                            </label>
                                          </div>
                                        ) : null;
                                      })}{" "}
                                    </div>
                                  </div>
                                );
                              }
                            })}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserAuth;
