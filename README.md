# Kiln Allowance Manager

A web application developed as part of the Junior Fullstack Case Study internship at Kiln. This project demonstrates the implementation of a secure and user-friendly interface for managing ERC-20 token allowances on the Holesky network.

## 🌟 Overview

This application allows users to:
- Track multiple ERC20 token approvals in one dashboard
- Monitor allowance amounts in real-time
- Add new allowances to track
- View all approvals for connected wallet address

## 🛠 Tech Stack

- **Frontend**: React + TypeScript + TailwindCSS
- **Web3**: Wagmi + Ethers.js
- **Backend**: Laravel
- **Database**: SQLite

## 🚀 Quick Start

1. Install dependencies
```bash
npm install
```

2. Start development server
```bash
npm run dev
```

## 📁 Project Structure

### Key Files
- `resources/js/Pages/` 
  - `Home.tsx` - Landing page
  - `Overview.tsx` - Dashboard with allowances list
  - `AddAllowance.tsx` - Form to add new allowances
- `resources/js/Components/` - React components
- `resources/js/hooks/useERC20.tsx` - Web3 interactions
- `resources/js/bootstrap.ts` - Holesky network configuration
- `routes/web.php` - Application routes
- `resources/css/app.css` - Global styles and TailwindCSS
- `.env.example` - Example environment variables

## 🎨 Design

- Primary Color: #FF5500 (Kiln Orange)
- Modern, clean interface
- Responsive design
- Real-time updates

## 📄 License

[MIT License](LICENSE)
