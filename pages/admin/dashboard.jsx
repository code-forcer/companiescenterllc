import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/AdminAuth.module.css";
import Logout from "@/components/Logout";
import Footer from "@/components/Footer";
import axios from "axios";
import MenusideBar from "@/components/MenuSideBar";
import MessageList from "@/components/MessageList";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [companies, setCompanies] = useState([]); // To store the list of companies
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [companyPrice, setCompanyPrice] = useState("");
  const [companyImage, setCompanyImage] = useState(null);
  const [companyLocation, setCompanyLocation] = useState("");
  const [companyMapUrl, setCompanyMapUrl] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyContact, setCompanyContact] = useState("");
  // New fields
  const [companyLogo, setCompanyLogo] = useState(null); // For the logo
  const [companyFacebook, setCompanyFacebook] = useState(""); // Facebook URL
  const [companyTwitter, setCompanyTwitter] = useState(""); // Twitter URL
  const [companyInstagram, setCompanyInstagram] = useState(""); // Instagram URL

  const [companyUserid, setCompanyUserid] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await axios.get("/api/items/items");
      setItems(response.data);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`/api/items/${itemId}`);
      setSuccess("Item deleted successfully");
      fetchItems();
    } catch (error) {
      console.error("Failed to delete item:", error);
      setError("Failed to delete item");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    const fetchUserData = async () => {
      const response = await fetch("/api/getuserdetails", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setCompanyUserid(data._id); // Set the user ID as the companyUserid
        if (data.email === "cpcadmin@gmail.com") {
          fetchItems();
        }
      } else {
        localStorage.removeItem("token");
        router.push("/admin/login");
      }
    };

    fetchUserData();
  }, [router]);

  useEffect(() => {
    if (user?.role === "employer") {
      const fetchCompanies = async () => {
        const response = await axios.get("/api/items/items");
        setCompanies(response.data);
      };

      fetchCompanies();
    }
  }, [user]);
  const handleUpload = async (e) => {
    e.preventDefault();
  
    if (!companyName || !companyImage || !companyLogo) {
      setError("Please provide both a company name, banner image, and logo image.");
      return;
    }
  
    // Create two separate FileReader instances
    const readerBanner = new FileReader();
    const readerLogo = new FileReader();
  
    readerBanner.readAsDataURL(companyImage);
    readerLogo.readAsDataURL(companyLogo);
  
    readerBanner.onloadend = async () => {
      const base64Image = readerBanner.result; // Get banner image as base64 string
  
      // Wait for the logo image to load as well
      readerLogo.onloadend = async () => {
        const base64ImageLogo = readerLogo.result; // Get logo image as base64 string
  
        // Now, both images are ready to be sent with the form data
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            companyName,
            companyUserid,
            companyDescription,
            companyPrice,
            companyLocation,
            companyMapUrl,
            companyWebsite,
            companyContact,
            companyImage: base64Image, // Banner image
            companyLogo: base64ImageLogo, // Logo image
  
            companyFacebook,
            companyTwitter,
            companyInstagram,
          }),
        });
  
        if (res.status === 201) {
          setSuccess("Company information uploaded successfully!");
          setCompanyName("");
          setCompanyUserid("");
          setCompanyDescription("");
          setCompanyPrice("");
          setCompanyImage(null);
          setCompanyLocation("");
          setCompanyMapUrl("");
          setCompanyWebsite("");
          setCompanyContact("");
          setCompanyLogo(null); // Reset logo as well
          setCompanyFacebook("");
          setCompanyTwitter("");
          setCompanyInstagram("");
        } else {
          const data = await res.json();
          setError(data.error);
        }
      };
  
      // Error handling for logo
      readerLogo.onerror = () => {
        setError("Failed to read the logo image file.");
      };
    };
  
    // Error handling for banner
    readerBanner.onerror = () => {
      setError("Failed to read the banner image file.");
    };
  };
  

  const openChatModal = () => setIsChatModalOpen(true);
  const closeChatModal = () => setIsChatModalOpen(false);

  return (
    user && (
      <>
        <MenusideBar userRole={user.role} /><br /><br />
        <div className={styles.authContainer}>
          <h1 className={styles.title}>
            Dashboard: Welcome,{" "}
            <span style={{ textDecoration: "capitalize" }}>{user.name}</span>
          </h1>
          <h5
            style={{
              color: "#ce1212",
              float: "right",
              textDecoration: "underline",
            }}
          >
            <b>
              <span style={{ textDecoration: "capitalize" }}>{user.role}</span>
              <img src="/radix/fire.svg" width={"30px"} alt="Fire Icon" />
            </b>
          </h5>
          <small style={{ textAlign: "center", fontWeight: "bold" }}>
            Welcome to your mini-dashboard
          </small>

          <h3>
            Your memebership status is <code>{user.membershipStatus}</code>
          </h3>
          <hr />

          {/* Chat box */}
          <button className={styles.openChatBtn} onClick={openChatModal}>
            <h4>Notifications</h4>
          </button>
          {isChatModalOpen && (
            <div className={styles.modalOverlay}>
              <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                  <button
                    className={styles.closeModalBtn}
                    onClick={closeChatModal}
                  >
                    &times;
                  </button>
                </div>
                <h1> Hi , Your message notifications appears here.</h1>
                <hr />
                <MessageList />
              </div>
            </div>
          )}

          {user.role === "company" && (
            <form onSubmit={handleUpload} className={styles.uploadForm}>
              <input type="text" value={companyUserid} hidden readOnly />
              <input
                type="text"
                placeholder="Company's Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className={styles.authInput}
              />
              <textarea
                rows="5"
                cols="5"
                placeholder="Company's Description"
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
                className={styles.authInput}
              />
              <input
                type="number"
                placeholder="Company's Price"
                value={companyPrice}
                onChange={(e) => setCompanyPrice(e.target.value)}
                className={styles.authInput}
              />
              <input
                type="text"
                placeholder="Company's Location"
                value={companyLocation}
                onChange={(e) => setCompanyLocation(e.target.value)}
                className={styles.authInput}
              />
              <input
                type="text"
                placeholder="Company's Map URL"
                value={companyMapUrl}
                onChange={(e) => setCompanyMapUrl(e.target.value)}
                className={styles.authInput}
              />
              <input
                type="text"
                placeholder="Company's Website URL"
                value={companyWebsite}
                onChange={(e) => setCompanyWebsite(e.target.value)}
                className={styles.authInput}
              />
              <input
                type="text"
                placeholder="Company's Contact Information"
                value={companyContact}
                onChange={(e) => setCompanyContact(e.target.value)}
                className={styles.authInput}
              />
              <h4>
                Company's Image/Banner: <small>size in kbs</small>
              </h4>
              <input
                type="file"
                onChange={(e) => setCompanyImage(e.target.files[0])}
                className={styles.authInput}
                accept="image/*"
              />
              <h4>
                Company's Logo: <small>size in kbs</small>
              </h4>
              <input
                type="file"
                onChange={(e) => setCompanyLogo(e.target.files[0])}
                className={styles.authInput}
                accept="image/*"
              />
              <h3>Socials</h3>
              <hr />
              <input
                type="text"
                placeholder="Company's Facebook url or None"
                value={companyFacebook}
                onChange={(e) => setCompanyFacebook(e.target.value)}
                className={styles.authInput}
              />
              <input
                type="text"
                placeholder="Company's Instagram Page or None"
                value={companyInstagram}
                onChange={(e) => setCompanyInstagram(e.target.value)}
                className={styles.authInput}
              />
              <input
                type="text"
                placeholder="Company's Twitter Page or None"
                value={companyTwitter}
                onChange={(e) => setCompanyTwitter(e.target.value)}
                className={styles.authInput}
              />
              {error && <p className={styles.errorMessage}>{error}</p>}
              {success && <p className={styles.successMessage}>{success}</p>}
              <button type="submit" className={styles.authButton}>
                Submit
              </button>
            </form>
          )}

          {user.role === "employer" && (
            <div className={styles.companyList}>
              <h2>Available Companies</h2>
              <ul>
                {companies.map((company) => (
                  <li key={company.id} className={styles.companyItem}>
                    <h3>{company.name}</h3>
                    <p>{company.description}</p>
                    <button
                      onClick={() =>
                        router.push(`/hiremessage?itemId=${company._id}`)
                      }
                    >
                      View & Hire
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <br />
          <Logout />
        </div>

        <Footer />
      </>
    )
  );
}
