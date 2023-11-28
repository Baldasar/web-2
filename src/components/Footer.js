import React from "react";

export function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer id="footer">
      <div className="footer-content">
        <h4>
          Desenvolvido por:{" "}
          <span>Leonardo Spilere & Lucas Baldasar - {year} &copy;</span>
        </h4>
      </div>
      <div className="footer-content">
        <button className="scroll-button" onClick={scrollToTop}>
          Topo
        </button>
      </div>
    </footer>
  );
}
