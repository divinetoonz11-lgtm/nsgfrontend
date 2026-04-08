import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext.jsx";
import { toast } from "react-toastify";

const SignupPage = ({ isAssociate = false }) => {
  const { signup, validateSponsor } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    sponsorReferralId: "",
    placement: "left",
    country: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [sponsorName, setSponsorName] = useState("");
  const [checkingSponsor, setCheckingSponsor] = useState(false);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Sponsor live check
  const handleSponsorChange = async (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, sponsorReferralId: value }));

    if (value.length < 4) {
      setSponsorName("");
      return;
    }

    setCheckingSponsor(true);

    try {
      const res = await validateSponsor(value.trim().toUpperCase());
      if (res.success && res.user?.name) {
        setSponsorName(res.user.name);
      } else {
        setSponsorName("Invalid Sponsor ❌");
      }
    } catch (err) {
      console.error("Sponsor Check Error:", err);
      setSponsorName("Error checking sponsor");
    }

    setCheckingSponsor(false);
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Frontend validation
      if (
        !formData.fullName?.trim() ||
        !formData.email?.trim() ||
        !formData.password ||
        (isAssociate && !formData.sponsorReferralId?.trim())
      ) {
        toast.error("All fields are required");
        setLoading(false);
        return;
      }

      // Sponsor validation for associate
      let sponsorCode = "";
      if (isAssociate) {
        sponsorCode = formData.sponsorReferralId.trim().toUpperCase();
        const sponsorResult = await validateSponsor(sponsorCode);
        if (!sponsorResult?.success) {
          toast.error("Invalid sponsor ID");
          setLoading(false);
          return;
        }
      }

      // Prepare payload
      const payload = {
        name: formData.fullName.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        country: formData.country.trim(),
        address: formData.address.trim(),
      };

      if (isAssociate) {
        payload.sponsorId = sponsorCode;
        payload.placement = formData.placement.toLowerCase();
      }

      // Signup API call
      const result = await signup(payload);
      if (result.success) {
        toast.success("Form submitted successfully, verify your email");

        setFormData({
          fullName: "",
          email: "",
          password: "",
          sponsorReferralId: "",
          placement: "left",
          country: "",
          address: "",
        });
        setSponsorName("");
      } else {
        toast.error(result.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="signup-page">
      <form onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
        />

        <input
          type="text"
          name="country"
          value={formData.country}
          placeholder="Country"
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          value={formData.address}
          placeholder="Address"
          onChange={handleChange}
        />

        {isAssociate && (
          <>
            <input
              type="text"
              name="sponsorReferralId"
              value={formData.sponsorReferralId}
              placeholder="Sponsor ID"
              onChange={handleSponsorChange}
            />

            {sponsorName && (
              <p style={{ color: sponsorName.includes("Invalid") ? "red" : "green" }}>
                {checkingSponsor ? "Checking..." : sponsorName}
              </p>
            )}

            <select
              name="placement"
              value={formData.placement}
              onChange={handleChange}
            >
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignupPage;