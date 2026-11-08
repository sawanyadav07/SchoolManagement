import { useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, Bell, BookOpen, Bus,
  CalendarDays, Check, ChevronDown, CircleHelp, Command, CreditCard,
  GraduationCap, LayoutDashboard, LogOut, Menu, MoreHorizontal, Search,
  Settings2, ShieldCheck, Sparkles, UserRound, Users, Wallet, X,
} from 'lucide-react';

const navigation = [
  { label: 'Overview', icon: LayoutDashboard, to: '/' },
  { label: 'Students', icon: GraduationCap, to: '/students', badge: '1,248' },
  { label: 'Teachers', icon: Users, to: '/teachers' },
  { label: 'Attendance', icon: CalendarDays, to: '/attendance' },
  { label: 'Fees & payments', icon: CreditCard, to: '/fees' },
  { label: 'Academics', icon: BookOpen, to: '/academics' },
  { label: 'Transport', icon: Bus, to: '/transport' },
];

const stats = [
  { label: 'Total students', value: '1,248', change: '+4.8%', note: 'vs last month', icon: GraduationCap, tint: 'violet', up: true, data: 'M2 24 C10 23 10 17 17 20 S28 10 35 13 S47 3 56 7 S69 1 77 4' },
  { label: 'Present today', value: '1,176', change: '94.2%', note: 'of enrolled students', icon: Users, tint: 'mint', up: true, data: 'M2 21 C8 19 12 23 19 15 S28 18 35 10 S44 12 52 8 S66 11 77 3' },
  { label: 'Fees collected', value: '₹8.42L', change: '+12.5%', note: 'vs last month', icon: Wallet, tint: 'amber', up: true, data: 'M2 23 C11 18 11 23 20 18 S31 21 38 12 S50 16 56 8 S68 10 77 2' },
  { label: 'Pending fees', value: '₹2.16L', change: '−3.2%', note: 'vs last month', icon: Activity, tint: 'rose', up: false, data: 'M2 3 C9 11 13 7 20 13 S31 9 39 16 S49 12 56 20 S68 17 77 24' },
];

const week = [
  { day: 'Mon', value: 70 }, { day: 'Tue', value: 84 }, { day: 'Wed', value: 63 },
  { day: 'Thu', value: 92 }, { day: 'Fri', value: 76 }, { day: 'Sat', value: 38 }, { day: 'Sun', value: 18 },
];

const transactions = [
  { name: 'Aarav Sharma', detail: 'Grade 8 · 09:42 AM', initials: 'AS', color: 'lavender', amount: '₹24,500', status: 'Paid' },
  { name: 'Diya Patel', detail: 'Grade 5 · 09:18 AM', initials: 'DP', color: 'peach', amount: '₹18,000', status: 'Paid' },
  { name: 'Kabir Mehta', detail: 'Grade 10 · 08:56 AM', initials: 'KM', color: 'mint', amount: '₹32,000', status: 'Pending' },
  { name: 'Anaya Reddy', detail: 'Grade 3 · 08:31 AM', initials: 'AR', color: 'blue', amount: '₹15,500', status: 'Paid' },
];

const events = [
  { date: '12', month: 'NOV', title: 'Mid-term examinations', meta: 'All grades · 9:00 AM', color: 'purple' },
  { date: '14', month: 'NOV', title: 'Parent–teacher meeting', meta: 'Grades 6–10 · 10:30 AM', color: 'orange' },
  { date: '18', month: 'NOV', title: 'Annual sports day', meta: 'School grounds · 8:00 AM', color: 'green' },
];

