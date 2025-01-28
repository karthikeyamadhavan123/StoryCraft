import  { useEffect } from 'react';
import Comments from './Comments';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import { useTheme } from '@/context/themeContext';

const Page = () => {
  const [theme] = useTheme();

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
    document.body.classList.toggle("light", theme === "light");
  }, [theme]);

  return (
    <div className={`min-h-screen min-w-screen font-merri`}>
      <Header />
      <Main />
      <Comments />
      <Footer />
    </div>
  );
};

export default Page;
