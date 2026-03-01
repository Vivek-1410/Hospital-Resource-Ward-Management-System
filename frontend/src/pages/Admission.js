import React, { useState } from "react";
import Layout from "../components/Layout";
import { 
  UserPlus, 
  Save, 
  X, 
  User, 
  Phone, 
  MapPin, 
  Activity, 
  BedDouble,
  Calendar
} from "lucide-react";
import "../admission.css";

function AdmissionPage() {
  const [loading, setLoading] = useState(false);

  const wardsData = [
    { 
      id: "ward_a", 
      name: "General Ward A", 
      availableBeds: [
        { id: "101", number: "G-101" },
        { id: "102", number: "G-102" },
        { id: "105", number: "G-105" }
      ] 
    },
    { 
      id: "ward_icu", 
      name: "ICU (Intensive Care)", 
      availableBeds: [
        { id: "icu_1", number: "ICU-01" },
        { id: "icu_4", number: "ICU-04" }
      ] 
    },
    { 
      id: "ward_ped", 
      name: "Pediatrics", 
      availableBeds: [] 
    }
  ];


  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    contact: "",
    address: "",
    emergencyContact: "",
    diagnosis: "",
    doctor: "",
    admissionDate: new Date().toISOString().split('T')[0], // Today's date
    wardId: "",
    bedId: ""
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      console.log("Submitting Data:", formData);
      alert("Patient Admitted Successfully!");
      setLoading(false);
    }, 1000);
  };

  const selectedWard = wardsData.find(w => w.id === formData.wardId);
  const availableBeds = selectedWard ? selectedWard.availableBeds : [];

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
          <div className="form-section">
            <h3 className="section-title">
              <User size={18} /> Personal Information
            </h3>
            <div className="form-grid">
              
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName} 
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="form-row-split">
                <div className="form-group">
                  <label>Age</label>
                  <input 
                    type="number" 
                    name="age"
                    placeholder="e.g. 32"
                    value={formData.age} 
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <div className="input-icon-wrapper">
                  <Phone size={16} className="field-icon" />
                  <input 
                    type="tel" 
                    name="contact"
                    placeholder="+1 234 567 890"
                    value={formData.contact} 
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Emergency Contact</label>
                <input 
                  type="text" 
                  name="emergencyContact"
                  placeholder="Relative Name & Phone"
                  value={formData.emergencyContact} 
                  onChange={handleChange}
                />
              </div>

              <div className="form-group full-width">
                <label>Address</label>
                <div className="input-icon-wrapper">
                  <MapPin size={16} className="field-icon" />
                  <input 
                    type="text" 
                    name="address"
                    placeholder="Full residential address"
                    value={formData.address} 
                    onChange={handleChange}
                  />
                </div>
              </div>

            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">
              <Activity size={18} /> Clinical & Ward Details
            </h3>
            <div className="form-grid">

              <div className="form-group">
                <label>Admission Date</label>
                <input 
                  type="date" 
                  name="admissionDate"
                  value={formData.admissionDate} 
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="form-group">
                <label>Referring Doctor</label>
                <input 
                  type="text" 
                  name="doctor"
                  placeholder="Dr. Smith"
                  value={formData.doctor} 
                  onChange={handleChange}
                />
              </div>

              <div className="form-group full-width">
                <label>Reason for Admission (Diagnosis)</label>
                <textarea 
                  name="diagnosis"
                  rows="2"
                  placeholder="e.g. Severe Dengue, Viral Fever..."
                  value={formData.diagnosis} 
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="divider full-width"></div>

              <div className="form-group">
                <label>Select Ward</label>
                <div className="input-icon-wrapper">
                  <BedDouble size={16} className="field-icon" />
                  <select name="wardId" value={formData.wardId} onChange={handleChange} required>
                    <option value="">-- Choose Ward --</option>
                    {wardsData.map(ward => (
                      <option key={ward.id} value={ward.id}>{ward.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Assign Bed</label>
                <select 
                  name="bedId" 
                  value={formData.bedId} 
                  onChange={handleChange} 
                  required
                  disabled={!formData.wardId} 
                >
                  <option value="">
                    {!formData.wardId 
                      ? "Select Ward First" 
                      : availableBeds.length === 0 
                        ? "No Beds Available" 
                        : "-- Select Bed --"}
                  </option>
                  {availableBeds.map(bed => (
                    <option key={bed.id} value={bed.id}>{bed.number}</option>
                  ))}
                </select>
              </div>

            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel">
              <X size={18} /> Cancel
            </button>
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