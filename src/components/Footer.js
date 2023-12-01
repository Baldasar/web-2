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
        <div className="footer-text">
          <p>
            Desenvolvido por:{" "}
            <span>Leonardo Spilere & Lucas Baldasar - {year} &copy;</span>
          </p>
        </div>
        <div className="footer-button">
          <button className="scroll-button" onClick={scrollToTop}>
            Topo
          </button>
        </div>
      </div>
    </footer>
  );
}
