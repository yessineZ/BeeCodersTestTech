import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  bgcolor: "#fff",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const ContactMe = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        "service_fqdg60k",
        "template_o1oss67",
        {
          from_name: form.name,
          to_email: "yessine305@gmail.com",
          message: form.message,
        },
        "UXhCJ1hWFGOhOsCGG"
      );
      handleOpen();
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center bg-[#fbb458]"
      style={{ borderRadius: "50px", padding: "50px" }}
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full max-w-lg space-y-6 bg-[#fbb458]"
      >
        <h1 className="text-2xl font-bold text-center text-black">Contact Us</h1>
        <div>
          <label className="block text-black text-sm font-bold mb-2">NAME</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Yessine..."
            className="w-full p-3 rounded-md focus:outline-none bg-[#fed8a2] border-none"
          />
        </div>
        <div>
          <label className="block text-black text-sm font-bold mb-2">EMAIL</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="yessine@gmail.com"
            className="w-full p-3 rounded-md focus:outline-none bg-[#fed8a2] border-none"
          />
        </div>
        <div>
          <label className="block text-black text-sm font-bold mb-2">MESSAGE</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            placeholder="Write your message here"
            rows="5"
            className="w-full p-3 rounded-md focus:outline-none bg-[#fed8a2] border-none"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 text-white font-bold rounded-md bg-[#ad194b] hover:bg-[#940a3d] transition-all"
        >
          {loading ? "Sending..." : "Send the message"}
        </button>
      </form>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h6" component="h2" className="font-bold">
            Success
          </Typography>
          <Typography sx={{ mt: 2 }}>Your message has been sent successfully!</Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ContactMe;
