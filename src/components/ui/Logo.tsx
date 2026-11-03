import logo from '../../assets/logos/nutriome-logo-tight.png'

export function Logo({ className = '' }: { className?: string }) {
  return <img src={logo} alt="Nutriome Labs" className={className} draggable={false} />
}
