import React from "react";

export function Footer() {

  const year = new Date().getFullYear(); 

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <header id="footer">
      <h4>Desenvolvido por: &nbsp; Leonardo Spilere & Lucas Baldasar &nbsp; - &nbsp; {year} &copy;</h4>
      <button id="scroll" onClick={scrollToTop}>Topo</button>
    </header>
  );
}