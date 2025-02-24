import { useEffect } from "react";

import './App.css'


const App = () => {
  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const title = document.getElementById("gentleRainTitle");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particules = [],
      gouttes = [],
      nombreb = 2;

    function Rain(X, Y, nombre = nombreb) {
      while (nombre--) {
        particules.push({
          vitesseX: Math.random() * 0.25,
          vitesseY: Math.random() * 9 + 1,
          X: X,
          Y: Y,
          couleur: "rgba(255, 255, 255, 0.8)",
        });
      }
    }

    function explosion(X, Y, couleur, nombre = 5) {
      while (nombre--) {
        gouttes.push({
          vitesseX: Math.random() * 4 - 2,
          vitesseY: Math.random() * -4,
          X: X,
          Y: Y,
          radius: 0.65 + Math.floor(Math.random() * 1.6),
          couleur: couleur,
        });
      }
    }

    function update() {
      particules.forEach((p, index) => {
        p.X += p.vitesseX;
        p.Y += p.vitesseY;
        if (p.Y > canvas.height) {
          particules.splice(index, 1);
          explosion(p.X, p.Y, p.couleur);
        }
      });
      gouttes.forEach((g, index) => {
        g.X += g.vitesseX;
        g.Y += g.vitesseY;
        g.radius -= 0.075;
        if (g.radius <= 0) {
          gouttes.splice(index, 1);
        }
      });
      for (let i = 0; i < 5; i++) {
        Rain(Math.random() * canvas.width, -10);
      }
    }

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particules.forEach((p) => {
        ctx.fillStyle = p.couleur;
        ctx.fillRect(p.X, p.Y, 2, 10);
      });
      gouttes.forEach((g) => {
        ctx.fillStyle = g.couleur;
        ctx.beginPath();
        ctx.arc(g.X, g.Y, g.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function loop() {
      requestAnimationFrame(loop);
      update();
      render();
    }
    loop();

    document.addEventListener("mousemove", (event) => {
      let shadowX = (event.clientX - window.innerWidth / 2) / 10;
      let shadowY = (event.clientY - window.innerHeight / 2) / 10;
      title.style.textShadow = `${shadowX}px ${shadowY}px 20px rgba(0, 0, 0, 0.6)`;
      title.style.transform = `translate(${shadowX / 2}px, ${shadowY / 2}px)`;
    });

    window.onload = function () {
      setTimeout(() => {
        document.getElementById("loader").classList.add("hidden");
      }, 2000);
    };
  }, []);

  return (
    <div>
      <div className="loader-container" id="loader">
        <h1>GentleRain ....</h1>
        <div className="water-drop"></div>
      </div>
      <canvas id="canvas"></canvas>
      <header>
        <div className="nav-container">
          <span className="logo">gentlerain</span>
          <nav>
            <a href="#">Product</a>
            <a href="#">Concept</a>
            <a href="#">For business</a>
            <a href="#">Partners</a>
          </nav>
          <div className="auth-buttons">
            <a href="#">Sign Up</a>
            <a href="#">Log in</a>
          </div>
        </div>
      </header>
      <main>
        <h1 className="title" id="gentleRainTitle">
          gentlerain
        </h1>
        <div className="logo-icon"></div>
        <p className="description">
          Leverage AI to grow valuable skills through immersive realistic role
          play scenarios
        </p>
        <div className="buttons">
          <button className="contact-sales" style={{ fontSize: "20px" }}>
            Contact Sales
          </button>
          <a href="#" style={{ fontSize: "1px" }}>
            Log In
          </a>
        </div>
      </main>
    </div>
  );
};

export default App;