function Sidebar({ open, onClose }) {
  return <>
    <div className={`mobile-scrim ${open ? 'visible' : ''}`} onClick={onClose} />
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      <div className="brand-row"><div className="brand-mark"><GraduationCap size={21} strokeWidth={2.4} /></div><span className="brand-name">edu<span>pilot</span></span><button className="icon-button close-sidebar" onClick={onClose}><X size={18} /></button></div>
      <button className="school-switch"><span className="school-avatar">G</span><span className="school-copy"><b>Greenfield Academy</b><small>School workspace</small></span><ChevronDown size={16} className="muted" /></button>
      <div className="nav-caption">WORKSPACE</div>
      <nav className="nav-list">{navigation.map(({ label, icon: Icon, to, badge }) => <NavLink key={label} to={to} end={to === '/'} onClick={onClose} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}><Icon size={18} strokeWidth={1.8} /><span>{label}</span>{badge && <small className="nav-badge">{badge}</small>}</NavLink>)}</nav>
      <div className="nav-caption tools-caption">TOOLS</div>
      <NavLink to="/reports" className="nav-link"><Activity size={18} strokeWidth={1.8} /><span>Reports & analytics</span></NavLink>
      <NavLink to="/settings" className="nav-link"><Settings2 size={18} strokeWidth={1.8} /><span>Settings</span></NavLink>
      <div className="sidebar-bottom"><div className="support-card"><div className="support-icon"><CircleHelp size={16} /></div><b>Need a hand?</b><p>Our team is here to help you.</p><button>Visit help center <ArrowRight size={14} /></button></div><div className="profile-row"><div className="profile-avatar">RK</div><div className="profile-copy"><b>Riya Kapoor</b><small>School administrator</small></div><button className="icon-button"><MoreHorizontal size={18} /></button></div></div>
    </aside>
  </>;
}

function Topbar({ onMenu }) {
  return <header className="topbar"><button className="icon-button menu-button" onClick={onMenu}><Menu size={20} /></button><div className="breadcrumbs"><span>Workspace</span><span className="crumb-slash">/</span><b>Overview</b></div><div className="top-actions"><label className="search-box"><Search size={16} /><input placeholder="Search anything..." /><kbd>⌘ K</kbd></label><button className="icon-button notification-button" aria-label="Notifications"><Bell size={19} /><i /></button><div className="top-divider" /><button className="help-button"><CircleHelp size={17} /><span>Help</span></button></div></header>;
}

function Sparkline({ data, color }) {
  return <svg viewBox="0 0 80 28" preserveAspectRatio="none" className="sparkline" aria-hidden="true"><path d={data} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" /></svg>;
}

function StatCard({ item }) {
  const Icon = item.icon;
  return <article className="stat-card"><div className="stat-top"><span className={`stat-icon ${item.tint}`}><Icon size={17} strokeWidth={2} /></span><Sparkline data={item.data} color={`var(--${item.tint}-line)`} /></div><p className="stat-label">{item.label}</p><div className="stat-value-row"><strong>{item.value}</strong><span className={`stat-change ${item.up ? 'positive' : 'negative'}`}>{item.up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}{item.change}</span></div><div className="stat-note">{item.note}</div></article>;
}

function AttendanceChart() {
  return <div className="chart-wrap"><div className="chart-y-labels"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div><div className="chart-main"><div className="chart-grid"><i /><i /><i /><i /><i /></div><div className="chart-bars">{week.map((item) => <div className="bar-column" key={item.day}><div className="bar-track"><div className={`bar-fill ${item.day === 'Thu' ? 'highlight' : ''}`} style={{ height: `${item.value}%` }}><span>{item.value}%</span></div></div><small>{item.day}</small></div>)}</div></div></div>;
}

function AttendancePanel() {
  return <section className="panel attendance-panel"><div className="panel-heading"><div><h2>Attendance overview</h2><p>Daily attendance trends for this week</p></div><button className="select-button">This week <ChevronDown size={15} /></button></div><div className="attendance-summary"><strong>94.2<span>%</span></strong><span className="summary-badge"><ArrowUpRight size={13} /> 2.4%</span><small>Average attendance</small></div><AttendanceChart /><div className="chart-legend"><span><i className="legend-dot violet-dot" />Students present</span><span><i className="legend-dot pale-dot" />School average</span></div></section>;
}

