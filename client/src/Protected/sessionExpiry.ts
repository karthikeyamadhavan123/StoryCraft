

const checkSessionExpiry = () => {
    const loginTime = localStorage.getItem('l_time') || localStorage.getItem('r_time'); // Retrieve login time
    if (loginTime) {
      const loginTimeHours = Number(loginTime); // Convert login time to a number (hours only)
      const expiryTimeHours = loginTimeHours + 2; 
      
      
      // Add 2 hours to the login time
      const currentTimeHours = new Date().getHours(); // Get the current hour (0–23)
  
      if (currentTimeHours >= expiryTimeHours) {
         // Check if the current hour has passed the expiry time
        localStorage.clear(); // Clear all local storage to log out the user
        return true; // Session expired
      }
      return false; // Session is still valid
    }
  
    return false; // No login time found, session not active or already logged out
  };
  
  export default checkSessionExpiry;
  