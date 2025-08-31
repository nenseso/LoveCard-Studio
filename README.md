# LoveCard Studio 💖

**LoveCard Studio** is a beautiful and easy-to-use web application that allows you to create personalized love greeting cards. Simply type your message, customize the design, and export the final card as a high-quality PNG image.

![Uploading LoveCard-2025-08-31T02-11-09-497Z.png…]()

---

## ✨ Features

- **✍️ Rich Text Editing**: Enter any message, including recipient and signature lines.
- **🎨 Theme & Style Customization**:
  - Choose from multiple themes like *Love*, *Elegant*, and *Noir*.
  - Select from a variety of elegant fonts, including serif and script styles.
  - Adjust text alignment (center/left) and size.
- **🖼️ Flexible Canvas**:
  - Multiple canvas sizes available (square, landscape, portrait).
  - Decorative elements like animated hearts and elegant frames.
- **🎨 Color Palettes**: Instantly apply beautiful, pre-designed color schemes.
- **🚀 High-Quality Export**:
  - Preview your design in real-time.
  - Export the final card as a PNG image with adjustable resolution (Standard, HD, Ultra HD).

## 🚀 How to Run Locally

To run this project on your local machine, follow these simple steps:

1.  **Clone the repository** (or download the files):
    ```bash
    git clone https://github.com/nenseso/LoveCard-Studio.git
    cd lovecard-studio
    ```

2.  **Start a local web server**. Since browsers have security restrictions for local files (`file:///...`), you need a server to run the application correctly. The easiest way is to use Python's built-in server.

    - If you have Python 3 installed, run this command in the project directory:
      ```bash
      python3 -m http.server 8080
      ```
    - If you have Python 2, use this command instead:
      ```bash
      python -m SimpleHTTPServer 8080
      ```

3.  **Open in your browser**:
    Once the server is running, open your web browser and go to the following address:
    [http://localhost:8080](http://localhost:8080)

That's it! You can now use the LoveCard Studio.

## 🛠️ Tech Stack

- **HTML5**: For the structure of the application.
- **CSS3**: For all the styling, including gradients, animations, and responsive design.
- **JavaScript (ES6+)**: For all the logic, interactivity, and dynamic updates.
- **[html2canvas](https://html2canvas.hertzen.com/)**: The library used to capture the greeting card element and convert it into a PNG image.

---

Feel free to contribute to this project by forking it and submitting a pull request!
