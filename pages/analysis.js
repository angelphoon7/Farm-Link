import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

const mockAnalysis = () => ({
  confidence: Math.floor(Math.random() * 100),
  funding: Math.floor(Math.random() * 10000),
  apr: (Math.random() * 10 + 1).toFixed(2),
  contributors: Math.floor(Math.random() * 10) + 1,
  avgContributed: Math.floor(Math.random() * 2000) + 500,
  loanProgress: Math.floor(Math.random() * 10000),
  loanGoal: 15000,
  kyc: Math.random() > 0.2,
  attestation: Math.random() > 0.5 ? 'View' : 'None',
  harvestsPerYear: Math.floor(Math.random() * 3) + 1,
  monthsBetween: Math.floor(Math.random() * 6) + 3,
  estNextHarvest: 'January 2025',
  fieldSize: Math.floor(Math.random() * 50) + 1
});

export default function Analysis() {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    const storedCrops = localStorage.getItem('crops');
    if (storedCrops) {
      setCrops(JSON.parse(storedCrops));
    }
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Crops Analysis Dashboard</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
        {crops.length === 0 && <div>No crops found. Please add crops first.</div>}
        {crops.map((crop, idx) => {
          const analysis = mockAnalysis();
          return (
            <div key={crop.id} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #0001', padding: 24, minWidth: 320, maxWidth: 350 }}>
              <h2 style={{ marginBottom: 8 }}>{crop.cropType}</h2>
              <div style={{ marginBottom: 8, color: '#888' }}>{crop.address}</div>
              <div style={{ marginBottom: 16 }}><b>Size:</b> {crop.size} acres</div>
              <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                <div>
                  <b>Confidence Score:</b>
                  <div style={{ fontSize: 32, color: analysis.confidence > 60 ? 'green' : analysis.confidence > 40 ? 'orange' : 'red' }}>{analysis.confidence}</div>
                </div>
                <div>
                  <b>Funding:</b>
                  <div style={{ fontSize: 24 }}>${analysis.funding}</div>
                  <div style={{ fontSize: 12, color: '#888' }}>APR: <span style={{ color: 'green' }}>{analysis.apr}%</span></div>
                </div>
              </div>
              <div style={{ marginBottom: 8 }}>
                <b>Contributors:</b> {analysis.contributors} | <b>Avg:</b> ${analysis.avgContributed}
              </div>
              <div style={{ marginBottom: 8 }}>
                <b>Loan Progress:</b> ${analysis.loanProgress} / ${analysis.loanGoal}
              </div>
              <div style={{ marginBottom: 8 }}>
                <b>KYC:</b> {analysis.kyc ? 'Verified ✅' : 'Not Verified ❌'} | <b>Attestation:</b> {analysis.attestation}
              </div>
              <div style={{ marginBottom: 8 }}>
                <b>Field Size:</b> {analysis.fieldSize} Ha
              </div>
              <div style={{ marginBottom: 8 }}>
                <b>Avg. Harvests/Year:</b> {analysis.harvestsPerYear}
              </div>
              <div style={{ marginBottom: 8 }}>
                <b>Avg. Time Between Harvests:</b> {analysis.monthsBetween} Months
              </div>
              <div style={{ marginBottom: 8 }}>
                <b>EST. next full Grown:</b> {analysis.estNextHarvest}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 