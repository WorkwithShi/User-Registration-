import { useState } from "react";
import { User, Mail, Lock, Eye, CheckCircle } from "lucide-react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [registered, setRegistered] = useState(false);
  const [showMembers, setShowMembers] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://user-registration-himanshi-env.eba-khkdzmrq.ap-southeast-2.elasticbeanstalk.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      setRegistered(true);
      setName("");
      setEmail("");
      setPassword("");

    } catch (error) {
      console.error(error);
    }
  };

  const toggleMembers = async () => {
  if (!showMembers) {
    try {
      const response = await fetch("http://user-registration-himanshi-env.eba-khkdzmrq.ap-southeast-2.elasticbeanstalk.com/users");
      const data = await response.json();
      setUsers(data);
      setShowMembers(true);
    } catch (error) {
      console.error(error);
    }
  } else {
    setShowMembers(false);
  }
};


  const resetForm = () => {
    setRegistered(false);
  };

  return (
    <div className="container">
      <div className="card">

        {!registered ? (
          <>
            <h1 style={{ textAlign: "center" }}>
              🍵 Registration Form
            </h1>
            <h5>Do you want a matcha latte?</h5>

            <form onSubmit={handleSubmit}>
              <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <User size={16} /> Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Mail size={16} /> Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Lock size={16} /> Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit">Join the Crew</button>
            </form>
          </>
        ) : (
          <div className="success-screen" style={{ textAlign: "center", padding: "20px" }}>

            <CheckCircle size={70} color="#2e7d32" />
            <h2 style={{ color: "#2e7d32", marginTop: "15px" }}>
              Registered Successfully!
            </h2>
            <p>🍵 Welcome to Matcha Crew</p>
            <button
              onClick={resetForm}
              style={{ marginTop: "15px" }}
            >
              Register Another Member
            </button>
          </div>
        )}

        <button className="view-btn" onClick={toggleMembers}>
          <Eye size={16} style={{ marginRight: "5px" }} />
          {showMembers ? "Hide Members" : "View All Members"}
        </button>

      </div>

      {showMembers && users.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Member Since</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      })
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
}

export default App;
