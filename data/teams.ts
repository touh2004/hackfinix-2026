export interface TeamNode {
  id: number
  code: string
  name: string
  domain: string
  status: 'VERIFIED' | 'SYNCHRONIZING' | 'ACTIVE'
  track: string
  score?: number
}

export const teamsData: TeamNode[] = [
  { id: 1, code: 'NODE-001', name: 'Nebula Labs', domain: 'Autonomous Agents', status: 'VERIFIED', track: 'Humanity' },
  { id: 2, code: 'NODE-002', name: 'Syntax Error', domain: 'ZK Protocols', status: 'VERIFIED', track: 'Beyond' },
  { id: 3, code: 'NODE-003', name: 'The Debuggers', domain: 'Neural Audio', status: 'VERIFIED', track: 'Humanity' },
  { id: 4, code: 'NODE-004', name: 'Blue Orbit', domain: 'Orbital Mesh', status: 'VERIFIED', track: 'Beyond' },
  { id: 5, code: 'NODE-005', name: 'Ctrl Alt Elite', domain: 'Clean Grid ML', status: 'VERIFIED', track: 'Planet' },
  { id: 6, code: 'NODE-006', name: 'Runtime Rebels', domain: 'Edge Robotics', status: 'VERIFIED', track: 'Humanity' },
  { id: 7, code: 'NODE-007', name: 'Pixel Forge', domain: 'Spatial Engines', status: 'VERIFIED', track: 'Beyond' },
  { id: 8, code: 'NODE-008', name: 'Byte Benders', domain: 'Biometric Security', status: 'VERIFIED', track: 'Humanity' },
  { id: 9, code: 'NODE-009', name: 'CyberPulse', domain: 'Ecological Telemetry', status: 'VERIFIED', track: 'Planet' },
  { id: 10, code: 'NODE-010', name: 'Quantum Drift', domain: 'Q-State Sim', status: 'VERIFIED', track: 'Beyond' },
  { id: 11, code: 'NODE-011', name: 'Vector Shift', domain: 'High-Freq Compute', status: 'VERIFIED', track: 'Beyond' },
  { id: 12, code: 'NODE-012', name: 'Aether Minds', domain: 'Vision Systems', status: 'VERIFIED', track: 'Humanity' },
  { id: 13, code: 'NODE-013', name: 'ZeroEntropy', domain: 'Energy Routing', status: 'VERIFIED', track: 'Planet' },
  { id: 14, code: 'NODE-014', name: 'BitStream Alpha', domain: 'Decentralized Identity', status: 'VERIFIED', track: 'Beyond' },
  { id: 15, code: 'NODE-015', name: 'HyperNexus', domain: 'Bio-Signal ML', status: 'VERIFIED', track: 'Humanity' },
  { id: 16, code: 'NODE-016', name: 'Solaris Core', domain: 'Micro-Grid AI', status: 'VERIFIED', track: 'Planet' },
  { id: 17, code: 'NODE-017', name: 'Glitch Protocol', domain: 'Resilient P2P', status: 'VERIFIED', track: 'Beyond' },
  { id: 18, code: 'NODE-018', name: 'Cognitive Loop', domain: 'Assistive Voice', status: 'VERIFIED', track: 'Humanity' },
  { id: 19, code: 'NODE-019', name: 'TerraBytes', domain: 'Satellite Agri-Sense', status: 'VERIFIED', track: 'Planet' },
  { id: 20, code: 'NODE-020', name: 'Void Walkers', domain: 'Spatial Audio', status: 'VERIFIED', track: 'Beyond' },
  { id: 21, code: 'NODE-021', name: 'CodeCatalyst', domain: 'DevTool LLMs', status: 'VERIFIED', track: 'Humanity' },
  { id: 22, code: 'NODE-022', name: 'Optima Green', domain: 'Carbon Ledger', status: 'VERIFIED', track: 'Planet' },
  { id: 23, code: 'NODE-023', name: 'SyncWave', domain: 'Mesh Communications', status: 'VERIFIED', track: 'Beyond' },
  { id: 24, code: 'NODE-024', name: 'NeuralNomads', domain: 'Wearable Biosensors', status: 'VERIFIED', track: 'Humanity' },
  { id: 25, code: 'NODE-025', name: 'Aura Compute', domain: 'Zero-Leakage Cloud', status: 'VERIFIED', track: 'Beyond' },
  { id: 26, code: 'NODE-026', name: 'BioMatrix', domain: 'Synthetic Biology AI', status: 'VERIFIED', track: 'Planet' },
  { id: 27, code: 'NODE-027', name: 'OmniChain', domain: 'Cross-Rollup Bridges', status: 'VERIFIED', track: 'Beyond' },
  { id: 28, code: 'NODE-028', name: 'Apex Builders', domain: 'Disaster Recon Drones', status: 'VERIFIED', track: 'Planet' },
  { id: 29, code: 'NODE-029', name: 'Krypton Six', domain: 'Hardware Enclaves', status: 'VERIFIED', track: 'Beyond' },
  { id: 30, code: 'NODE-030', name: 'EchoForge', domain: 'Sign-Language ML', status: 'VERIFIED', track: 'Humanity' },
  { id: 31, code: 'NODE-031', name: 'Prism Labs', domain: 'Light-Field Displays', status: 'VERIFIED', track: 'Beyond' },
  { id: 32, code: 'NODE-032', name: 'FinalStack', domain: 'Autonomous Supply', status: 'VERIFIED', track: 'Planet' },
]
