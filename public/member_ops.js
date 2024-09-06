import { getCookie } from "./cookie_finder.js";

function handle_members(event) {
  console.log("DOM fully loaded and parsed");
  const resultsDiv = document.getElementById("results-div");
  const restOpsDiv = document.getElementById("rest-ops");
  const listMembersButton = document.getElementById("list-members");
  const createMemberButton = document.getElementById("create-member");
  const firstName = document.getElementById("member-firstName");
  const lastName = document.getElementById("member-lastName");
  const updateMemberButton = document.getElementById("update-member");
  const memberID = document.getElementById("member-id");
  const firstName1 = document.getElementById("member-firstName1");
  const lastName1 = document.getElementById("member-lastName1");
  const members_path = "/api/v1/members";
  const memberId2 = document.getElementById("member-id2");
  const showMember = document.getElementById("show-member");
  const deleteMember = document.getElementById("delete-member");
  const memberId3 = document.getElementById("member-id3");
  const listFacts = document.getElementById("list-facts");
  const memberId4 = document.getElementById("member-id4");
  const factText = document.getElementById("fact-text");
  const likes = document.getElementById("likes");
  const createFact = document.getElementById("create-fact");
  const memberId5 = document.getElementById("member-id5");
  const factNumber = document.getElementById("fact-number");
  const factText2 = document.getElementById("fact-text2");
  const likes2 = document.getElementById("likes2");
  const updateFact = document.getElementById("update-fact");
  const memberId6 = document.getElementById("member-id6");
  const factNumber2 = document.getElementById("fact-number2");
  const showFact = document.getElementById("show-fact");
  const deleteFact = document.getElementById("delete-fact");

  restOpsDiv.addEventListener("click", (event) => {
    if (event.target === listMembersButton) {
      fetch(members_path)
        .then((response) => {
          if (response.status === 200) {
            resultsDiv.innerHTML = "";
            response.json().then((data) => {
              let parag = document.createElement("P");
              parag.textContent = JSON.stringify(data);
              resultsDiv.appendChild(parag);
            });
          } else {
            alert(`Return code ${response.status} ${response.statusText}`);
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    } else if (event.target === createMemberButton) {
      var dataObject = {
        first_name: firstName.value,
        last_name: lastName.value,
      };
      let headers = { "Content-Type": "application/json" };
      let csrf_cookie = getCookie("CSRF-TOKEN");
      if (csrf_cookie) {
        headers["X-CSRF-Token"] = csrf_cookie;
      }
      fetch(members_path, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(dataObject),
      }).then((response) => {
        if (response.status === 201) {
          response.json().then((data) => {
            resultsDiv.innerHTML = "";
            let parag = document.createElement("P");
            parag.textContent = JSON.stringify(data);
            resultsDiv.appendChild(parag);
          });
        } else {
          response
            .json()
            .then((data) => {
              alert(
                `Return code ${response.status} ${
                  response.statusText
                } ${JSON.stringify(data)}`,
              );
            })
            .catch((error) => {
              console.log(error);
              alert(error);
            });
        }
      });
    } else if (event.target === updateMemberButton) {
      var dataObject = {
        first_name: firstName1.value,
        last_name: lastName1.value,
      };
      let headers = { "Content-Type": "application/json" };
      let csrf_cookie = getCookie("CSRF-TOKEN");
      if (csrf_cookie) {
        headers["X-CSRF-Token"] = csrf_cookie;
      }
      fetch(`${members_path}/${memberID.value}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(dataObject),
      }).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            resultsDiv.innerHTML = "";
            let parag = document.createElement("P");
            parag.textContent = JSON.stringify(data);
            resultsDiv.appendChild(parag);
          });
        } else {
          response
            .json()
            .then((data) => {
              alert(
                `Return code ${response.status} ${
                  response.statusText
                } ${JSON.stringify(data)}`,
              );
            })
            .catch((error) => {
              console.log(error);
              alert(error);
            });
        }
      });
    } else if (event.target === showMember) {
      fetch(`${members_path}/${memberId2.value}`).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            resultsDiv.innerHTML = "";
            let parag = document.createElement("P");
            parag.textContent = JSON.stringify(data);
            resultsDiv.appendChild(parag);
          });
        } else {
          response
            .json()
            .then((data) => {
              alert(
                `Return code ${response.status} ${
                  response.statusText
                } ${JSON.stringify(data)}`,
              );
            })
            .catch((error) => {
              console.log(error);
              alert(error);
            });
        }
      });
    } else if (event.target === deleteMember) {
        let headers = { "Content-Type": "application/json" };
        let csrf_cookie = getCookie("CSRF-TOKEN");
        if (csrf_cookie) {
          headers["X-CSRF-Token"] = csrf_cookie;
        }
        fetch(`${members_path}/${memberId2.value}`, {
          method: "DELETE",
          headers: headers,
        }).then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              resultsDiv.innerHTML = "";
              let parag = document.createElement("P");
              parag.textContent = JSON.stringify(data);
              resultsDiv.appendChild(parag);
            });
          } else {
            response
              .json()
              .then((data) => {
                alert(
                  `Return code ${response.status} ${
                    response.statusText
                  } ${JSON.stringify(data)}`,
                );
              })
              .catch((error) => {
                console.log(error);
                alert(error);
              });
          }
        });
    } else if (event.target === listFacts) {
      fetch(`${members_path}/${memberId3.value}/facts`).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            resultsDiv.innerHTML = "";
            let parag = document.createElement("P");
            parag.textContent = JSON.stringify(data);
            resultsDiv.appendChild(parag);
          });
        } else {
          response
            .json()
            .then((data) => {
              alert(
                `Return code ${response.status} ${
                  response.statusText
                } ${JSON.stringify(data)}`,
              );
            })
            .catch((error) => {
              console.log(error);
              alert(error);
            });
        }
      });
    } else if (event.target === createFact) {
      var dataObject = {
        member_id: memberId4.value,
        fact_text: factText.value,
        likes: likes.value,
      };
      console.log(dataObject);
      let headers = { "Content-Type": "application/json" };
      let csrf_cookie = getCookie("CSRF-TOKEN");
      if (csrf_cookie) {
        headers["X-CSRF-Token"] = csrf_cookie;
      }
      fetch(`${members_path}/${memberId4.value}/facts`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(dataObject),
      }).then((response) => {
        if (response.status === 201) {
          response.json().then((data) => {
            resultsDiv.innerHTML = "";
            let parag = document.createElement("P");
            parag.textContent = JSON.stringify(data);
            resultsDiv.appendChild(parag);
          });
        } else {
          response
            .json()
            .then((data) => {
              alert(
                `Return code ${response.status} ${
                  response.statusText
                } ${JSON.stringify(data)}`,
              );
            })
            .catch((error) => {
              console.log(error);
              alert(error);
            });
        }
      });
    } else if (event.target === updateFact) {
      let dataObject = {
        member_id: memberId5.value,
        fact_text: factText2.value,
        likes: likes2.value,
      };
      let headers = { "Content-Type": "application/json" };
      let csrf_cookie = getCookie("CSRF-TOKEN");
      if (csrf_cookie) {
        headers["X-CSRF-Token"] = csrf_cookie;
      }
      fetch(`${members_path}/${memberId5.value}/facts/${factNumber.value}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(dataObject),
      }).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            resultsDiv.innerHTML = "";
            let parag = document.createElement("P");
            parag.textContent = JSON.stringify(data);
            resultsDiv.appendChild(parag);
          });
        } else {
          response
            .json()
            .then((data) => {
              alert(
                `Return code ${response.status} ${
                  response.statusText
                } ${JSON.stringify(data)}`,
              );
            })
            .catch((error) => {
              console.log(error);
              alert(error);
            });
        }
      });
    } else if (event.target === showFact) {
      fetch(`${members_path}/${memberId6.value}/facts/${factNumber2.value}`).then(
        (response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              resultsDiv.innerHTML = "";
              let parag = document.createElement("P");
              parag.textContent = JSON.stringify(data);
              resultsDiv.appendChild(parag);
            });
          } else {
            response
              .json()
              .then((data) => {
                alert(
                  `Return code ${response.status} ${
                    response.statusText
                  } ${JSON.stringify(data)}`,
                );
              })
              .catch((error) => {
                console.log(error);
                alert(error);
              });
          }
        },
      );
    } else if (event.target === deleteFact) {
      let headers = { "Content-Type": "application/json" };
      let csrf_cookie = getCookie("CSRF-TOKEN");
      if (csrf_cookie) {
        headers["X-CSRF-Token"] = csrf_cookie;
      }
      fetch(`${members_path}/${memberId6.value}/facts/${factNumber2.value}`, {
        method: "DELETE",
        headers: headers,
      }).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            resultsDiv.innerHTML = "";
            let parag = document.createElement("P");
            parag.textContent = JSON.stringify(data);
            resultsDiv.appendChild(parag);
          });
        } else {
          response
            .json()
            .then((data) => {
              alert(
                `Return code ${response.status} ${
                  response.statusText
                } ${JSON.stringify(data)}`,
              );
            })
            .catch((error) => {
              console.log(error);
              alert(error);
            });
        }
      });
    }
  });
}
document.addEventListener("DOMContentLoaded", handle_members(event));
