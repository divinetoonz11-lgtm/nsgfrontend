import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext.jsx";
import { toast } from "react-toastify";

const SignupPage = () => {
  const { signup, validateSponsor } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    sponsorReferralId: "",
    placement: "left",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🔥 normalize sponsor
      const sponsorCode = formData.sponsorReferralId.trim().toUpperCase();

      // ❌ empty check
      if (!sponsorCode) {
        toast.error("Sponsor ID required");
        setLoading(false);
        return;
      }

      // ✅ validate sponsor (API)
      const sponsorResult = await validateSponsor(sponsorCode);

      if (!sponsorResult?.success) {
        toast.error("Invalid sponsor ID");
        setLoading(false);
        return;
      }

      // ✅ payload (backend compatible)
      const payload = {
        name: formData.fullName,
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        sponsorId: sponsorCode, // IMPORTANT
        placement: formData.placement.toLowerCase(),
      };

      // ✅ signup API
      const result = await signup(payload);

      if (result.success) {
        toast.success("Form submitted successfully, verify your email");

        // reset form
        setFormData({
          fullName: "",
          email: "",
          password: "",
          sponsorReferralId: "",
          placement: "left",
        });
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          placeholder="Full Name"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="sponsorReferralId"
          value={formData.sponsorReferralId}
          placeholder="Sponsor ID"
          onChange={handleChange}
          required
        />

        <select
          name="placement"
          value={formData.placement}
          onChange={handleChange}
        >
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignupPage;