import React from 'react'

export default function Marquee() {
  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: '100%' }}>
      <p
        style={{
          display: 'inline-block',
          paddingLeft: '100%',
          animation: 'marquee 20s linear infinite',
          color: '#000',
          fontFamily: "'Roboto', sans serif",
          padding: '5px',
          fontWeight: 'bold'
        }}
      >
        Welcome to <span style={{ color: '#04ff', fontSize: '25px' }}>companiescenterllc.com</span> - Your one-stop hub for connecting with top companies, exploring business opportunities, and accessing high-quality services to drive your success. Discover the best companies in your industry today!
      </p>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  )
}