function TransactionsPanel() {
  return <section className="panel transaction-panel"><div className="panel-heading"><div><h2>Recent fee payments</h2><p>Latest transactions from your school</p></div><button className="more-button" aria-label="More options"><MoreHorizontal size={19} /></button></div><div className="transaction-list">{transactions.map((item) => <div className="transaction-row" key={item.name}><div className={`student-avatar ${item.color}`}>{item.initials}</div><div className="student-meta"><b>{item.name}</b><small>{item.detail}</small></div><div className="payment-meta"><b>{item.amount}</b><span className={item.status === 'Paid' ? 'paid' : 'pending'}>{item.status === 'Paid' && <Check size={11} />}{item.status}</span></div></div>)}</div><button className="panel-footer-link">View all transactions <ArrowRight size={14} /></button></section>;
}

function EventsPanel() {
  return <section className="panel events-panel"><div className="panel-heading"><div><h2>Upcoming events</h2><p>What's happening around school</p></div><button className="text-link">View calendar <ArrowRight size={14} /></button></div><div className="events-list">{events.map((event) => <div className="event-row" key={event.title}><div className={`event-date ${event.color}`}><b>{event.date}</b><small>{event.month}</small></div><div className="event-copy"><b>{event.title}</b><small>{event.meta}</small></div><button className="event-more"><MoreHorizontal size={18} /></button></div>)}</div></section>;
}

function AiCard() {
  return <section className="ai-card"><div className="ai-orb"><Sparkles size={19} /></div><div className="ai-copy"><span className="ai-eyebrow">EDUPILOT INTELLIGENCE <i>NEW</i></span><h2>Your school, at a glance.</h2><p>Get a clear picture of what's happening today, powered by your school's data.</p><button>Ask your AI assistant <ArrowRight size={14} /></button></div><div className="ai-decoration"><span /><span /><span /><span /><span /><span /><span /><span /><span /></div></section>;
}

function Dashboard() {
  return <main className="page-content"><div className="welcome-row"><div><div className="eyebrow-date"><span className="live-dot" /> MONDAY, NOVEMBER 10, 2026</div><h1>Good morning, Riya <span className="wave">✦</span></h1><p>Here's what's happening at Greenfield Academy today.</p></div><button className="primary-button"><Command size={15} /> Quick actions <ChevronDown size={14} /></button></div><div className="stats-grid">{stats.map((item) => <StatCard key={item.label} item={item} />)}</div><div className="main-grid"><AttendancePanel /><TransactionsPanel /><AiCard /><EventsPanel /></div><footer className="page-footer"><span>© 2026 EduPilot</span><span><ShieldCheck size={13} /> Your school's data is protected</span><span>Made for better school days <span className="footer-star">✳</span></span></footer></main>;
}

function Placeholder({ title }) {
  return <main className="page-content placeholder-page"><div className="eyebrow-date"><span className="live-dot" /> GREENFIELD ACADEMY</div><h1>{title}</h1><p>This section is ready for the next product milestone.</p><div className="placeholder-card"><div className="placeholder-icon"><BookOpen size={22} /></div><h2>{title}, all in one place</h2><p>We're laying the groundwork for secure school operations. This module will connect to your school's data as it comes online.</p><button className="primary-button">Back to overview <ArrowRight size={14} /></button></div></main>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <div className="app-shell"><Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} /><div className="main-shell"><Topbar onMenu={() => setMenuOpen(true)} /><Routes><Route path="/" element={<Dashboard />} />{navigation.filter((item) => item.to !== '/').map((item) => <Route key={item.to} path={item.to} element={<Placeholder title={item.label} />} />)}<Route path="/reports" element={<Placeholder title="Reports & analytics" />} /><Route path="/settings" element={<Placeholder title="Settings" />} /><Route path="*" element={<Placeholder title="Page not found" />} /></Routes></div></div>;
}
