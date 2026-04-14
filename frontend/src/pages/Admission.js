import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { UserPlus, Save, User, Activity } from "lucide-react";
import "../admission.css";

function AdmissionPage() {

  const [loading, setLoading] = useState(false);
  const [wards, setWards] = useState([]);
  const [beds, setBeds] = useState([]);

  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    contact: "",
    address: "",
    diagnosis: "",
    doctor: "",
    wardId: "",
    bedId: ""
  });

  // ================= FETCH WARDS =================
  useEffect(() => {
    fetchWards();
  }, []);

  const fetchWards = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/wards");
      const data = await res.json();
      if (res.ok) setWards(data);
    } catch (err) {
      console.error("Ward fetch error:", err);
    }
  };

  // ================= FETCH BEDS =================
  useEffect(() => {
    if (formData.wardId) {
      fetchBeds(formData.wardId);
    } else {
      setBeds([]);
    }
  }, [formData.wardId]);

  const fetchBeds = async (wardId) => {
    try {
      const res = await fetch("http://localhost:5000/api/beds");
      const data = await res.json();

      if (res.ok) {
        const filtered = data.filter(
          (b) =>
            !b.isOccupied &&
            b.ward &&
            String(b.ward._id) === String(wardId)
        );

        console.log("Filtered Beds:", filtered); // debug
        setBeds(filtered);
      }
    } catch (err) {
      console.error("Bed fetch error:", err);
    }
  };

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "wardId") {
      setFormData({
        ...formData,
        wardId: value,
        bedId: "" // reset bed when ward changes
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // 🔴 VALIDATION
      if (!formData.bedId) {
        alert("Please select a valid bed");
        setLoading(false);
        return;
      }

      console.log("FINAL BED ID:", formData.bedId);

      // ================= CREATE PATIENT =================
      const patientRes = await fetch("http://localhost:5000/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.fullName,
          age: Number(formData.age),
          gender: formData.gender,
          contact: formData.contact,
          address: formData.address,
          diagnosis: formData.diagnosis,
          doctor: formData.doctor,
        })
      });

      const patientData = await patientRes.json();

      if (!patientRes.ok) {
        console.error("Patient error:", patientData);
        alert("Failed to create patient");
        setLoading(false);
        return;
      }

      // ================= ASSIGN BED =================
      const assignRes = await fetch(
        `http://localhost:5000/api/beds/assign/${String(formData.bedId)}/${patientData._id}`,
        {
          method: "PATCH"
        }
      );

      const assignData = await assignRes.json();

      if (!assignRes.ok) {
        console.error("Assign error:", assignData);
        alert("Bed assignment failed");
        setLoading(false);
        return;
      }

      // ================= SUCCESS =================
      alert("✅ Patient admitted successfully!");

      setFormData({
        fullName: "",
        age: "",
        gender: "",
        contact: "",
        address: "",
        diagnosis: "",
        doctor: "",
        wardId: "",
        bedId: ""
      });

      setBeds([]);

    } catch (err) {
      console.error("Submit error:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <Layout>
      <div className="page-header">
        <div className="title-area">
          <UserPlus size={24} className="title-icon" />
          <h1>Patient Admission</h1>
          <p className="subtitle">Register new patient and assign ward</p>
        </div>
      </div>

      <div className="admission-container">
        <form onSubmit={handleSubmit}>

          {/* PERSONAL */}
          <div className="form-section">
            <h3 className="section-title">
              <User size={18} /> Personal Information
            </h3>

            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input name="fullName" value={formData.fullName} onChange={handleChange} required />
              </div>

              <div className="form-row-split">
                <div className="form-group">
                  <label>Age</label>
                  <input type="number" name="age" value={formData.age} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input name="contact" value={formData.contact} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input name="address" value={formData.address} onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* CLINICAL */}
          <div className="form-section">
            <h3 className="section-title">
              <Activity size={18} /> Clinical Details
            </h3>

            <div className="form-grid">

              <div className="form-group full-width">
                <label>Diagnosis</label>
                <textarea name="diagnosis" value={formData.diagnosis} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Doctor</label>
                <input name="doctor" value={formData.doctor} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Select Ward</label>
                <select name="wardId" value={formData.wardId} onChange={handleChange} required>
                  <option value="">Select Ward</option>
                  {wards.map((w) => (
                    <option key={w._id} value={String(w._id)}>
                      {w.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Select Bed</label>
                <select name="bedId" value={formData.bedId} onChange={handleChange} required>
                  <option value="">Select Bed</option>
                  {beds.map((b) => (
                    <option key={b._id} value={String(b._id)}>
                      {b.bedNumber}
                    </option>
                  ))}
                </select>
              </div>

            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={loading}>
              <Save size={18} /> {loading ? "Admitting..." : "Admit Patient"}
            </button>
          </div>

        </form>
      </div>
    </Layout>
  );
}

export default AdmissionPage;