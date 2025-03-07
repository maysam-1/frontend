import { useEffect, useState } from "react";
import '../HomePage.css'; // Add CSS for styling and animations

const Home = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [isTyping2, setIsTyping2] = useState(false);

  useEffect(() => {
    setIsTyping(true); // Start typing animation when component mounts
    setIsTyping2(true)
  }, []);

  return (
    <div className="home-container">
      <div className={`centered-text ${isTyping ? 'typing' : ''}`}>
        Welcome To APT. Life Organizer 
      </div>
      <br/>
      <div className={`centered-text centered-text2 ${isTyping2 ? 'typing' : ''}`}>
      Where You Can Organize Your Life With Your Friends 
      </div>
    </div>
  );
};

export default Home;
