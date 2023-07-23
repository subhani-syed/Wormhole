const Footer = () => {
  return (
    <footer className="flex justify-between bg-gray-800 text-white border-4 border-black rounded-lg shadow-lg m-10 p-10">
      <div>
        <a
          href="#"
          className="text-xl hover:text-cyan-300 transition duration-300"
        >
          How it works
        </a>
      </div>
      <div className="flex">
        <h1 className="text-xl mx-5">Let's Connect</h1>
        <a
          href="https://www.linkedin.com/in/subhani-syed/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl mx-5 hover:text-cyan-300 transition duration-300"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/subhani-syed"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl mx-5 hover:text-cyan-300 transition duration-300"
        >
          GitHub
        </a>
        <a
          href="https://twitter.com/subhan1syed"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl mx-5 hover:text-cyan-300 transition duration-300"
        >
          Twitter
        </a>
      </div>
    </footer>
  );
};

export default Footer;
