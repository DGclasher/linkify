import React, { useEffect, useState } from "react";

const Footer = () => {
    const currentYear = new Date().getFullYear()
  return (
    <div className="">
    <footer>
      <p>&copy; {currentYear} DGclasher</p>
    </footer>
    </div>
  );
};

export default Footer;
