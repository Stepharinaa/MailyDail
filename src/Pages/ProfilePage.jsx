import { useEffect, useState } from "react";
import { getUsername } from "../utils/api";
import LoadingAnimation from "../Components/LoadingAnimation";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getUsername()
      .then((userData) => {
        setUser(userData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading profile", error);
        setError("Failed to load profile. Please try again!");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <LoadingAnimation />;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <section className="profile-page">
      <h1>Profile Details</h1>
      <p>Username: {user.username} </p>
      <p>Name: {user.name}</p>
      <img src={user.avatar_url} alt="User Image" id="user-image" />
    </section>
  );
}

export default ProfilePage;
