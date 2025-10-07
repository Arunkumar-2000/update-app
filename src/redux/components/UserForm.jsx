import React, { useState, useEffect } from 'react'

const UserForm = () => {
  const [user, setUser] = useState({ name: "", email: "" })
  const [userList, setUserList] = useState([])
  const [editIndex, setEditIndex] = useState(null)

  // 🟢 Load from localStorage once when the app starts
  useEffect(() => {
    const storedUsers = localStorage.getItem("userList")
    if (storedUsers && storedUsers !== "undefined") {
      try {
        setUserList(JSON.parse(storedUsers))
      } catch (error) {
        console.error("Error parsing userList:", error)
        localStorage.removeItem("userList")
      }
    }
  }, [])

  // 🟢 Save userList to localStorage whenever it changes
  useEffect(() => {
    if (userList.length > 0) {
      localStorage.setItem("userList", JSON.stringify(userList))
    } else {
      // If empty, remove key from localStorage
      localStorage.removeItem("userList")
    }
  }, [userList])

  const handleSubmit = () => {
    if (user.name.trim() === "" || user.email.trim() === "") {
      alert("Please fill all fields")
      return
    }

    if (editIndex !== null) {
      const updatedList = userList.map((item, index) =>
        index === editIndex ? user : item
      )
      setUserList(updatedList)
      setEditIndex(null)
      alert("User updated successfully!")
    } else {
      setUserList([...userList, user])
      alert("User added successfully!")
    }

    setUser({ name: "", email: "" })
  }

  const handleEdit = (index) => {
    setUser(userList[index])
    setEditIndex(index)
  }

  const handleCancel = () => {
    setUser({ name: "", email: "" })
    setEditIndex(null)
  }

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const filtered = userList.filter((_, i) => i !== index)
      setUserList(filtered)
    }
  }

  return (
    <div className="container mt-4">
      <h1>User Form</h1>

      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          placeholder="Enter your Name"
          className="form-control mb-2"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />

        <label className="form-label">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="form-control mb-3"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <button className="btn btn-success me-2" onClick={handleSubmit}>
          {editIndex !== null ? "Save Changes" : "Submit"}
        </button>

        {editIndex !== null && (
          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>

      <hr />
      <h2>User List</h2>

      <div className="d-flex flex-column gap-3 ">
        {userList.map((item, index) => (
          <div className="card" style={{ width: "20rem",backgroundColor: "#f0f0f0ff"  }} key={index} >
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{item.email}</h6>

              <button
                className="btn btn-primary me-2"
                onClick={() => handleEdit(index)}
              >
                Update
              </button>

              <button
                className="btn btn-danger"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserForm
